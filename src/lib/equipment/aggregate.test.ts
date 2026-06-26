import { describe, expect, it } from "vitest";

import { computeDamageDps } from "~/lib/calculations";
import type { EquipmentState, ItemMod } from "~/types/equipment";

import { aggregateEquipment, flatAddedAverages } from "./aggregate";

let modId = 0;
const mod = (stat: ItemMod["stat"], value: number, valueMax?: number): ItemMod => ({
  id: `m${modId++}`,
  stat,
  value,
  ...(valueMax !== undefined ? { valueMax } : {}),
});

describe("aggregateEquipment", () => {
  it("returns an all-zero aggregate for empty/null state", () => {
    const agg = aggregateEquipment(null);
    expect(agg.armour).toBe(0);
    expect(agg.increasedDamage).toBe(0);
    expect(agg.flatAdded.physical).toEqual({ min: 0, max: 0 });
    expect(agg.resistances).toEqual({ fire: 0, cold: 0, lightning: 0, chaos: 0 });
  });

  it("sums flat added damage min/max per type across slots", () => {
    const state: EquipmentState = {
      weapon: { name: "Axe", rarity: "rare", mods: [mod("flatPhysical", 10, 20)] },
      ring1: { name: "Ring", rarity: "magic", mods: [mod("flatPhysical", 5, 7), mod("flatFire", 3, 9)] },
    };
    const agg = aggregateEquipment(state);
    expect(agg.flatAdded.physical).toEqual({ min: 15, max: 27 });
    expect(agg.flatAdded.fire).toEqual({ min: 3, max: 9 });
  });

  it("sums increased into one bucket and collects more separately", () => {
    const state: EquipmentState = {
      body: { name: "Plate", rarity: "rare", mods: [mod("increasedDamage", 40)] },
      gloves: { name: "Gloves", rarity: "rare", mods: [mod("increasedDamage", 25), mod("moreDamage", 15)] },
    };
    const agg = aggregateEquipment(state);
    expect(agg.increasedDamage).toBe(65);
    expect(agg.moreDamage).toBe(15);
  });

  it("accumulates defence, resistances and attributes", () => {
    const state: EquipmentState = {
      body: {
        name: "Plate",
        rarity: "rare",
        mods: [mod("armour", 500), mod("life", 80), mod("fireRes", 30), mod("strength", 25)],
      },
      boots: { name: "Boots", rarity: "magic", mods: [mod("evasion", 120), mod("fireRes", 18)] },
    };
    const agg = aggregateEquipment(state);
    expect(agg.armour).toBe(500);
    expect(agg.evasion).toBe(120);
    expect(agg.life).toBe(80);
    expect(agg.resistances.fire).toBe(48);
    expect(agg.attributes.strength).toBe(25);
  });

  it("ignores malformed items / missing mods arrays", () => {
    const state = {
      weapon: { name: "x", rarity: "normal", mods: [mod("armour", 10)] },
      offhand: { name: "y", rarity: "normal" }, // no mods array
      ring1: null,
    } as unknown as EquipmentState;
    expect(aggregateEquipment(state).armour).toBe(10);
  });

  it("feeds the real DPS engine: equipment buckets produce the expected DPS", () => {
    // 100 base weapon + 50 flat phys avg from gear, +50% increased, +20% more, 2 APS.
    const state: EquipmentState = {
      weapon: { name: "Axe", rarity: "rare", mods: [mod("flatPhysical", 40, 60)] }, // avg 50
      body: { name: "Plate", rarity: "rare", mods: [mod("increasedDamage", 50), mod("moreDamage", 20)] },
    };
    const agg = aggregateEquipment(state);
    const flat = flatAddedAverages(agg);
    const dps = computeDamageDps({
      base: 100,
      flatAdded: flat.physical, // 50
      increasedPercents: [agg.increasedDamage], // [50]
      morePercents: [agg.moreDamage], // [20]
      attacksPerSecond: 2,
    });
    // (100 + 50) * 1.5 * 1.2 * 2 = 540
    expect(dps).toBeCloseTo(540, 6);
  });
});
