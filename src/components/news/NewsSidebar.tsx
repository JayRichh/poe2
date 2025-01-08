"use client";

import { Clock, FileText, Megaphone, Newspaper } from "lucide-react";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "~/utils/cn";

import { Text } from "../ui/Text";

interface Category {
  title: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NewsSidebarProps {
  collapsed?: boolean;
}

const categories: Category[] = [
  {
    title: "All News",
    slug: "",
    icon: Newspaper,
  },
  {
    title: "Announcements",
    slug: "announcements",
    icon: Megaphone,
  },
  {
    title: "Patch Notes",
    slug: "patch-notes",
    icon: FileText,
  },
];

const timeRanges = [
  { label: "All Time", value: "" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
] as const;

export function NewsSidebar({ collapsed }: NewsSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams?.get("category") || "";
  const currentTimeRange = searchParams?.get("timeRange") || "";

  const createUrlWithParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams?.toString());

    // Update or remove parameters
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    // Reset page when changing filters
    params.delete("page");

    return `/news${params.toString() ? `?${params.toString()}` : ""}`;
  };

  const handleTimeRangeClick = (range: string) => {
    const url = createUrlWithParams({ timeRange: range });
    router.push(url);
  };

  return (
    <nav className="py-4 space-y-6" aria-label="News navigation">
      {/* Categories */}
      <div role="region" aria-label="News categories">
        {!collapsed && (
          <Text className="text-sm font-medium text-foreground/70 px-4 mb-2">Categories</Text>
        )}
        <div className="space-y-0.5">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = currentCategory === category.slug;

            return (
              <Link
                key={category.slug}
                href={createUrlWithParams({
                  category: category.slug || null,
                  timeRange: currentTimeRange || null,
                })}
                className={cn(
                  "flex items-center gap-3 py-2 text-sm rounded-lg transition-colors mx-2",
                  collapsed ? "justify-center px-2" : "px-4",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                )}
                aria-current={isActive ? "page" : undefined}
                title={collapsed ? category.title : undefined}
              >
                <Icon className={cn("w-4 h-4", collapsed && "mx-auto")} aria-hidden="true" />
                {!collapsed && <span>{category.title}</span>}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Time Filter */}
      {!collapsed && (
        <div
          className="border-t border-border/30 pt-6"
          role="region"
          aria-label="Time range filter"
        >
          <Text className="text-sm font-medium text-foreground/70 px-4 mb-2">Time Range</Text>
          <div className="space-y-0.5">
            {timeRanges.map(({ label, value }) => {
              const isActive = currentTimeRange === value;
              return (
                <button
                  key={value}
                  onClick={() => handleTimeRangeClick(isActive ? "" : value)}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm rounded-lg mx-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                  )}
                  type="button"
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
