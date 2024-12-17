import { NewsItem } from "~/types/news";

// This will be replaced with actual API calls later
const MOCK_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "Path of Exile 2 Beta Weekend Announced",
    description: "Join us for an exclusive beta test of Path of Exile 2 this weekend. Test new features and provide feedback.",
    category: "Event",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    source: "Official",
    url: "https://www.pathofexile.com/news/beta-weekend"
  },
  {
    id: "2",
    title: "Latest Development Update",
    description: "Check out the latest changes and improvements coming to Path of Exile 2, including new skills and balance changes.",
    category: "Update",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    source: "Official",
    url: "https://www.pathofexile.com/news/dev-update"
  },
  {
    id: "3",
    title: "Community Event: Build Competition",
    description: "Showcase your best builds and compete for prizes in our community build competition.",
    category: "Community",
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    source: "Community",
    url: "https://www.pathofexile.com/forum/build-competition"
  }
];

export class NewsService {
  static async getLatestNews(category?: string): Promise<NewsItem[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (category) {
      return MOCK_NEWS.filter(news => news.category.toLowerCase() === category.toLowerCase());
    }
    
    return MOCK_NEWS;
  }

  static async getNewsById(id: string): Promise<NewsItem | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return MOCK_NEWS.find(news => news.id === id) || null;
  }

  static async getCategories(): Promise<string[]> {
    return Array.from(new Set(MOCK_NEWS.map(news => news.category)));
  }

  // This will be implemented later to fetch from real sources
  private static async fetchFromSources() {
    // TODO: Implement fetching from:
    // - Official POE2 RSS/API
    // - Reddit API
    // - Community forums
    // - Twitter/X API
    throw new Error("Not implemented");
  }
}
