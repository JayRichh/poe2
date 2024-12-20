"use client";

import { AlertCircle } from "lucide-react";

import { useEffect } from "react";

import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Auth error:", error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Container className="max-w-md py-12">
        <div className="space-y-8">
          <div className="text-center">
            <Text className="text-3xl font-bold">Something went wrong</Text>
            <Text className="text-foreground/60 mt-2">
              We encountered an error during authentication
            </Text>
          </div>

          <div className="p-4 rounded-xl border-2 border-destructive/20 bg-destructive/5 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <Text className="text-sm text-destructive">
              {error.message || "An unexpected error occurred"}
            </Text>
          </div>

          <div className="flex justify-center">
            <Button onClick={reset} variant="primary" className="min-w-[200px]">
              Try again
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
