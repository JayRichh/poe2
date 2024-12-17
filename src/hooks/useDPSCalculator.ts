import { useState, useEffect, useCallback } from 'react'
import { DPSCalc } from '~/lib/calculations'
import { useLocalStorage } from './useLocalStorage'

export interface WeaponInputs {
  minBaseDmg: number
  maxBaseDmg: number
  physicalMin: number
  physicalMax: number
  lightningMin: number
  lightningMax: number
  fireMin: number
  fireMax: number
  coldMin: number
  coldMax: number
  chaosMin: number
  chaosMax: number
}

export interface GlobalSettings {
  attackSpeed: number
  attackSpeedIncrease: number
  totalSkillProjectiles: number
  damageMultiplier: number
  critChance: number
  critDamage: number
  resPenetration: number
  shock: boolean
  electrocution: boolean
  exposure: boolean
  lightningInfusion: boolean
  primalArmament: boolean
  iceBite: boolean
}

export interface DPSState {
  weapon1: WeaponInputs
  weapon2: WeaponInputs
  settings: GlobalSettings
  results?: ReturnType<DPSCalc['getResults']>
}

const defaultWeapon: WeaponInputs = {
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
}

const defaultSettings: GlobalSettings = {
  attackSpeed: 1.0,
  attackSpeedIncrease: 0,
  totalSkillProjectiles: 1,
  damageMultiplier: 1.0,
  critChance: 5,
  critDamage: 150,
  resPenetration: 0,
  shock: false,
  electrocution: false,
  exposure: false,
  lightningInfusion: false,
  primalArmament: false,
  iceBite: false,
}

const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj))

const sanitizeNumber = (value: number): number => {
  if (typeof value !== 'number' || isNaN(value)) return 0
  return value
}

const sanitizeWeapon = (weapon: WeaponInputs): WeaponInputs => ({
  minBaseDmg: sanitizeNumber(weapon.minBaseDmg),
  maxBaseDmg: sanitizeNumber(weapon.maxBaseDmg),
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
})

const sanitizeSettings = (settings: GlobalSettings): GlobalSettings => ({
  ...settings,
  attackSpeed: Math.max(0.1, sanitizeNumber(settings.attackSpeed)),
  attackSpeedIncrease: sanitizeNumber(settings.attackSpeedIncrease),
  totalSkillProjectiles: Math.max(1, sanitizeNumber(settings.totalSkillProjectiles)),
  damageMultiplier: Math.max(0, sanitizeNumber(settings.damageMultiplier)),
  critChance: Math.min(100, Math.max(0, sanitizeNumber(settings.critChance))),
  critDamage: Math.max(100, sanitizeNumber(settings.critDamage)),
  resPenetration: sanitizeNumber(settings.resPenetration),
})

