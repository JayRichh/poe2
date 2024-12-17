import { Container } from '~/components/ui/Container'
import { Card } from '~/components/ui/Card'
import { Skeleton } from '~/components/ui/Skeleton'

export default function AuthLoading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
      <Container className="max-w-md py-12">
        <Card className="p-6 space-y-8">
          <div className="space-y-2 text-center">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-5 w-64 mx-auto" />
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            </div>

            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          <div className="space-y-4 text-center">
            <Skeleton className="h-5 w-48 mx-auto" />
            <Skeleton className="h-5 w-36 mx-auto" />
          </div>
        </Card>
      </Container>
    </div>
  )
}
