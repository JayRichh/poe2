import { describe, expect, it } from "vitest";

import { getCurrencyByName, groupCurrencies } from "./utils";

describe("groupCurrencies", () => {
  const grouped = groupCurrencies();

  it("returns an entry for every currency group", () => {
    expect(Object.keys(grouped).sort()).toEqual([
      "basic",
      "catalysts",
      "distilled",
      "essences",
      "omens",
    ]);
  });

  it("buckets currencies into the correct group by name", () => {
    expect(grouped.catalysts.every((c) => c.name.includes("Catalyst"))).toBe(true);
    expect(grouped.distilled.every((c) => c.name.includes("Distilled"))).toBe(true);
    expect(grouped.essences.every((c) => c.name.includes("Essence"))).toBe(true);
    expect(grouped.omens.every((c) => c.name.includes("Omen"))).toBe(true);
  });

  it("tags each grouped currency with its own group key", () => {
    for (const [key, list] of Object.entries(grouped)) {
      expect(list.every((c) => c.group === key)).toBe(true);
    }
  });

  it("only includes priced basic currencies (those with a known value and image)", () => {
    expect(grouped.basic.length).toBeGreaterThan(0);
    // Every basic entry must have a positive value (filtered to priced currencies).
    expect(grouped.basic.every((c) => c.value > 0)).toBe(true);
    // Known priced basics are present.
    const names = grouped.basic.map((c) => c.name);
    expect(names).toContain("Chaos Orb");
    expect(names).toContain("Divine Orb");
    expect(names).toContain("Mirror of Kalandra");
  });

  it("sorts basic currencies by value descending", () => {
    const values = grouped.basic.map((c) => c.value);
    const sortedDesc = [...values].sort((a, b) => b - a);
    expect(values).toEqual(sortedDesc);
    // The Mirror is the most valuable basic currency, so it leads the list.
    expect(grouped.basic[0].name).toBe("Mirror of Kalandra");
  });

  it("sorts non-basic groups alphabetically by name", () => {
    for (const key of ["catalysts", "distilled", "essences", "omens"] as const) {
      const names = grouped[key].map((c) => c.name);
      const sortedAlpha = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).toEqual(sortedAlpha);
    }
  });
});

describe("getCurrencyByName", () => {
  it("finds a known basic currency and returns its priced value", () => {
    const chaos = getCurrencyByName("Chaos Orb");
    expect(chaos).toBeDefined();
    expect(chaos?.group).toBe("basic");
    expect(chaos?.value).toBe(1);
  });

  it("finds the highest-value basic currency", () => {
    const mirror = getCurrencyByName("Mirror of Kalandra");
    expect(mirror).toBeDefined();
    expect(mirror?.value).toBe(36000);
  });

  it("returns undefined for an unknown currency name", () => {
    expect(getCurrencyByName("Not A Real Orb")).toBeUndefined();
  });

  it("returns undefined for an empty name", () => {
    expect(getCurrencyByName("")).toBeUndefined();
  });
});
