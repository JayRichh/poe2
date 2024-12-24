"use client";

import { Activity, ArrowUp, Book, Box, Coins, Crosshair, Map, Shield, Sword, User, Zap } from "lucide-react";
import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Text } from "~/components/ui/Text";
import { Tooltip } from "~/components/ui/Tooltip";
import { cn } from "~/utils/cn";
import { mechanicsWithMeta } from "~/lib/mechanics/data";
import type { ContentIcon } from "~/lib/shared/types";

interface MechanicsSidebarProps {
  collapsed?: boolean;
}

// Icon map
const IconMap: Record<ContentIcon, React.ComponentType<{ className?: string }>> = {
  Zap,
  Activity,
  User,
  Coins,
  Book,
  Sword,
  Shield,
  Box,
  Crosshair,
  ArrowUp,
  Map,
};

export function MechanicsSidebar({ collapsed }: MechanicsSidebarProps) {
  const pathname = usePathname();
  const currentSlug = pathname.split("/").pop();

  const NavLink = ({ href, icon: Icon, label, isActive }: { href: string; icon: React.ComponentType<{ className?: string }>; label: string; isActive: boolean }) => {
    const linkContent = (
      <div className={cn("flex items-center gap-3", collapsed && "justify-center w-full")}>
        <Icon className={cn(
          "w-5 h-5 transition-colors",
          isActive ? "text-primary" : "text-foreground/70 group-hover:text-foreground"
        )} />
        {!collapsed && <span>{label}</span>}
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

    if (!collapsed) return link;

    return (
      <Tooltip content={label} position="right" className="block">
        {link}
      </Tooltip>
    );
  };

  return (
    <div className={cn("p-2", collapsed && "w-[60px]")}>
      <div className="space-y-1">
        <NavLink
          href="/mechanics"
          icon={Zap}
          label="All Mechanics"
          isActive={pathname === "/mechanics"}
        />

        <div className="mt-6">
          {!collapsed && (
            <Text className="px-3 py-2 text-xs font-medium text-foreground/50 uppercase tracking-wider">
              Game Mechanics
            </Text>
          )}
          <div className="space-y-1 mt-2">
            {mechanicsWithMeta.map((mechanic) => {
              const isActive = currentSlug === mechanic.id;
              const Icon = IconMap[mechanic.icon] || Zap;
              return (
                <NavLink
                  key={mechanic.id}
                  href={`/mechanics/${mechanic.id}`}
                  icon={Icon}
                  label={mechanic.title}
                  isActive={isActive}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
