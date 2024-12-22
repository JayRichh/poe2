"use client";

import { Clock, Megaphone, Newspaper, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "~/utils/cn";
import { Text } from "../ui/Text";

interface Category {
  title: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Source {
  title: string;
  slug: string;
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
    title: "Updates",
    slug: "update",
    icon: Clock,
  },
  {
    title: "Announcements",
    slug: "announcement",
    icon: Megaphone,
  },
  {
    title: "Events",
    slug: "event",
    icon: Trophy,
  },
  {
    title: "Community",
    slug: "community",
    icon: Users,
  },
];

const sources: Source[] = [
  { title: "Official", slug: "official" },
  { title: "Community", slug: "community" },
  { title: "Reddit", slug: "reddit" },
];

const timeRanges = ["Today", "This Week", "This Month"] as const;
type TimeRange = typeof timeRanges[number];

export function NewsSidebar({ collapsed }: NewsSidebarProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams?.get("category") || "";
  const currentSource = searchParams?.get("source") || "";

  const handleTimeRangeClick = (range: TimeRange) => {
    // TODO: Implement time range filtering
    console.log("Selected time range:", range);
  };

  return (
    <nav className="py-4 space-y-6" aria-label="News navigation">
      {/* Categories */}
      <div role="region" aria-label="News categories">
        {!collapsed && (
          <Text className="text-sm font-medium text-foreground/70 px-4 mb-2">
            Categories
          </Text>
        )}
        <div className="space-y-0.5">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = currentCategory === category.slug;

            return (
              <Link
                key={category.slug}
                href={`/news${category.slug ? `?category=${category.slug}` : ""}`}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors mx-2",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                )}
                aria-current={isActive ? "page" : undefined}
                title={collapsed ? category.title : undefined}
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {!collapsed && <span>{category.title}</span>}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Sources */}
      {!collapsed && (
        <div className="border-t border-border/30 pt-6" role="region" aria-label="News sources">
          <Text className="text-sm font-medium text-foreground/70 px-4 mb-2">
            Sources
          </Text>
          <div className="space-y-0.5">
            {sources.map((source) => {
              const isActive = currentSource === source.slug;

              return (
                <Link
                  key={source.slug}
                  href={`/news?source=${source.slug}`}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors mx-2",
                    isActive
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{source.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Time Filter */}
      {!collapsed && (
        <div className="border-t border-border/30 pt-6" role="region" aria-label="Time range filter">
          <Text className="text-sm font-medium text-foreground/70 px-4 mb-2">
            Time Range
          </Text>
          <div className="space-y-0.5">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => handleTimeRangeClick(range)}
                className="w-full text-left px-4 py-2 text-sm rounded-lg mx-2 text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                type="button"
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
