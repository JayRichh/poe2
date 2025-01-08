import { PageLoading } from "~/components/shared/PageLoading";
import { Card, CardContent } from "~/components/ui/Card";
import { Container } from "~/components/ui/Container";
import { Skeleton } from "~/components/ui/Skeleton";

export default function RootLoading() {
  return (
    <Container>
      <div className="relative py-20 space-y-12">
        <PageLoading />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-7 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
