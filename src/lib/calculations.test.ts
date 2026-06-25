import { describe, expect, it } from "vitest";

import { DPSCalc, computeDamageDps } from "~/lib/calculations";

/**
 * DPS ENGINE SPEC — the PoE2 damage model the engine must satisfy.
 *
 * INTENDED MODEL (per-damage-type, then summed; standard PoE2 pipeline):
 *
 *   1. base damage                        (weapon roll, e.g. avg of min/max)
 *   2. + flat added damage                (additive to base)
 *   3. x (1 + sum(increased%))            ["increased" stacks ADDITIVELY]
 *   4. x product over (1 + more%)         ["more" stacks MULTIPLICATIVELY]
 *   5. x attacks (or casts) per second    (turns hit damage into DPS)
 *   6. x effective crit factor            where
 *        critFactor = 1 + critChance * (critMulti - 1)
 *        (critChance in [0,1]; critMulti as a factor, e.g. 1.5 = "150%")
 *
 * Worked reference example:
 *   base=100, flatAdded=20            -> 120
 *   increased = [50%, 30%] => +80%    -> 120 * 1.8          = 216
 *   more      = [40%, 10%]            -> 216 * 1.4 * 1.1    = 332.64
 *   attacksPerSecond = 2             -> 332.64 * 2          = 665.28  (hit DPS)
 *   crit: chance=0.25, multi=2.0      -> factor 1.25
 *                                      -> 665.28 * 1.25      = 831.6
 *
 * These exercise the REAL engine (`computeDamageDps` + `DPSCalc`), not a local
 * reference, so they lock the shipped arithmetic.
 */

describe("computeDamageDps — PoE2 damage pipeline", () => {
  it("applies flat added damage additively to base before scaling", () => {
    expect(computeDamageDps({ base: 100, flatAdded: 20, attacksPerSecond: 1 })).toBeCloseTo(120, 6);
  });

  it("stacks increased% additively (sum then x(1+sum))", () => {
    // +50% and +30% => x1.8, NOT x1.5*1.3
    expect(
      computeDamageDps({ base: 100, increasedPercents: [50, 30], attacksPerSecond: 1 })
    ).toBeCloseTo(180, 6);
  });

  it("stacks more% multiplicatively (product of (1+more))", () => {
    // +40% and +10% => x1.4*1.1 = x1.54
    expect(
      computeDamageDps({ base: 100, morePercents: [40, 10], attacksPerSecond: 1 })
    ).toBeCloseTo(154, 6);
  });

  it("keeps increased and more in separate buckets (additive vs multiplicative)", () => {
    // increased 50+30=+80% => x1.8 ; more 40,10 => x1.54 ; together x2.772
    expect(
      computeDamageDps({
        base: 100,
        increasedPercents: [50, 30],
        morePercents: [40, 10],
        attacksPerSecond: 1,
      })
    ).toBeCloseTo(277.2, 6);
  });

  it("multiplies by attacks/casts per second to produce DPS", () => {
    expect(computeDamageDps({ base: 100, attacksPerSecond: 2 })).toBeCloseTo(200, 6);
  });

  it("applies effective crit factor = 1 + critChance*(critMulti-1)", () => {
    // 25% crit at 2.0x => factor 1.25x
    expect(
      computeDamageDps({ base: 100, attacksPerSecond: 1, critChance: 0.25, critMulti: 2.0 })
    ).toBeCloseTo(125, 6);
  });

  it("is a no-op crit multiplier when critMulti is 1.0 (no double-counting at 1.0x)", () => {
    expect(
      computeDamageDps({ base: 100, attacksPerSecond: 1, critChance: 0.5, critMulti: 1.0 })
    ).toBeCloseTo(100, 6);
  });

  it("composes the full pipeline end-to-end (worked reference example)", () => {
    expect(
      computeDamageDps({
        base: 100,
        flatAdded: 20,
        increasedPercents: [50, 30],
        morePercents: [40, 10],
        attacksPerSecond: 2,
        critChance: 0.25,
        critMulti: 2.0,
      })
    ).toBeCloseTo(831.6, 4);
  });
});

/** Build a single-weapon DPSCalc input map (weapon 1 only) with sensible defaults. */
function makeInputs(overrides: Record<string, number | boolean> = {}) {
  return {
    // weapon 1: 100 avg physical (min=max=100), everything else 0
    weapon1PhysicalMin: 100,
    weapon1PhysicalMax: 100,
    weapon1LightningMin: 0,
    weapon1LightningMax: 0,
    weapon1FireMin: 0,
    weapon1FireMax: 0,
    weapon1ColdMin: 0,
    weapon1ColdMax: 0,
    weapon1ChaosMin: 0,
    weapon1ChaosMax: 0,
    // weapon 2 empty
    weapon2PhysicalMin: 0,
    weapon2PhysicalMax: 0,
    weapon2LightningMin: 0,
    weapon2LightningMax: 0,
    weapon2FireMin: 0,
    weapon2FireMax: 0,
    weapon2ColdMin: 0,
    weapon2ColdMax: 0,
    weapon2ChaosMin: 0,
    weapon2ChaosMax: 0,
    // global defaults (all no-ops)
    attackSpeed: 1,
    attackSpeedIncrease: 0,
    totalSkillProjectiles: 1,
    damageMultiplier: 1,
    critChance: 0,
    critDamage: 100,
    resPenetration: 0,
    bowDamage: 0,
    physicalDamageIncrease: 0,
    elementalDamageIncrease: 0,
    attackDamageIncrease: 0,
    projectileDamageIncrease: 0,
    ...overrides,
  };
}

