import { DatabaseRecord } from "./db-service";

// Define the interfaces directly based on the data structure
export interface SkillItem extends DatabaseRecord {
  Id?: string;
  DisplayedName?: string;
  Description?: string;
  Icon_DDSFile?: string;
  WebsiteDescription?: string;
  WebsiteImage?: string;
  [key: string]: any;
}

export interface PassiveSkillItem extends DatabaseRecord {
  Id?: string;
  Icon_DDSFile?: string;
  Name?: string;
  IsKeystone?: boolean;
  IsNotable?: boolean;
  FlavourText?: string;
  IsJewelSocket?: boolean;
  SkillPointsGranted?: number;
  [key: string]: any;
}

export interface CharacterItem extends DatabaseRecord {
  Id?: string;
  Name?: string;
  BaseMaxLife?: number;
  BaseMaxMana?: number;
  BaseStrength?: number;
  BaseDexterity?: number;
  BaseIntelligence?: number;
  Description?: string;
  Gender?: string;
  [key: string]: any;
}

export interface ActiveSkillItem extends DatabaseRecord {
  Id?: string;
  DisplayedName?: string;
  Description?: string;
  Icon_DDSFile?: string;
  WebsiteDescription?: string;
  WebsiteImage?: string;
  IsManuallyCasted?: boolean;
  [key: string]: any;
}

// Type for mapping file names to their respective types
export type POE2DataTypes = {
  Skills: SkillItem[];
  Passiveskills: PassiveSkillItem[];
  Characters: CharacterItem[];
  Activeskills: ActiveSkillItem[];
};

// Type for getting a specific data type by file name
export type POE2DataType<K extends keyof POE2DataTypes> = POE2DataTypes[K][number];
