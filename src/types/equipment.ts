// Equipment data model for the accountless build planner.
//
// An equipped build is a map of slot -> item. Each item is a small set of core
// fields plus a list of typed modifier lines. Mods are typed (not free text) so
// the aggregation layer (src/lib/equipment/aggregate.ts) can fold them into the
// exact buckets the DPS engine consumes — equipment becomes just another
// producer of the same {flatAdded, increased, more, crit, ...} buckets.

export type Rarity = "normal" | "magic" | "rare" | "unique";

export const RARITIES: Rarity[] = ["normal", "magic", "rare", "unique"];

export type EquipmentSlotId =
  | "weapon"
  | "offhand"
  | "helmet"
  | "body"
  | "gloves"
  | "boots"
  | "amulet"
  | "ring1"
  | "ring2"
  | "belt";

export type DamageType = "physical" | "lightning" | "fire" | "cold" | "chaos";

/** Every modifier line we model numerically. */
export type ItemStatKey =
  // Offence — flat added damage (uses value=min, valueMax=max)
  | "flatPhysical"
  | "flatFire"
  | "flatCold"
  | "flatLightning"
  | "flatChaos"
  // Offence — scalars
  | "increasedDamage"
  | "moreDamage"
  | "increasedAttackSpeed"
  | "increasedCritChance"
  | "critDamageBonus"
  | "accuracy"
  | "penetration"
  | "resShred"
  // Defence
  | "armour"
  | "evasion"
  | "energyShield"
  | "life"
  | "fireRes"
  | "coldRes"
  | "lightningRes"
  | "chaosRes"
  // Attributes
  | "strength"
  | "dexterity"
  | "intelligence";

export interface ItemMod {
  /** Stable id for list keys / removal. */
  id: string;
  stat: ItemStatKey;
  /** Single value, or the MIN of a flat-damage range. */
  value: number;
  /** MAX of a flat-damage range (flat* stats only). */
  valueMax?: number;
}

export interface EquippedItem {
  name: string;
  rarity: Rarity;
  /** Base type label, e.g. "Siege Axe", "Sapphire Ring". */
  baseType?: string;
  itemLevel?: number;
  mods: ItemMod[];
}

/** Persisted section payload: which item (if any) is in each slot. */
export type EquipmentState = Partial<Record<EquipmentSlotId, EquippedItem>>;

export type StatGroup = "offense" | "defense" | "attributes";

export interface StatMeta {
  label: string;
  group: StatGroup;
  /** Flat-damage stats carry a min/max range. */
  range?: boolean;
  unit: "%" | "flat";
  damageType?: DamageType;
}

/** Metadata for every modelled stat — drives the editor UI and aggregation. */
export const STAT_CATALOG: Record<ItemStatKey, StatMeta> = {
  flatPhysical: { label: "Adds Physical Damage", group: "offense", range: true, unit: "flat", damageType: "physical" },
  flatFire: { label: "Adds Fire Damage", group: "offense", range: true, unit: "flat", damageType: "fire" },
  flatCold: { label: "Adds Cold Damage", group: "offense", range: true, unit: "flat", damageType: "cold" },
  flatLightning: { label: "Adds Lightning Damage", group: "offense", range: true, unit: "flat", damageType: "lightning" },
  flatChaos: { label: "Adds Chaos Damage", group: "offense", range: true, unit: "flat", damageType: "chaos" },
  increasedDamage: { label: "Increased Damage", group: "offense", unit: "%" },
  moreDamage: { label: "More Damage", group: "offense", unit: "%" },
  increasedAttackSpeed: { label: "Increased Attack Speed", group: "offense", unit: "%" },
  increasedCritChance: { label: "Increased Critical Chance", group: "offense", unit: "%" },
  critDamageBonus: { label: "Critical Damage Bonus", group: "offense", unit: "%" },
  accuracy: { label: "Accuracy Rating", group: "offense", unit: "flat" },
  penetration: { label: "Resistance Penetration", group: "offense", unit: "%" },
  resShred: { label: "Enemy Resistance Reduction", group: "offense", unit: "%" },
  armour: { label: "Armour", group: "defense", unit: "flat" },
  evasion: { label: "Evasion Rating", group: "defense", unit: "flat" },
  energyShield: { label: "Energy Shield", group: "defense", unit: "flat" },
  life: { label: "Maximum Life", group: "defense", unit: "flat" },
  fireRes: { label: "Fire Resistance", group: "defense", unit: "%" },
  coldRes: { label: "Cold Resistance", group: "defense", unit: "%" },
  lightningRes: { label: "Lightning Resistance", group: "defense", unit: "%" },
  chaosRes: { label: "Chaos Resistance", group: "defense", unit: "%" },
  strength: { label: "Strength", group: "attributes", unit: "flat" },
  dexterity: { label: "Dexterity", group: "attributes", unit: "flat" },
  intelligence: { label: "Intelligence", group: "attributes", unit: "flat" },
};

export const STAT_KEYS = Object.keys(STAT_CATALOG) as ItemStatKey[];

/** Format a mod line for display, e.g. "Adds 5-12 Physical Damage", "+30% Increased Damage". */
export function formatMod(mod: ItemMod): string {
  const meta = STAT_CATALOG[mod.stat];
  if (meta.range) {
    return `Adds ${mod.value}-${mod.valueMax ?? mod.value} ${meta.damageType} Damage`;
  }
  const sign = mod.value >= 0 ? "+" : "";
  const unit = meta.unit === "%" ? "%" : "";
  return `${sign}${mod.value}${unit} ${meta.label}`;
}
