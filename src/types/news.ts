export interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: 'Update' | 'Announcement' | 'Event' | 'Community';
  publishedAt: string;
  source: string;
  url: string;
}

export interface NewsCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
}