describe("DPSCalc — engine integration", () => {
  it("base case: 100 avg damage at 1 APS, no mods => 100 DPS", () => {
    const calc = new DPSCalc(makeInputs());
    expect(calc.totalDpsWeapon1).toBeCloseTo(100, 6);
  });

  it("uses average of min/max base damage (not min only)", () => {
    const calc = new DPSCalc(
      makeInputs({ weapon1PhysicalMin: 50, weapon1PhysicalMax: 150 })
    );
    // avg(50,150) = 100
    expect(calc.totalDpsWeapon1).toBeCloseTo(100, 6);
  });

  it("scales with attack-speed-increase slider (regression: was dead)", () => {
    const calc = new DPSCalc(makeInputs({ attackSpeed: 1, attackSpeedIncrease: 50 }));
    // 100 * 1 * (1 + 0.5) = 150
    expect(calc.totalDpsWeapon1).toBeCloseTo(150, 6);
  });

  it("regression: damageMultiplier at 1.0x is a NO-OP (not a 2x doubling)", () => {
    const baseline = new DPSCalc(makeInputs({ damageMultiplier: 1.0 })).totalDpsWeapon1;
    const noMult = new DPSCalc(makeInputs()).totalDpsWeapon1;
    expect(baseline).toBeCloseTo(noMult, 6);
    expect(baseline).toBeCloseTo(100, 6);
  });

  it("damageMultiplier at 1.5x multiplies output by 1.5 (raw factor)", () => {
    const calc = new DPSCalc(makeInputs({ damageMultiplier: 1.5 }));
    expect(calc.totalDpsWeapon1).toBeCloseTo(150, 6);
  });

  it("stacks increased-damage sliders additively", () => {
    // +50% physical and +30% attack => additive +80% => 180
    const calc = new DPSCalc(
      makeInputs({ physicalDamageIncrease: 50, attackDamageIncrease: 30 })
    );
    expect(calc.totalDpsWeapon1).toBeCloseTo(180, 6);
  });

  it("stacks multiple 'more' support gems multiplicatively", () => {
    // primalArmament (+20% more) and lightningInfusion (+20% more) => x1.2*1.2 = 1.44
    const calc = new DPSCalc(makeInputs({ primalArmament: true, lightningInfusion: true }));
    expect(calc.totalDpsWeapon1).toBeCloseTo(144, 6);
  });

  it("applies crit factor 1 + critChance*(critMulti-1)", () => {
    // 25% crit, 200% multi => factor 1.25 => 125
    const calc = new DPSCalc(makeInputs({ critChance: 25, critDamage: 200 }));
    expect(calc.totalDpsWeapon1).toBeCloseTo(125, 6);
  });

  it("crit multiplier of 100% is a no-op regardless of crit chance", () => {
    const calc = new DPSCalc(makeInputs({ critChance: 75, critDamage: 100 }));
    expect(calc.totalDpsWeapon1).toBeCloseTo(100, 6);
  });

  it("multiplies by projectile count", () => {
    const calc = new DPSCalc(makeInputs({ totalSkillProjectiles: 3 }));
    expect(calc.totalDpsWeapon1).toBeCloseTo(300, 6);
  });

  it("composes increased + more + speed + crit end-to-end", () => {
    // base 100; increased phys 50 + attack 30 = +80% -> 180
    // more: primalArmament +20% -> 216
    // attack speed 1 * (1+1.0) = 2 APS -> 432
    // crit 50% @ 200% -> factor 1.5 -> 648
    const calc = new DPSCalc(
      makeInputs({
        physicalDamageIncrease: 50,
        attackDamageIncrease: 30,
        primalArmament: true,
        attackSpeedIncrease: 100,
        critChance: 50,
        critDamage: 200,
      })
    );
    expect(calc.totalDpsWeapon1).toBeCloseTo(648, 6);
  });

  it("dpsIncrease compares weapon 2 vs weapon 1", () => {
    const calc = new DPSCalc(
      makeInputs({ weapon2PhysicalMin: 200, weapon2PhysicalMax: 200 })
    );
    // w1 = 100, w2 = 200 => +100%
    expect(calc.dpsIncrease).toBeCloseTo(1.0, 6);
  });
});
