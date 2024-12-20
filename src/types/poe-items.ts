// POE Item Types
export interface POEItem {
  verified: boolean;
  w: number; // width
  h: number; // height
  icon: string;
  support?: boolean;
  stackSize?: number;
  maxStackSize?: number;
  stackSizeText?: string;
  league?: string;
  id?: string; // 64 digit hexadecimal string
  influences?: {
    elder?: boolean;
    shaper?: boolean;
    searing?: boolean;
    tangled?: boolean;
  };
  abyssJewel?: boolean;
  delve?: boolean;
  fractured?: boolean;
  synthesised?: boolean;
  sockets?: POEItemSocket[];
  socketedItems?: POEItem[];
  name: string;
  typeLine: string;
  baseType: string;
  rarity?: "Normal" | "Magic" | "Rare" | "Unique";
  identified: boolean;
  itemLevel?: number;
  ilvl: number;
  note?: string;
  forum_note?: string;
  lockedToCharacter?: boolean;
  lockedToAccount?: boolean;
  duplicated?: boolean;
  split?: boolean;
  corrupted?: boolean;
  unmodifiable?: boolean;
  cisRaceReward?: boolean;
  seaRaceReward?: boolean;
  thRaceReward?: boolean;
  properties?: POEItemProperty[];
  notableProperties?: POEItemProperty[];
  requirements?: POEItemProperty[];
  additionalProperties?: POEItemProperty[];
  nextLevelRequirements?: POEItemProperty[];
  talismanTier?: number;
  secDescrText?: string;
  utilityMods?: string[];
  enchantMods?: string[];
  scourgeMods?: string[];
  implicitMods?: string[];
  explicitMods?: string[];
  craftedMods?: string[];
  fracturedMods?: string[];
  crucibleMods?: string[];
  cosmeticMods?: string[];
  veiledMods?: string[];
  descrText?: string;
  flavourText?: string[];
  flavourTextParsed?: (string | object)[];
  flavourTextNote?: string;
  prophecyText?: string;
  isRelic?: boolean;
  foilVariation?: number;
  replica?: boolean;
  foreseeing?: boolean;
  frameType?: POEFrameType;
  x?: number;
  y?: number;
  inventoryId?: string;
  socket?: number;
  colour?: "S" | "D" | "I" | "G";
}

export interface POEItemSocket {
  group: number;
  attr?: "S" | "D" | "I" | "G" | "A" | "DV";
  sColour?: "R" | "G" | "B" | "W" | "A" | "DV";
}

export interface POEItemProperty {
  name: string;
  values: [string, number][]; // [value, type]
  displayMode?: POEDisplayMode;
  progress?: number; // rounded to 2 decimal places
  type?: number;
  suffix?: string;
}

export enum POEFrameType {
  Normal = 0,
  Magic = 1,
  Rare = 2,
  Unique = 3,
  Gem = 4,
  Currency = 5,
  DivinationCard = 6,
  Quest = 7,
  Prophecy = 8, // legacy
  Foil = 9,
  SupporterFoil = 10,
  Necropolis = 11,
}

export enum POEDisplayMode {
  NameThenValues = 0,
  ValuesThenName = 1,
  ProgressBar = 2,
  ValuesByIndex = 3,
  Separator = 4,
}

export interface POEItemJewelData {
  type: string;
  radius?: number;
  radiusMin?: number;
  radiusVisual?: string;
  subgraph?: {
    groups: Record<string, POEPassiveGroup>;
    nodes: Record<string, POEPassiveNode>;
  };
}

export interface POEPassiveGroup {
  x: number;
  y: number;
  orbits: number[];
  isProxy?: boolean;
  proxy?: string; // identifier of placeholder node
  nodes: string[]; // node identifiers
}

export interface POEPassiveNode {
  skill?: number; // skill hash
  name?: string;
  icon?: string;
  isKeystone?: boolean;
  isNotable?: boolean;
  isMastery?: boolean;
  inactiveIcon?: string;
  activeIcon?: string;
  activeEffectImage?: string;
  masteryEffects?: {
    effect: number; // effect hash
    stats: string[]; // stat descriptions
    reminderText?: string[];
  }[];
  isBlighted?: boolean;
  isTattoo?: boolean;
  isProxy?: boolean;
  isJewelSocket?: boolean;
  expansionJewel?: {
    size?: number;
    index?: number;
    proxy?: number;
    parent?: number;
  };
  recipe?: string[]; // Blight crafting components
  grantedStrength?: number;
  grantedDexterity?: number;
  grantedIntelligence?: number;
  ascendancyName?: string;
  isAscendancyStart?: boolean;
  isMultipleChoice?: boolean;
  isMultipleChoiceOption?: boolean;
  grantedPassivePoints?: number;
  stats?: string[]; // stat descriptions
  reminderText?: string[];
  flavourText?: string[];
  classStartIndex?: number;
  group?: string;
  orbit?: number;
  orbitIndex?: number;
  out: string[]; // node identifiers this connects to
  in: string[]; // node identifiers connected to this
}
