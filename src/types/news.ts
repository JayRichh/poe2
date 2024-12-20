export interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: 'Update' | 'Announcement' | 'Event' | 'Community' | 'Patch Notes';
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

export interface PatchNote {
  version: string;
  date: string;
  sections: {
    title: string;
    changes: string[];
  }[];
  hotfixes?: {
    version: string;
    date: string;
    changes: string[];
  }[];
}
