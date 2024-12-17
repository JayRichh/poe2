'use client'

import { useEffect, useState } from 'react'
import { Text } from '~/components/ui/Text'
import { Card } from '~/components/ui/Card'
import { TabGroup } from '~/components/ui/TabGroup'
import { Slider } from '~/components/ui/Slider'
import { Tooltip } from '~/components/ui/Tooltip'
import type { WeaponInputs } from '~/hooks/useDPSCalculator'

interface WeaponPanelProps {
  weapon: WeaponInputs
  onChange: (updates: Partial<WeaponInputs>) => void
  label: string
  percentages: {
    physical: number
    lightning: number
    fire: number
    cold: number
    chaos: number
  } | null
}

interface DamageInput {
  key: keyof WeaponInputs
  label: string
  min: number
  max: number
  step?: number
  relatedKey?: keyof WeaponInputs // For min/max pairs
}

// Ensure numeric values are valid and within bounds
const sanitizeNumber = (value: number, min: number, max: number, step = 1): number => {
  if (typeof value !== 'number' || isNaN(value)) return min
  return Math.min(Math.max(Math.round(value / step) * step, min), max)
}

export function WeaponPanel({ weapon, onChange, label, percentages }: WeaponPanelProps) {
  const [clientPercentages, setClientPercentages] = useState<typeof percentages>(null)

  useEffect(() => {
    setClientPercentages(percentages)
  }, [percentages])

  const handleSliderChange = (key: keyof WeaponInputs, value: number, input: DamageInput) => {
    const sanitizedValue = sanitizeNumber(value, input.min, input.max, input.step)
    
    // Handle min/max relationships
    if (input.relatedKey) {
      const isMin = key.toString().toLowerCase().includes('min')
      const currentRelatedValue = weapon[input.relatedKey] as number
      
      if (isMin) {
        // If this is a min value, ensure it doesn't exceed the max
        if (sanitizedValue > currentRelatedValue) {
          onChange({
            [key]: sanitizedValue,
            [input.relatedKey]: sanitizedValue
          })
          return
        }
      } else {
        // If this is a max value, ensure it doesn't go below the min
        if (sanitizedValue < currentRelatedValue) {
          onChange({
            [key]: sanitizedValue,
            [input.relatedKey]: sanitizedValue
          })
          return
        }
      }
    }

    // Only update if the value has actually changed
    if (sanitizedValue !== weapon[key]) {
      onChange({ [key]: sanitizedValue })
    }
  }

  const renderDamageInputs = (inputs: DamageInput[]) => (
    <div className="grid gap-4">
      {inputs.map((input) => {
        const currentValue = sanitizeNumber(
          weapon[input.key] as number,
          input.min,
          input.max,
          input.step
        )
        
        return (
          <div key={input.key} className="space-y-1">
            <div className="flex items-center justify-between">
              <Text className="text-sm font-medium">{input.label}</Text>
              <Text className="text-sm font-medium text-foreground/70">
                {currentValue}
              </Text>
            </div>
            <Slider
              min={input.min}
              max={input.max}
              step={input.step}
              value={currentValue}
              onChange={(value: number) => handleSliderChange(input.key, value, input)}
            />
          </div>
        )
      })}
    </div>
  )

  const damageTypes = [
    {
      id: "physical",
      label: "Physical",
      color: "var(--damage-physical)",
      inputs: [
        { key: 'physicalMin', label: 'Minimum', min: 0, max: 100, relatedKey: 'physicalMax' },
        { key: 'physicalMax', label: 'Maximum', min: 0, max: 100, relatedKey: 'physicalMin' }
      ] as DamageInput[]
    },
    {
      id: "lightning",
      label: "Lightning",
      color: "var(--damage-lightning)",
      inputs: [
        { key: 'lightningMin', label: 'Minimum', min: 0, max: 100, relatedKey: 'lightningMax' },
        { key: 'lightningMax', label: 'Maximum', min: 0, max: 100, relatedKey: 'lightningMin' }
      ] as DamageInput[]
    },
    {
      id: "fire",
      label: "Fire",
      color: "var(--damage-fire)",
      inputs: [
        { key: 'fireMin', label: 'Minimum', min: 0, max: 100, relatedKey: 'fireMax' },
        { key: 'fireMax', label: 'Maximum', min: 0, max: 100, relatedKey: 'fireMin' }
      ] as DamageInput[]
    },
    {
      id: "cold",
      label: "Cold",
      color: "var(--damage-cold)",
      inputs: [
        { key: 'coldMin', label: 'Minimum', min: 0, max: 100, relatedKey: 'coldMax' },
        { key: 'coldMax', label: 'Maximum', min: 0, max: 100, relatedKey: 'coldMin' }
      ] as DamageInput[]
    },
    {
      id: "chaos",
      label: "Chaos",
      color: "var(--damage-chaos)",
      inputs: [
        { key: 'chaosMin', label: 'Minimum', min: 0, max: 100, relatedKey: 'chaosMax' },
        { key: 'chaosMax', label: 'Maximum', min: 0, max: 100, relatedKey: 'chaosMin' }
      ] as DamageInput[]
    }
  ]

  return (
    <Card>
      <div className="px-4 py-3 border-b border-border/60">
        <div className="flex items-center justify-between">
          <Text className="text-lg font-semibold tracking-tight">{label}</Text>
          {clientPercentages && (
            <div className="flex items-center gap-1">
              {damageTypes.map(({ id, color }) => {
                const value = clientPercentages[id as keyof typeof clientPercentages]
                return value > 0 ? (
                  <Tooltip
                    key={id}
                    content={`${id.charAt(0).toUpperCase() + id.slice(1)}: ${value.toFixed(1)}%`}
                  >
                    <div 
                      className="h-2 rounded-full transition-all duration-200"
                      style={{
                        width: `${Math.max(Math.min(value, 100) / 3, 8)}px`,
                        backgroundColor: color,
                      }}
                    />
                  </Tooltip>
                ) : null
              })}
            </div>
          )}
        </div>
      </div>

      <div className="divide-y divide-border/60">
        <div className="px-4 py-3">
          <Text className="text-sm font-medium text-foreground-secondary mb-3">Base Damage</Text>
          {renderDamageInputs([
            { key: 'minBaseDmg', label: 'Minimum', min: 0, max: 100, relatedKey: 'maxBaseDmg' },
            { key: 'maxBaseDmg', label: 'Maximum', min: 0, max: 100, relatedKey: 'minBaseDmg' }
          ])}
        </div>

        <div className="pt-3">
          <TabGroup
            tabs={damageTypes.map(({ id, label, inputs }) => ({
              id,
              label,
              content: (
                <div className="px-4 py-3">
                  {renderDamageInputs(inputs)}
                </div>
              ),
            }))}
          />
        </div>
      </div>
    </Card>
  )
}
