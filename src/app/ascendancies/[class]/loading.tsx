import { Card } from "~/components/ui/Card";
import { Container } from "~/components/ui/Container";
import { Spinner } from "~/components/ui/Spinner";

export default function AscendancyLoading() {
  return (
    <Container className="py-8">
      <div className="space-y-8">
        {/* Hero section skeleton */}
        <div className="relative h-64 w-full overflow-hidden rounded-xl bg-background-secondary/50 animate-pulse" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Playstyle skeleton */}
            <Card className="p-6">
              <div className="h-8 w-48 bg-background-secondary/50 rounded animate-pulse mb-4" />
              <div className="h-20 bg-background-secondary/50 rounded animate-pulse" />
            </Card>

            {/* Key Features skeleton */}
            <Card className="p-6">
              <div className="h-8 w-48 bg-background-secondary/50 rounded animate-pulse mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 bg-background-secondary/50 rounded animate-pulse" />
                ))}
              </div>
            </Card>

            {/* Core Mechanics skeleton */}
            <Card className="p-6">
              <div className="h-8 w-48 bg-background-secondary/50 rounded animate-pulse mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-6 bg-background-secondary/50 rounded animate-pulse" />
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Build Types skeleton */}
            <Card className="p-6">
              <div className="h-8 w-48 bg-background-secondary/50 rounded animate-pulse mb-4" />
              <div className="grid gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 bg-background-secondary/50 rounded animate-pulse" />
                ))}
              </div>
            </Card>

            {/* Getting Started skeleton */}
            <Card className="p-6">
              <div className="h-8 w-48 bg-background-secondary/50 rounded animate-pulse mb-4" />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-background-secondary/50 rounded animate-pulse" />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Container>
  );
}
