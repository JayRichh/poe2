"use client";

import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { GradientBackground } from "~/components/ui/GradientBackground";
import { Text } from "~/components/ui/Text";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <GradientBackground />
      <Container className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="space-y-2">
            <Text variant="h1" className="text-4xl font-bold">
              Something went wrong
            </Text>
            <Text className="text-foreground/70">
              {error.message || "An unexpected error occurred"}
            </Text>
          </div>

          <div className="flex justify-center gap-4">
            <Button onClick={reset}>Try again</Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")}>
              Go home
            </Button>
          </div>

          {process.env.NODE_ENV === "development" && error.digest && (
            <div className="mt-4 p-4 bg-background/40 backdrop-blur-sm rounded-lg border-2 border-border/50">
              <Text className="text-sm font-mono text-foreground/60">
                Error digest: {error.digest}
              </Text>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
