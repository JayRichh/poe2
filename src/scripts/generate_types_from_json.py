
#   Walks through src\lib\poe\data\poe2-data-main, reads each .json file,
#   and generates a single .d.ts containing categorized interfaces under
#   the Poe2DataMain namespace. Subfolders like "csd", "data", or "xt"
#   become sub-namespaces (Csd, Data, Xt, etc). Within each sub-namespace,
#   each JSON file is represented by an interface or type definition.
#
#   Example hierarchy in the final "poe2DataTypes.d.ts":
#     declare namespace Poe2DataMain {
#       export namespace Csd {
#         // ...
#       }
#       export namespace Data {
#         // ...
#       }
#       export namespace Xt {
#         // ...
#       }
#       // ...
#     }

import os
import json
import re

# Root input folder.
ROOT_DIR = r"src\lib\poe\data\poe2-data-main"
# Output folder & file.
OUTPUT_DIR = r"src\types"
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "poe2DataTypes.d.ts")

# Directories to skip entirely:
EXCLUDE_DIR_KEYWORDS = [
    "metadata",
    "french",
    "german",
    "japanese",
    "korean",
    "portuguese",
    "russian",
    "spanish",
    "thai",
    "traditional chinese",
    "xt"
]

def should_exclude(path_str: str) -> bool:
    """ Returns True if path_str contains any excluded keywords. """
    lpath = path_str.lower().replace("\\", "/")
    return any(kw in lpath for kw in EXCLUDE_DIR_KEYWORDS)

def safe_name(name: str) -> str:
    """
    Convert arbitrary strings into safe TypeScript identifier
    (e.g. "npcportraits" -> "Npcportraits").
    """
    # Remove extension, non-identifier chars, capitalize first letter:
    name = os.path.splitext(name)[0]  # drop .json if present
    name = re.sub(r'\W|^(?=\d)', '_', name)
    if not name:
        name = "Unnamed"
    # Capitalize first letter only, e.g. "my_file" => "My_file"
    return name[0].upper() + name[1:] if name else "Unnamed"

def guess_ts_type(value):
    """ Returns 'string', 'number', 'boolean', 'any[]', etc., or None if nested object. """
    if isinstance(value, bool):
        return "boolean"
    elif isinstance(value, int) or isinstance(value, float):
        return "number"
    elif isinstance(value, str):
        return "string"
    elif isinstance(value, list):
        if not value:
            return "any[]"
        t = guess_ts_type(value[0])  # guess from first element
        return f"{t}[]" if t else "any[]"
    elif isinstance(value, dict):
        return None  # nested -> interface
    return "any"

def generate_interface(obj: dict, iface_name: str):
    """
    Build an interface (plus any nested) for a dict object.
    Returns (main_iface: str, nested_ifaces: list[str]).
    """
    lines = [f"export interface {iface_name} {{"]

    nested = []

    for key, val in obj.items():
        prop_name = re.sub(r'\W|^(?=\d)', '_', key) or "_unnamed"
        ts_type = guess_ts_type(val)
        if ts_type is None:
            # nested object => create a sub-interface
            sub_iface_name = f"{iface_name}_{prop_name}"
            sub_main, sub_nested = generate_interface(val, sub_iface_name)
            nested.append(sub_main)
            nested.extend(sub_nested)
            lines.append(f"  {prop_name}?: {sub_iface_name};")
        else:
            lines.append(f"  {prop_name}?: {ts_type};")

    lines.append("}")
    return ("\n".join(lines), nested)

