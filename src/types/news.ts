export interface NewsPost {
  id: string;
  title: string;
  date: string;
  url: string;
  content: string;
  author: string;
  lastBumped?: string;
  replies?: number;
  lastReplyBy?: string;
  lastReplyDate?: string;
  type: 'announcement' | 'patch-note';
  imageUrl?: string;
  slug?: string;
  processedContent?: string;
  fullContent?: string;
}

export type PatchNote = NewsPost;

export interface PaginatedResponse<T> {
  items: T[];
  metadata: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface NewsQueryParams {
  page?: number;
  itemsPerPage?: number;
  category?: string;
  source?: string;
  timeRange?: string;
  type?: 'announcement' | 'patch-note';
}
