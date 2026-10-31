import { afterEach, describe, expect, it, vi } from "vitest";

import sitemap from "~/app/sitemap";
import * as contentDates from "~/config/content-dates";
import { NewsService } from "~/services/news-service";

import {
  COLLECTION_LAST_MODIFIED,
  PAGE_LAST_MODIFIED,
  getContentLastModified,
} from "./content-dates";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

describe("content dates", () => {
  afterEach(() => vi.restoreAllMocks());

  it("uses the configured per-page date for static routes", () => {
    for (const [path, date] of Object.entries(PAGE_LAST_MODIFIED)) {
      expect(getContentLastModified(path)?.toISOString()).toBe(`${date}T00:00:00.000Z`);
    }
  });

  it("uses the collection date for generated detail routes", () => {
    for (const [prefix, date] of Object.entries(COLLECTION_LAST_MODIFIED)) {
      expect(getContentLastModified(`${prefix}example`)?.toISOString()).toBe(
        `${date}T00:00:00.000Z`
      );
    }
  });

  it("returns undefined for a route with no configured date", () => {
    expect(getContentLastModified("/unknown")).toBeUndefined();
  });

  it.each(["invalid", "2026-02-30", "2026-13-01"])(
    "returns undefined for an invalid configured date: %s",
    (value) => {
      vi.spyOn(PAGE_LAST_MODIFIED, "/", "get").mockReturnValue(value as "2026-10-30");
      expect(getContentLastModified("/")).toBeUndefined();
    }
  );

  it("gives every sitemap route a valid date", async () => {
    const entries = await sitemap();
    expect(entries.length).toBeGreaterThan(0);
    for (const entry of entries) {
      expect(entry.lastModified, entry.url).toBeInstanceOf(Date);
      expect(Number.isNaN(new Date(entry.lastModified!).getTime()), entry.url).toBe(false);
    }
  });

  it("configures dates for every non-article route even when the news feed is empty", async () => {
    vi.spyOn(NewsService, "getAllNews").mockResolvedValue([]);
    for (const entry of await sitemap()) {
      const path = new URL(entry.url).pathname;
      expect(getContentLastModified(path), path).toBeInstanceOf(Date);
    }
  });

  it("omits lastModified when no date is available without failing sitemap generation", async () => {
    vi.spyOn(contentDates, "getContentLastModified").mockReturnValue(undefined);
    vi.spyOn(NewsService, "getAllNews").mockResolvedValue([
      {
        id: "undated",
        slug: "undated",
        title: "Undated article",
        url: "https://example.test/news/undated",
        author: "Test author",
        content: "",
        date: "invalid",
        type: "announcement",
      },
    ]);
    const entries = await sitemap();
    expect(entries.some((entry) => entry.url.endsWith("/news/undated"))).toBe(true);
    for (const entry of entries) {
      expect(entry).not.toHaveProperty("lastModified");
    }
  });

  it("keeps every configured date as a valid calendar date", () => {
    const dates = [
      ...Object.values(PAGE_LAST_MODIFIED),
      ...Object.values(COLLECTION_LAST_MODIFIED),
    ];

    for (const value of dates) {
      expect(value).toMatch(ISO_DATE);
      expect(new Date(`${value}T00:00:00.000Z`).toISOString().slice(0, 10)).toBe(value);
    }
  });
});
