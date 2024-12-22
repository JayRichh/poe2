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
    // When implementing real API calls, use Next.js 15 fetch with caching:
    const res = await fetch('YOUR_API_ENDPOINT', {
      next: { 
        revalidate: 3600, // Cache for 1 hour
        tags: ['news']    // Tag for selective revalidation
      }
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch news');
    }
    
    return res.json();
  }

  // Method to force revalidate specific data
  static async revalidateNews() {
    try {
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tag: 'news'
        })
      });
    } catch (error) {
      console.error('Failed to revalidate:', error);
    }
  }
}
