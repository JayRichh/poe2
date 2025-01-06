import { Container } from "~/components/ui/Container";
import { Skeleton } from "~/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="py-6 md:py-8 min-w-[80vw]">
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div>
          <Skeleton className="h-10 w-64 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full max-w-2xl" />
            <Skeleton className="h-4 w-3/4 max-w-xl" />
            <div className="flex items-center gap-2 mt-4">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
            </div>
          </div>
        </div>

        {/* Calculator Skeleton */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            {/* Input Panel Skeleton */}
            <div className="p-6 bg-card rounded-lg border border-border/60">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>

            {/* Results Panel Skeleton */}
            <div className="p-6 bg-card rounded-lg border border-border/60">
              <div className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <div className="space-y-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </div>
          </div>

          {/* History Panel Skeleton */}
          <div className="xl:border-l xl:border-border/60 xl:pl-6">
            <div className="p-6 bg-card rounded-lg border border-border/60">
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="p-3 bg-muted rounded-md">
                    <Skeleton className="h-5 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-1" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
