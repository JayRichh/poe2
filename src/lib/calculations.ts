/**
 * POE2 DPS Calculator — engine
 * Core logic for calculating and comparing weapon DPS in Path of Exile 2.
 *
 * DAMAGE MODEL (standard PoE2 pipeline, per-hit then turned into DPS):
 *
 *   effectiveDamage =
 *       (base + flatAdded)
 *     × (1 + Σ increased%)          // "increased" = ADDITIVE bucket (one factor)
 *     × ∏ (1 + more%)               // "more"      = MULTIPLICATIVE (each its own factor)
 *     × attacksOrCastsPerSecond     // turns hit damage into DPS
 *     × critFactor                  // critFactor = 1 + critChance × (critMulti − 1)
 *
 * Notes on the rewrite (replaces the previous non-physical implementation):
 *   - `increased%` modifiers (physical/elemental/attack/projectile/bow damage,
 *     shock, exposure) are summed into ONE additive bucket, not multiplied
 *     against each other (removes the old double-counting).
 *   - `more%` modifiers (support gems, electrocution, the global damage
 *     multiplier) are applied as independent multiplicative factors.
 *   - `damageMultiplier` is a RAW multiplier: 1.0x is a NO-OP. The previous
 *     engine used `1 + value`, so a "1.0x" multiplier silently doubled damage.
 *   - Attack speed scales as base × (1 + attackSpeedIncrease%). The previous
 *     engine ignored the attack-speed-increase slider entirely.
 *   - Crit factor uses `1 + critChance × (critMulti − 1)`, so critMulti = 1.0
 *     (i.e. "100%") is a no-op regardless of crit chance.
 *   - All five damage types use the average of (min + max). The previous engine
 *     summed only the `*Min` rolls for elemental/chaos.
 *
 * TODO(0.5.x): The following 0.5.x stats still need real game data and are NOT
 * modelled here yet — see `docs/poe2-2026-reference.md` (in progress):
 *   - Spirit (reservation / buff budget).
 *   - Exposure as a flat enemy resistance reduction (-x% res) with correct
 *     magnitudes; currently treated as a generic "increased" bucket entry.
 *   - "Damage as extra <type>" / conversion chains (e.g. phys-as-fire).
 *   - Accuracy: +6 per level (was +3) and the 2m–12m hit-chance falloff.
 *   - Resistance penetration vs. enemy resistance value (currently applied as a
 *     simple damage-taken multiplier, not against a real enemy res profile).
 *   - Per-skill `more` damage gem values (real 0.5.x support gem numbers).
 */

export interface DamagePipelineParams {
  /** Base damage (e.g. average of a weapon's min/max roll). */
  base: number;
  /** Flat added damage, additive to base before any scaling. */
  flatAdded?: number;
  /** "increased" modifiers in PERCENT (e.g. 50 for +50%); summed additively. */
  increasedPercents?: number[];
  /** "more" modifiers in PERCENT (e.g. 40 for +40% more); applied multiplicatively. */
  morePercents?: number[];
  /** Attacks (or casts) per second. */
  attacksPerSecond: number;
  /** Critical strike chance as a fraction in [0, 1]. */
  critChance?: number;
  /** Critical strike multiplier as a factor (e.g. 1.5 = "150%" = +50%). */
  critMulti?: number;
}

/**
 * Reference implementation of the PoE2 damage pipeline.
 * `computeDamageDps` is the single source of truth the engine and tests share.
 */
export function computeDamageDps(params: DamagePipelineParams): number {
  const {
    base,
    flatAdded = 0,
    increasedPercents = [],
    morePercents = [],
    attacksPerSecond,
    critChance = 0,
    critMulti = 1,
  } = params;

  const withFlat = base + flatAdded;
  const sumIncreased = increasedPercents.reduce((sum, p) => sum + p, 0);
  const afterIncreased = withFlat * (1 + sumIncreased / 100);
  const afterMore = morePercents.reduce((acc, p) => acc * (1 + p / 100), afterIncreased);
  const hitDps = afterMore * attacksPerSecond;
  const critFactor = 1 + critChance * (critMulti - 1);
  return hitDps * critFactor;
}

/* ───────────────────────────────────────────────────────────────────────────
 * Verified PoE2 0.5.x extensions (additive — do not touch the pipeline above).
 *
 * These are independent, pure functions encoding mechanics confirmed against
 * current (mid-2026, 0.5.x "Return of the Ancients") sources:
 *   - Damaging ailments are a SEPARATE damage-over-time channel: they do NOT
 *     crit and are NOT hits. Magnitude is a % of the inflicting hit's
 *     pre-mitigation typed damage, then scaled only by ailment-magnitude / more
 *     mods. Duration affects total damage, not DPS.
 *   - Resistance: damageTaken = dmg × (1 − effRes/100). Exposure/curses subtract
 *     first and MAY drive resistance below 0; penetration applies LAST, only
 *     while resistance is still positive, and is floored at 0 (it can never make
 *     resistance negative — exposure/curses are the only sub-0 path).
 *   - Armour: physical DR = Armour / (Armour + C × rawPhysHit), hard-capped at
 *     90%. C is a tunable constant (~10, medium confidence) exposed as a param.
 * ─────────────────────────────────────────────────────────────────────────── */

