import { NewsItem, PatchNote } from "~/types/news";
import { MOCK_NEWS, MOCK_PATCH_NOTES } from "~/data/mock-news";

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
        (news) => news.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (source) {
      filteredNews = filteredNews.filter(
        (news) => news.source.toLowerCase() === source.toLowerCase()
      );
    }

    if (timeRange) {
      const now = new Date();
      const days = parseInt(timeRange.replace('d', ''));
      const cutoff = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
      
      filteredNews = filteredNews.filter(
        (news) => new Date(news.publishedAt) >= cutoff
      );
    }

    return filteredNews;
  }

  static async getNewsById(id: string): Promise<NewsItem | null> {
    // Simulating API call with Next.js 15 fetch caching
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real implementation:
    // const res = await fetch(`YOUR_API_ENDPOINT/news/${id}`, {
    //   next: { 
    //     revalidate: 3600,
    //     tags: [`news-${id}`]
    //   }
    // });
    // if (!res.ok) return null;
    // return res.json();

    return MOCK_NEWS.find((news) => news.id === id) || null;
  }

  static async getCategories(): Promise<string[]> {
    // In a real implementation:
    // const res = await fetch('YOUR_API_ENDPOINT/news/categories', {
    //   next: { 
    //     revalidate: 3600,
    //     tags: ['news-categories']
    //   }
    // });
    // if (!res.ok) throw new Error('Failed to fetch categories');
    // return res.json();

    return Array.from(new Set(MOCK_NEWS.map((news) => news.category)));
  }

  static async getPatchNotes(): Promise<PatchNote[]> {
    // Simulating API call with Next.js 15 fetch caching
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real implementation:
    // const res = await fetch('YOUR_API_ENDPOINT/patch-notes', {
    //   next: { 
    //     revalidate: 3600,
    //     tags: ['patch-notes']
    //   }
    // });
    // if (!res.ok) throw new Error('Failed to fetch patch notes');
    // return res.json();

    return MOCK_PATCH_NOTES;
  }

  // Method to force revalidate specific data using Next.js 15 revalidateTag
  static async revalidateNews() {
    try {
      // In a real implementation:
      // await revalidateTag('news');
      // await revalidateTag('patch-notes');
      // await revalidateTag('news-categories');
      
      // For now, we're using the revalidate API route
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
