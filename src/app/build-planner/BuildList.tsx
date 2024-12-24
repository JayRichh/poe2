"use client";

import { Suspense } from "react";

import { useSearchParams } from "next/navigation";

import { BuildGrid } from "~/components/build-planner/BuildGrid";
import { BuildListControls } from "~/components/build-planner/BuildListControls";
import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";

import { getBuilds } from "~/app/actions/builds";
import type { Database } from "~/lib/supabase/types";

type Build = Database["public"]["Tables"]["builds"]["Row"];

interface BuildListProps {
  initialBuilds: Build[];
}

const ITEMS_PER_PAGE = 12;

export function BuildList({ initialBuilds }: BuildListProps) {
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page")) || 1;
  const search = searchParams?.get("search") || "";
  const poeClass = searchParams?.get("class") || "";
  const visibility = searchParams?.get("visibility") || "all";
  const sort = searchParams?.get("sort") || "created_at:desc";
  const groupBy = searchParams?.get("groupBy") as "poe_class" | "level" | "visibility" | undefined;

  // Filter and sort builds
  const filteredBuilds = initialBuilds
    .filter((build) => {
      if (search && !build.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (poeClass && build.poe_class !== poeClass) {
        return false;
      }
      if (visibility !== "all" && build.visibility !== visibility) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const [field, direction] = sort.split(":") as [keyof Build, "asc" | "desc"];
      const aVal = a[field];
      const bVal = b[field];
      const modifier = direction === "asc" ? 1 : -1;

      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      return aVal > bVal ? modifier : -modifier;
    });

  // Paginate builds
  const totalPages = Math.ceil(filteredBuilds.length / ITEMS_PER_PAGE);
  const paginatedBuilds = filteredBuilds.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">
      {/* Beta Notice */}
      <div className="p-4 rounded-xl border-2 border-primary/20 bg-primary/5">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <Text className="font-medium">Build Planner Beta</Text>
        </div>
        <Text className="text-sm text-foreground/60">
          The build planner is currently in beta. More features coming soon including build
          templates, public build sharing, character imports, and advanced build optimization tools.
        </Text>
      </div>

      {/* Controls */}
      <BuildListControls />

      {/* Build Grid */}
      <Suspense
        fallback={
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        }
      >
        {paginatedBuilds.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <Text className="font-medium">No Builds Found</Text>
            <Text className="text-sm text-foreground/60">
              Try adjusting your filters or create a new build
            </Text>
          </div>
        ) : (
          <BuildGrid builds={paginatedBuilds} groupBy={groupBy} />
        )}
      </Suspense>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => {
              const newSearchParams = new URLSearchParams(searchParams?.toString());
              newSearchParams.set("page", String(page - 1));
              window.history.pushState(null, "", `?${newSearchParams.toString()}`);
            }}
          >
            Previous
          </Button>
          <Text className="text-sm">
            Page {page} of {totalPages}
          </Text>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => {
              const newSearchParams = new URLSearchParams(searchParams?.toString());
              newSearchParams.set("page", String(page + 1));
              window.history.pushState(null, "", `?${newSearchParams.toString()}`);
            }}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
