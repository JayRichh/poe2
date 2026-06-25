import { generateSlug } from "~/utils/slug";

import type { NewsPost, NewsQueryParams, PaginatedResponse } from "~/types/news";

export interface MajorVersionGroup {
  /** Major.minor version label, e.g. "0.5.0". "0.1.x" groups all 0.1 hotfixes. */
  version: string;
  /** League / update codename, when known. */
  codename?: string;
  /** Newest post date within the group (ISO-parseable string). */
  latestDate: string;
  posts: NewsPost[];
}

/**
 * Known major-version codenames, keyed by the `0.x` series.
 * Sourced from docs/poe2-2026-reference.md section 1.
 */
const VERSION_CODENAMES: Record<string, string> = {
  "0.5": "Return of the Ancients",
  "0.4": "The Last of the Druids",
  "0.3": "The Third Edict",
  "0.2": "Dawn of the Hunt",
  "0.1": "Early Access",
};

/**
 * Derive the `0.x` major-version series from a post title, e.g.
 * "0.5.0 Patch Notes - ..." -> "0.5", "0.1.1e Hotfix" -> "0.1".
 * Returns "Other" when no version number can be parsed.
 */
export function getMajorVersion(title: string): string {
  const match = title.match(/\b(\d+)\.(\d+)/);
  return match ? `${match[1]}.${match[2]}` : "Other";
}

function sanitizeForPreview(html: string): string {
  if (!html) return "";

  // First remove the version number header (h3 tag)
  html = html.replace(/<h3>[^<]*<\/h3>/, "");

  // Convert <br> and </li> to newlines for better text separation
  html = html.replace(/<br\s*\/?>/g, "\n").replace(/<\/li>/g, "\n");

  // Remove all other HTML tags but keep text content
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  // Decode HTML entities
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function getFirstParagraph(content: string): string {
  if (!content) return "";

  const text = sanitizeForPreview(content);

  // Split by newlines and get first meaningful content
  const lines = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => {
      // Skip empty lines and version numbers
      if (!line || line.match(/^\d+(\.\d+)*[a-z]?\s*(Hotfix|Update|Patch)\s*\d*$/i)) {
        return false;
      }
      // Skip category headers
      if (line.match(/^(General Improvements|Bug Fixes|Balance Changes|Improvements)/i)) {
        return false;
      }
      return true;
    });

  return lines[0] || "";
}

function removeDuplicateImages(content: string, imageUrl: string | undefined): string {
  if (!imageUrl || !content) return content;

  // Remove any img tags that have the same src as imageUrl
  const escapedImageUrl = imageUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const imgRegex = new RegExp(`<img[^>]*src=["']${escapedImageUrl}["'][^>]*>`, "gi");
  return content.replace(imgRegex, "");
}

function processNewsContent(news: NewsPost): NewsPost {
  return {
    ...news,
    processedContent: getFirstParagraph(news.content),
    fullContent: removeDuplicateImages(news.content, news.imageUrl),
  };
}

