"use client";

import { Edit2, Grid, LayoutGrid, List, MoreVertical, Trash2 } from "lucide-react";

import { useTransition, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { deleteBuild } from "~/app/actions/builds";
import { Button } from "~/components/ui/Button";
import { Dropdown } from "~/components/ui/Dropdown";
import { Text } from "~/components/ui/Text";
import { Toast } from "~/components/ui/Toast";

import type { Database } from "~/lib/supabase/types";

type Build = Database["public"]["Tables"]["builds"]["Row"];
type GroupByKey = "poe_class" | "level" | "visibility";

interface BuildGridProps {
  builds: Build[];
  groupBy?: GroupByKey;
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

export function BuildGrid({ builds, groupBy }: BuildGridProps) {
  const [viewType, setViewType] = useState<"grid" | "list" | "grouped">("grid");

  // Group builds if needed
  const groupedBuilds = groupBy
    ? builds.reduce(
        (acc, build) => {
          const key = getGroupKey(build, groupBy);
          if (!acc[key]) acc[key] = [];
          acc[key].push(build);
          return acc;
        },
        {} as Record<string, Build[]>
      )
    : null;

  return (
    <div className="space-y-6">
      {/* View Controls */}
      <div className="flex items-center justify-between">
        <Text className="text-sm text-foreground/60">
          {builds.length} build{builds.length === 1 ? "" : "s"}
        </Text>
        <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
          <button
            className={`p-1.5 rounded-md transition-colors ${
              viewType === "grid"
                ? "bg-background text-foreground shadow-sm"
                : "text-foreground/60 hover:text-foreground"
            }`}
            onClick={() => setViewType("grid")}
            title="Grid view"
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            className={`p-1.5 rounded-md transition-colors ${
              viewType === "list"
                ? "bg-background text-foreground shadow-sm"
                : "text-foreground/60 hover:text-foreground"
            }`}
            onClick={() => setViewType("list")}
            title="List view"
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            className={`p-1.5 rounded-md transition-colors ${
              viewType === "grouped"
                ? "bg-background text-foreground shadow-sm"
                : "text-foreground/60 hover:text-foreground"
            }`}
            onClick={() => setViewType("grouped")}
            title="Grouped view"
            aria-label="Grouped view"
          >
            <Grid className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {viewType === "grid" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fadeIn">
          {builds.map((build) => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>
      )}

      {/* List View */}
      {viewType === "list" && (
        <div className="space-y-3 animate-fadeIn">
          {builds.map((build) => (
            <BuildListItem key={build.id} build={build} />
          ))}
        </div>
      )}

      {/* Grouped View */}
      {viewType === "grouped" && groupedBuilds && (
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

function BuildCard({ build }: { build: Build }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const router = useRouter();

  const handleAction = (action: string) => {
    if (action === "edit") {
      router.push(`/build-planner/${build.slug || build.id}/edit`);
    } else if (action === "delete") {
      startTransition(async () => {
        try {
          await deleteBuild(build.id);
          router.refresh();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to delete build");
        }
      });
    }
  };

  return (
    <div
      className="group block p-4 rounded-xl border-2 border-border/50 bg-background/95 hover:border-primary/50 hover:bg-muted/30 transition-all"
      role="article"
      aria-label={`${build.name} build for ${build.poe_class || "Any Class"}`}
    >
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
          <Dropdown
            trigger={
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-foreground/60 hover:text-primary"
                disabled={isPending}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            }
            items={[
              {
                label: "Edit Build",
                value: "edit",
                icon: <Edit2 className="h-4 w-4" />,
              },
              {
                label: "Delete Build",
                value: "delete",
                icon: <Trash2 className="h-4 w-4" />,
              },
            ]}
            onChange={handleAction}
            position="bottom-right"
          />
        </div>
      </div>

      {error && (
        <Toast 
          message={error}
          type="error"
          isVisible={!!error}
          onClose={() => setError(undefined)}
        />
      )}

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
}

function BuildListItem({ build }: { build: Build }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const router = useRouter();

  const handleAction = (action: string) => {
    if (action === "edit") {
      router.push(`/build-planner/${build.slug || build.id}/edit`);
    } else if (action === "delete") {
      startTransition(async () => {
        try {
          await deleteBuild(build.id);
          router.refresh();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to delete build");
        }
      });
    }
  };

  return (
    <div
      className="group flex items-center justify-between gap-4 p-3 rounded-lg border border-border/50 bg-background/95 hover:border-primary/50 hover:bg-muted/30 transition-all"
      role="article"
      aria-label={`${build.name} build for ${build.poe_class || "Any Class"}`}
    >
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

      {error && (
        <Toast 
          message={error}
          type="error"
          isVisible={!!error}
          onClose={() => setError(undefined)}
        />
      )}

      <div className="flex items-center gap-3 flex-shrink-0">
        {build.is_template && (
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs whitespace-nowrap">
            Template
          </span>
        )}
        <Dropdown
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground/60 hover:text-primary"
              disabled={isPending}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          }
          items={[
            {
              label: "Edit Build",
              value: "edit",
              icon: <Edit2 className="h-4 w-4" />,
            },
            {
              label: "Delete Build",
              value: "delete",
              icon: <Trash2 className="h-4 w-4" />,
            },
          ]}
          onChange={handleAction}
          position="bottom-right"
        />
      </div>
    </div>
  );
}
