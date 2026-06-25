"use client";

import {
  BUILD_SCHEMA_VERSION,
  type PlannerBuild,
  type PlannerBuildData,
} from "./types";

// localStorage keys.
const BUILDS_KEY = "poe2:builds"; // Record<id, PlannerBuild>
const ACTIVE_BUILD_KEY = "poe2:active-build-id";

type BuildMap = Record<string, PlannerBuild>;

function isBrowser(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

function generateId(): string {
  if (isBrowser() && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `build_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function readMap(): BuildMap {
  if (!isBrowser()) return {};
  try {
    const raw = window.localStorage.getItem(BUILDS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as BuildMap;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writeMap(map: BuildMap): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(BUILDS_KEY, JSON.stringify(map));
    return true;
  } catch (error) {
    // Quota exceeded / Safari private mode / storage disabled — fail soft.
    console.warn("Could not save builds (storage full or unavailable):", error);
    return false;
  }
}

/** List all saved builds, newest-updated first. */
export function listBuilds(): PlannerBuild[] {
  return Object.values(readMap()).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

/** Read a single build by id. */
export function getBuild(id: string): PlannerBuild | null {
  return readMap()[id] ?? null;
}

/**
 * Create a new named build (optionally seeded with section data) and mark it
 * active. Returns the created build.
 */
export function createBuild(
  name: string,
  data: PlannerBuildData = {},
  poeClass?: string
): PlannerBuild {
  const now = new Date().toISOString();
  const build: PlannerBuild = {
    id: generateId(),
    name: name.trim() || "Untitled Build",
    poeClass,
    version: BUILD_SCHEMA_VERSION,
    createdAt: now,
    updatedAt: now,
    data,
  };
  const map = readMap();
  map[build.id] = build;
  writeMap(map);
  setActiveBuildId(build.id);
  return build;
}

/**
 * Persist changes to an existing build (full or partial). Updates `updatedAt`.
 * Returns the saved build, or null if the id does not exist.
 */
export function saveBuild(
  id: string,
  patch: Partial<Pick<PlannerBuild, "name" | "poeClass">> & { data?: PlannerBuildData }
): PlannerBuild | null {
  const map = readMap();
  const existing = map[id];
  if (!existing) return null;
  const updated: PlannerBuild = {
    ...existing,
    ...(patch.name !== undefined ? { name: patch.name.trim() || existing.name } : {}),
    ...(patch.poeClass !== undefined ? { poeClass: patch.poeClass } : {}),
    data: patch.data ? { ...existing.data, ...patch.data } : existing.data,
    updatedAt: new Date().toISOString(),
  };
  map[id] = updated;
  writeMap(map);
  return updated;
}

/** Convenience: update a single section of a build's data. */
export function saveBuildSection<K extends keyof PlannerBuildData>(
  id: string,
  section: K,
  value: PlannerBuildData[K]
): PlannerBuild | null {
  return saveBuild(id, { data: { [section]: value } as PlannerBuildData });
}

/**
 * Upsert: save into the active build, creating one if none exists. Useful for a
 * one-click "Save" that does not force the user to name a build first.
 */
export function upsertActiveBuild(
  section: keyof PlannerBuildData,
  value: unknown,
  fallbackName = "My Build"
): PlannerBuild {
  const activeId = getActiveBuildId();
  if (activeId && getBuild(activeId)) {
    return saveBuildSection(activeId, section, value as never)!;
  }
  return createBuild(fallbackName, { [section]: value } as PlannerBuildData);
}

/** Delete a build by id. Clears active id if it pointed at the deleted build. */
export function deleteBuild(id: string): void {
  const map = readMap();
  if (!map[id]) return;
  delete map[id];
  writeMap(map);
  if (getActiveBuildId() === id) {
    setActiveBuildId(null);
  }
}

/** Import a build (e.g. from JSON/URL) as a brand-new saved + active build. */
export function importBuild(
  name: string,
  data: PlannerBuildData,
  poeClass?: string
): PlannerBuild {
  return createBuild(name, data, poeClass);
}

export function getActiveBuildId(): string | null {
  if (!isBrowser()) return null;
  return window.localStorage.getItem(ACTIVE_BUILD_KEY);
}

export function setActiveBuildId(id: string | null): void {
  if (!isBrowser()) return;
  try {
    if (id) {
      window.localStorage.setItem(ACTIVE_BUILD_KEY, id);
    } else {
      window.localStorage.removeItem(ACTIVE_BUILD_KEY);
    }
  } catch (error) {
    console.warn("Could not update active build id:", error);
  }
}

export function getActiveBuild(): PlannerBuild | null {
  const id = getActiveBuildId();
  return id ? getBuild(id) : null;
}
