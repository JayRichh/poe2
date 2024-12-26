"use client";

import { useDPSCalculator } from "~/hooks/useDPSCalculator";
import { TEST_CASES } from "~/lib/test-cases";
import type { GlobalSettings, WeaponInputs } from "~/hooks/useDPSCalculator";

import { DPSCalculatorHeader } from "./DPSCalculatorHeader";
import { GlobalSettingsPanel } from "./GlobalSettingsPanel";
import { HistoryPanel } from "./HistoryPanel";
import { ResultsPanel } from "./ResultsPanel";
import { WeaponPanel } from "./WeaponPanel";

// Ensure numeric values are valid
const sanitizeNumber = (value: number | undefined): number => {
  if (typeof value !== "number" || isNaN(value)) return 0;
  return value;
};

// Type-safe sanitize functions
const sanitizeWeaponUpdates = (updates: Partial<WeaponInputs>): Partial<WeaponInputs> => {
  const result: Partial<WeaponInputs> = {};
  for (const [key, value] of Object.entries(updates)) {
    if (typeof value === "number" && !isNaN(value)) {
      result[key as keyof WeaponInputs] = value;
    }
  }
  return result;
};

const sanitizeSettingsUpdates = (updates: Partial<GlobalSettings>): Partial<GlobalSettings> => {
  const result: Partial<GlobalSettings> = {};
  for (const [key, value] of Object.entries(updates)) {
    if (key in updates) {
      if (typeof value === "boolean" || (typeof value === "number" && !isNaN(value))) {
        (result as any)[key] = value;
      }
    }
  }
  return result;
};

export function DPSCalculator() {
  const {
    weapon1,
    weapon2,
    settings,
    results,
    history,
    setWeapon1,
    setWeapon2,
    setSettings,
    getDamageTypePercentages,
  } = useDPSCalculator();

  // Handle loading test cases
    const handleLoadTestCase = (testCase: string) => {
      if (testCase in TEST_CASES) {
        const config = TEST_CASES[testCase as keyof typeof TEST_CASES];
        setWeapon1(config.weapon1);
        setWeapon2(config.weapon2);
        setSettings(config.settings);
      }
    };

  // Handle resetting calculator
  const handleReset = () => {
    setWeapon1({
      minBaseDmg: 0,
      maxBaseDmg: 0,
      physicalMin: 0,
      physicalMax: 0,
      lightningMin: 0,
      lightningMax: 0,
      fireMin: 0,
      fireMax: 0,
      coldMin: 0,
      coldMax: 0,
      chaosMin: 0,
      chaosMax: 0,
    });
    setWeapon2({
      minBaseDmg: 0,
      maxBaseDmg: 0,
      physicalMin: 0,
      physicalMax: 0,
      lightningMin: 0,
      lightningMax: 0,
      fireMin: 0,
      fireMax: 0,
      coldMin: 0,
      coldMax: 0,
      chaosMin: 0,
      chaosMax: 0,
    });
    setSettings({
      attackSpeed: 1.0,
      attackSpeedIncrease: 0,
      totalSkillProjectiles: 1,
      damageMultiplier: 1.0,
      critChance: 5,
      critDamage: 150,
      resPenetration: 0,
      bowDamage: 0,
      physicalDamageIncrease: 0,
      elementalDamageIncrease: 0,
      attackDamageIncrease: 0,
      projectileDamageIncrease: 0,
      supportGems: {
        martialTempo: false,
        primalArmament: false,
        lightningInfusion: false,
        iceBite: false,
      },
      shock: false,
      shockMagnitude: 0,
      shockDuration: 0,
      electrocution: false,
      electrocutionDuration: 0,
      exposure: false,
      exposureMagnitude: 0,
      exposureDuration: 0,
    });
  };

  const handleWeapon1Change = (updates: Partial<WeaponInputs>) => {
    const sanitizedUpdates = sanitizeWeaponUpdates(updates);
    if (Object.keys(sanitizedUpdates).length > 0) {
      setWeapon1({ ...weapon1, ...sanitizedUpdates });
    }
  };

  const handleWeapon2Change = (updates: Partial<WeaponInputs>) => {
    const sanitizedUpdates = sanitizeWeaponUpdates(updates);
    if (Object.keys(sanitizedUpdates).length > 0) {
      setWeapon2({ ...weapon2, ...sanitizedUpdates });
    }
  };

  const handleSettingsChange = (updates: Partial<GlobalSettings>) => {
    const sanitizedUpdates = sanitizeSettingsUpdates(updates);
    if (Object.keys(sanitizedUpdates).length > 0) {
      setSettings({ ...settings, ...sanitizedUpdates });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        {/* Header with Controls */}
        <DPSCalculatorHeader onLoadTestCase={handleLoadTestCase} onReset={handleReset} />

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
          {/* Left Column - Calculator */}
          <div className="space-y-6">
            {/* Weapons Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Weapon 1 */}
              <WeaponPanel
                weapon={weapon1}
                onChange={handleWeapon1Change}
                label="Weapon 1"
                percentages={
                  results
                    ? getDamageTypePercentages({
                        finalPhysicalDamage: sanitizeNumber(results.finalPhysicalDamage),
                        finalLightningDamage: sanitizeNumber(results.finalLightningDamage),
                        finalFireDamage: sanitizeNumber(results.finalFireDamage),
                        finalColdDamage: sanitizeNumber(results.finalColdDamage),
                        finalChaosDamage: sanitizeNumber(results.finalChaosDamage),
                      })
                    : null
                }
              />

              {/* Weapon 2 */}
              <WeaponPanel
                weapon={weapon2}
                onChange={handleWeapon2Change}
                label="Weapon 2"
                percentages={
                  results
                    ? getDamageTypePercentages({
                        finalPhysicalDamage: sanitizeNumber(results.finalPhysicalDamage2),
                        finalLightningDamage: sanitizeNumber(results.finalLightningDamage2),
                        finalFireDamage: sanitizeNumber(results.finalFireDamage2),
                        finalColdDamage: sanitizeNumber(results.finalColdDamage2),
                        finalChaosDamage: sanitizeNumber(results.finalChaosDamage2),
                      })
                    : null
                }
              />
            </div>

            {/* Global Settings */}
            <GlobalSettingsPanel settings={settings} onChange={handleSettingsChange} />

            {/* Results Panel */}
            {results && <ResultsPanel results={results} />}
          </div>

          {/* Right Column - History */}
          <div className="xl:border-l xl:border-border/60 xl:pl-6">
            <HistoryPanel history={history} />
          </div>
        </div>
      </div>
    </div>
  );
}
