"use client";

import React, { useMemo, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "~/utils/cn";
import { Button } from "~/components/ui/Button";

type RouteSegment = {
  label: string;
  path: string;
  children?: RouteSegment[];
};

const routeConfig: RouteSegment[] = [
  {
    label: "Build Planner",
    path: "/build-planner",
    children: [
      { label: "Equipment", path: "/equipment" },
      { label: "Skills", path: "/skills" },
      { label: "Stats", path: "/stats" },
      { label: "Notes", path: "/notes" },
      { label: "Import/Export", path: "/import-export" },
    ],
  },
  {
    label: "Guides",
    path: "/guides",
  },
  {
    label: "News",
    path: "/news",
    children: [
      { label: "Latest", path: "" },
      { label: "Events", path: "?category=event" },
      { label: "Updates", path: "?category=update" },
      { label: "Announcements", path: "?category=announcement" },
      { label: "Community", path: "?category=community" },
      { label: "Patch Notes", path: "/patch-notes" },
    ],
  },
  {
    label: "Mechanics",
    path: "/mechanics",
  },
];

export function ContextSelector() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const currentContext = useMemo(() => {
    const rootSegment = segments[0];
    return routeConfig.find((route) => route.path.startsWith(`/${rootSegment}`));
  }, [segments]);

  const breadcrumbs = useMemo(() => {
    if (!currentContext) return [];

    const result = [{ label: currentContext.label, path: currentContext.path }];
    let currentPath = currentContext.path;

    for (let i = 1; i < segments.length; i++) {
      const segment = segments[i];
      currentPath += `/${segment}`;
      
      // Handle dynamic segments (e.g., [id])
      const label = segment.startsWith("[") 
        ? segment.replace(/[\[\]]/g, "") 
        : segment;

      result.push({
        label: label.charAt(0).toUpperCase() + label.slice(1),
        path: currentPath,
      });
    }

    return result;
  }, [currentContext, segments]);

  if (!currentContext) return null;

  return (
    <div className="flex items-center gap-1.5">
      <div className={cn("relative", isOpen && "z-[100]")} ref={containerRef}>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-7 text-sm gap-1",
            !currentContext.children && "pr-2"
          )}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
        >
          {currentContext.label}
          {currentContext.children && (
            <ChevronDown 
              className={cn(
                "w-4 h-4 transition-transform duration-200",
                isOpen && "rotate-180"
              )} 
            />
          )}
        </Button>
        
        {currentContext.children && (
          <div 
            data-dropdown
            className={cn(
              "absolute top-full left-0 mt-1 w-48 py-1",
              "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
              "border border-border/50 rounded-xl shadow-lg",
              "transform transition-all duration-200 origin-top",
              "z-[100]",
              isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
            )}
          >
            {currentContext.children.map((child) => (
              <Link
                key={child.path}
                href={`${currentContext.path}${child.path}`}
                className="block px-3 py-1.5 text-sm hover:bg-primary/5 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                {child.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      {breadcrumbs.length > 1 && (
        <>
          {breadcrumbs.slice(1).map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
              <Link 
                href={crumb.path}
                className={cn(
                  "text-sm text-muted-foreground hover:text-foreground transition-colors",
                  index === breadcrumbs.length - 2 && "text-foreground"
                )}
              >
                {crumb.label}
              </Link>
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
}
