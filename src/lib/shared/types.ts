export interface ImageData {
  src: string;
  alt: string;
}

export interface ContentSection {
  title: string;
  content: string[];
  image?: ImageData;
  subsections?: {
    title: string;
    content: string[];
    image?: ImageData;
  }[];
}

export interface RelatedContent {
  title: string;
  description: string;
  href: string;
  type: "guide" | "mechanic";
}

export interface BaseContent {
  title: string;
  description: string;
  sections: ContentSection[];
  relatedContent?: RelatedContent[];
}

export type ContentCategory =
  | "gameplay"
  | "trading"
  | "boss-fights"
  | "character-building"
  | "equipment"
  | "combat"
  | "progression"
  | "mapping"
  | "damage-types"
  | "status-effects"
  | "character-stats"
  | "economy";

export type ContentIcon =
  | "Book"
  | "Coins"
  | "Sword"
  | "Shield"
  | "User"
  | "Box"
  | "Crosshair"
  | "ArrowUp"
  | "Map"
  | "Zap"
  | "Activity";

export interface ContentWithMeta extends BaseContent {
  id: ContentCategory;
  icon: ContentIcon;
}

// Section organization
export type SectionKey =
  | "getting_started"
  | "combat_equipment"
  | "progression_economy"
  | "game_mechanics"
  | "additional";

export const sectionTitles: Record<SectionKey, string> = {
  getting_started: "Getting Started",
  combat_equipment: "Combat & Equipment",
  progression_economy: "Progression & Economy",
  game_mechanics: "Game Mechanics",
  additional: "Additional Content",
};
