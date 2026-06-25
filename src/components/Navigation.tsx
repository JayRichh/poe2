"use client";

import { Menu } from "lucide-react";

import { useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { NAV_GROUPS, SECONDARY_LINKS } from "~/config/nav";

import { useHeaderScroll } from "~/hooks/useHeaderScroll";

import { cn } from "~/utils/cn";

import { Button } from "./ui/Button";
import { Dropdown } from "./ui/Dropdown";
import { FullscreenMenu } from "./ui/FullscreenMenu";

export function Navigation() {
  const isVisible = useHeaderScroll();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-[50] transition-all duration-300",
          !isVisible ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-lg" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-16">
            <div className="flex items-center">
              <Link href="/" className="mr-12">
                <span className="font-display text-2xl font-bold text-gilded">POE2 Tools</span>
              </Link>

              <div className="hidden lg:flex items-center">
                <div className="flex items-center space-x-10">
                  {NAV_GROUPS.map((group) => (
                    <Dropdown
                      key={group.id}
                      trigger={
                        <button
                          className="text-base font-medium tracking-wide text-foreground/90 hover:text-primary transition-colors flex items-center gap-2.5 py-1"
                          aria-label={`${group.label} menu`}
                          aria-expanded="false"
                          aria-haspopup="true"
                        >
                          {group.label}
                          <svg
                            width="12"
                            height="7"
                            viewBox="0 0 12 7"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="opacity-60"
                          >
                            <path
                              d="M1 1L6 6L11 1"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      }
                      items={group.items.map((subItem) => {
                        const Icon = subItem.icon;
                        return {
                          label: subItem.label,
                          value: subItem.href,
                          icon: <Icon className="h-4 w-4" />,
                        };
                      })}
                      onChange={(value) => router.push(value)}
                      position="bottom-left"
                      width={280}
                    />
                  ))}
                </div>

                <div className="flex items-center space-x-8 border-l border-foreground/10 ml-10 pl-10">
                  {SECONDARY_LINKS.map(({ href, label }) => {
                    const isActive = pathname === href || pathname?.startsWith(`${href}/`);
                    return (
                      <Link
                        key={href}
                        href={href}
                        prefetch={false}
                        className={cn(
                          "text-[15px] transition-colors duration-200",
                          isActive
                            ? "text-primary/90"
                            : "text-foreground/70 hover:text-foreground/90"
                        )}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 lg:hidden">
              <Button
                onClick={() => setIsMenuOpen(true)}
                variant="ghost"
                size="icon"
                className="p-2.5 rounded-lg hover:bg-background-secondary/80 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
