// Accountless build-planner data model.
//
// The planner is fully client-side: builds live in localStorage and can be
// shared via an lz-string-compressed URL hash. Each "build" is a snapshot of the
// individual planner sections (equipment, skills, stats, notes). Sections are
// stored as opaque JSON payloads so each page owns its own shape and this model
// stays stable as pages evolve.

export const BUILD_SCHEMA_VERSION = 1;

export interface PlannerBuildData {
  /** Equipment page state (selected slots, inventory, etc.). */
  equipment?: unknown;
  /** Skills page state (gem slots, groups). */
  skills?: unknown;
  /** Stats page state (attribute allocation). */
  stats?: unknown;
  /** Notes page sections (markdown + diagrams). */
  notes?: unknown;
}

export interface PlannerBuild {
  /** Stable id (uuid-ish). */
  id: string;
  /** User-facing build name. */
  name: string;
  /** Optional PoE2 class label. */
  poeClass?: string;
  /** Schema version for forward-compat migrations. */
  version: number;
  createdAt: string;
  updatedAt: string;
  data: PlannerBuildData;
}

/** Shape persisted into a shareable URL (kept minimal before compression). */
export interface SharedBuild {
  v: number;
  name: string;
  poeClass?: string;
  data: PlannerBuildData;
}

/** Narrow an unknown value to a plain (non-array) object. Used to validate
 *  untrusted payloads from share tokens and localStorage before we trust them. */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
