import { Container } from '~/components/ui/Container'
import { Card } from '~/components/ui/Card'
import { Skeleton } from '~/components/ui/Skeleton'

export default function DPSCalcLoading() {
  return (
    <Container>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-full max-w-2xl" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weapon Form Skeletons */}
            {[1, 2].map((i) => (
              <Card key={i} className="p-6">
                <div className="space-y-6">
                  <Skeleton className="h-7 w-32" />
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((j) => (
                      <div key={j} className="space-y-2">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Global Settings Skeleton */}
          <Card className="p-6">
            <div className="space-y-6">
              <Skeleton className="h-7 w-40" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Container>
  )
}
