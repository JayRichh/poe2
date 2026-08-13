import { describe, expect, it } from "vitest";

import { normalizeAscendancy, parseTreeBuild } from "./buildImport";

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
});
