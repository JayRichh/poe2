import { Card, CardContent } from "~/components/ui/Card";
import { Container } from "~/components/ui/Container";
import { Skeleton } from "~/components/ui/Skeleton";

export default function RootLoading() {
  return (
    <Container>
      <div className="relative py-20 space-y-12">
        <div className="space-y-6 text-center">
          <Skeleton className="h-14 max-w-3xl mx-auto" />
          <Skeleton className="h-12 max-w-2xl mx-auto" />
          <div className="flex items-center justify-center gap-4 pt-4">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 w-32" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-7 w-32 rounded-full" />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i}>
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
