'use client'

import { Text } from '~/components/ui/Text'
import { Card } from '~/components/ui/Card'
import type { Database } from '~/lib/supabase/types'

type Build = Database['public']['Tables']['builds']['Row']
type Equipment = Database['public']['Tables']['equipment']['Row']
type SkillGem = Database['public']['Tables']['skill_gems']['Row']
type BuildConfig = Database['public']['Tables']['build_configs']['Row']

interface BuildWithRelations extends Build {
  equipment?: Equipment[]
  skill_gems?: SkillGem[]
  build_configs?: BuildConfig[]
}

interface BuildOverviewProps {
  build: BuildWithRelations
}

export function BuildOverview({ build }: BuildOverviewProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="p-4">
        <Text className="font-medium mb-4">Equipment Summary</Text>
        {build.equipment?.length ? (
          <div className="space-y-2">
            {build.equipment.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4"
              >
                <Text className="text-sm text-foreground/60">
                  {item.slot}
                </Text>
                <Text className="text-sm font-medium">
                  {item.name}
                </Text>
              </div>
            ))}
          </div>
        ) : (
          <Text className="text-sm text-foreground/60">
            No equipment added yet
          </Text>
        )}
      </Card>

      <Card className="p-4">
        <Text className="font-medium mb-4">Skill Gems</Text>
        {build.skill_gems?.length ? (
          <div className="space-y-2">
            {build.skill_gems.map(gem => (
              <div
                key={gem.id}
                className="flex items-center justify-between gap-4"
              >
                <Text className="text-sm text-foreground/60">
                  {gem.name}
                </Text>
                <Text className="text-sm font-medium">
                  Level {gem.level} / {gem.quality}%
                </Text>
              </div>
            ))}
          </div>
        ) : (
          <Text className="text-sm text-foreground/60">
            No skill gems added yet
          </Text>
        )}
      </Card>

      <Card className="p-4">
        <Text className="font-medium mb-4">Build Configurations</Text>
        {build.build_configs?.length ? (
          <div className="space-y-2">
            {build.build_configs.map(config => (
              <div
                key={config.id}
                className="flex items-center justify-between gap-4"
              >
                <Text className="text-sm text-foreground/60">
                  {config.name}
                </Text>
                <Text className="text-sm font-medium">
                  {config.type}
                </Text>
              </div>
            ))}
          </div>
        ) : (
          <Text className="text-sm text-foreground/60">
            No configurations saved
          </Text>
        )}
      </Card>

      <Card className="p-4 sm:col-span-2 lg:col-span-3">
        <Text className="font-medium mb-4">Notes</Text>
        {build.notes ? (
          <Text className="text-sm whitespace-pre-wrap">
            {build.notes}
          </Text>
        ) : (
          <Text className="text-sm text-foreground/60">
            No notes added yet
          </Text>
        )}
      </Card>
    </div>
  )
}
