"use client";

import Link from "next/link";
import { memo, useMemo } from "react";
import { useAuth } from "~/contexts/auth";
import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";
import { BuildActions } from "./BuildActions";

import type { Database } from "~/lib/supabase/types";

type Build = Database["public"]["Tables"]["builds"]["Row"];
type GroupByKey = "poe_class" | "level" | "visibility";

interface BuildGridProps {
  builds: Build[];
  groupBy?: GroupByKey;
  viewMode?: "grid" | "list" | "grouped";
}

function getGroupKey(build: Build, key: GroupByKey): string {
  switch (key) {
    case "poe_class":
      return build.poe_class || "Other";
    case "level":
      return build.level ? `Level ${build.level}` : "No Level";
    case "visibility":
      return build.visibility;
  }
}

const BuildCard = memo(function BuildCard({ build }: { build: Build }) {
  const { user } = useAuth();
  const canModify = useMemo(() => 
    Boolean(user && build.user_id === user.id && build.visibility !== 'public'),
    [user, build.user_id, build.visibility]
  );

  return (
    <div
      className="group relative block p-4 rounded-xl border-2 border-border/50 bg-background/95 hover:border-primary/50 hover:bg-muted/30 transition-all"
      role="article"
      aria-label={`${build.name} build for ${build.poe_class || "Any Class"}`}
    >
      {/* Visibility Badge */}
      <div className="absolute -top-2 -right-2 px-2 py-1 rounded-lg text-xs font-medium capitalize"
        style={{
          backgroundColor: build.visibility === 'public' ? 'rgb(34 197 94)' : // green-500
                          build.visibility === 'unlisted' ? 'rgb(234 179 8)' : // yellow-500
                          'rgb(239 68 68)', // red-500
          color: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        {build.visibility}
      </div>
      <div className="flex items-start justify-between gap-2">
        <Link
          href={`/build-planner/${build.slug || build.id}`}
          className="flex-1 min-w-0 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md"
        >
          <Text className="font-medium line-clamp-1 hover:text-primary transition-colors">
            {build.name}
          </Text>
          {build.description && (
            <Text className="text-sm text-foreground/60 line-clamp-2 mt-1">
              {build.description}
            </Text>
          )}
        </Link>
        <div className="flex items-center gap-3">
          <Text className="text-sm text-foreground/40">Level {build.level || "?"}</Text>
          <BuildActions build={build} canModify={canModify} />
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
        <Link href={`/build-planner/${build.slug || build.id}`}>
          <Button
            variant="outline"
            size="sm"
            tabIndex={-1}
            className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            View Build
          </Button>
        </Link>
      </div>
    </div>
  );
});

const BuildListItem = memo(function BuildListItem({ build }: { build: Build }) {
  const { user } = useAuth();
  const canModify = useMemo(() => 
    Boolean(user && build.user_id === user.id && build.visibility !== 'public'),
    [user, build.user_id, build.visibility]
  );

  return (
    <div
      className="group relative flex items-center justify-between gap-4 p-3 rounded-lg border border-border/50 bg-background/95 hover:border-primary/50 hover:bg-muted/30 transition-all"
      role="article"
      aria-label={`${build.name} build for ${build.poe_class || "Any Class"}`}
    >
      {/* Visibility Badge */}
      <div className="absolute -top-2 -right-2 px-2 py-1 rounded-lg text-xs font-medium capitalize"
        style={{
          backgroundColor: build.visibility === 'public' ? 'rgb(34 197 94)' : // green-500
                          build.visibility === 'unlisted' ? 'rgb(234 179 8)' : // yellow-500
                          'rgb(239 68 68)', // red-500
          color: '#fff',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
      >
        {build.visibility}
      </div>
      <Link
        href={`/build-planner/${build.slug || build.id}`}
        className="flex items-center gap-6 flex-1 min-w-0 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md"
      >
        <div className="flex-1 min-w-0">
          <Text className="font-medium truncate hover:text-primary transition-colors">
            {build.name}
          </Text>
          {build.description && (
            <Text className="text-sm text-foreground/60 truncate">{build.description}</Text>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Text className="text-sm text-foreground/60 capitalize whitespace-nowrap">
            {build.poe_class || "Any Class"}
          </Text>
          <Text className="text-sm text-foreground/40 whitespace-nowrap">
            Level {build.level || "?"}
          </Text>
        </div>
      </Link>

      <div className="flex items-center gap-3 flex-shrink-0">
        {build.is_template && (
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs whitespace-nowrap">
            Template
          </span>
        )}
        <BuildActions build={build} canModify={canModify} />
      </div>
    </div>
  );
});

export function BuildGrid({ builds, groupBy, viewMode = "grid" }: BuildGridProps) {
  // Memoize grouped builds
  const groupedBuilds = useMemo(() => {
    if (!groupBy) return null;
    return builds.reduce(
      (acc, build) => {
        const key = getGroupKey(build, groupBy);
        if (!acc[key]) acc[key] = [];
        acc[key].push(build);
        return acc;
      },
      {} as Record<string, Build[]>
    );
  }, [builds, groupBy]);

  return (
    <div className="space-y-6">
      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fadeIn">
          {builds.map((build) => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="space-y-3 animate-fadeIn">
          {builds.map((build) => (
            <BuildListItem key={build.id} build={build} />
          ))}
        </div>
      )}

      {/* Grouped View */}
      {viewMode === "grouped" && groupedBuilds && (
        <div className="space-y-8 animate-fadeIn">
          {Object.entries(groupedBuilds).map(([group, groupBuilds]) => (
            <div key={group}>
              <Text className="text-lg font-medium mb-4 capitalize">{group}</Text>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {groupBuilds.map((build) => (
                  <BuildCard key={build.id} build={build} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
