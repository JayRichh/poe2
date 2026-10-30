import { describe, expect, it } from "vitest";

import {
  filterKnownNodeIds,
  normalizeAscendancy,
  parseTreeBuild,
  pruneUnknownNodes,
} from "./buildImport";

describe("parseTreeBuild", () => {
  it("imports official .build passives and Gemling Legionnaire", () => {
    expect(
      parseTreeBuild({
        name: "Untether",
        ascendancy: "Mercenary3",
        passives: [{ id: "attributes107" }, { id: "passive_keystone_mind_over_matter" }],
      })
    ).toEqual({
      name: "Untether",
      ascendancy: "Gemling Legionnaire",
      nodes: ["attributes107", "passive_keystone_mind_over_matter"],
      sourceFormat: "ggg-build",
    });
  });

  it("imports the poe2.dev planner wrapper without losing passive IDs", () => {
    const result = parseTreeBuild({
      name: "Wrapped",
      data: {
        passiveTree: {
          sourceAscendancyId: "Mercenary3",
          nodes: ["attributes107"],
        },
      },
    });
    expect(result.nodes).toEqual(["attributes107"]);
    expect(result.ascendancy).toBe("Gemling Legionnaire");
    expect(result.sourceFormat).toBe("poe2dev-planner");
  });

  it("continues to import the legacy skill-tree JSON format", () => {
    expect(parseTreeBuild({ nodes: ["K3"], ascendancy: "Stormweaver" }).sourceFormat).toBe(
      "poe2dev-tree"
    );
  });

  it("rejects malformed passive entries", () => {
    expect(() => parseTreeBuild({ passives: [{ nope: true }] })).toThrow(/Expected/);
  });
});

describe("normalizeAscendancy", () => {
  it("maps the GGG class slot identifier", () => {
    expect(normalizeAscendancy("Mercenary3")).toBe("Gemling Legionnaire");
  });

  it("returns a plain string for prototype-chain keys (no reflected DoS)", () => {
    for (const key of ["constructor", "__proto__", "toString", "hasOwnProperty"]) {
      const result = normalizeAscendancy(key);
      expect(typeof result).toBe("string");
      expect(result).toBe(key);
    }
  });

  it("falls back to 'None' for empty or non-string input", () => {
    expect(normalizeAscendancy("")).toBe("None");
    expect(normalizeAscendancy(undefined)).toBe("None");
    expect(normalizeAscendancy(42)).toBe("None");
  });
});

describe("filterKnownNodeIds", () => {
  const nodes = Object.assign(Object.create(null), { a: 1, b: 2 }) as object;
  const plain = { a: 1 } as object;

  it("drops __proto__, constructor and unknown ids", () => {
    expect(
      filterKnownNodeIds(["a", "__proto__", "constructor", "toString", "zzz", "b"], nodes)
    ).toEqual(["a", "b"]);
  });

  it("does not see inherited members on a plain object", () => {
    expect(filterKnownNodeIds(["__proto__", "constructor", "a"], plain)).toEqual(["a"]);
  });
});

describe("Abyssal Lich", () => {
  it("maps Witch3b", () => {
    expect(normalizeAscendancy("Witch3b")).toBe("Abyssal Lich");
  });
});

describe("pruneUnknownNodes", () => {
  const nodes = { a: 1, b: 2 };

  it("drops junk ids that arrived before the tree loaded", () => {
    const pruned = pruneUnknownNodes(new Set(["__proto__", "constructor", "toString", "a"]), nodes);
    expect([...pruned]).toEqual(["a"]);
  });

  it("returns the same set when all ids are known", () => {
    const ids = new Set(["a", "b"]);
    expect(pruneUnknownNodes(ids, nodes)).toBe(ids);
  });
});
