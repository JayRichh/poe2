"use client";

import { Book } from "lucide-react";

import { IconMap } from "~/components/mechanics/IconMap";

import { useSidebarWidth } from "~/hooks/useSidebarWidth";

import { mechanicsWithMeta } from "~/lib/mechanics/data";

export function MechanicsSidebar() {
  const { isCollapsed } = useSidebarWidth();

  return (
    <nav className="space-y-0.5">
      {mechanicsWithMeta.map((mechanic) => {
        const Icon = IconMap[mechanic.icon] || Book;
        return (
          <a
            key={mechanic.id}
            href={`/mechanics/${mechanic.id}`}
            className="flex items-center gap-3 px-4 py-2 hover:bg-accent transition-colors"
            title={isCollapsed ? mechanic.title : undefined}
          >
            <div className="flex-shrink-0">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            {!isCollapsed && <span className="text-sm truncate">{mechanic.title}</span>}
          </a>
        );
      })}
    </nav>
  );
}
