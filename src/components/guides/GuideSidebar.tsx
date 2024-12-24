"use client";

import { ArrowUp, Book, Box, Coins, Crosshair, Map, Shield, Sword, User } from "lucide-react";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Text } from "~/components/ui/Text";

import { cn } from "~/utils/cn";

import { guidesWithMeta } from "~/lib/guides/data";
import type { GuideIcon } from "~/lib/guides/data";
import type { SectionKey } from "~/lib/guides/types";

interface GuideSidebarProps {
  collapsed?: boolean;
}

// Organize guides by section
const sections: Record<SectionKey, typeof guidesWithMeta> = {
  getting_started: guidesWithMeta.filter((g) => ["gameplay", "character-building"].includes(g.id)),
  combat_equipment: guidesWithMeta.filter((g) =>
    ["combat", "equipment", "boss-fights"].includes(g.id)
  ),
  progression_economy: guidesWithMeta.filter((g) =>
    ["progression", "trading", "mapping"].includes(g.id)
  ),
  additional: guidesWithMeta.filter((g) => ["cruel-mode"].includes(g.id)),
};

// Section titles
const sectionTitles: Record<SectionKey, string> = {
  getting_started: "Getting Started",
  combat_equipment: "Combat & Equipment",
  progression_economy: "Progression & Economy",
  additional: "Additional Content",
};

// Icon map
const IconMap: Record<GuideIcon, React.ComponentType<{ className?: string }>> = {
  Book,
  Coins,
  Sword,
  Shield,
  User,
  Box,
  Crosshair,
  ArrowUp,
  Map,
};

export function GuideSidebar({ collapsed }: GuideSidebarProps) {
  const pathname = usePathname();
  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const currentCategory = searchParams.get("category");

  return (
    <div className="p-2">
      <div className="space-y-1">
        <Link
          href="/guides"
          className={cn(
            "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
            !currentCategory ? "bg-primary/10 text-primary" : "text-foreground/70 hover:bg-muted/50"
          )}
        >
          <div className="flex items-center gap-3">
            <Book className={cn("w-4 h-4", collapsed && "mx-auto")} />
            {!collapsed && <span>All Guides</span>}
          </div>
        </Link>

        {/* Render sections */}
        {Object.entries(sections).map(([sectionKey, guides]) => (
          <div key={sectionKey} className="mt-6">
            {!collapsed && (
              <Text className="px-3 py-2 text-xs font-medium text-foreground/50 uppercase tracking-wider">
                {sectionTitles[sectionKey as SectionKey]}
              </Text>
            )}
            <div className="space-y-1 mt-2">
              {guides.map((guide) => {
                const isActive = currentCategory === guide.id;
                const Icon = IconMap[guide.icon];
                return (
                  <Link
                    key={guide.id}
                    href={`/guides?category=${guide.id}`}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-muted/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={cn("w-4 h-4", collapsed && "mx-auto")} />
                      {!collapsed && <span>{guide.title}</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
