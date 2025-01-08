"use client";

import { useItems } from "~/hooks/useItems";

export function ItemsProvider({ children }: { children: React.ReactNode }) {
  const { isLoading, error } = useItems();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-foreground/60">Loading items data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="text-destructive">Failed to load items data</div>
      </div>
    );
  }

  return <>{children}</>;
}
