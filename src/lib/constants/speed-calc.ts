export const ATTACK_DURATION = {
  XS: 14, // 0.5s
  SM: 15, // 0.5s
  MD: 21, // 0.7s
  LG: 27, // 0.9s
  XL: 33, // 1.1s
} as const;

export const RECOVERY_DURATION = {
  SM: 90,
  MD: 120,
} as const;

export const WEAPON_CATEGORIES = {
  ONE_HANDED_MELEE: "One-Handed Melee",
  TWO_HANDED_MELEE: "Two-Handed Melee",
  ONE_HANDED_RANGED: "One-Handed Ranged",
  TWO_HANDED_RANGED: "Two-Handed Ranged",
  SHIELDS: "Shields",
  EMPTY_HAND: "Empty Hand",
} as const;

export const WEAPONS = [
  // One-Handed Melee
  {
    id: "battle_axe",
    name: "Battle Axe",
    category: WEAPON_CATEGORIES.ONE_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.MD,
    recoveryDuration: RECOVERY_DURATION.MD,
  },
  {
    id: "club",
    name: "Club",
    category: WEAPON_CATEGORIES.ONE_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.SM,
    recoveryDuration: RECOVERY_DURATION.SM,
  },
  {
    id: "dagger",
    name: "Dagger",
    category: WEAPON_CATEGORIES.ONE_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.SM,
    recoveryDuration: RECOVERY_DURATION.SM,
  },
  {
    id: "flail",
    name: "Flail",
    category: WEAPON_CATEGORIES.ONE_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.SM,
    recoveryDuration: RECOVERY_DURATION.SM,
  },
  {
    id: "hatchet",
    name: "Hatchet",
    category: WEAPON_CATEGORIES.ONE_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.SM,
    recoveryDuration: RECOVERY_DURATION.SM,
  },
  {
    id: "mace",
    name: "Mace",
    category: WEAPON_CATEGORIES.ONE_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.MD,
    recoveryDuration: RECOVERY_DURATION.MD,
  },
  {
    id: "rapier",
    name: "Rapier",
    category: WEAPON_CATEGORIES.ONE_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.SM,
    recoveryDuration: RECOVERY_DURATION.SM,
  },
  {
    id: "sabre",
    name: "Sabre",
    category: WEAPON_CATEGORIES.ONE_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.MD,
    recoveryDuration: RECOVERY_DURATION.MD,
  },
  {
    id: "spear",
    name: "Spear",
    category: WEAPON_CATEGORIES.ONE_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.MD,
    recoveryDuration: RECOVERY_DURATION.MD,
  },
  {
    id: "stiletto",
    name: "Stiletto",
    category: WEAPON_CATEGORIES.ONE_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.SM,
    recoveryDuration: RECOVERY_DURATION.SM,
  },
  {
    id: "sword",
    name: "Sword",
    category: WEAPON_CATEGORIES.ONE_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.MD,
    recoveryDuration: RECOVERY_DURATION.MD,
  },
  {
    id: "war_hammer",
    name: "War Hammer",
    category: WEAPON_CATEGORIES.ONE_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.MD,
    recoveryDuration: RECOVERY_DURATION.MD,
  },

  // Two-Handed Melee
  {
    id: "estoc",
    name: "Estoc",
    category: WEAPON_CATEGORIES.TWO_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.MD,
    recoveryDuration: RECOVERY_DURATION.MD,
  },
  {
    id: "great_sword",
    name: "Great Sword",
    category: WEAPON_CATEGORIES.TWO_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.MD,
    recoveryDuration: RECOVERY_DURATION.MD,
  },
  {
    id: "morning_star",
    name: "Morning Star",
    category: WEAPON_CATEGORIES.TWO_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.MD,
    recoveryDuration: RECOVERY_DURATION.MD,
  },
  {
    id: "pike",
    name: "Pike",
    category: WEAPON_CATEGORIES.TWO_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.MD,
    recoveryDuration: RECOVERY_DURATION.MD,
  },
  {
    id: "pollaxe",
    name: "Pollaxe",
    category: WEAPON_CATEGORIES.TWO_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.MD,
    recoveryDuration: RECOVERY_DURATION.MD,
  },
  {
    id: "quarterstaff",
    name: "Quarterstaff",
    category: WEAPON_CATEGORIES.TWO_HANDED_MELEE,
    attackDuration: ATTACK_DURATION.MD,
    recoveryDuration: RECOVERY_DURATION.MD,
  },

  // Ranged Weapons
  {
    id: "arbalest",
    name: "Arbalest",
    category: WEAPON_CATEGORIES.TWO_HANDED_RANGED,
    attackDuration: ATTACK_DURATION.MD,
    reloadDuration: 180,
  },
  {
    id: "arquebus",
    name: "Arquebus",
    category: WEAPON_CATEGORIES.TWO_HANDED_RANGED,
    attackDuration: ATTACK_DURATION.MD,
    reloadDuration: 204,
  },
  {
    id: "blunderbuss",
    name: "Blunderbuss",
    category: WEAPON_CATEGORIES.ONE_HANDED_RANGED,
    attackDuration: ATTACK_DURATION.XL,
    reloadDuration: 150,
  },
  {
    id: "crossbow",
    name: "Crossbow",
    category: WEAPON_CATEGORIES.TWO_HANDED_RANGED,
    attackDuration: ATTACK_DURATION.MD,
    reloadDuration: 150,
  },
  {
    id: "hunting_bow",
    name: "Hunting Bow",
    category: WEAPON_CATEGORIES.TWO_HANDED_RANGED,
    attackDuration: ATTACK_DURATION.LG,
    recoveryDuration: RECOVERY_DURATION.MD,
  },
  {
    id: "pistol",
    name: "Pistol",
    category: WEAPON_CATEGORIES.ONE_HANDED_RANGED,
    attackDuration: ATTACK_DURATION.XL,
    reloadDuration: 150,
  },
  {
    id: "rod",
    name: "Rod",
    category: WEAPON_CATEGORIES.TWO_HANDED_RANGED,
    attackDuration: ATTACK_DURATION.XL,
    recoveryDuration: RECOVERY_DURATION.MD,
  },
  {
    id: "sceptre",
    name: "Sceptre",
    category: WEAPON_CATEGORIES.ONE_HANDED_RANGED,
    attackDuration: ATTACK_DURATION.MD,
    recoveryDuration: RECOVERY_DURATION.MD,
  },
  {
    id: "wand",
    name: "Wand",
    category: WEAPON_CATEGORIES.ONE_HANDED_RANGED,
    attackDuration: ATTACK_DURATION.MD,
    recoveryDuration: RECOVERY_DURATION.SM,
  },
  {
    id: "war_bow",
    name: "War Bow",
    category: WEAPON_CATEGORIES.TWO_HANDED_RANGED,
    attackDuration: ATTACK_DURATION.XL,
    recoveryDuration: RECOVERY_DURATION.MD,
  },

  // Special
  { id: "shield", name: "Shield", category: WEAPON_CATEGORIES.SHIELDS },
  { id: "nothing", name: "Nothing", category: WEAPON_CATEGORIES.EMPTY_HAND },
];

