"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight, Layout, Sword, Book, BarChart2, FileText, Share2 } from "lucide-react";
import { cn } from "~/utils/cn";

interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  items?: NavItem[];
}

const navigation: NavItem[] = [
  {
    label: "Build Core",
    items: [
      { label: "Passive Tree", href: "/build-planner", icon: <Layout className="w-4 h-4" /> },
      { label: "Equipment", href: "/build-planner/equipment", icon: <Sword className="w-4 h-4" /> },
      { label: "Skills", href: "/build-planner/skills", icon: <Book className="w-4 h-4" /> },
    ]
  },
  {
    label: "Analysis",
    items: [
      { label: "Stats", href: "/build-planner/stats", icon: <BarChart2 className="w-4 h-4" /> },
      { label: "Notes", href: "/build-planner/notes", icon: <FileText className="w-4 h-4" /> },
    ]
  },
  {
    label: "Tools",
    items: [
      { label: "Import/Export", href: "/build-planner/import-export", icon: <Share2 className="w-4 h-4" /> },
    ]
  }
];

function NavGroup({ item }: { item: NavItem }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();

  if (!item.items) {
    return null;
  }

  return (
    <div className="border-b border-border/30 last:border-0">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 text-sm font-medium transition-colors",
          isExpanded ? "text-foreground" : "text-foreground/70 hover:text-foreground"
        )}
      >
        {item.label}
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 opacity-70" />
        ) : (
          <ChevronRight className="w-4 h-4 opacity-70" />
        )}
      </button>
      
      {isExpanded && (
        <div className="space-y-1 pb-3">
          {item.items.map((subItem) => (
            <Link
              key={subItem.href}
              href={subItem.href || "#"}
              className={cn(
                "flex items-center gap-3 px-4 py-2 text-sm rounded-lg transition-colors mx-2",
                pathname === subItem.href
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
              )}
            >
              {subItem.icon}
              {subItem.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function BuildPlannerSidebar() {
  return (
    <div className="py-4">
      <nav>
        {navigation.map((item, index) => (
          <NavGroup key={index} item={item} />
        ))}
      </nav>
    </div>
  );
}