def json_to_ts(filepath: str) -> str:
    """
    Convert one .json file to a set of TS exports (interface or type).
    Returns a string of TS code (possibly multiple interfaces).
    """
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            data = json.load(f)
    except:
        # If unreadable or invalid JSON, fallback
        return "// Invalid or unreadable JSON => any\nexport type Invalid = any;\n"

    base_name = safe_name(os.path.basename(filepath))

    # If it's a dict => interface
    if isinstance(data, dict):
        main_iface, nested = generate_interface(data, base_name)
        # Join main + nested, and done
        joined = [main_iface] + nested
        return "\n".join(joined) + "\n"

    # If it's a list => array item interface or direct type
    if isinstance(data, list):
        if not data:
            return f"export type {base_name} = any[];\n"
        # guess from first element
        first = data[0]
        ts_type = guess_ts_type(first)
        if ts_type is None:
            # means each item is a nested dict
            # => build "export interface X extends Array<XItem> {}"
            item_iface_name = base_name + "Item"
            main_iface, nested = generate_interface(first, item_iface_name)
            array_decl = f"export interface {base_name} extends Array<{item_iface_name}> {{}}"
            return "\n".join([main_iface] + nested + [array_decl]) + "\n"
        else:
            # simpler array => e.g. "export type Npcportraits = string[];"
            return f"export type {base_name} = {ts_type};\n"

    # Else just fallback to any
    return f"export type {base_name} = any;\n"


# We store code in a nested dictionary structure so that
# each subfolder becomes a sub-namespace in the final output.
# E.g. code_map["data"]["subfolder1"]["filename"] = "some code"
from collections import defaultdict

def make_nested_dict():
    return defaultdict(make_nested_dict)

code_map = make_nested_dict()

def insert_code_in_map(rel_parts, code_str):
    """
    rel_parts: list of subfolders, last part is the 'file name' chunk (which we might skip).
    code_str: TypeScript we want to store in that nested dict location.
    """
    # We'll traverse code_map step by step. The last part is the "filename interface"
    # but we'll store it in the parent "folder" dictionary, keyed by the base file name.
    d = code_map
    for i, part in enumerate(rel_parts):
        if i == len(rel_parts) - 1:
            # This is the file's code
            d[part] = code_str
        else:
            d = d[part]

def build_namespace_code(d, depth=1):
    """
    Recursively build `namespace {...}` blocks from code_map structure.
    If the value is a string, it's a file's code. If it's a dict, we nest further.
    """
    lines = []
    indent = "  " * depth
    for key, val in d.items():
        if isinstance(val, str):
            # It's a final code chunk for a single .json file
            # Indent each line
            for line in val.split("\n"):
                lines.append(f"{indent}{line}")
        else:
            # It's a sub-namespace
            safe_ns = safe_name(key)
            lines.append(f"{indent}export namespace {safe_ns} {{")
            lines.extend(build_namespace_code(val, depth+1))
            lines.append(f"{indent}}}\n")
    return lines


def main():
    # Walk the directory tree
    for root, dirs, files in os.walk(ROOT_DIR):
        # Convert to a path relative to ROOT_DIR
        rel_path = os.path.relpath(root, ROOT_DIR)
        # If excluded => skip
        if should_exclude(rel_path):
            # modifies `dirs[:]` in-place so os.walk won't recurse
            dirs[:] = []  # prevent descending
            continue

        # Split the relative path into parts
        # e.g. "data/npc" => ["data", "npc"]
        path_parts = [p for p in rel_path.split(os.sep) if p and p != "."]

        for fname in files:
            if not fname.lower().endswith(".json"):
                continue
            # Check if file name is excluded
            if should_exclude(fname):
                continue
            full_path = os.path.join(root, fname)
            code_str = json_to_ts(full_path)
            # Inserting code under the nested map
            file_part = os.path.splitext(fname)[0]  # "npcportraits"
            # store code in code_map => path_parts => file_part
            insert_code_in_map(path_parts + [file_part], code_str)

    # Now build the final .d.ts text
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as out_f:
        out_f.write("// Auto-generated TypeScript definitions\n")
        out_f.write("// for poe2-data-main, excluding 'metadata', translations, etc.\n\n")
        out_f.write("declare namespace Poe2DataMain {\n")
        # Recursively build sub-namespaces from code_map
        # Everything in code_map is top-level (besides '.'?), so build code
        lines = build_namespace_code(code_map, depth=1)
        for line in lines:
            out_f.write(line + "\n")
        out_f.write("}\n")


if __name__ == "__main__":
    main()
