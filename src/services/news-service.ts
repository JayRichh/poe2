import { generateSlug } from "~/utils/slug";

import type { NewsPost, NewsQueryParams, PaginatedResponse } from "~/types/news";

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

    // Apply filters
    if (timeRange) {
      const now = new Date();
      const days = parseInt(timeRange.replace("d", ""));
      const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

      allNews = allNews.filter((news) => {
        const newsDate = new Date(news.date);
        return newsDate >= cutoff;
      });
    }

    if (type) {
      allNews = allNews.filter((news) => news.type === type);
    }

    // Sort by date
    allNews = allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
}
