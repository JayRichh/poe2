"use client";

import { useEffect } from "react";
import { Button } from "~/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto text-center py-8">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-muted-foreground mb-6">
        There was an error loading this guide. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
