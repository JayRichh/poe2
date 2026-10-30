import { describe, expect, it } from "vitest";

import {
  COLLECTION_LAST_MODIFIED,
  PAGE_LAST_MODIFIED,
  getContentLastModified,
} from "./content-dates";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("content dates", () => {
  it("uses the configured per-page date for static routes", () => {
    for (const [path, date] of Object.entries(PAGE_LAST_MODIFIED)) {
      expect(getContentLastModified(path).toISOString()).toBe(`${date}T00:00:00.000Z`);
    }
  });

  it("uses the collection date for generated detail routes", () => {
    for (const [prefix, date] of Object.entries(COLLECTION_LAST_MODIFIED)) {
      expect(getContentLastModified(`${prefix}example`).toISOString()).toBe(
        `${date}T00:00:00.000Z`
      );
    }
  });

  it("fails loudly for a route with no configured date", () => {
    expect(() => getContentLastModified("/unknown")).toThrow(/No content date configured/);
  });

  it("keeps every configured date as a valid calendar date", () => {
    const dates = [
      ...Object.values(PAGE_LAST_MODIFIED),
      ...Object.values(COLLECTION_LAST_MODIFIED),
    ];

    for (const value of dates) {
      expect(value).toMatch(ISO_DATE);
      expect(Number.isNaN(new Date(`${value}T00:00:00.000Z`).getTime())).toBe(false);
    }
  });
});
