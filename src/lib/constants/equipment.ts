import type { EquipmentSlot, ItemRarity } from "~/lib/supabase/types";
import type { PropertyJson, RequirementJson } from "~/types/equipment";

export const DEFAULT_ITEM_LEVEL = 1;
export const MAX_ITEM_LEVEL = 100;
export const MAX_QUALITY = 20;
export const MAX_SOCKETS = 6;
export const MAX_SOCKET_GROUPS = 3;

export interface EquipmentDefaults {
  base_type: string;
  type_line: string;
  properties: PropertyJson[];
  requirements: RequirementJson[];
  implicitMods: string[];
  minLevel: number;
}

export const EQUIPMENT_DEFAULTS: Record<EquipmentSlot, EquipmentDefaults> = {
  mainhand: {
    base_type: "Rusted Sword",
    type_line: "Rusted Sword",
    properties: [
      { name: "physical_damage", value: 6, display: "6-8 Physical Damage", type: "physical" },
      { name: "attack_speed", value: 1.45, display: "1.45 Attacks per Second", type: "speed" }
    ],
    requirements: [
      { name: "level", value: 1, display: "Level 1" },
      { name: "str", value: 8, display: "8 Str" }
    ],
    implicitMods: ["+10% Physical Damage"],
    minLevel: 1
  },
  offhand: {
    base_type: "Splintered Shield",
    type_line: "Splintered Shield",
    properties: [
      { name: "block", value: 4, display: "4% Block", type: "defence" },
      { name: "armor", value: 3, display: "3 Armor", type: "defence" }
    ],
    requirements: [
      { name: "level", value: 1, display: "Level 1" },
      { name: "str", value: 6, display: "6 Str" }
    ],
    implicitMods: ["+5% Block Chance"],
    minLevel: 1
  },
  helm: {
    base_type: "Rusted Coif",
    type_line: "Rusted Coif",
    properties: [
      { name: "armor", value: 5, display: "5 Armor", type: "defence" }
    ],
    requirements: [
      { name: "level", value: 1, display: "Level 1" },
      { name: "str", value: 7, display: "7 Str" }
    ],
    implicitMods: ["+10 to maximum Life"],
    minLevel: 1
  },
  body: {
    base_type: "Tattered Robe",
    type_line: "Tattered Robe",
    properties: [
      { name: "armor", value: 6, display: "6 Armor", type: "defence" },
      { name: "energy_shield", value: 3, display: "3 Energy Shield", type: "defence" }
    ],
    requirements: [
      { name: "level", value: 1, display: "Level 1" },
      { name: "int", value: 8, display: "8 Int" }
    ],
    implicitMods: ["+20 to maximum Life"],
    minLevel: 1
  },
  gloves: {
    base_type: "Ragged Gloves",
    type_line: "Ragged Gloves",
    properties: [
      { name: "armor", value: 2, display: "2 Armor", type: "defence" }
    ],
    requirements: [
      { name: "level", value: 1, display: "Level 1" }
    ],
    implicitMods: ["+5% Attack Speed"],
    minLevel: 1
  },
  boots: {
    base_type: "Worn Boots",
    type_line: "Worn Boots",
    properties: [
      { name: "armor", value: 2, display: "2 Armor", type: "defence" }
    ],
    requirements: [
      { name: "level", value: 1, display: "Level 1" }
    ],
    implicitMods: ["+10% Movement Speed"],
    minLevel: 1
  },
  amulet: {
    base_type: "Paua Amulet",
    type_line: "Paua Amulet",
    properties: [],
    requirements: [
      { name: "level", value: 1, display: "Level 1" }
    ],
    implicitMods: ["+20 to maximum Mana"],
    minLevel: 1
  },
  ring1: {
    base_type: "Iron Ring",
    type_line: "Iron Ring",
    properties: [],
    requirements: [
      { name: "level", value: 1, display: "Level 1" }
    ],
    implicitMods: ["+2 Physical Damage"],
    minLevel: 1
  },
  ring2: {
    base_type: "Iron Ring",
    type_line: "Iron Ring",
    properties: [],
    requirements: [
      { name: "level", value: 1, display: "Level 1" }
    ],
    implicitMods: ["+2 Physical Damage"],
    minLevel: 1
  },
  belt: {
    base_type: "Rope Belt",
    type_line: "Rope Belt",
    properties: [],
    requirements: [
      { name: "level", value: 1, display: "Level 1" }
    ],
    implicitMods: ["+15 to maximum Energy Shield"],
    minLevel: 1
  }
};

export const RARITY_COLORS: Record<ItemRarity, string> = {
  Normal: "text-gray-200",
  Magic: "text-blue-400",
  Rare: "text-yellow-400",
  Unique: "text-orange-400"
};

export const QUICK_MOD_TEMPLATES = {
  weapon: [
    "+% Physical Damage",
    "+% Attack Speed",
    "+% Critical Strike Chance",
    "Adds # to # Physical Damage",
    "Adds # to # Fire Damage",
    "Adds # to # Cold Damage",
    "Adds # to # Lightning Damage"
  ] as string[],
  armor: [
    "+# to maximum Life",
    "+#% to Fire Resistance",
    "+#% to Cold Resistance",
    "+#% to Lightning Resistance",
    "+# to Strength",
    "+# to Dexterity",
    "+# to Intelligence"
  ] as string[],
  jewelry: [
    "+# to all Attributes",
    "+#% to all Elemental Resistances",
    "+#% increased Rarity of Items found",
    "+# to maximum Life",
    "+# to maximum Mana",
    "+#% increased Attack Speed",
    "+#% increased Cast Speed"
  ] as string[]
};

export function getQuickModsForSlot(slot: EquipmentSlot): readonly string[] {
  if (["mainhand", "offhand"].includes(slot)) return [...QUICK_MOD_TEMPLATES.weapon];
  if (["helm", "body", "gloves", "boots"].includes(slot)) return [...QUICK_MOD_TEMPLATES.armor];
  return [...QUICK_MOD_TEMPLATES.jewelry];
}
