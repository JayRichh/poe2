import type { EquipmentSlotId } from "~/types/equipment";

export interface SlotDef {
  id: EquipmentSlotId;
  label: string;
  /** CSS grid-area name used by the paper-doll layout. */
  area: string;
}

/**
 * The ten equip slots, in a stable order. `area` maps each slot onto the
 * paper-doll grid (see EQUIPMENT_GRID_AREAS) — body/helmet/belt run down the
 * centre, weapon/offhand flank the body, amulet + rings sit on the right,
 * gloves/boots on the left.
 */
export const EQUIPMENT_SLOTS: SlotDef[] = [
  { id: "helmet", label: "Helmet", area: "helmet" },
  { id: "amulet", label: "Amulet", area: "amulet" },
  { id: "weapon", label: "Weapon", area: "weapon" },
  { id: "body", label: "Body Armour", area: "body" },
  { id: "offhand", label: "Off-Hand", area: "offhand" },
  { id: "gloves", label: "Gloves", area: "gloves" },
  { id: "belt", label: "Belt", area: "belt" },
  { id: "ring1", label: "Ring", area: "ring1" },
  { id: "boots", label: "Boots", area: "boots" },
  { id: "ring2", label: "Ring", area: "ring2" },
];

/** grid-template-areas for the desktop paper-doll arrangement. */
export const EQUIPMENT_GRID_AREAS = [
  '".      helmet amulet"',
  '"weapon body   offhand"',
  '"gloves belt   ring1"',
  '"boots  .      ring2"',
].join(" ");
