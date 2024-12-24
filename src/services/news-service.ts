import { MOCK_NEWS, MOCK_PATCH_NOTES } from "~/data/mock-news";
import type { NewsItem, PatchNote } from "~/types/news";
import { generateSlug } from "~/utils/slug";

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

  static async getNewsById(idOrSlug: string): Promise<NewsItem | null> {
    try {
      // First try to find by slug in regular news
      let newsItem = MOCK_NEWS.find((news) => news.slug === idOrSlug);
      
      // If not found by slug, try to find by ID (legacy support)
      if (!newsItem) {
        newsItem = MOCK_NEWS.find((news) => news.id === idOrSlug);
      }
      
      if (newsItem) return newsItem;

      // If not found in regular news, try patch notes
      const patchNotes = await this.getPatchNotes();
      const patchNote = patchNotes.find((note) => {
        // Try both ID and slug match
        const id = this.extractPatchNoteId(note);
        const slug = this.generatePatchNoteSlug(note);
        return id === idOrSlug || slug === idOrSlug;
      });

      if (patchNote) {
        const newsItem = this.convertPatchNoteToNewsItem(patchNote);
        // If accessed by ID, ensure we're using the slug
        if (idOrSlug === this.extractPatchNoteId(patchNote)) {
          newsItem.redirectToSlug = true;
        }
        return newsItem;
      }

      return null;
    } catch (error) {
      console.error("Error getting news by ID:", error);
      return null;
    }
  }

  private static ensureNewsSlug(news: NewsItem): NewsItem {
    if (!news.slug) {
      news.slug = generateSlug(news.title);
    }
    return news;
  }

  private static generatePatchNoteSlug(note: PatchNote): string {
    const title = `Patch Notes ${note.version}`;
    return generateSlug(title);
  }

  private static ensurePatchNoteSlug(note: PatchNote): string {
    return this.generatePatchNoteSlug(note);
  }

  private static extractPatchNoteId(note: PatchNote): string {
    if (note.url) {
      // Extract numeric ID from URL (e.g., "view-thread/3650268" -> "3650268")
      const match = note.url.match(/\/(\d+)(?:\/|$)/);
      if (match) return match[1];
    }
    return generateSlug(note.version);
  }

  static getNewsUrl(news: NewsItem): string {
    const ensuredNews = this.ensureNewsSlug(news);
    if (ensuredNews.type === "patch") {
      return `/news/patch-notes/${ensuredNews.slug}`;
    }
    return `/news/${ensuredNews.slug}`;
  }

  static getPatchNoteUrl(note: PatchNote): string {
    return `/news/patch-notes/${this.ensurePatchNoteSlug(note)}`;
  }

  private static convertPatchNoteToNewsItem(note: PatchNote): NewsItem {
    const id = this.extractPatchNoteId(note);
    const slug = this.generatePatchNoteSlug(note);
    
    return {
      id,
      slug,
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
      const id = this.extractPatchNoteId(note);
      const slug = this.generatePatchNoteSlug(note);

      return {
        id,
        slug,
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
