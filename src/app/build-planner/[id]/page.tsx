import { Suspense } from "react";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BuildOverview } from "~/components/build-planner/BuildOverview";

import { cn } from "~/utils/cn";

import { getBuild } from "~/app/actions/builds";
import type { Database } from "~/lib/supabase/types";

type Build = Database["public"]["Tables"]["builds"]["Row"];
type Equipment = Database["public"]["Tables"]["equipment"]["Row"];
type SkillGem = Database["public"]["Tables"]["skill_gems"]["Row"];
type BuildConfig = Database["public"]["Tables"]["build_configs"]["Row"];

interface BuildWithRelations extends Build {
  equipment: Equipment[];
  skill_gems: SkillGem[];
  build_configs: BuildConfig[];
}

interface PageProps {
  params: Promise<{ id: string }> | undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!params) return { title: "Build Not Found" };

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
  if (!params) notFound();

  try {
    const { id } = await params;
    const build = await getBuild(id);
    if (!build) notFound();

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
        <BuildOverview build={build as BuildWithRelations} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading build:", error);
    notFound();
  }
}
