import { NewsItem, PatchNote } from "@/types/news";
import { MOCK_NEWS, MOCK_PATCH_NOTES } from "~/data/mock-news";

export class NewsService {
  static async getLatestNews(category?: string): Promise<NewsItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (category) {
      return MOCK_NEWS.filter((news) => news.category.toLowerCase() === category.toLowerCase());
    }

    return MOCK_NEWS;
  }

  static async getNewsById(id: string): Promise<NewsItem | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_NEWS.find((news) => news.id === id) || null;
  }

  static async getCategories(): Promise<string[]> {
    return Array.from(new Set(MOCK_NEWS.map((news) => news.category)));
  }

  static async getPatchNotes(): Promise<PatchNote[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return MOCK_PATCH_NOTES;
  }

  private static async fetchFromSources() {
    throw new Error("Not implemented");
  }
}
