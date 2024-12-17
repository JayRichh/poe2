'use client'

import { useState } from 'react'
import { Container } from '~/components/ui/Container'
import { Text } from '~/components/ui/Text'
import { Button } from '~/components/ui/Button'
import type { Database } from '~/lib/supabase/types'

type BuildInsert = Database['public']['Tables']['builds']['Insert']
type VisibilityType = Database['public']['Enums']['visibility_type']

type POEClass = 'duelist' | 'marauder' | 'ranger' | 'scion' | 'shadow' | 'templar' | 'witch'

// Omit user_id since it's handled by the server
type BuildFormData = Omit<BuildInsert, 'user_id'>

interface BuildFormProps {
  initialBuild?: Partial<BuildFormData>
  onSubmit: (build: Partial<BuildFormData>) => Promise<void>
}

export function BuildForm({ initialBuild, onSubmit }: BuildFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [name, setName] = useState(initialBuild?.name || '')
  const [description, setDescription] = useState(initialBuild?.description || '')
  const [poeClass, setPoeClass] = useState<POEClass | ''>(initialBuild?.poe_class as POEClass || '')
  const [level, setLevel] = useState(initialBuild?.level?.toString() || '')
  const [visibility, setVisibility] = useState<VisibilityType>(initialBuild?.visibility || 'private')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return

    setLoading(true)
    setError(undefined)

    try {
      await onSubmit({
        name,
        description: description || undefined,
        poe_class: poeClass || undefined,
        level: level ? parseInt(level, 10) : undefined,
        visibility,
        is_template: false // Default value
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
              onChange={(e) => setPoeClass(e.target.value as POEClass)}
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

        <div className="space-y-2">
          <Text className="text-sm text-foreground/60">Visibility</Text>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as VisibilityType)}
            className="w-full h-12 rounded-xl bg-background/95 border-2 border-border/50 px-4"
            required
          >
            <option value="private">Private</option>
            <option value="public">Public</option>
            <option value="unlisted">Unlisted</option>
          </select>
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
