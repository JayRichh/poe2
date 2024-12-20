"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useHeaderScroll } from "~/hooks/useHeaderScroll";

import { cn } from "~/utils/cn";

const subNavLinks = [
  { href: "/build-planner", label: "Passive Tree" },
  { href: "/build-planner/equipment", label: "Equipment" },
  { href: "/build-planner/skills", label: "Skills" },
  { href: "/build-planner/stats", label: "Stats" },
  { href: "/build-planner/notes", label: "Notes" },
  { href: "/build-planner/import-export", label: "Import/Export" },
];

export default function BuildPlannerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isVisible = useHeaderScroll();

  return (
    <div className="min-h-screen pt-28">
      <div
        className={cn(
          "fixed top-12 sm:top-16 left-0 right-0 h-12 bg-background/80 backdrop-blur-md border-b border-border/50 z-20 transition-all duration-300",
          !isVisible ? "-translate-y-[calc(100%+20px)]" : "translate-y-0"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center space-x-8 h-full">
            {subNavLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 relative group h-full flex items-center",
                    isActive ? "text-primary" : "text-foreground hover:text-primary"
                  )}
                >
                  {label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary" />
                  )}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
