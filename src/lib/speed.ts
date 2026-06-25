/**
 * PoE2 Speed engine — movement speed and attack/cast speed.
 *
 * Grounded in `docs/poe2-2026-reference.md` (Data: 0.5.x). The reference doc
 * confirms two things this engine relies on:
 *
 *   1. Movement-speed "% increased / reduced" stacks ADDITIVELY into a single
 *      bucket (the "sum of increased move speed %" model — §"Movement-speed %
 *      stacking" is STILL_VALID in the roadmap).
 *
 *   2. The general PoE2 scaling rule (§5 Damage / DPS Model, "Core calculation
 *      order — CONFIRMED"): "increased / reduced" modifiers stack additively in
 *      one bucket, while "more / less" modifiers are ALWAYS multiplicative,
 *      including with each other. The same additive-vs-multiplicative split
 *      applies to attack / cast speed.
 *
 * What this engine deliberately does NOT do: invent base numbers. The reference
 * doc does not publish authoritative per-weapon base attack speed or a global
 * base run-speed value for 0.5.x, so those are CALLER-SUPPLIED inputs. The
 * engine only does the math the doc confirms.
 */

const sum = (values: number[]): number => values.reduce((acc, v) => acc + v, 0);

/** A named speed modifier, expressed in percent (e.g. 30 = "+30%", -25 = "-25%"). */
export interface SpeedModifier {
  /** Human-readable label, e.g. "Boots (+30%)" or "Chilled (-25%)". */
  label: string;
  /** Magnitude in percent. Positive increases, negative reduces. */
  percent: number;
}

// ---------------------------------------------------------------------------
// Movement speed
// ---------------------------------------------------------------------------

export interface MovementSpeedParams {
  /**
   * Base run speed. PoE2 0.5.x does not publish a single authoritative numeric
   * base run-speed value, so this is caller-supplied. Use 100 to read the
   * result as a percentage of base, or plug in your own units.
   */
  baseRunSpeed: number;
  /**
   * "% increased / reduced movement speed" modifiers. All stack ADDITIVELY into
   * one bucket per the reference doc. Reductions (chill, temporal slows, action
   * speed penalties) are negative entries.
   */
  modifiers: SpeedModifier[];
}

export interface MovementSpeedResult {
  baseRunSpeed: number;
  /** Sum of all increased/reduced percentages. */
  sumIncreasedPercent: number;
  /** Effective multiplier = 1 + sum/100, floored at 0 (cannot move backwards). */
  effectiveMultiplier: number;
  /** Effective run speed = baseRunSpeed * effectiveMultiplier. */
  effectiveRunSpeed: number;
  /** Echo of the modifiers used, for breakdown display. */
  breakdown: SpeedModifier[];
}

/**
 * Movement speed = baseRunSpeed × (1 + Σ increased/reduced %).
 * Additive bucket; reductions are negative entries. The multiplier is floored
 * at 0 (you can be slowed to a standstill but not to a negative speed).
 */
export function computeMovementSpeed(params: MovementSpeedParams): MovementSpeedResult {
  const { baseRunSpeed, modifiers } = params;
  const sumIncreasedPercent = sum(modifiers.map((m) => m.percent));
  const effectiveMultiplier = Math.max(0, 1 + sumIncreasedPercent / 100);
  return {
    baseRunSpeed,
    sumIncreasedPercent,
    effectiveMultiplier,
    effectiveRunSpeed: baseRunSpeed * effectiveMultiplier,
    breakdown: modifiers,
  };
}

// ---------------------------------------------------------------------------
// Attack / cast speed
// ---------------------------------------------------------------------------

export interface ActionSpeedParams {
  /**
   * Base attacks/casts per second (APS). Caller-supplied: PoE2 0.5.x weapon /
   * skill base APS is not published as authoritative data in the reference doc,
   * so the user reads it off their own weapon/skill (e.g. a weapon's "Attacks
   * per Second" line, or a spell's base cast rate).
   */
  baseAps: number;
  /**
   * "% increased / reduced attack (or cast) speed" modifiers. Stack ADDITIVELY
   * into one bucket. Reductions are negative entries.
   */
  increasedModifiers: SpeedModifier[];
  /**
   * "% more / less" attack (or cast) speed modifiers. Each applied
   * MULTIPLICATIVELY (rare in practice but supported for correctness).
   */
  moreModifiers?: SpeedModifier[];
}

export interface ActionSpeedResult {
  baseAps: number;
  sumIncreasedPercent: number;
  /** Additive factor from the increased bucket = 1 + sum/100 (floored at 0). */
  increasedFactor: number;
  /** Product of all (1 + more%/100) factors. */
  moreFactor: number;
  /** Effective APS = baseAps × increasedFactor × moreFactor. */
  effectiveAps: number;
  /** Seconds per action = 1 / effectiveAps (Infinity if APS is 0). */
  timePerAction: number;
  increasedBreakdown: SpeedModifier[];
  moreBreakdown: SpeedModifier[];
}

/**
 * Effective APS = baseAps × (1 + Σ increased %) × Π (1 + more %).
 * "increased" is one additive bucket; "more" multiplies. Time per action is the
 * reciprocal of effective APS.
 */
export function computeActionSpeed(params: ActionSpeedParams): ActionSpeedResult {
  const { baseAps, increasedModifiers, moreModifiers = [] } = params;

  const sumIncreasedPercent = sum(increasedModifiers.map((m) => m.percent));
  const increasedFactor = Math.max(0, 1 + sumIncreasedPercent / 100);
  const moreFactor = moreModifiers.reduce((acc, m) => acc * (1 + m.percent / 100), 1);

  const effectiveAps = baseAps * increasedFactor * moreFactor;
  const timePerAction = effectiveAps > 0 ? 1 / effectiveAps : Infinity;

  return {
    baseAps,
    sumIncreasedPercent,
    increasedFactor,
    moreFactor,
    effectiveAps,
    timePerAction,
    increasedBreakdown: increasedModifiers,
    moreBreakdown: moreModifiers,
  };
}
