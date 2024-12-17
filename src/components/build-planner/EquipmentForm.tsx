'use client'

import { useState } from 'react'
import { Text } from '~/components/ui/Text'
import { Button } from '~/components/ui/Button'
import type { Database } from '~/lib/supabase/types'

type Equipment = Database['public']['Tables']['equipment']['Row']
type EquipmentInsert = Database['public']['Tables']['equipment']['Insert']
type EquipmentSlot = Database['public']['Enums']['equipment_slot']

interface EquipmentFormProps {
  buildId: string
  initialEquipment?: Partial<Equipment>
  onSubmit: (equipment: EquipmentInsert) => Promise<void>
}

export function EquipmentForm({ buildId, initialEquipment, onSubmit }: EquipmentFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState(initialEquipment?.name || '')
  const [slot, setSlot] = useState<EquipmentSlot>(initialEquipment?.slot || 'mainhand')
  const [baseType, setBaseType] = useState(initialEquipment?.base_type || '')
  const [itemLevel, setItemLevel] = useState(initialEquipment?.item_level?.toString() || '')
  const [requirements, setRequirements] = useState<Record<string, number>>(
    (initialEquipment?.requirements as Record<string, number>) || {}
  )
  const [stats, setStats] = useState<Record<string, number>>(
    (initialEquipment?.stats as Record<string, number>) || {}
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !slot) return

    setLoading(true)
    setError(null)

    try {
      await onSubmit({
        build_id: buildId,
        name,
        slot,
        base_type: baseType || null,
        item_level: itemLevel ? parseInt(itemLevel, 10) : null,
        requirements: Object.keys(requirements).length ? requirements : null,
        stats: Object.keys(stats).length ? stats : null
      })
    } catch (err) {
      console.error('Error saving equipment:', err)
      setError('Failed to save equipment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Text className="text-sm text-foreground/60">Item Name</Text>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
            className="w-full h-12 rounded-xl bg-background/95 border-2 border-border/50 px-4"
            required
          />
        </div>

        <div className="space-y-2">
          <Text className="text-sm text-foreground/60">Equipment Slot</Text>
          <select
            value={slot}
            onChange={(e) => setSlot(e.target.value as EquipmentSlot)}
            className="w-full h-12 rounded-xl bg-background/95 border-2 border-border/50 px-4"
            required
          >
            <option value="mainhand">Main Hand</option>
            <option value="offhand">Off Hand</option>
            <option value="helm">Helm</option>
            <option value="body">Body Armour</option>
            <option value="gloves">Gloves</option>
            <option value="boots">Boots</option>
            <option value="amulet">Amulet</option>
            <option value="ring1">Ring 1</option>
            <option value="ring2">Ring 2</option>
            <option value="belt">Belt</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Text className="text-sm text-foreground/60">Base Type</Text>
            <input
              type="text"
              value={baseType}
              onChange={(e) => setBaseType(e.target.value)}
              placeholder="Enter base type"
              className="w-full h-12 rounded-xl bg-background/95 border-2 border-border/50 px-4"
            />
          </div>

          <div className="space-y-2">
            <Text className="text-sm text-foreground/60">Item Level</Text>
            <input
              type="number"
              value={itemLevel}
              onChange={(e) => setItemLevel(e.target.value)}
              placeholder="Enter item level"
              min="1"
              max="100"
              className="w-full h-12 rounded-xl bg-background/95 border-2 border-border/50 px-4"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Text className="text-sm text-foreground/60">Requirements</Text>
          <div className="grid grid-cols-3 gap-4">
            {['strength', 'dexterity', 'intelligence'].map((stat) => (
              <div key={stat} className="space-y-1">
                <Text className="text-xs text-foreground/40 capitalize">
                  {stat}
                </Text>
                <input
                  type="number"
                  value={requirements[stat] || ''}
                  onChange={(e) => setRequirements(prev => ({
                    ...prev,
                    [stat]: e.target.value ? parseInt(e.target.value, 10) : undefined
                  }))}
                  placeholder="0"
                  min="0"
                  className="w-full h-10 rounded-lg bg-background/95 border-2 border-border/50 px-3"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl border-2 border-destructive/20 bg-destructive/5">
          <Text className="text-sm text-destructive">{error}</Text>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Equipment'}
        </Button>
      </div>
    </form>
  )
}
