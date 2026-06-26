import { compressToEncodedURIComponent } from "lz-string";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  buildShareUrl,
  decodeTokenToBuild,
  encodeBuildToToken,
  extractTokenFromLocation,
  MAX_SHARE_TOKEN_LENGTH,
} from "./share";
import {
  createBuild,
  deleteBuild,
  duplicateBuild,
  getActiveBuild,
  getActiveBuildId,
  getBuild,
  importBuild,
  listBuilds,
  renameBuild,
  saveBuild,
  saveBuildSection,
  setActiveBuildId,
  upsertActiveBuild,
} from "./storage";
import { BUILD_SCHEMA_VERSION } from "./types";

/**
 * LOCAL-FIRST PERSISTENCE SPEC — the accountless build-planner contract.
 *
 * Builds live only in localStorage (no backend). These tests pin the CRUD,
 * active-build, and share-link round-trip behaviour the planner UI relies on.
 * vitest runs under environment:"node", so we install a minimal localStorage
 * mock on globalThis.window before each test (storage.ts reads window lazily).
 */

function installLocalStorage() {
  const store = new Map<string, string>();
  const localStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => void store.set(k, String(v)),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
  };
  (globalThis as { window?: unknown }).window = { localStorage };
}

beforeEach(() => {
  installLocalStorage();
});

afterEach(() => {
  delete (globalThis as { window?: unknown }).window;
});

describe("storage — CRUD", () => {
  it("creates a build, marks it active, and reads it back", () => {
    const build = createBuild("Lightning Sorc", { stats: { str: 10 } }, "Sorceress");

    expect(build.id).toBeTruthy();
    expect(build.name).toBe("Lightning Sorc");
    expect(build.poeClass).toBe("Sorceress");
    expect(getActiveBuildId()).toBe(build.id);
    expect(getBuild(build.id)).toEqual(build);
    expect(getActiveBuild()?.id).toBe(build.id);
  });

  it("falls back to a default name when given only whitespace", () => {
    expect(createBuild("   ").name).toBe("Untitled Build");
  });

  it("lists builds newest-updated first", () => {
    const a = createBuild("A");
    const b = createBuild("B");
    // Touch A so it becomes the most-recently-updated.
    saveBuild(a.id, { name: "A2" });
    const ids = listBuilds().map((x) => x.id);
    expect(ids).toEqual([a.id, b.id]);
  });

  it("saveBuild patches name/class and bumps updatedAt without dropping data", () => {
    const build = createBuild("Old", { stats: { a: 1 } });
    const saved = saveBuild(build.id, { name: "New", poeClass: "Monk" });
    expect(saved?.name).toBe("New");
    expect(saved?.poeClass).toBe("Monk");
    // Untouched section survives a metadata-only patch.
    expect((saved?.data as { stats: unknown }).stats).toEqual({ a: 1 });
  });

  it("saveBuildSection merges one section without clobbering others", () => {
    const build = createBuild("Build", { stats: { a: 1 } });
    saveBuildSection(build.id, "skills", { gem: "Spark" });
    const after = getBuild(build.id)!;
    expect(after.data.stats).toEqual({ a: 1 });
    expect(after.data.skills).toEqual({ gem: "Spark" });
  });

  it("saveBuild returns null for an unknown id", () => {
    expect(saveBuild("does-not-exist", { name: "x" })).toBeNull();
  });

  it("deleteBuild removes the build and clears active id when it pointed at it", () => {
    const build = createBuild("Doomed");
    expect(getActiveBuildId()).toBe(build.id);
    deleteBuild(build.id);
    expect(getBuild(build.id)).toBeNull();
    expect(getActiveBuildId()).toBeNull();
  });

  it("upsertActiveBuild creates then updates the active build", () => {
    const first = upsertActiveBuild("stats", { str: 1 }, "My Build");
    expect(listBuilds()).toHaveLength(1);
    const second = upsertActiveBuild("skills", { gem: "Frost" });
    expect(second.id).toBe(first.id);
    expect(listBuilds()).toHaveLength(1);
    expect(second.data.stats).toEqual({ str: 1 });
    expect(second.data.skills).toEqual({ gem: "Frost" });
  });

  it("setActiveBuildId(null) clears the active pointer", () => {
    const build = createBuild("Build");
    setActiveBuildId(null);
    expect(getActiveBuildId()).toBeNull();
    expect(getActiveBuild()).toBeNull();
    // Build itself still exists.
    expect(getBuild(build.id)).not.toBeNull();
  });

  it("renameBuild updates the name and returns null for unknown ids", () => {
    const build = createBuild("Typo");
    expect(renameBuild(build.id, "Fixed")?.name).toBe("Fixed");
    expect(getBuild(build.id)?.name).toBe("Fixed");
    expect(renameBuild("nope", "x")).toBeNull();
  });

  it("duplicateBuild forks a deep, independent copy with a new id", () => {
    const original = createBuild("Frostbolt", { stats: { nested: { str: 1 } } }, "Sorceress");
    const copy = duplicateBuild(original.id)!;
    expect(copy.id).not.toBe(original.id);
    expect(copy.name).toBe("Frostbolt (copy)");
    expect(copy.poeClass).toBe("Sorceress");
    expect(copy.data).toEqual(original.data);
    // Deep clone: mutating the copy must not touch the original.
    (copy.data.stats as { nested: { str: number } }).nested.str = 99;
    saveBuild(copy.id, { data: copy.data });
    expect((getBuild(original.id)!.data.stats as { nested: { str: number } }).nested.str).toBe(1);
    expect(duplicateBuild("missing")).toBeNull();
  });

  it("readMap drops malformed entries so listBuilds only returns valid builds", () => {
    const good = createBuild("Good");
    // Inject a corrupt sibling entry directly into storage.
    const win = (globalThis as { window?: { localStorage: Storage } }).window!;
    const raw = JSON.parse(win.localStorage.getItem("poe2:builds")!);
    raw["corrupt"] = { id: "corrupt", name: 123, data: null }; // bad name + bad data
    raw["partial"] = { id: "partial" }; // missing name/updatedAt/data
    win.localStorage.setItem("poe2:builds", JSON.stringify(raw));

    const builds = listBuilds();
    expect(builds).toHaveLength(1);
    expect(builds[0].id).toBe(good.id);
    expect(getBuild("corrupt")).toBeNull();
  });
});

