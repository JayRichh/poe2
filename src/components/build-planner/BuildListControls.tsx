"use client";

import debounce from "lodash/debounce";
import { Grid, LayoutGrid, List, Search } from "lucide-react";

import { useCallback, useState } from "react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

const POE_CLASSES = [
  { value: "", label: "All Classes" },
  { value: "Acolyte", label: "Acolyte" },
  { value: "Druid", label: "Druid" },
  { value: "Warrior", label: "Warrior" },
  { value: "Rogue", label: "Rogue" },
  { value: "Sorcerer", label: "Sorcerer" },
  { value: "Ranger", label: "Ranger" },
] as SelectOption[];

const SORT_OPTIONS = [
  { value: "created_at:desc", label: "Newest First" },
  { value: "created_at:asc", label: "Oldest First" },
  { value: "name:asc", label: "Name (A-Z)" },
  { value: "name:desc", label: "Name (Z-A)" },
  { value: "level:desc", label: "Level (High to Low)" },
  { value: "level:asc", label: "Level (Low to High)" },
] as SelectOption[];

const VISIBILITY_OPTIONS = [
  { value: "all", label: "All Builds" },
  { value: "public", label: "Public Only" },
  { value: "unlisted", label: "Unlisted Only" },
  { value: "private", label: "Private Only" },
] as SelectOption[];

const GROUP_OPTIONS = [
  { value: "", label: "No Grouping" },
  { value: "poe_class", label: "Group by Class" },
  { value: "level", label: "Group by Level" },
  { value: "visibility", label: "Group by Visibility" },
] as SelectOption[];

export function BuildListControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);

  const createQueryString = useCallback(
    (params: Record<string, string | undefined>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, value);
        }
      });

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Debounced search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const query = createQueryString({ search: value || undefined });
      router.push(`?${query}`);
      setIsSearching(false);
    }, 300),
    [createQueryString, router]
  );

  return (
    <div className="space-y-4">
      {/* Search and Create */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <label htmlFor="search-builds" className="sr-only">
            Search builds
          </label>
          <Input
            id="search-builds"
            placeholder="Search builds..."
            className="pl-10"
            defaultValue={searchParams?.get("search") ?? ""}
            onChange={(e) => {
              setIsSearching(true);
              debouncedSearch(e.target.value);
            }}
            aria-label="Search builds"
          />
          <Search
            className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors ${
              isSearching ? "text-primary" : "text-foreground/40"
            }`}
          />
        </div>
        <Link href="/build-planner/new">
          <Button variant="primary" className="whitespace-nowrap">
            Create New Build
          </Button>
        </Link>
      </div>

      {/* View Controls and Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* View Mode */}
        <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-1">
          <button
            className={`p-1.5 rounded-md transition-colors ${
              searchParams?.get("view") !== "list" && searchParams?.get("view") !== "grouped"
                ? "bg-background text-foreground shadow-sm"
                : "text-foreground/60 hover:text-foreground"
            }`}
            onClick={() => {
              const query = createQueryString({ view: undefined });
              router.push(`?${query}`);
            }}
            title="Grid view"
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            className={`p-1.5 rounded-md transition-colors ${
              searchParams?.get("view") === "list"
                ? "bg-background text-foreground shadow-sm"
                : "text-foreground/60 hover:text-foreground"
            }`}
            onClick={() => {
              const query = createQueryString({ view: "list" });
              router.push(`?${query}`);
            }}
            title="List view"
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            className={`p-1.5 rounded-md transition-colors ${
              searchParams?.get("view") === "grouped"
                ? "bg-background text-foreground shadow-sm"
                : "text-foreground/60 hover:text-foreground"
            }`}
            onClick={() => {
              const query = createQueryString({ view: "grouped" });
              router.push(`?${query}`);
            }}
            title="Grouped view"
            aria-label="Grouped view"
          >
            <Grid className="h-4 w-4" />
          </button>
        </div>

        {/* Grouping */}
        <div className="w-48">
          <span className="sr-only" id="group-by-label">
            Group builds
          </span>
          <Select
            value={searchParams?.get("groupBy") ?? ""}
            onChange={(value: string) => {
              const query = createQueryString({
                groupBy: value || undefined,
                // Force grouped view when grouping is selected
                view: value ? "grouped" : undefined,
              });
              router.push(`?${query}`);
            }}
            options={GROUP_OPTIONS}
            className="w-full"
            aria-labelledby="group-by-label"
          />
        </div>

        {/* Class Filter */}
        <div className="w-48">
          <span className="sr-only" id="class-filter-label">
            Filter by class
          </span>
          <Select
            value={searchParams?.get("class") ?? ""}
            onChange={(value: string) => {
              const query = createQueryString({ class: value || undefined });
              router.push(`?${query}`);
            }}
            options={POE_CLASSES}
            className="w-full"
            aria-labelledby="class-filter-label"
          />
        </div>

        {/* Sort Order */}
        <div className="w-48">
          <span className="sr-only" id="sort-order-label">
            Sort builds
          </span>
          <Select
            value={searchParams?.get("sort") ?? "created_at:desc"}
            onChange={(value: string) => {
              const query = createQueryString({ sort: value });
              router.push(`?${query}`);
            }}
            options={SORT_OPTIONS}
            className="w-full"
            aria-labelledby="sort-order-label"
          />
        </div>

        {/* Visibility Filter */}
        <div className="w-48">
          <span className="sr-only" id="visibility-filter-label">
            Filter by visibility
          </span>
          <Select
            value={searchParams?.get("visibility") ?? "all"}
            onChange={(value: string) => {
              const query = createQueryString({
                visibility: value === "all" ? undefined : value,
              });
              router.push(`?${query}`);
            }}
            options={VISIBILITY_OPTIONS}
            className="w-full"
            aria-labelledby="visibility-filter-label"
          />
        </div>
      </div>
    </div>
  );
}
