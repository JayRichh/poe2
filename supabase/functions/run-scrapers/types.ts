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
  type: "announcement" | "patch-note";
  imageUrl?: string;
  slug?: string;
  processedContent?: string;
  fullContent?: string;
}

export type PatchNote = NewsPost;

export interface ClassDistribution {
  className: string;
  count: number;
  percentage: number;
}

export interface LadderStats {
  timestamp: string;
  ladders: {
    [key: string]: {
      total: number;
      distribution: ClassDistribution[];
    };
  };
  overall: {
    total: number;
    distribution: ClassDistribution[];
  };
}

export interface LadderEntry {
  rank: number;
  account: string;
  character: string;
  class: string;
  level: number;
  experience: number;
}
