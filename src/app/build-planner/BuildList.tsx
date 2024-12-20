import Link from "next/link";

import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";

import { getBuilds } from "~/app/actions/builds";
import type { Database } from "~/lib/supabase/types";

type Build = Database["public"]["Tables"]["builds"]["Row"];

export async function BuildList() {
  const builds = await getBuilds();

  if (!builds?.length) {
    return (
      <div className="text-center py-12">
        <Text className="text-foreground/60">No builds found</Text>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {builds.map((build) => (
        <div
          key={build.id}
          className="p-4 rounded-xl border-2 border-border/50 bg-background/95 hover:border-primary/50 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <Text className="font-medium line-clamp-1">{build.name}</Text>
              {build.description && (
                <Text className="text-sm text-foreground/60 line-clamp-2 mt-1">
                  {build.description}
                </Text>
              )}
            </div>
            <div className="flex-shrink-0">
              <Text className="text-sm text-foreground/40">Level {build.level || "?"}</Text>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Text className="text-sm text-foreground/60 capitalize">
                {build.poe_class || "Any Class"}
              </Text>
              {build.is_template && (
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                  Template
                </span>
              )}
            </div>
            <Link href={`/build-planner/${build.id}`}>
              <Button variant="outline" size="sm">
                View Build
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
