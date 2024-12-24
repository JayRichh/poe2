import { Container } from "~/components/ui/Container";
import { Skeleton } from "~/components/ui/Skeleton";

export default function TermsOfServiceLoading() {
  return (
    <Container size="md" className="py-16">
      <Skeleton className="h-12 w-64 mb-8" />

      <div className="space-y-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <section key={i} className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-5/6" />
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
