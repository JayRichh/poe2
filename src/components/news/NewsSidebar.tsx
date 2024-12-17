"use client";

import { Text } from "../ui/Text";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Clock, Newspaper, Megaphone, Trophy, Users } from "lucide-react";
import { useHeaderScroll } from "~/hooks/useHeaderScroll";
import { cn } from "~/utils/cn";

const categories = [
  {
    title: "All News",
    slug: "",
    icon: Newspaper
  },
  {
    title: "Updates",
    slug: "update",
    icon: Clock
  },
  {
    title: "Announcements",
    slug: "announcement",
    icon: Megaphone
  },
  {
    title: "Events",
    slug: "event",
    icon: Trophy
  },
  {
    title: "Community",
    slug: "community",
    icon: Users
  }
];

const sources = [
  { title: "Official", slug: "official" },
  { title: "Community", slug: "community" },
  { title: "Reddit", slug: "reddit" }
];

export function NewsSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "";
  const currentSource = searchParams.get("source") || "";
  const isVisible = useHeaderScroll();

  return (
    <div className={cn(
      "fixed top-0 left-0 w-64 transition-transform duration-300",
      isVisible ? "translate-y-20" : "translate-y-0"
    )}>
      <aside className="h-screen overflow-y-auto border-r border-border bg-card/50 backdrop-blur-sm">
        <nav className="p-3 space-y-4">
          {/* Categories */}
          <div className="space-y-1">
            <Text variant="h4" className="text-sm font-semibold text-foreground/80 px-2">
              Categories
            </Text>
            <ul className="space-y-0.5">
              {categories.map((category) => {
                const Icon = category.icon;
                const isActive = currentCategory === category.slug;
                
                return (
                  <li key={category.slug}>
                    <Link 
                      href={`/news${category.slug ? `?category=${category.slug}` : ''}`}
                      className={`flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors ${
                        isActive 
                          ? "bg-accent/20 text-accent" 
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {category.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sources */}
          <div className="space-y-1">
            <Text variant="h4" className="text-sm font-semibold text-foreground/80 px-2">
              Sources
            </Text>
            <ul className="space-y-0.5">
              {sources.map((source) => {
                const isActive = currentSource === source.slug;
                
                return (
                  <li key={source.slug}>
                    <Link 
                      href={`/news?source=${source.slug}`}
                      className={`block px-2 py-1.5 rounded text-sm transition-colors ${
                        isActive 
                          ? "bg-accent/20 text-accent" 
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                      }`}
                    >
                      {source.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Time Filter */}
          <div className="space-y-1">
            <Text variant="h4" className="text-sm font-semibold text-foreground/80 px-2">
              Time Range
            </Text>
            <ul className="space-y-0.5">
              {["Today", "This Week", "This Month"].map((range) => (
                <li key={range}>
                  <button 
                    className="w-full text-left px-2 py-1.5 rounded text-sm text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                  >
                    {range}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>
    </div>
  );
}
