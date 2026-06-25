import { useCallback, useEffect, useState } from "react";

import { DPSCalc } from "~/lib/calculations";

import { useLocalStorage } from "./useLocalStorage";

export interface WeaponInputs {
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

export interface GlobalSettings {
  // Attack Settings
  attackSpeed: number;
  attackSpeedIncrease: number;
  totalSkillProjectiles: number;
  damageMultiplier: number;

  // Critical Strike
  critChance: number;
  critDamage: number;
  resPenetration: number;

  // Damage Modifiers
  bowDamage: number;
  physicalDamageIncrease: number;
  elementalDamageIncrease: number;
  attackDamageIncrease: number;
  projectileDamageIncrease: number;

  // Support Gems
  supportGems: {
    martialTempo: boolean;
    primalArmament: boolean;
    lightningInfusion: boolean;
    iceBite: boolean;
  };

  // Status Effects
  shock: boolean;
  shockMagnitude: number;
  electrocution: boolean;
  electrocutionDuration: number;
  exposure: boolean;
  exposureMagnitude: number;
}

export interface DPSState {
  weapon1: WeaponInputs;
  weapon2: WeaponInputs;
  settings: GlobalSettings;
  results?: ReturnType<DPSCalc["getResults"]>;
}

const defaultWeapon: WeaponInputs = {
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
};

const defaultSettings: GlobalSettings = {
  // Attack Settings
  attackSpeed: 1.0,
  attackSpeedIncrease: 0,
  totalSkillProjectiles: 1,
  damageMultiplier: 1.0,

  // Critical Strike
  critChance: 5,
  critDamage: 150,
  resPenetration: 0,

  // Damage Modifiers
  bowDamage: 22, // 22% from CSV
  physicalDamageIncrease: 0,
  elementalDamageIncrease: 0,
  attackDamageIncrease: 0,
  projectileDamageIncrease: 0,

  // Support Gems
  supportGems: {
    martialTempo: false,
    primalArmament: false,
    lightningInfusion: false,
    iceBite: false,
  },

  // Status Effects
  shock: false,
  shockMagnitude: 48, // From CSV
  electrocution: false,
  electrocutionDuration: 20, // From CSV
  exposure: false,
  exposureMagnitude: 100, // From CSV
};

const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

const sanitizeNumber = (value: number): number => {
  if (typeof value !== "number" || isNaN(value)) return 0;
  return value;
};

const sanitizeWeapon = (weapon: WeaponInputs): WeaponInputs => ({
  physicalMin: sanitizeNumber(weapon.physicalMin),
  physicalMax: sanitizeNumber(weapon.physicalMax),
  lightningMin: sanitizeNumber(weapon.lightningMin),
  lightningMax: sanitizeNumber(weapon.lightningMax),
  fireMin: sanitizeNumber(weapon.fireMin),
  fireMax: sanitizeNumber(weapon.fireMax),
  coldMin: sanitizeNumber(weapon.coldMin),
  coldMax: sanitizeNumber(weapon.coldMax),
  chaosMin: sanitizeNumber(weapon.chaosMin),
  chaosMax: sanitizeNumber(weapon.chaosMax),
});

const sanitizeSettings = (settings: GlobalSettings): GlobalSettings => ({
  ...settings,
  attackSpeed: Math.max(0.1, sanitizeNumber(settings.attackSpeed)),
  attackSpeedIncrease: sanitizeNumber(settings.attackSpeedIncrease),
  totalSkillProjectiles: Math.max(1, sanitizeNumber(settings.totalSkillProjectiles)),
  damageMultiplier: Math.max(0, sanitizeNumber(settings.damageMultiplier)),
  critChance: Math.min(100, Math.max(0, sanitizeNumber(settings.critChance))),
  critDamage: Math.max(100, sanitizeNumber(settings.critDamage)),
  resPenetration: sanitizeNumber(settings.resPenetration),
});

export function useDPSCalculator() {
  const [history, setHistory] = useLocalStorage<DPSState[]>("dps-calculator-history", []);
  const [weapon1, setWeapon1] = useState<WeaponInputs>(sanitizeWeapon(defaultWeapon));
  const [weapon2, setWeapon2] = useState<WeaponInputs>(sanitizeWeapon(defaultWeapon));
  const [settings, setSettings] = useState<GlobalSettings>(sanitizeSettings(defaultSettings));
  const [results, setResults] = useState<ReturnType<DPSCalc["getResults"]> | null>(null);

  const calculateDPS = useCallback(() => {
    const sanitizedWeapon1 = sanitizeWeapon(weapon1);
    const sanitizedWeapon2 = sanitizeWeapon(weapon2);
    const sanitizedSettings = sanitizeSettings(settings);

    const calc = new DPSCalc({
      // Weapon 1 per-type damage (min + max; engine averages them)
      weapon1PhysicalMin: sanitizedWeapon1.physicalMin,
      weapon1PhysicalMax: sanitizedWeapon1.physicalMax,
      weapon1LightningMin: sanitizedWeapon1.lightningMin,
      weapon1LightningMax: sanitizedWeapon1.lightningMax,
      weapon1FireMin: sanitizedWeapon1.fireMin,
      weapon1FireMax: sanitizedWeapon1.fireMax,
      weapon1ColdMin: sanitizedWeapon1.coldMin,
      weapon1ColdMax: sanitizedWeapon1.coldMax,
      weapon1ChaosMin: sanitizedWeapon1.chaosMin,
      weapon1ChaosMax: sanitizedWeapon1.chaosMax,

      // Weapon 2 per-type damage (min + max; engine averages them)
      weapon2PhysicalMin: sanitizedWeapon2.physicalMin,
      weapon2PhysicalMax: sanitizedWeapon2.physicalMax,
      weapon2LightningMin: sanitizedWeapon2.lightningMin,
      weapon2LightningMax: sanitizedWeapon2.lightningMax,
      weapon2FireMin: sanitizedWeapon2.fireMin,
      weapon2FireMax: sanitizedWeapon2.fireMax,
      weapon2ColdMin: sanitizedWeapon2.coldMin,
      weapon2ColdMax: sanitizedWeapon2.coldMax,
      weapon2ChaosMin: sanitizedWeapon2.chaosMin,
      weapon2ChaosMax: sanitizedWeapon2.chaosMax,

      // Attack settings
      attackSpeed: sanitizedSettings.attackSpeed,
      attackSpeedIncrease: sanitizedSettings.attackSpeedIncrease,
      totalSkillProjectiles: sanitizedSettings.totalSkillProjectiles,

      // Global "more" damage multiplier (raw factor: 1.0x = no-op)
      damageMultiplier: sanitizedSettings.damageMultiplier,

      // Critical strike
      critChance: sanitizedSettings.critChance,
      critDamage: sanitizedSettings.critDamage,

      // Resistance penetration
      resPenetration: sanitizedSettings.resPenetration,

      // Increased-damage buckets (additive)
      bowDamage: sanitizedSettings.bowDamage,
      physicalDamageIncrease: sanitizedSettings.physicalDamageIncrease,
      elementalDamageIncrease: sanitizedSettings.elementalDamageIncrease,
      attackDamageIncrease: sanitizedSettings.attackDamageIncrease,
      projectileDamageIncrease: sanitizedSettings.projectileDamageIncrease,

      // Status effects
      shock: sanitizedSettings.shock,
      shockMagnitude: sanitizedSettings.shockMagnitude,
      electrocution: sanitizedSettings.electrocution,
      electrocutionDuration: sanitizedSettings.electrocutionDuration,
      exposure: sanitizedSettings.exposure,
      exposureMagnitude: sanitizedSettings.exposureMagnitude,

      // Support gems ("more" damage)
      lightningInfusion: sanitizedSettings.supportGems.lightningInfusion,
      primalArmament: sanitizedSettings.supportGems.primalArmament,
      iceBite: sanitizedSettings.supportGems.iceBite,
      martialTempo: sanitizedSettings.supportGems.martialTempo,
    });

    const newResults = calc.getResults();
    setResults(newResults);

    if (!Number.isNaN(newResults.dpsIncrease) && Math.abs(newResults.dpsIncrease) > 0.001) {
      setHistory((prev: DPSState[]) => {
        const newState: DPSState = {
          weapon1: deepClone(sanitizedWeapon1),
          weapon2: deepClone(sanitizedWeapon2),
          settings: deepClone(sanitizedSettings),
          results: deepClone(newResults),
        };

        const lastEntry = prev[prev.length - 1];
        if (
          lastEntry?.results &&
          Math.abs(lastEntry.results.dpsIncrease - newResults.dpsIncrease) < 0.001
        ) {
          return prev;
        }

        const newHistory = [...prev, newState];
        return newHistory.slice(-10);
      });
    }
  }, [weapon1, weapon2, settings, setHistory]);

  useEffect(() => {
    const timer = setTimeout(calculateDPS, 100);
    return () => clearTimeout(timer);
  }, [calculateDPS]);

  const getDamageTypePercentages = useCallback(
    (weaponResults: {
      finalPhysicalDamage: number;
      finalLightningDamage: number;
      finalFireDamage: number;
      finalColdDamage: number;
      finalChaosDamage: number;
    }) => {
      const total =
        sanitizeNumber(weaponResults.finalPhysicalDamage) +
        sanitizeNumber(weaponResults.finalLightningDamage) +
        sanitizeNumber(weaponResults.finalFireDamage) +
        sanitizeNumber(weaponResults.finalColdDamage) +
        sanitizeNumber(weaponResults.finalChaosDamage);

      if (total === 0)
        return {
          physical: 0,
          lightning: 0,
          fire: 0,
          cold: 0,
          chaos: 0,
        };

      return {
        physical: (sanitizeNumber(weaponResults.finalPhysicalDamage) / total) * 100,
        lightning: (sanitizeNumber(weaponResults.finalLightningDamage) / total) * 100,
        fire: (sanitizeNumber(weaponResults.finalFireDamage) / total) * 100,
        cold: (sanitizeNumber(weaponResults.finalColdDamage) / total) * 100,
        chaos: (sanitizeNumber(weaponResults.finalChaosDamage) / total) * 100,
      };
    },
    []
  );

  return {
    weapon1,
    weapon2,
    settings,
    results,
    history,
    setWeapon1: (w: WeaponInputs) => setWeapon1(sanitizeWeapon(w)),
    setWeapon2: (w: WeaponInputs) => setWeapon2(sanitizeWeapon(w)),
    setSettings: (s: GlobalSettings) => setSettings(sanitizeSettings(s)),
    getDamageTypePercentages,
  };
}
