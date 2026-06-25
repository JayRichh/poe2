import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";

import { BUILD_SCHEMA_VERSION, type PlannerBuild, type SharedBuild } from "./types";

/** Query/hash param key used for shared builds. */
export const SHARE_PARAM = "b";

/**
 * Encode a build into a URL-safe, lz-string-compressed token. Only the portable
 * fields (name, class, section data) are included — ids/timestamps are
 * regenerated on import.
 */
export function encodeBuildToToken(build: Pick<PlannerBuild, "name" | "poeClass" | "data">): string {
  const payload: SharedBuild = {
    v: BUILD_SCHEMA_VERSION,
    name: build.name,
    poeClass: build.poeClass,
    data: build.data,
  };
  return compressToEncodedURIComponent(JSON.stringify(payload));
}

/** Decode a share token back into a SharedBuild, or null if invalid. */
export function decodeTokenToBuild(token: string): SharedBuild | null {
  if (!token) return null;
  try {
    const json = decompressFromEncodedURIComponent(token);
    if (!json) return null;
    const parsed = JSON.parse(json) as SharedBuild;
    if (!parsed || typeof parsed !== "object" || typeof parsed.name !== "string") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Build a full shareable URL for the import-export page that round-trips through
 * `decodeTokenToBuild`. Uses a hash param so the token never hits the server /
 * access logs.
 */
export function buildShareUrl(
  build: Pick<PlannerBuild, "name" | "poeClass" | "data">,
  origin?: string
): string {
  const token = encodeBuildToToken(build);
  const base =
    origin ?? (typeof window !== "undefined" ? window.location.origin : "https://poe2.dev");
  return `${base}/build-planner/import-export#${SHARE_PARAM}=${token}`;
}

/** Extract a share token from a URL hash or query string. */
export function extractTokenFromLocation(input: string): string | null {
  if (!input) return null;
  // Accept a full URL, a hash fragment, a query string, or a bare token.
  const tryParams = (s: string): string | null => {
    const params = new URLSearchParams(s.replace(/^[#?]/, ""));
    return params.get(SHARE_PARAM);
  };

  if (input.includes("#")) {
    const hash = input.slice(input.indexOf("#"));
    const fromHash = tryParams(hash);
    if (fromHash) return fromHash;
  }
  if (input.includes("?")) {
    const query = input.slice(input.indexOf("?"), input.includes("#") ? input.indexOf("#") : undefined);
    const fromQuery = tryParams(query);
    if (fromQuery) return fromQuery;
  }
  // Bare token (no separators).
  if (!/[#?=/]/.test(input.trim())) return input.trim();
  return null;
}
