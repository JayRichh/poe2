/**
 * Real content dates for sitemap entries.
 *
 * `<lastmod>` is a promise to crawlers that a page actually changed. Deriving
 * it from the build clock makes every deploy look like a site-wide content
 * update, so keep these dates explicit instead. Bump the matching entry when
 * you change that page's content, and add an entry when you add a route — the
 * content-dates tests catch missing or invalid dates in CI.
 *
 * News routes are resolved from the article publish dates in the sitemap; the
 * dates below are only their fallback when the feed is empty.
 */
export const PAGE_LAST_MODIFIED = {
  "/": "2026-10-30",
  "/build-planner/equipment": "2026-06-26",
  "/build-planner/skills": "2026-06-26",
  "/build-planner/stats": "2026-06-26",
  "/build-planner/notes": "2026-06-26",
  "/build-planner/import-export": "2026-06-26",
  "/calculators": "2026-10-30",
  "/calculators/dps": "2026-10-30",
  "/calculators/speed": "2026-10-30",
  "/calculators/currency": "2026-10-30",
  "/builds": "2026-10-30",
  "/skill-tree": "2026-10-30",
  "/news": "2026-10-28",
  "/news/patch-notes": "2026-10-28",
  "/guides": "2026-06-25",
  "/mechanics": "2026-10-30",
  "/ascendancies": "2026-06-25",
  "/privacy": "2026-10-30",
  "/terms": "2026-10-30",
} as const;

/**
 * Generated detail routes share the date of the data file that feeds them.
 * Prefixes end in "/" so they never shadow the index route above.
 */
export const COLLECTION_LAST_MODIFIED = {
  "/mechanics/": "2026-10-30",
  "/guides/": "2026-06-25",
  "/ascendancies/": "2026-06-25",
} as const;

/** Parse a calendar date at UTC midnight; omit invalid configuration. */
function toUtcDate(value: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const date = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    return undefined;
  }
  return date;
}

/** Resolve a route path to its real last-content-change date (UTC midnight). */
export function getContentLastModified(path: string): Date | undefined {
  const pageDate = PAGE_LAST_MODIFIED[path as keyof typeof PAGE_LAST_MODIFIED];
  if (pageDate) return toUtcDate(pageDate);

  const collection = Object.entries(COLLECTION_LAST_MODIFIED).find(([prefix]) =>
    path.startsWith(prefix)
  );
  if (collection) return toUtcDate(collection[1]);

  return undefined;
}
