"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { Container } from "~/components/ui/Container";

import { useHeaderScroll } from "~/hooks/useHeaderScroll";

import { cn } from "~/utils/cn";

const subNavLinks = [
  { href: "/news", label: "Latest" },
  { href: "/news?category=event", label: "Events" },
  { href: "/news?category=update", label: "Updates" },
  { href: "/news?category=announcement", label: "Announcements" },
  { href: "/news?category=community", label: "Community" },
  { href: "/news/patch-notes", label: "Patch Notes" },
];

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isVisible = useHeaderScroll();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="min-h-screen pt-12">
      <div
        className={cn(
          "fixed top-12 sm:top-16 left-0 right-0 h-12 bg-background/95 backdrop-blur-md border-b border-border/50 z-20 transition-all duration-300",
          !isVisible ? "-translate-y-[calc(100%+20px)]" : "translate-y-0"
        )}
      >
        <Container size="xl" noPadding>
          <div className="h-full flex items-center justify-start gap-6 px-4 sm:px-6 lg:px-8">
            {subNavLinks.map(({ href, label }) => {
              const isActive =
                href === "/news"
                  ? pathname === href && !category
                  : href === "/news/patch-notes"
                    ? pathname === href
                    : href === pathname + `?category=${category}`;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 relative group h-full flex items-center py-3",
                    isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
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
        </Container>
      </div>
      {children}
    </div>
  );
}