/** Damaging ailment kinds modelled as a parallel DoT channel. */
export type AilmentKind = "ignite" | "bleed" | "poison";

/** Base ailment magnitude as a fraction of the relevant hit damage, per second. */
export const AILMENT_BASE_MAGNITUDE: Record<AilmentKind, number> = {
  ignite: 0.2, // 20% of the hit's FIRE damage / s, base 4s, non-stacking
  bleed: 0.15, // 15% of the hit's PHYSICAL damage / s, base 5s
  poison: 0.2, // 20% of the hit's (PHYSICAL + CHAOS) damage / s as chaos, base 2s
};

export interface AilmentParams {
  /** Pre-mitigation typed damage of the inflicting hit. */
  hit: { physical?: number; fire?: number; chaos?: number };
  /** "increased" ailment / DoT magnitude % (summed additively). */
  increasedMagnitudePercents?: number[];
  /** "more" ailment / DoT multipliers in % (applied multiplicatively). */
  morePercents?: number[];
  /** Bleed deals double while the target is moving or the bleed is aggravated. */
  moving?: boolean;
}

/**
 * Damage-per-second of a single damaging ailment, before enemy resistance.
 * Magnitude is locked from the inflicting hit; only ailment-magnitude / more
 * mods scale it afterward (never the hit's increased/more buckets).
 */
export function computeAilmentDps(kind: AilmentKind, params: AilmentParams): number {
  const { hit, increasedMagnitudePercents = [], morePercents = [], moving = false } = params;
  const phys = Math.max(0, hit.physical ?? 0);
  const fire = Math.max(0, hit.fire ?? 0);
  const chaos = Math.max(0, hit.chaos ?? 0);

  const source =
    kind === "ignite" ? fire : kind === "bleed" ? phys : /* poison */ phys + chaos;
  if (source <= 0) return 0;

  let dps = source * AILMENT_BASE_MAGNITUDE[kind];
  if (kind === "bleed" && moving) dps *= 2;

  const sumIncreased = increasedMagnitudePercents.reduce((s, p) => s + p, 0);
  dps *= 1 + sumIncreased / 100;
  dps = morePercents.reduce((acc, p) => acc * (1 + p / 100), dps);
  return Math.max(0, dps);
}

export interface ResistanceParams {
  /** Enemy base resistance to this damage type, in %. */
  baseResist: number;
  /** Resistance reduction from Exposure (%) — may push resistance below 0. */
  exposure?: number;
  /** Resistance reduction from curses (%) — may push resistance below 0. */
  curse?: number;
  /** Penetration (%) — applied LAST; only reduces still-positive resistance, floored at 0. */
  penetration?: number;
}

/**
 * Effective enemy resistance after exposure/curses (which can go negative) and
 * THEN penetration (floored at 0; cannot drive resistance negative).
 */
export function effectiveResistance(p: ResistanceParams): number {
  const { baseResist, exposure = 0, curse = 0, penetration = 0 } = p;
  let res = baseResist - exposure - curse;
  if (penetration > 0 && res > 0) {
    res = Math.max(0, res - penetration);
  }
  return res;
}

/** Elemental/chaos damage actually taken after resistance. */
export function applyResistance(damage: number, p: ResistanceParams): number {
  return Math.max(0, damage) * (1 - effectiveResistance(p) / 100);
}

/**
 * Physical damage reduction from enemy armour with PoE2's hit-size scaling:
 *   DR = Armour / (Armour + C × rawPhysHit), hard-capped at 90%.
 * Big hits are mitigated proportionally less than small hits.
 */
export function armourDamageReduction(armour: number, rawPhysHit: number, c = 10): number {
  const a = Math.max(0, armour);
  const hit = Math.max(0, rawPhysHit);
  if (a <= 0 || hit <= 0) return 0;
  return Math.min(a / (a + c * hit), 0.9);
}

/** Physical damage actually taken after enemy armour. */
export function applyArmour(rawPhysHit: number, armour: number, c = 10): number {
  return Math.max(0, rawPhysHit) * (1 - armourDamageReduction(armour, rawPhysHit, c));
}

type InputMap = { [key: string]: number | boolean | string };

const num = (v: number | boolean | string | undefined): number => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

const avg = (min: number, max: number): number => (min + max) / 2;

const clamp = (v: number, lo: number, hi: number): number => Math.min(Math.max(v, lo), hi);

