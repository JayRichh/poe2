import { Container } from "~/components/ui/Container";
import { NewsSidebar } from "~/components/news/NewsSidebar";

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-accent/10 rounded-lg ${className}`} />
  );
}

export default function NewsLoading() {
  return (
    <div className="flex min-h-screen">
      <NewsSidebar />
      <main className="flex-1 min-h-[calc(100vh-4rem)]">
        <Container className="py-8">
          <div className="space-y-8">
            {/* Header Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-5 w-96" />
            </div>

            {/* Featured News Skeleton */}
            <div>
              <Skeleton className="h-8 w-40 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="rounded-lg border border-border bg-card p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-16 w-full" />
                    </div>
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent News Skeleton */}
            <div>
              <Skeleton className="h-8 w-40 mb-4" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 rounded-lg border border-border bg-card">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-12 w-full" />
                        </div>
                        <Skeleton className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
