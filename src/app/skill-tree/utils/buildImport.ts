export interface ImportedTreeBuild {
  nodes: string[];
  ascendancy: string;
  name?: string;
  sourceFormat: "ggg-build" | "poe2dev-tree" | "poe2dev-planner";
}

const ASCENDANCY_NAMES: Record<string, string> = {
  Witch1: "Infernalist",
  Witch2: "Blood Mage",
  Witch3: "Lich",
  Ranger1: "Deadeye",
  Ranger3: "Pathfinder",
  Warrior1: "Titan",
  Warrior2: "Warbringer",
  Warrior3: "Smith of Kitava",
  Sorceress1: "Stormweaver",
  Sorceress2: "Chronomancer",
  Sorceress3: "Disciple of Varashta",
  Huntress1: "Amazon",
  Huntress2: "Spirit Walker",
  Huntress3: "Ritualist",
  Mercenary1: "Tactician",
  Mercenary2: "Witchhunter",
  Mercenary3: "Gemling Legionnaire",
  Monk1: "Martial Artist",
  Monk2: "Invoker",
  Monk3: "Acolyte of Chayula",
  Druid1: "Oracle",
  Druid2: "Shaman",
};

const ASCENDANCY_ALIASES = new Map(
  Object.entries(ASCENDANCY_NAMES).flatMap(([id, name]) => [
    [id.toLowerCase(), name],
    [name.toLowerCase(), name],
  ])
);

ASCENDANCY_ALIASES.set("gemling", "Gemling Legionnaire");
ASCENDANCY_ALIASES.set("bloodmage", "Blood Mage");
ASCENDANCY_ALIASES.set("acolyte", "Acolyte of Chayula");

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readNodeIds(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const nodes = value.map((entry) => {
    if (typeof entry === "string") return entry;
    if (isRecord(entry) && typeof entry.id === "string") return entry.id;
    return null;
  });
  return nodes.every((node): node is string => node !== null) ? nodes : null;
}

// Own-property lookup: guards against inherited keys like "constructor" or
// "__proto__" (a raw record[key] returns a Function for those, which then
// crashes string callers downstream — a reflected client-side DoS via ?a=).
function ownLookup(record: Record<string, string>, key: string): string | undefined {
  return Object.prototype.hasOwnProperty.call(record, key) ? record[key] : undefined;
}

export function normalizeAscendancy(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) return "None";
  const trimmed = value.trim();
  return (
    ownLookup(ASCENDANCY_NAMES, trimmed) ?? ASCENDANCY_ALIASES.get(trimmed.toLowerCase()) ?? trimmed
  );
}

export function ascendancyImageSlug(value: string): string {
  const name = normalizeAscendancy(value);
  const known: Record<string, string> = {
    "Acolyte of Chayula": "acolyte",
    "Blood Mage": "bloodmage",
    "Gemling Legionnaire": "gemling",
  };
  return ownLookup(known, name) ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const ASCENDANCY_IMAGE_SLUGS = new Set([
  "acolyte",
  "bloodmage",
  "chronomancer",
  "deadeye",
  "gemling",
  "infernalist",
  "invoker",
  "pathfinder",
  "stormweaver",
  "titan",
  "warbringer",
  "witchhunter",
]);

export function hasAscendancyImage(value: string): boolean {
  return ASCENDANCY_IMAGE_SLUGS.has(ascendancyImageSlug(value));
}

export function parseTreeBuild(value: unknown): ImportedTreeBuild {
  if (!isRecord(value)) throw new Error("Build must be a JSON object");

  const gggPassives = readNodeIds(value.passives);
  if (gggPassives) {
    return {
      nodes: gggPassives,
      ascendancy: normalizeAscendancy(value.ascendancy),
      name: typeof value.name === "string" ? value.name : undefined,
      sourceFormat: "ggg-build",
    };
  }

  const plannerData = isRecord(value.data) ? value.data : null;
  const passiveTree =
    plannerData && isRecord(plannerData.passiveTree) ? plannerData.passiveTree : null;
  const plannerNodes = passiveTree ? readNodeIds(passiveTree.nodes) : null;
  if (passiveTree && plannerNodes) {
    return {
      nodes: plannerNodes,
      ascendancy: normalizeAscendancy(
        passiveTree.sourceAscendancyId ?? passiveTree.ascendancyName ?? passiveTree.ascendancy
      ),
      name: typeof value.name === "string" ? value.name : undefined,
      sourceFormat: "poe2dev-planner",
    };
  }

  const legacyNodes = readNodeIds(value.nodes);
  if (legacyNodes) {
    return {
      nodes: legacyNodes,
      ascendancy: normalizeAscendancy(value.ascendancy),
      name: typeof value.name === "string" ? value.name : undefined,
      sourceFormat: "poe2dev-tree",
    };
  }

  throw new Error("Expected official passives, planner passiveTree.nodes, or tree nodes");
}

export function parseTreeBuildJson(text: string): ImportedTreeBuild {
  return parseTreeBuild(JSON.parse(text));
}
