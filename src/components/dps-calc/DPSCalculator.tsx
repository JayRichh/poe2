'use client'

import { useDPSCalculator } from '~/hooks/useDPSCalculator'
import { WeaponPanel } from './WeaponPanel'
import { GlobalSettingsPanel } from './GlobalSettingsPanel'
import { ResultsPanel } from './ResultsPanel'
import { HistoryPanel } from './HistoryPanel'
import type { WeaponInputs, GlobalSettings } from '~/hooks/useDPSCalculator'

// Ensure numeric values are valid
const sanitizeNumber = (value: number | undefined): number => {
  if (typeof value !== 'number' || isNaN(value)) return 0
  return value
}

// Type-safe sanitize functions
const sanitizeWeaponUpdates = (updates: Partial<WeaponInputs>): Partial<WeaponInputs> => {
  const result: Partial<WeaponInputs> = {}
  for (const [key, value] of Object.entries(updates)) {
    if (typeof value === 'number' && !isNaN(value)) {
      result[key as keyof WeaponInputs] = value
    }
  }
  return result
}

const sanitizeSettingsUpdates = (updates: Partial<GlobalSettings>): Partial<GlobalSettings> => {
  const result: Partial<GlobalSettings> = {}
  for (const [key, value] of Object.entries(updates)) {
    if (key in updates) {
      if (typeof value === 'boolean' || (typeof value === 'number' && !isNaN(value))) {
        (result as any)[key] = value;
      }
    }
  }
  return result
}

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
    getDamageTypePercentages
  } = useDPSCalculator()

  const handleWeapon1Change = (updates: Partial<WeaponInputs>) => {
    const sanitizedUpdates = sanitizeWeaponUpdates(updates)
    if (Object.keys(sanitizedUpdates).length > 0) {
      setWeapon1({ ...weapon1, ...sanitizedUpdates })
    }
  }

  const handleWeapon2Change = (updates: Partial<WeaponInputs>) => {
    const sanitizedUpdates = sanitizeWeaponUpdates(updates)
    if (Object.keys(sanitizedUpdates).length > 0) {
      setWeapon2({ ...weapon2, ...sanitizedUpdates })
    }
  }

  const handleSettingsChange = (updates: Partial<GlobalSettings>) => {
    const sanitizedUpdates = sanitizeSettingsUpdates(updates)
    if (Object.keys(sanitizedUpdates).length > 0) {
      setSettings({ ...settings, ...sanitizedUpdates })
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Weapon 1 */}
          <WeaponPanel
            weapon={weapon1}
            onChange={handleWeapon1Change}
            label="Weapon 1"
            percentages={results ? getDamageTypePercentages({
              finalPhysicalDamage: sanitizeNumber(results.finalPhysicalDamage),
              finalLightningDamage: sanitizeNumber(results.finalLightningDamage),
              finalFireDamage: sanitizeNumber(results.finalFireDamage),
              finalColdDamage: sanitizeNumber(results.finalColdDamage),
              finalChaosDamage: sanitizeNumber(results.finalChaosDamage),
            }) : null}
          />

          {/* Right Panel - Weapon 2 */}
          <WeaponPanel
            weapon={weapon2}
            onChange={handleWeapon2Change}
            label="Weapon 2"
            percentages={results ? getDamageTypePercentages({
              finalPhysicalDamage: sanitizeNumber(results.finalPhysicalDamage2),
              finalLightningDamage: sanitizeNumber(results.finalLightningDamage2),
              finalFireDamage: sanitizeNumber(results.finalFireDamage2),
              finalColdDamage: sanitizeNumber(results.finalColdDamage2),
              finalChaosDamage: sanitizeNumber(results.finalChaosDamage2),
            }) : null}
          />
        </div>

        {/* Global Settings */}
        <GlobalSettingsPanel
          settings={settings}
          onChange={handleSettingsChange}
        />

        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
          {/* Live Results */}
          <div className="min-w-0">
            {results && (
              <ResultsPanel results={results} />
            )}
          </div>

          {/* History Panel */}
          <div className="min-w-0">
            <HistoryPanel history={history} />
          </div>
        </div>
      </div>
    </div>
  )
}
