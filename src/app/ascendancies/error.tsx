"use client";

import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

export default function AscendanciesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <Container className="py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Text variant="h1" className="text-4xl font-bold mb-4">
          Something went wrong
        </Text>
        <Text className="text-lg text-foreground/80 mb-8 max-w-2xl">
          {error.message || "An error occurred while loading the ascendancy classes."}
        </Text>
        <div className="flex gap-4">
          <Button onClick={() => reset()} variant="primary">
            Try again
          </Button>
          <Button onClick={() => router.push("/")} variant="ghost">
            Return home
          </Button>
        </div>
      </div>
    </Container>
  );
}
