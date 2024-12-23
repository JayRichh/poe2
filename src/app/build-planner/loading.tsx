import { Container } from "~/components/ui/Container";
import { Skeleton } from "~/components/ui/Skeleton";
import { Text } from "~/components/ui/Text";

export default function BuildPlannerLoading() {
  return (
    <div className="min-h-screen">
      <Container size="xl" noPadding>
        <div className="space-y-4">
          {/* Beta Notice */}
          <div className="p-4 rounded-xl border-2 border-primary/20 bg-primary/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <Text className="font-medium">Build Planner Beta</Text>
            </div>
            <Text className="text-sm text-foreground/60">
              The build planner is currently in beta. More features coming soon including build
              templates, public build sharing, character imports, and advanced build optimization tools.
            </Text>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-10 w-48" />
            </div>
          </div>

          {/* View Controls */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-24" />
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>

          {/* Build Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border-2 border-border/50 bg-background/95 space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <Skeleton className="h-5 w-16 flex-shrink-0" />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
      </Container>
    </div>
  );
}
