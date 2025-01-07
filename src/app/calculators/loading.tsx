import { Container } from "~/components/ui/Container";
import { Skeleton } from "~/components/ui/Skeleton";

export default function Loading() {
  return (
    <Container className="py-6 md:py-8 min-w-[80vw]">
      <div className="mx-auto space-y-12">
        {/* Header Skeleton */}
        <div className="mx-auto">
          <Skeleton className="h-12 w-64 mb-6" />
          <Skeleton className="h-6 w-full max-w-2xl" />
        </div>

        {/* Calculators Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col p-6 rounded-xl border border-border/50 bg-background/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-9 w-9 rounded-lg" />
                <Skeleton className="h-6 w-32" />
              </div>
              
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              
              <div className="mt-auto grid grid-cols-2 gap-2">
                {[...Array(4)].map((_, j) => (
                  <Skeleton key={j} className="h-6 w-full rounded-md" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
