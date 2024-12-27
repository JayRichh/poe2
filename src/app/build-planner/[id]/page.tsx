import { Suspense } from "react";

import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { BuildOverview } from "~/components/build-planner/BuildOverview";
import { cn } from "~/utils/cn";
import { getBuild } from "~/app/actions/server/builds";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const build = await getBuild(id);

    return {
      title: build.name,
      description:
        build.description || `Level ${build.level || "?"} ${build.poe_class || "Unknown"} Build`,
    };
  } catch (error) {
    return {
      title: "Build Not Found",
    };
  }
}

export default async function BuildPage({ params }: PageProps) {
  try {
    const { id } = await params;
    const build = await getBuild(id);

    // Redirect to slug URL if accessed via UUID
    if (build.slug && id !== build.slug) {
      redirect(`/build-planner/${build.slug}`);
    }

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
        <BuildOverview build={build} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading build:", error);
    notFound();
  }
}
