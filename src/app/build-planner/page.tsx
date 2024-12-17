import { Suspense } from 'react'
import { Text } from '~/components/ui/Text'
import { Button } from '~/components/ui/Button'
import { BuildList } from './BuildList'

export default function BuildPlannerPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)]">
        <div className="flex items-center justify-between gap-4">
            <Text className="text-3xl font-bold">Build Planner</Text>
            <Text className="text-foreground/60">
              Browse and explore Path of Exile builds
            </Text>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <Text className="text-lg font-medium">Available Builds</Text>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Templates
              </Button>
              <Button variant="outline" size="sm">
                Public Builds
              </Button>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="text-center py-12">
                <Text className="text-foreground/60">Loading builds...</Text>
              </div>
            }
          >
            <BuildList />
          </Suspense>
        </div>
    </div>
  )
}
