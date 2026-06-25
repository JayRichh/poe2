// Inlined from the removed Supabase types layer. These describe item/equipment
// shapes used by the client-only items service and home item carousels; they are
// no longer tied to any database schema.

export type EquipmentSlot =
  | "mainhand"
  | "offhand"
  | "helm"
  | "body"
  | "gloves"
  | "boots"
  | "amulet"
  | "ring1"
  | "ring2"
  | "belt";

export type ItemRarity = "Normal" | "Magic" | "Rare" | "Unique";

export type SocketColor = "R" | "G" | "B" | "W" | "A" | "DV";

export type GemType = "active" | "support";