describe("share — encode/decode round-trip", () => {
  it("round-trips a build through token encode/decode", () => {
    const build = createBuild("Shared", { skills: { gem: "Spark" } }, "Witch");
    const token = encodeBuildToToken(build);
    const decoded = decodeTokenToBuild(token);
    expect(decoded?.name).toBe("Shared");
    expect(decoded?.poeClass).toBe("Witch");
    expect(decoded?.data).toEqual({ skills: { gem: "Spark" } });
  });

  it("importBuild from a decoded token creates a fresh, distinct id", () => {
    const original = createBuild("Orig", { stats: { a: 1 } }, "Monk");
    const decoded = decodeTokenToBuild(encodeBuildToToken(original))!;
    const imported = importBuild(decoded.name, decoded.data, decoded.poeClass);
    expect(imported.id).not.toBe(original.id);
    expect(imported.name).toBe("Orig");
    expect(imported.data).toEqual({ stats: { a: 1 } });
  });

  it("decodeTokenToBuild returns null for garbage tokens", () => {
    expect(decodeTokenToBuild("")).toBeNull();
    expect(decodeTokenToBuild("not-a-valid-lz-token!!!")).toBeNull();
  });

  it("decodeTokenToBuild rejects payloads whose `data` is not a plain object", () => {
    // These would otherwise white-screen section pages on `data[section]`.
    for (const data of [null, 42, "str", [1, 2, 3]]) {
      const token = compressToEncodedURIComponent(
        JSON.stringify({ v: BUILD_SCHEMA_VERSION, name: "x", data })
      );
      expect(decodeTokenToBuild(token)).toBeNull();
    }
  });

  it("decodeTokenToBuild rejects a non-string poeClass", () => {
    const token = compressToEncodedURIComponent(
      JSON.stringify({ v: BUILD_SCHEMA_VERSION, name: "x", poeClass: 7, data: {} })
    );
    expect(decodeTokenToBuild(token)).toBeNull();
  });

  it("decodeTokenToBuild rejects builds from a newer schema version", () => {
    const token = compressToEncodedURIComponent(
      JSON.stringify({ v: BUILD_SCHEMA_VERSION + 1, name: "future", data: {} })
    );
    expect(decodeTokenToBuild(token)).toBeNull();
  });

  it("decodeTokenToBuild rejects oversized tokens before decompressing", () => {
    expect(decodeTokenToBuild("a".repeat(MAX_SHARE_TOKEN_LENGTH + 1))).toBeNull();
  });

  it("buildShareUrl produces a hash token extractable back out", () => {
    const build = createBuild("Linked", { notes: "hi" });
    const url = buildShareUrl(build, "https://poe2.dev");
    expect(url.startsWith("https://poe2.dev/build-planner/import-export#b=")).toBe(true);
    const token = extractTokenFromLocation(url);
    expect(token).toBeTruthy();
    expect(decodeTokenToBuild(token!)?.name).toBe("Linked");
  });

  it("extractTokenFromLocation handles bare tokens and rejects URLs without a token", () => {
    const token = encodeBuildToToken(createBuild("Bare", {}));
    expect(extractTokenFromLocation(token)).toBe(token);
    // A URL/path (has separators) but no ?b=/#b= param yields no token.
    expect(extractTokenFromLocation("https://poe2.dev/build-planner")).toBeNull();
  });
});
