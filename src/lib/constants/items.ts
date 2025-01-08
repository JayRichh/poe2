import type { EquipmentSlot } from "~/lib/supabase/types";

export const CATEGORY_TO_SLOT: Record<string, EquipmentSlot> = {
  // One Handed Weapons
  "Claws": "mainhand",
  "Daggers": "mainhand",
  "Wands": "mainhand",
  "One_Hand_Swords": "mainhand",
  "One_Hand_Axes": "mainhand",
  "One_Hand_Maces": "mainhand",
  "Sceptres": "mainhand",
  "Spears": "mainhand",
  "Flails": "mainhand",

  // Two Handed Weapons
  "Bows": "mainhand",
  "Staves": "mainhand",
  "Two_Hand_Swords": "mainhand",
  "Two_Hand_Axes": "mainhand",
  "Two_Hand_Maces": "mainhand",
  "Quarterstaves": "mainhand",
  "Crossbows": "mainhand",

  // Off-hand
  "Shields": "offhand",
  "Quivers": "offhand",
  "Foci": "offhand",

  // Armour
  "Body_Armours": "body",
  "Helmets": "helm",
  "Gloves": "gloves",
  "Boots": "boots",

  // Jewellery
  "Amulets": "amulet",
  "Rings": "ring1",
  "Belts": "belt"
} as const;
