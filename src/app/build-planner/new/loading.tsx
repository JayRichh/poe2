import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

export default function NewBuildLoadingPage() {
  return (
    <Container>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="h-8 w-64 bg-foreground/10 rounded-lg animate-pulse mb-4" />
          <div className="h-4 w-96 bg-foreground/10 rounded-lg animate-pulse" />
        </div>

        {/* Form skeleton */}
        <div className="space-y-6 max-w-2xl">
          <div className="space-y-2">
            <div className="h-4 w-20 bg-foreground/10 rounded-lg animate-pulse" />
            <div className="h-10 w-full bg-foreground/10 rounded-lg animate-pulse" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-20 bg-foreground/10 rounded-lg animate-pulse" />
            <div className="h-10 w-full bg-foreground/10 rounded-lg animate-pulse" />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="h-4 w-16 bg-foreground/10 rounded-lg animate-pulse" />
              <div className="h-10 w-full bg-foreground/10 rounded-lg animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-16 bg-foreground/10 rounded-lg animate-pulse" />
              <div className="h-10 w-full bg-foreground/10 rounded-lg animate-pulse" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="h-4 w-20 bg-foreground/10 rounded-lg animate-pulse" />
            <div className="h-10 w-full bg-foreground/10 rounded-lg animate-pulse" />
          </div>

          <div className="flex items-center gap-4 pt-4">
            <div className="h-10 w-32 bg-foreground/10 rounded-lg animate-pulse" />
            <div className="h-10 w-24 bg-foreground/10 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    </Container>
  );
}
