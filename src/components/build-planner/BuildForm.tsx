'use client'

import { useState } from 'react'
import { Container } from '~/components/ui/Container'
import { Text } from '~/components/ui/Text'
import { Button } from '~/components/ui/Button'
import type { Database } from '~/lib/supabase/types'

type Build = Database['public']['Tables']['builds']['Row']

interface BuildFormProps {
  initialBuild?: Partial<Build>
  onSubmit: (build: Partial<Build>) => Promise<void>
}

export function BuildForm({ initialBuild, onSubmit }: BuildFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [name, setName] = useState(initialBuild?.name || '')
  const [description, setDescription] = useState(initialBuild?.description || '')
  const [poeClass, setPoeClass] = useState(initialBuild?.poe_class || '')
  const [level, setLevel] = useState(initialBuild?.level?.toString() || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return

    setLoading(true)
    setError(null)

    try {
      await onSubmit({
        name,
        description,
        poe_class: poeClass,
        level: level ? parseInt(level, 10) : undefined
      })
    } catch (err) {
      console.error('Error saving build:', err)
      setError('Failed to save build')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Text className="text-sm text-foreground/60">Build Name</Text>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter build name"
            className="w-full h-12 rounded-xl bg-background/95 border-2 border-border/50 px-4"
            required
          />
        </div>

        <div className="space-y-2">
          <Text className="text-sm text-foreground/60">Description</Text>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter build description"
            className="w-full h-24 rounded-xl bg-background/95 border-2 border-border/50 p-4 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Text className="text-sm text-foreground/60">Class</Text>
            <select
              value={poeClass}
              onChange={(e) => setPoeClass(e.target.value)}
              className="w-full h-12 rounded-xl bg-background/95 border-2 border-border/50 px-4"
            >
              <option value="">Select class</option>
              <option value="duelist">Duelist</option>
              <option value="marauder">Marauder</option>
              <option value="ranger">Ranger</option>
              <option value="scion">Scion</option>
              <option value="shadow">Shadow</option>
              <option value="templar">Templar</option>
              <option value="witch">Witch</option>
            </select>
          </div>

          <div className="space-y-2">
            <Text className="text-sm text-foreground/60">Level</Text>
            <input
              type="number"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              placeholder="Enter level"
              min="1"
              max="100"
              className="w-full h-12 rounded-xl bg-background/95 border-2 border-border/50 px-4"
            />
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
          {loading ? 'Saving...' : 'Save Build'}
        </Button>
      </div>
    </form>
  )
}
