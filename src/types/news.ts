export interface NewsItem {
  id: string;
  title: string;
  slug: string; // Required for consistent URL handling
  description?: string;
  category?: string;
  publishedAt?: string;
  source?: string;
  url?: string;
  date?: string;
  content?: string | string[];
  type?: "news" | "patch" | "announcement";
  redirectToSlug?: boolean; // Used internally for handling ID-based URLs
}

export interface PatchNoteSection {
  title: string;
  changes: string[];
}

export interface PatchNoteHotfix {
  version: string;
  date: string;
  changes: string[];
}

export interface PatchNote {
  version: string;
  date: string;
  sections?: PatchNoteSection[];
  hotfixes?: PatchNoteHotfix[];
  content?: string[];
  author?: string;
  lastBumped?: string;
  url?: string;
}