export function useDPSCalculator() {
  const [history, setHistory] = useLocalStorage<DPSState[]>('dps-calculator-history', [])
  const [weapon1, setWeapon1] = useState<WeaponInputs>(sanitizeWeapon(defaultWeapon))
  const [weapon2, setWeapon2] = useState<WeaponInputs>(sanitizeWeapon(defaultWeapon))
  const [settings, setSettings] = useState<GlobalSettings>(sanitizeSettings(defaultSettings))
  const [results, setResults] = useState<ReturnType<DPSCalc['getResults']> | null>(null)

  const calculateDPS = useCallback(() => {
    const sanitizedWeapon1 = sanitizeWeapon(weapon1)
    const sanitizedWeapon2 = sanitizeWeapon(weapon2)
    const sanitizedSettings = sanitizeSettings(settings)

    const calc = new DPSCalc({
      // Weapon 1 Base Stats
      weapon1MinBaseDmg: sanitizedWeapon1.minBaseDmg,
      weapon1MaxBaseDmg: sanitizedWeapon1.maxBaseDmg,
      weapon1MinBase: sanitizedWeapon1.minBaseDmg,
      weapon1MaxBase: sanitizedWeapon1.maxBaseDmg,
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

      // Weapon 2 Base Stats
      weapon2MinBaseDmg: sanitizedWeapon2.minBaseDmg,
      weapon2MaxBaseDmg: sanitizedWeapon2.maxBaseDmg,
      weapon2MinBase: sanitizedWeapon2.minBaseDmg,
      weapon2MaxBase: sanitizedWeapon2.maxBaseDmg,
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

      // Global Settings
      attackSpeed: sanitizedSettings.attackSpeed,
      attackSpeedIncrease: sanitizedSettings.attackSpeedIncrease,
      totalSkillProjectiles: sanitizedSettings.totalSkillProjectiles,
      damageMultiplier: sanitizedSettings.damageMultiplier,
      damageMultiplierWeapon1: sanitizedSettings.damageMultiplier,
      damageMultiplierWeapon2: sanitizedSettings.damageMultiplier,
      
      // Critical Strike Settings
      critChance: sanitizedSettings.critChance,
      critDamage: sanitizedSettings.critDamage,
      critMultiplier: sanitizedSettings.critDamage / 100,
      critMultiplier2: sanitizedSettings.critDamage / 100,
      baseCritChance: sanitizedSettings.critChance,
      baseCritChance2: sanitizedSettings.critChance,
      critChanceIncrease: 0,
      critChanceIncrease2: 0,

      // Resistance and Status Effects
      resPenetration: sanitizedSettings.resPenetration,
      physicalDmgPercent: 0,
      attacksPerSecond: sanitizedSettings.attackSpeed,

      // Status Effects
      shock: sanitizedSettings.shock,
      electrocution: sanitizedSettings.electrocution,
      exposure: sanitizedSettings.exposure,
      lightningInfusion: sanitizedSettings.lightningInfusion,
      primalArmament: sanitizedSettings.primalArmament,
      iceBite: sanitizedSettings.iceBite,

      // New Physical Calculations
      newPhysicalMinWeapon1: sanitizedWeapon1.physicalMin,
      newPhysicalMaxWeapon1: sanitizedWeapon1.physicalMax,
      newPhysicalMinWeapon2: sanitizedWeapon2.physicalMin,
      newPhysicalMaxWeapon2: sanitizedWeapon2.physicalMax,

      // Other Skill Damage
      otherSkillDmgWeapon1: 0,
      otherSkillDmgWeapon2: 0,
    })

    const newResults = calc.getResults()
    setResults(newResults)

    if (!Number.isNaN(newResults.dpsIncrease) && Math.abs(newResults.dpsIncrease) > 0.001) {
      setHistory((prev: DPSState[]) => {
        const newState: DPSState = {
          weapon1: deepClone(sanitizedWeapon1),
          weapon2: deepClone(sanitizedWeapon2),
          settings: deepClone(sanitizedSettings),
          results: deepClone(newResults)
        }

        const lastEntry = prev[prev.length - 1]
        if (lastEntry?.results && 
            Math.abs(lastEntry.results.dpsIncrease - newResults.dpsIncrease) < 0.001) {
          return prev
        }

        const newHistory = [...prev, newState]
        return newHistory.slice(-10)
      })
    }
  }, [weapon1, weapon2, settings, setHistory])

  useEffect(() => {
    const timer = setTimeout(calculateDPS, 100)
    return () => clearTimeout(timer)
  }, [calculateDPS])

  const getDamageTypePercentages = useCallback((weaponResults: {
    finalPhysicalDamage: number
    finalLightningDamage: number
    finalFireDamage: number
    finalColdDamage: number
    finalChaosDamage: number
  }) => {
    const total = 
      sanitizeNumber(weaponResults.finalPhysicalDamage) +
      sanitizeNumber(weaponResults.finalLightningDamage) +
      sanitizeNumber(weaponResults.finalFireDamage) +
      sanitizeNumber(weaponResults.finalColdDamage) +
      sanitizeNumber(weaponResults.finalChaosDamage)

    if (total === 0) return {
      physical: 0,
      lightning: 0,
      fire: 0,
      cold: 0,
      chaos: 0,
    }

    return {
      physical: (sanitizeNumber(weaponResults.finalPhysicalDamage) / total) * 100,
      lightning: (sanitizeNumber(weaponResults.finalLightningDamage) / total) * 100,
      fire: (sanitizeNumber(weaponResults.finalFireDamage) / total) * 100,
      cold: (sanitizeNumber(weaponResults.finalColdDamage) / total) * 100,
      chaos: (sanitizeNumber(weaponResults.finalChaosDamage) / total) * 100,
    }
  }, [])

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
  }
}