export const ARMOR_TYPES = [
  { id: "naked", name: "Naked", recoveryPenalty: 0, category: "No Armor" },
  { id: "cloth", name: "Cloth", recoveryPenalty: 0, category: "No Armor" },
  { id: "robe", name: "Robe", recoveryPenalty: 0, category: "No Armor" },
  { id: "padded", name: "Padded", recoveryPenalty: 0.2, category: "Light Armor" },
  { id: "hide", name: "Hide", recoveryPenalty: 0.2, category: "Light Armor" },
  { id: "leather", name: "Leather", recoveryPenalty: 0.2, category: "Light Armor" },
  { id: "scale", name: "Scale", recoveryPenalty: 0.35, category: "Medium Armor" },
  { id: "breastplate", name: "Breastplate", recoveryPenalty: 0.35, category: "Medium Armor" },
  { id: "mail", name: "Mail", recoveryPenalty: 0.35, category: "Medium Armor" },
  { id: "brigandine", name: "Brigandine", recoveryPenalty: 0.35, category: "Heavy Armor" },
  { id: "plate", name: "Plate", recoveryPenalty: 0.35, category: "Heavy Armor" },
];

export const EFFECTS = {
  ALL_PHASES: [
    { id: "arkemyrs_madness", name: "Arkemyr's Mercurial Madness", value: 1.25, rangedOnly: false },
    { id: "bloodlust", name: "Bloodlust", value: 1.2, rangedOnly: false },
    { id: "captains_banquet", name: "Captain's Banquet", value: 1.2, rangedOnly: false },
    { id: "frenzy", name: "Frenzy", value: 1.25, rangedOnly: false },
    { id: "coral_snuff", name: "Coral Snuff", value: 1.15, rangedOnly: false },
    { id: "deleterious_alacrity", name: "Deleterious Alacrity", value: 1.15, rangedOnly: false },
    { id: "natures_bounty", name: "Nature's Bounty", value: 1.2, rangedOnly: false },
    { id: "potion_deftness", name: "Potion of Deftness", value: 1.15, rangedOnly: false },
    {
      id: "potion_striking",
      name: "Potion of Relentless Striking",
      value: 1.15,
      rangedOnly: false,
    },
    { id: "potion_spatial", name: "Potion of Spatial Alacrity", value: 1.2, rangedOnly: true },
    { id: "spirit_siphon", name: "Spirit Siphon", value: 1.15, rangedOnly: false },
    { id: "swift_strikes", name: "Swift Strikes", value: 1.15, rangedOnly: false },
    { id: "time_parasite", name: "Time Parasite (1 target)", value: 1.25, rangedOnly: false },
  ],
  RECOVERY_AND_RELOAD: [
    {
      id: "articulated",
      name: "Articulated (DoC BP)",
      value: 1 / 0.9,
      rangedOnly: false,
      athleticsBonus: 0,
    },
    {
      id: "brew_battered",
      name: "Brew Battered Ysae",
      value: 1 / 0.8,
      rangedOnly: false,
      athleticsBonus: 0,
    },
    {
      id: "heavy_mobility",
      name: "Heavy Mobility (CA)",
      value: 1,
      rangedOnly: false,
      athleticsBonus: 0.01,
    },
    {
      id: "koiki_fruit",
      name: "Koiki Fruit",
      value: 1 / 0.85,
      rangedOnly: false,
      athleticsBonus: 0,
    },
    {
      id: "lithe_motion",
      name: "Lithe Motion (SH)",
      value: 1 / 0.95,
      rangedOnly: false,
      athleticsBonus: 0,
    },
    {
      id: "mohora_wraps",
      name: "Mohora Wraps",
      value: 1 / 0.8,
      rangedOnly: false,
      athleticsBonus: 0,
    },
    {
      id: "sure_handed_chant",
      name: "Sure-Handed Chant",
      value: 1.25,
      rangedOnly: true,
      athleticsBonus: 0,
    },
    {
      id: "two_weapon_style",
      name: "Two-Weapon Style",
      value: 1 / 0.85,
      rangedOnly: false,
      athleticsBonus: 0,
    },
    { id: "stealth", name: "Stealth", value: 1 / 0.15, rangedOnly: false, athleticsBonus: 0 },
    {
      id: "streetfighter_bonus",
      name: "Streetfighter Bonus",
      value: 2,
      rangedOnly: false,
      athleticsBonus: 0,
    },
    {
      id: "streetfighter_penalty",
      name: "Streetfighter Penalty",
      value: 1 / 1.2,
      rangedOnly: false,
      athleticsBonus: 0,
    },
    {
      id: "unnatural_fit",
      name: "Unnatural Fit (CM)",
      value: 1 / 0.9,
      rangedOnly: false,
      athleticsBonus: 0,
    },
  ],
  RELOAD: [
    { id: "gunner", name: "Gunner", value: 1.25, rangedOnly: true },
    { id: "gunnery", name: "Gunnery (Maia's Garb)", value: 1 / 0.8, rangedOnly: true },
    { id: "shootist", name: "Shootist (Acina's Tricorn)", value: 1 / 0.9, rangedOnly: true },
    { id: "sure_handed_chant_reload", name: "Sure-Handed Chant", value: 1.25, rangedOnly: true },
  ],
} as const;