export class NewsService {
  static async getLatestNews(params: NewsQueryParams = {}): Promise<PaginatedResponse<NewsPost>> {
    const { page = 1, itemsPerPage = 10, category, source, timeRange, type } = params;

    let allNews = await this.getAllNews();

    // Sort by date (newest first) up front so the time-window filter can be
    // measured relative to the newest available entry rather than wall-clock now.
    allNews = allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Apply filters.
    // The time-window filter is DATA-RELATIVE: it measures back from the most
    // recent entry, not from `Date.now()`. Because the content is a dated
    // archive (latest entry can be months/years old), a wall-clock window would
    // silently hide everything. Anchoring to the newest entry keeps "Last 7/30
    // days" meaningful for an archive.
    if (timeRange && allNews.length > 0) {
      const days = parseInt(timeRange.replace("d", ""));
      if (!Number.isNaN(days) && days > 0) {
        const anchor = new Date(allNews[0].date).getTime();
        const cutoff = anchor - days * 24 * 60 * 60 * 1000;
        allNews = allNews.filter((news) => new Date(news.date).getTime() >= cutoff);
      }
    }

    if (type) {
      allNews = allNews.filter((news) => news.type === type);
    }

    // Calculate pagination
    const totalItems = allNews.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get paginated items and process content
    const paginatedItems = allNews
      .slice(startIndex, endIndex)
      .map((post) => processNewsContent(post));

    return {
      items: paginatedItems,
      metadata: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage,
      },
    };
  }

  static async getNewsById(idOrSlug: string): Promise<NewsPost | null> {
    try {
      const allNews = await this.getAllNews();

      // Try to find by ID first
      let newsItem = allNews.find((news) => news.id === idOrSlug);

      // If not found by ID, try slug
      if (!newsItem) {
        newsItem = allNews.find((news) => news.slug === idOrSlug);
      }

      return newsItem ? processNewsContent(newsItem) : null;
    } catch (error) {
      console.error("Error getting news by ID:", error);
      return null;
    }
  }

  private static ensureNewsSlug(news: NewsPost): NewsPost {
    if (!news.slug) {
      news.slug = generateSlug(news.title);
    }
    return news;
  }

  static getNewsUrl(news: NewsPost): string {
    const ensuredNews = this.ensureNewsSlug(news);
    if (ensuredNews.type === "patch-note") {
      return `/news/patch-notes/${ensuredNews.slug}`;
    }
    return `/news/${ensuredNews.slug}`;
  }

  static async getCategories(): Promise<string[]> {
    return ["Announcements", "Patch Notes"];
  }

  static async getPatchNotes(params: NewsQueryParams = {}): Promise<PaginatedResponse<NewsPost>> {
    try {
      const { page = 1, itemsPerPage = 10 } = params;
      let data: NewsPost[] = [];

      // Server-side: Use Node's fs module
      if (typeof window === "undefined") {
        const fs = require("fs");
        const path = require("path");
        const filePath = path.join(process.cwd(), "public", "data", "patch-notes.json");
        data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      } else {
        // Client-side: Use fetch with cache-busting
        const response = await fetch(`/data/patch-notes.json?_=${Date.now()}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch patch notes (${response.status})`);
        }
        data = await response.json();
      }

      // Ensure type is set
      data = data.map((item) => ({ ...item, type: "patch-note" }));

      // Sort by date
      data = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      // Calculate pagination
      const totalItems = data.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // Get paginated items and process content
      const paginatedItems = data
        .slice(startIndex, endIndex)
        .map((post) => this.ensureNewsSlug(post))
        .map((post) => processNewsContent(post));

      return {
        items: paginatedItems,
        metadata: {
          currentPage: page,
          totalPages,
          totalItems,
          itemsPerPage,
        },
      };
    } catch (error) {
      console.error("Error loading patch notes:", error);
      return {
        items: [],
        metadata: {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: params.itemsPerPage || 10,
        },
      };
    }
  }

  static async getAnnouncements(
    params: NewsQueryParams = {}
  ): Promise<PaginatedResponse<NewsPost>> {
    try {
      const { page = 1, itemsPerPage = 10 } = params;
      let data: NewsPost[] = [];

      // Server-side: Use Node's fs module
      if (typeof window === "undefined") {
        const fs = require("fs");
        const path = require("path");
        const filePath = path.join(process.cwd(), "public", "data", "announcements.json");
        data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      } else {
        // Client-side: Use fetch
        const response = await fetch(`/data/announcements.json?_=${Date.now()}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch announcements (${response.status})`);
        }
        data = await response.json();
      }

      // Ensure type is set
      data = data.map((item) => ({ ...item, type: "announcement" }));

      // Sort by date
      data = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      // Calculate pagination
      const totalItems = data.length;
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      // Get paginated items and process content
      const paginatedItems = data
        .slice(startIndex, endIndex)
        .map((post) => this.ensureNewsSlug(post))
        .map((post) => processNewsContent(post));

      return {
        items: paginatedItems,
        metadata: {
          currentPage: page,
          totalPages,
          totalItems,
          itemsPerPage,
        },
      };
    } catch (error) {
      console.error("Error loading announcements:", error);
      return {
        items: [],
        metadata: {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          itemsPerPage: params.itemsPerPage || 10,
        },
      };
    }
  }

  static async getAllNews(): Promise<NewsPost[]> {
    try {
      // Get both patch notes and announcements
      const [patchNotes, announcements] = await Promise.all([
        this.getPatchNotes({ itemsPerPage: Number.MAX_SAFE_INTEGER }),
        this.getAnnouncements({ itemsPerPage: Number.MAX_SAFE_INTEGER }),
      ]);

      // Combine, sort, and process all news
      const allNews = [...patchNotes.items, ...announcements.items]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((post) => processNewsContent(post));

      return allNews;
    } catch (error) {
      console.error("Error loading all news:", error);
      return [];
    }
  }

  /**
   * The date of the most recent news/patch-note entry, for honest
   * "Latest update (as of ...)" labelling. Returns null when there is no data.
   */
  static async getDataAsOf(): Promise<string | null> {
    const all = await this.getAllNews();
    if (all.length === 0) return null;
    // getAllNews already returns newest-first.
    return all[0].date;
  }

  /**
   * Group patch notes by major `0.x` version (newest first), attaching the
   * known league/update codename. Powers the major-update timeline on /news.
   */
  static async getMajorVersionGroups(): Promise<MajorVersionGroup[]> {
    const { items } = await this.getPatchNotes({ itemsPerPage: Number.MAX_SAFE_INTEGER });

    const byVersion = new Map<string, NewsPost[]>();
    for (const post of items) {
      const version = getMajorVersion(post.title);
      const bucket = byVersion.get(version);
      if (bucket) {
        bucket.push(post);
      } else {
        byVersion.set(version, [post]);
      }
    }

    const groups: MajorVersionGroup[] = Array.from(byVersion.entries()).map(([version, posts]) => {
      const sorted = [...posts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return {
        version,
        codename: VERSION_CODENAMES[version],
        latestDate: sorted[0]?.date ?? "",
        posts: sorted,
      };
    });

    // Newest version series first.
    return groups.sort((a, b) => new Date(b.latestDate).getTime() - new Date(a.latestDate).getTime());
  }
}
