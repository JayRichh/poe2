import { Container } from '~/components/ui/Container'
import { Card } from '~/components/ui/Card'
import { Skeleton } from '~/components/ui/Skeleton'

export default function ProfileLoading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] p-4">
      <Container className="max-w-2xl py-8 space-y-8">
        <div>
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-6 w-96 mt-2" />
        </div>

        {/* Profile Form */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>

          <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Connections */}
        <div className="space-y-4 pt-6 border-t border-border/50">
          <Skeleton className="h-6 w-32" />

          <Card className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-9 w-24" />
              </div>
            </div>
          </Card>
        </div>

        {/* Security */}
        <div className="space-y-4 pt-6 border-t border-border/50">
          <Skeleton className="h-6 w-24" />
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5" />
                <div className="space-y-1">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
              <Skeleton className="h-9 w-36" />
            </div>
          </Card>

          <Skeleton className="h-10 w-full" />
        </div>
      </Container>
    </div>
  )
}
