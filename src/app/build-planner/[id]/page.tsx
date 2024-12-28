import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuildOverview } from "~/components/build-planner/BuildOverview";
import { cn } from "~/utils/cn";
import { getBuild } from "~/app/actions/server/builds";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Build Details - POE2 Build Planner",
  description: "View build details and configuration",
};

export default function BuildPage() {
  return (
    <Suspense
      fallback={
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-48 animate-pulse rounded-xl bg-foreground/5",
                i === 3 && "sm:col-span-2 lg:col-span-3"
              )}
            />
          ))}
        </div>
      }
    >
      <BuildOverview />
    </Suspense>
  );
}