/** Per-weapon inputs the engine consumes (one weapon at a time). */
interface WeaponDamage {
  physicalMin: number;
  physicalMax: number;
  lightningMin: number;
  lightningMax: number;
  fireMin: number;
  fireMax: number;
  coldMin: number;
  coldMax: number;
  chaosMin: number;
  chaosMax: number;
}

export class DPSCalc {
  private i: InputMap;

  constructor(inputs: InputMap) {
    this.i = inputs;
  }

  // ---------------------------------------------------------------------------
  // Shared (global) modifier buckets
  // ---------------------------------------------------------------------------

  /** Attacks per second after the attack-speed-increase slider. */
  get attacksPerSecond(): number {
    const base = Math.max(0, num(this.i.attackSpeed));
    const inc = num(this.i.attackSpeedIncrease) / 100;
    return base * (1 + inc);
  }

  /** Crit chance as a fraction in [0, 1], capped to 95%. */
  get critChance(): number {
    return clamp(num(this.i.critChance) / 100, 0, 0.95);
  }

  /** Crit multiplier as a factor (e.g. 150% -> 1.5), floored at 1.0. */
  get critMulti(): number {
    return Math.max(1, num(this.i.critDamage) / 100);
  }

  /** Crit factor = 1 + critChance * (critMulti - 1). */
  get critFactor(): number {
    return 1 + this.critChance * (this.critMulti - 1);
  }

  /** Number of projectiles per attack (>= 1). */
  get projectiles(): number {
    return Math.max(1, num(this.i.totalSkillProjectiles));
  }

  /**
   * Additive "increased %" bucket shared by all damage types.
   * Sums every generic increased-damage source plus increased-style ailments.
   */
  private get increasedBucket(): number[] {
    const out: number[] = [
      num(this.i.physicalDamageIncrease),
      num(this.i.elementalDamageIncrease),
      num(this.i.attackDamageIncrease),
      num(this.i.projectileDamageIncrease),
      num(this.i.bowDamage),
    ];

    // Shock: enemy takes increased damage (additive "increased" magnitude).
    if (this.i.shock === true) {
      out.push(num(this.i.shockMagnitude));
    }

    // Exposure: modelled as an increased-damage bucket entry for now.
    // TODO(0.5.x): replace with a real flat enemy resistance reduction.
    if (this.i.exposure === true) {
      out.push(num(this.i.exposureMagnitude));
    }

    return out;
  }

  /**
   * Multiplicative "more %" factors shared by all damage types.
   * Support gems and the global damage multiplier live here.
   */
  private get moreBucket(): number[] {
    const out: number[] = [];

    // Global damage multiplier is a RAW factor: 1.0x = no-op.
    const dmgMult = Math.max(0, num(this.i.damageMultiplier ?? 1));
    if (dmgMult !== 1) {
      out.push((dmgMult - 1) * 100);
    }

    // Support gems (placeholder magnitudes; real 0.5.x values TBD).
    // TODO(0.5.x): use real support-gem "more" values from the reference doc.
    if (this.i.martialTempo === true) out.push(15);
    if (this.i.primalArmament === true) out.push(20);
    if (this.i.lightningInfusion === true) out.push(20);
    if (this.i.iceBite === true) out.push(20);

    // Electrocution: "more" damage to shocked enemies.
    if (this.i.electrocution === true) {
      out.push(num(this.i.electrocutionDuration));
    }

    return out;
  }

  /** Damage-taken multiplier from resistance penetration (capped 0-75%). */
  get resPenetrationFactor(): number {
    const pen = clamp(num(this.i.resPenetration) / 100, 0, 0.75);
    return 1 + pen;
  }

  // ---------------------------------------------------------------------------
  // Per-weapon damage
  // ---------------------------------------------------------------------------

  private weapon1(): WeaponDamage {
    return {
      physicalMin: num(this.i.weapon1PhysicalMin),
      physicalMax: num(this.i.weapon1PhysicalMax),
      lightningMin: num(this.i.weapon1LightningMin),
      lightningMax: num(this.i.weapon1LightningMax),
      fireMin: num(this.i.weapon1FireMin),
      fireMax: num(this.i.weapon1FireMax),
      coldMin: num(this.i.weapon1ColdMin),
      coldMax: num(this.i.weapon1ColdMax),
      chaosMin: num(this.i.weapon1ChaosMin),
      chaosMax: num(this.i.weapon1ChaosMax),
    };
  }

