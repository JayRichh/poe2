import { describe, expect, it } from "vitest";

import { computeActionSpeed, computeMovementSpeed } from "~/lib/speed";

/**
 * SPEED ENGINE SPEC — the PoE2 0.5.x speed model the engine must satisfy.
 *
 * MOVEMENT: effective = baseRunSpeed × (1 + Σ increased/reduced %)
 *   "increased/reduced movement speed" stacks ADDITIVELY into one bucket.
 *
 * ATTACK/CAST: effectiveAps = baseAps × (1 + Σ increased %) × Π (1 + more %)
 *   "increased" additive bucket; "more" multiplicative.
 */

describe("computeMovementSpeed — additive bucket", () => {
  it("returns base unchanged with no modifiers", () => {
    const r = computeMovementSpeed({ baseRunSpeed: 100, modifiers: [] });
    expect(r.effectiveMultiplier).toBeCloseTo(1, 6);
    expect(r.effectiveRunSpeed).toBeCloseTo(100, 6);
  });

  it("stacks increased movement speed ADDITIVELY (sum then ×(1+sum))", () => {
    // +30% boots and +20% skill bonus => ×1.5, NOT ×1.3×1.2 (=1.56)
    const r = computeMovementSpeed({
      baseRunSpeed: 100,
      modifiers: [
        { label: "Boots", percent: 30 },
        { label: "Skill bonus", percent: 20 },
      ],
    });
    expect(r.sumIncreasedPercent).toBe(50);
    expect(r.effectiveMultiplier).toBeCloseTo(1.5, 6);
    expect(r.effectiveRunSpeed).toBeCloseTo(150, 6);
  });

  it("applies reductions (chill / temporal slows) additively as negatives", () => {
    // +30% boots, -25% chill, -10% temporal => net -5% => ×0.95
    const r = computeMovementSpeed({
      baseRunSpeed: 100,
      modifiers: [
        { label: "Boots", percent: 30 },
        { label: "Chilled", percent: -25 },
        { label: "Temporal slow", percent: -10 },
      ],
    });
    expect(r.sumIncreasedPercent).toBe(-5);
    expect(r.effectiveMultiplier).toBeCloseTo(0.95, 6);
    expect(r.effectiveRunSpeed).toBeCloseTo(95, 6);
  });

  it("floors the multiplier at 0 (cannot move at negative speed)", () => {
    const r = computeMovementSpeed({
      baseRunSpeed: 100,
      modifiers: [{ label: "Frozen-ish", percent: -150 }],
    });
    expect(r.effectiveMultiplier).toBe(0);
    expect(r.effectiveRunSpeed).toBe(0);
  });
});

describe("computeActionSpeed — increased additive, more multiplicative", () => {
  it("returns base APS unchanged with no modifiers", () => {
    const r = computeActionSpeed({ baseAps: 1.5, increasedModifiers: [] });
    expect(r.effectiveAps).toBeCloseTo(1.5, 6);
    expect(r.timePerAction).toBeCloseTo(1 / 1.5, 6);
  });

  it("scales attack speed by increased% additively", () => {
    // base 1.5 APS, +20% and +30% increased => ×1.5 => 2.25 APS
    const r = computeActionSpeed({
      baseAps: 1.5,
      increasedModifiers: [
        { label: "Gloves", percent: 20 },
        { label: "Passive", percent: 30 },
      ],
    });
    expect(r.sumIncreasedPercent).toBe(50);
    expect(r.effectiveAps).toBeCloseTo(2.25, 6);
    expect(r.timePerAction).toBeCloseTo(1 / 2.25, 6);
  });

  it("applies 'more' multiplicatively on top of the additive bucket", () => {
    // base 2.0, +50% increased => ×1.5; two 20% more => ×1.2×1.2=1.44
    // 2.0 × 1.5 × 1.44 = 4.32
    const r = computeActionSpeed({
      baseAps: 2.0,
      increasedModifiers: [{ label: "Increased", percent: 50 }],
      moreModifiers: [
        { label: "More A", percent: 20 },
        { label: "More B", percent: 20 },
      ],
    });
    expect(r.increasedFactor).toBeCloseTo(1.5, 6);
    expect(r.moreFactor).toBeCloseTo(1.44, 6);
    expect(r.effectiveAps).toBeCloseTo(4.32, 6);
  });

  it("handles a reduction/slow case (negative increased)", () => {
    // base 2.0, +10% increased, -40% (e.g. temporal chains / less attack speed
    // entered as a negative increased) => net -30% => ×0.7 => 1.4 APS
    const r = computeActionSpeed({
      baseAps: 2.0,
      increasedModifiers: [
        { label: "Gear", percent: 10 },
        { label: "Slow", percent: -40 },
      ],
    });
    expect(r.sumIncreasedPercent).toBe(-30);
    expect(r.effectiveAps).toBeCloseTo(1.4, 6);
    expect(r.timePerAction).toBeCloseTo(1 / 1.4, 6);
  });
});
