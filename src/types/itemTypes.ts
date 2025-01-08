export interface SkillStat {
  name: string;
  value: string;
}

export interface ItemSkill {
  name: string;
  icon: string;
  url: string;
  stats?: SkillStat[];
  description?: string;
}

export interface ItemBase {
  name: string;
  icon: string;
  url: string;
  category: string;
  requirements?: { level?: number };
  grantedSkill?: ItemSkill;
  modifiers?: string[];
  description?: string;
  tabSource?: string;
}

export interface ModifierTier {
  name: string;
  level: number;
  stats: string[];
}

export interface ItemModifier {
  family: string;
  type: "prefix" | "suffix" | "socketable";
  tags: string[];
  tiers: ModifierTier[];
}

export interface ItemCategory {
  name: string;
  url: string;
  items: ItemBase[];
  modifiers?: ItemModifier[];
}

export interface ItemGroup {
  name: string;
  categories: string[];
}

export type AllItemData = Record<string, Record<string, ItemCategory>>;