  private weapon2(): WeaponDamage {
    return {
      physicalMin: num(this.i.weapon2PhysicalMin),
      physicalMax: num(this.i.weapon2PhysicalMax),
      lightningMin: num(this.i.weapon2LightningMin),
      lightningMax: num(this.i.weapon2LightningMax),
      fireMin: num(this.i.weapon2FireMin),
      fireMax: num(this.i.weapon2FireMax),
      coldMin: num(this.i.weapon2ColdMin),
      coldMax: num(this.i.weapon2ColdMax),
      chaosMin: num(this.i.weapon2ChaosMin),
      chaosMax: num(this.i.weapon2ChaosMax),
    };
  }

  /** Average base damage of a single damage type. */
  private static typeAverages(w: WeaponDamage) {
    return {
      physical: avg(w.physicalMin, w.physicalMax),
      lightning: avg(w.lightningMin, w.lightningMax),
      fire: avg(w.fireMin, w.fireMax),
      cold: avg(w.coldMin, w.coldMax),
      chaos: avg(w.chaosMin, w.chaosMax),
    };
  }

  /**
   * Full DPS for a weapon: run the pipeline on the summed average base damage,
   * then scale by projectiles and the penetration factor.
   *
   * Damage types currently share the same global increased/more buckets. Per-
   * type modifier routing (e.g. "increased physical" only on physical) is a
   * future refinement gated on 0.5.x conversion data.
   * TODO(0.5.x): route increased/more buckets per damage type + conversions.
   */
  private weaponDps(w: WeaponDamage): number {
    const t = DPSCalc.typeAverages(w);
    const baseTotal = t.physical + t.lightning + t.fire + t.cold + t.chaos;
    if (baseTotal <= 0) return 0;

    const dps = computeDamageDps({
      base: baseTotal,
      increasedPercents: this.increasedBucket,
      morePercents: this.moreBucket,
      attacksPerSecond: this.attacksPerSecond,
      critChance: this.critChance,
      critMulti: this.critMulti,
    });

    return Math.max(0, dps * this.projectiles * this.resPenetrationFactor);
  }

  get totalDpsWeapon1(): number {
    return this.weaponDps(this.weapon1());
  }

  get totalDpsWeapon2(): number {
    return this.weaponDps(this.weapon2());
  }

  /** Percentage DPS increase of weapon 2 over weapon 1. */
  get dpsIncrease(): number {
    const w1 = this.totalDpsWeapon1;
    if (w1 <= 0) return 0;
    return this.totalDpsWeapon2 / w1 - 1;
  }

  // ---------------------------------------------------------------------------
  // Per-type final damage (average roll), used for the damage-breakdown bars.
  // These are the average base contributions per type (no DPS scaling), kept
  // for the UI's damage-composition display.
  // ---------------------------------------------------------------------------

  get finalPhysicalDamage(): number {
    return DPSCalc.typeAverages(this.weapon1()).physical;
  }
  get finalLightningDamage(): number {
    return DPSCalc.typeAverages(this.weapon1()).lightning;
  }
  get finalFireDamage(): number {
    return DPSCalc.typeAverages(this.weapon1()).fire;
  }
  get finalColdDamage(): number {
    return DPSCalc.typeAverages(this.weapon1()).cold;
  }
  get finalChaosDamage(): number {
    return DPSCalc.typeAverages(this.weapon1()).chaos;
  }

  get finalPhysicalDamage2(): number {
    return DPSCalc.typeAverages(this.weapon2()).physical;
  }
  get finalLightningDamage2(): number {
    return DPSCalc.typeAverages(this.weapon2()).lightning;
  }
  get finalFireDamage2(): number {
    return DPSCalc.typeAverages(this.weapon2()).fire;
  }
  get finalColdDamage2(): number {
    return DPSCalc.typeAverages(this.weapon2()).cold;
  }
  get finalChaosDamage2(): number {
    return DPSCalc.typeAverages(this.weapon2()).chaos;
  }

  /** Structured results consumed by the UI. */
  getResults() {
    return {
      // Primary output
      dpsIncrease: this.dpsIncrease,

      // Total DPS
      totalDpsWeapon1: this.totalDpsWeapon1,
      totalDpsWeapon2: this.totalDpsWeapon2,

      // Shared modifier state (useful for debugging / display)
      attacksPerSecond: this.attacksPerSecond,
      critFactor: this.critFactor,
      projectiles: this.projectiles,

      // Per-type final (average) damage — weapon 1
      finalPhysicalDamage: this.finalPhysicalDamage,
      finalLightningDamage: this.finalLightningDamage,
      finalFireDamage: this.finalFireDamage,
      finalColdDamage: this.finalColdDamage,
      finalChaosDamage: this.finalChaosDamage,

      // Per-type final (average) damage — weapon 2
      finalPhysicalDamage2: this.finalPhysicalDamage2,
      finalLightningDamage2: this.finalLightningDamage2,
      finalFireDamage2: this.finalFireDamage2,
      finalColdDamage2: this.finalColdDamage2,
      finalChaosDamage2: this.finalChaosDamage2,
    };
  }
}
