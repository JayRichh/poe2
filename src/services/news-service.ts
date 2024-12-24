import { MOCK_NEWS, MOCK_PATCH_NOTES } from "~/data/mock-news";
import type { NewsItem, PatchNote } from "~/types/news";

export class NewsService {
  static async getLatestNews(
    category?: string,
    source?: string,
    timeRange?: string
  ): Promise<NewsItem[]> {
    // Simulating API call with Next.js 15 fetch caching
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let filteredNews = MOCK_NEWS;

    if (category) {
      filteredNews = filteredNews.filter(
        (news) => news.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (source) {
      filteredNews = filteredNews.filter(
        (news) => news.source?.toLowerCase() === source.toLowerCase()
      );
    }

    if (timeRange) {
      const now = new Date();
      const days = parseInt(timeRange.replace("d", ""));
      const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

      filteredNews = filteredNews.filter((news) => {
        const newsDate = news.publishedAt ? new Date(news.publishedAt) : null;
        return newsDate ? newsDate >= cutoff : false;
      });
    }

    return filteredNews;
  }

  static async getNewsById(id: string): Promise<NewsItem | null> {
    try {
      // First try to find in regular news
      const newsItem = MOCK_NEWS.find((news) => news.id === id);
      if (newsItem) return newsItem;

      // If not found in regular news, try patch notes
      const patchNotes = await this.getPatchNotes();
      const patchNote = patchNotes.find((note) => {
        // Normalize the ID from the URL or version number
        const normalizedId = this.normalizePatchNoteId(note);
        return normalizedId === id;
      });

      if (patchNote) {
        return this.convertPatchNoteToNewsItem(patchNote);
      }

      return null;
    } catch (error) {
      console.error("Error getting news by ID:", error);
      return null;
    }
  }

  private static normalizePatchNoteId(note: PatchNote): string {
    // If URL exists, use its last segment
    if (note.url) {
      const urlSegments = note.url.split("/");
      const lastSegment = urlSegments[urlSegments.length - 1];
      if (lastSegment) return lastSegment;
    }

    // Otherwise normalize the version number
    return note.version
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }

  private static convertPatchNoteToNewsItem(note: PatchNote): NewsItem {
    return {
      id: this.normalizePatchNoteId(note),
      title: `Version ${note.version}`,
      date: note.date,
      description: note.content?.[0] || "",
      category: "Patch Notes",
      publishedAt: note.date,
      source: "Official",
      url: note.url,
      content: note.content,
      type: "patch" as const,
    };
  }

  static async getCategories(): Promise<string[]> {
    // Simulating API call with Next.js 15 fetch caching
    await new Promise((resolve) => setTimeout(resolve, 500));

    return Array.from(
      new Set(
        MOCK_NEWS.map((news) => news.category).filter(
          (category): category is string => category !== undefined
        )
      )
    );
  }

  static async getPatchNotes(): Promise<PatchNote[]> {
    try {
      // Server-side: Use Node's fs module
      if (typeof window === "undefined") {
        const fs = require("fs");
        const path = require("path");
        const filePath = path.join(process.cwd(), "public", "data", "patch-notes.json");
        const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
        return data;
      }

      // Client-side: Use fetch
      const response = await fetch("/data/patch-notes.json");
      if (!response.ok) {
        throw new Error(`Failed to fetch patch notes (${response.status})`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error loading patch notes:", error);
      return MOCK_PATCH_NOTES;
    }
  }

  static async getAllNews(): Promise<NewsItem[]> {
    const [news, patchNotes] = await Promise.all([
      Promise.resolve(MOCK_NEWS),
      this.getPatchNotes(),
    ]);

    const patchNewsItems = patchNotes.map((note) => {
      // Use URL ID if available, otherwise use version as ID
      const id = note.url?.split("/").pop() || note.version.replace(/\s+/g, "-").toLowerCase();

      return {
        id,
        title: `Version ${note.version}`,
        date: note.date,
        description: `Patch ${note.version} - ${note.sections?.[0]?.changes[0] || note.content?.[0] || ""}`,
        category: "Patch Notes",
        publishedAt: note.date,
        source: "Official",
        url: note.url,
        content: note.content,
        type: "patch" as const,
      };
    });

    return [...news, ...patchNewsItems].sort((a, b) => {
      const dateA = new Date(a.publishedAt || a.date || 0).getTime();
      const dateB = new Date(b.publishedAt || b.date || 0).getTime();
      return dateB - dateA;
    });
  }
}
