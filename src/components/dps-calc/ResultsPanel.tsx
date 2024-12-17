'use client'

import { Text } from '~/components/ui/Text'
import { Card } from '~/components/ui/Card'
import { Tooltip } from '~/components/ui/Tooltip'
import type { DPSCalc } from '~/lib/calculations'

interface ResultsPanelProps {
  results: ReturnType<DPSCalc['getResults']>
}

interface DamageTypeBar {
  type: 'Physical' | 'Lightning' | 'Fire' | 'Cold' | 'Chaos'
  value: number
  total: number
}

// Ensure numeric values are valid
const sanitizeNumber = (value: number | undefined): number => {
  if (typeof value !== 'number' || isNaN(value)) return 0
  return value
}

export function ResultsPanel({ results }: ResultsPanelProps) {
  const formatNumber = (num: number): string => {
    const sanitized = sanitizeNumber(num)
    if (sanitized >= 1_000_000) {
      return `${(sanitized / 1_000_000).toFixed(2)}M`
    }
    if (sanitized >= 1_000) {
      return `${(sanitized / 1_000).toFixed(1)}K`
    }
    return Math.round(sanitized).toLocaleString()
  }

  const getDamageTypeColor = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'physical': return 'bg-damage-physical'
      case 'lightning': return 'bg-damage-lightning'
      case 'fire': return 'bg-damage-fire'
      case 'cold': return 'bg-damage-cold'
      case 'chaos': return 'bg-damage-chaos'
      default: return 'bg-foreground/20'
    }
  }

  const renderDamageBar = (bars: DamageTypeBar[]) => (
    <div className="flex gap-0.5 h-2">
      {bars.map(({ type, value, total }) => {
        const sanitizedValue = sanitizeNumber(value)
        const sanitizedTotal = sanitizeNumber(total)
        const percentage = sanitizedTotal > 0 ? (sanitizedValue / sanitizedTotal) * 100 : 0
        if (percentage < 0.5) return null
        return (
          <Tooltip 
            key={type}
            content={`${type}: ${formatNumber(sanitizedValue)} (${percentage.toFixed(1)}%)`}
          >
            <div 
              className={`h-full ${getDamageTypeColor(type)} rounded-full transition-all duration-200`}
              style={{ width: `${percentage}%` }}
            />
          </Tooltip>
        )
      })}
    </div>
  )

  // Sanitize all damage values
  const weapon1Total = sanitizeNumber(results.totalDpsWeapon1)
  const weapon2Total = sanitizeNumber(results.totalDpsWeapon2)
  const dpsIncrease = sanitizeNumber(results.dpsIncrease)

  const weapon1Bars: DamageTypeBar[] = [
    { type: 'Physical', value: sanitizeNumber(results.finalPhysicalDamage), total: weapon1Total },
    { type: 'Lightning', value: sanitizeNumber(results.finalLightningDamage), total: weapon1Total },
    { type: 'Fire', value: sanitizeNumber(results.finalFireDamage), total: weapon1Total },
    { type: 'Cold', value: sanitizeNumber(results.finalColdDamage), total: weapon1Total },
    { type: 'Chaos', value: sanitizeNumber(results.finalChaosDamage), total: weapon1Total },
  ]

  const weapon2Bars: DamageTypeBar[] = [
    { type: 'Physical', value: sanitizeNumber(results.finalPhysicalDamage2), total: weapon2Total },
    { type: 'Lightning', value: sanitizeNumber(results.finalLightningDamage2), total: weapon2Total },
    { type: 'Fire', value: sanitizeNumber(results.finalFireDamage2), total: weapon2Total },
    { type: 'Cold', value: sanitizeNumber(results.finalColdDamage2), total: weapon2Total },
    { type: 'Chaos', value: sanitizeNumber(results.finalChaosDamage2), total: weapon2Total },
  ]

  return (
    <Card className="overflow-hidden">
      <div className="px-4 py-3 border-b border-border/60">
        <Text className="text-lg font-semibold tracking-tight">Results</Text>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* DPS Comparison */}
          <div className="space-y-2">
            <Text className="text-sm font-medium text-foreground-secondary">DPS Change</Text>
            <div className="flex items-baseline gap-2">
              <Text className={`text-2xl font-bold tabular-nums tracking-tight ${dpsIncrease >= 0 ? 'text-success' : 'text-error'}`}>
                {(dpsIncrease >= 0 ? '+' : '')}{(dpsIncrease * 100).toFixed(1)}%
              </Text>
            </div>
          </div>

          {/* Weapon 1 Breakdown */}
          <div className="space-y-3">
            <Text className="text-sm font-medium text-foreground-secondary">Weapon 1</Text>
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <Text className="text-sm font-medium">Total DPS</Text>
                <Text className="text-lg font-semibold tabular-nums tracking-tight">
                  {formatNumber(weapon1Total)}
                </Text>
              </div>
              {renderDamageBar(weapon1Bars)}
            </div>
          </div>

          {/* Weapon 2 Breakdown */}
          <div className="space-y-3">
            <Text className="text-sm font-medium text-foreground-secondary">Weapon 2</Text>
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <Text className="text-sm font-medium">Total DPS</Text>
                <Text className="text-lg font-semibold tabular-nums tracking-tight">
                  {formatNumber(weapon2Total)}
                </Text>
              </div>
              {renderDamageBar(weapon2Bars)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
