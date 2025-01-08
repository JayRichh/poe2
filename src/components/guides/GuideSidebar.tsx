"use client";

import { Book } from "lucide-react";

import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { IconMap } from "~/components/mechanics/IconMap";
import { Text } from "~/components/ui/Text";
import { Tooltip } from "~/components/ui/Tooltip";

import { useSidebarWidth } from "~/hooks/useSidebarWidth";

import { cn } from "~/utils/cn";

import { guidesBySection } from "~/lib/guides/data";
import { sectionTitles } from "~/lib/shared/types";

export function GuideSidebar() {
  const { isCollapsed } = useSidebarWidth();
  const pathname = usePathname();
  const currentCategory = pathname.split("/").pop();

  const NavLink = ({
    href,
    icon: Icon,
    label,
    isActive,
  }: {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    isActive: boolean;
  }) => {
    const linkContent = (
      <div className={cn("flex items-center gap-3", isCollapsed && "justify-center w-full")}>
        <Icon
          className={cn(
            "w-5 h-5 transition-colors",
            isActive ? "text-primary" : "text-foreground/70 group-hover:text-foreground"
          )}
        />
        {!isCollapsed && <span>{label}</span>}
      </div>
    );

    const link = (
      <Link
        href={href}
        className={cn(
          "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors relative",
          isActive
            ? "bg-primary/10 text-primary hover:bg-primary/20"
            : "text-foreground/70 hover:bg-muted/50 hover:text-foreground"
        )}
      >
        {linkContent}
      </Link>
    );

    if (!isCollapsed) return link;

    return (
      <Tooltip content={label} position="right" className="block">
        {link}
      </Tooltip>
    );
  };

  return (
    <div className={cn("p-2", isCollapsed && "w-[60px]")}>
      <div className="space-y-1">
        <NavLink href="/guides" icon={Book} label="All Guides" isActive={!currentCategory} />

        {/* Render sections */}
        {Object.entries(guidesBySection).map(([sectionKey, guides]) => (
          <div key={sectionKey} className="mt-6">
            {!isCollapsed && (
              <Text className="px-3 py-2 text-xs font-medium text-foreground/50 uppercase tracking-wider">
                {sectionTitles[sectionKey as keyof typeof sectionTitles]}
              </Text>
            )}
            <div className="space-y-1 mt-2">
              {guides.map((guide) => {
                const isActive = currentCategory === guide.id;
                const Icon = IconMap[guide.icon] || Book;
                return (
                  <NavLink
                    key={guide.id}
                    href={`/guides/${guide.id}`}
                    icon={Icon}
                    label={guide.title}
                    isActive={isActive}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
