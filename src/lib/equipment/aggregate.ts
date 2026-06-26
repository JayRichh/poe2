import type {
  DamageType,
  EquipmentState,
  EquippedItem,
  ItemMod,
} from "~/types/equipment";

/**
 * The totals an equipped build contributes. The OFFENSIVE fields are shaped to
 * feed the DPS engine directly: `flatAdded` per damage type, one summed
 * `increased` bucket and one `more` factor, plus crit/speed/accuracy/pen. The
 * DEFENSIVE fields drive the equipment page's own stat ledger.
 */
export interface EquipmentAggregate {
  // Defence
  armour: number;
  evasion: number;
  energyShield: number;
  life: number;
  resistances: Record<"fire" | "cold" | "lightning" | "chaos", number>;
  attributes: { strength: number; dexterity: number; intelligence: number };

  // Offence (engine-ready)
  flatAdded: Record<DamageType, { min: number; max: number }>;
  /** Summed "increased damage" % across all gear (one additive bucket entry). */
  increasedDamage: number;
  /** Summed "more damage" % across all gear (rare; one multiplicative factor). */
  moreDamage: number;
  increasedAttackSpeed: number;
  increasedCritChance: number;
  critDamageBonus: number;
  accuracy: number;
  penetration: number;
  resShred: number;
}

function emptyAggregate(): EquipmentAggregate {
  const zeroFlat = (): Record<DamageType, { min: number; max: number }> => ({
    physical: { min: 0, max: 0 },
    lightning: { min: 0, max: 0 },
    fire: { min: 0, max: 0 },
    cold: { min: 0, max: 0 },
    chaos: { min: 0, max: 0 },
  });
  return {
    armour: 0,
    evasion: 0,
    energyShield: 0,
    life: 0,
    resistances: { fire: 0, cold: 0, lightning: 0, chaos: 0 },
    attributes: { strength: 0, dexterity: 0, intelligence: 0 },
    flatAdded: zeroFlat(),
    increasedDamage: 0,
    moreDamage: 0,
    increasedAttackSpeed: 0,
    increasedCritChance: 0,
    critDamageBonus: 0,
    accuracy: 0,
    penetration: 0,
    resShred: 0,
  };
}

function applyMod(agg: EquipmentAggregate, mod: ItemMod): void {
  const v = Number.isFinite(mod.value) ? mod.value : 0;
  const vMax = Number.isFinite(mod.valueMax as number) ? (mod.valueMax as number) : v;
  switch (mod.stat) {
    case "flatPhysical":
      agg.flatAdded.physical.min += v;
      agg.flatAdded.physical.max += vMax;
      break;
    case "flatFire":
      agg.flatAdded.fire.min += v;
      agg.flatAdded.fire.max += vMax;
      break;
    case "flatCold":
      agg.flatAdded.cold.min += v;
      agg.flatAdded.cold.max += vMax;
      break;
    case "flatLightning":
      agg.flatAdded.lightning.min += v;
      agg.flatAdded.lightning.max += vMax;
      break;
    case "flatChaos":
      agg.flatAdded.chaos.min += v;
      agg.flatAdded.chaos.max += vMax;
      break;
    case "increasedDamage":
      agg.increasedDamage += v;
      break;
    case "moreDamage":
      agg.moreDamage += v;
      break;
    case "increasedAttackSpeed":
      agg.increasedAttackSpeed += v;
      break;
    case "increasedCritChance":
      agg.increasedCritChance += v;
      break;
    case "critDamageBonus":
      agg.critDamageBonus += v;
      break;
    case "accuracy":
      agg.accuracy += v;
      break;
    case "penetration":
      agg.penetration += v;
      break;
    case "resShred":
      agg.resShred += v;
      break;
    case "armour":
      agg.armour += v;
      break;
    case "evasion":
      agg.evasion += v;
      break;
    case "energyShield":
      agg.energyShield += v;
      break;
    case "life":
      agg.life += v;
      break;
    case "fireRes":
      agg.resistances.fire += v;
      break;
    case "coldRes":
      agg.resistances.cold += v;
      break;
    case "lightningRes":
      agg.resistances.lightning += v;
      break;
    case "chaosRes":
      agg.resistances.chaos += v;
      break;
    case "strength":
      agg.attributes.strength += v;
      break;
    case "dexterity":
      agg.attributes.dexterity += v;
      break;
    case "intelligence":
      agg.attributes.intelligence += v;
      break;
  }
}

/**
 * Fold every equipped item's mods into one set of totals. Pure: no engine fork —
 * the offensive fields line up with what `computeDamageDps` / `DPSCalc` consume.
 */
export function aggregateEquipment(state: EquipmentState | null | undefined): EquipmentAggregate {
  const agg = emptyAggregate();
  if (!state) return agg;
  for (const item of Object.values(state)) {
    const equipped = item as EquippedItem | undefined;
    if (!equipped || !Array.isArray(equipped.mods)) continue;
    for (const mod of equipped.mods) applyMod(agg, mod);
  }
  return agg;
}

/** Convenience: total flat added damage as {type: average} for quick display. */
export function flatAddedAverages(agg: EquipmentAggregate): Record<DamageType, number> {
  const out = {} as Record<DamageType, number>;
  (Object.keys(agg.flatAdded) as DamageType[]).forEach((t) => {
    out[t] = (agg.flatAdded[t].min + agg.flatAdded[t].max) / 2;
  });
  return out;
}
