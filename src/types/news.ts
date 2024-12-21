export interface NewsItem {
  id: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  source: string;
  url: string;
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
  sections: PatchNoteSection[];
  hotfixes: PatchNoteHotfix[];
}
