"use client";

import {
  Calculator,
  GitBranch,
  Layout,
  LogIn,
  LogOut,
  Menu,
  Newspaper,
  Settings,
  User,
  FileText,
} from "lucide-react";

import { useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useHeaderScroll } from "~/hooks/useHeaderScroll";

import { cn } from "~/utils/cn";

import { useAuth } from "~/contexts/auth";

import { Button } from "./ui/Button";
import { Dropdown } from "./ui/Dropdown";
import { FullscreenMenu } from "./ui/FullscreenMenu";
import { Spinner } from "./ui/Spinner";
import { Toast } from "./ui/Toast";

const PROTECTED_ROUTES = ["/profile"];

const primaryLinks = [
  { href: "/build-planner", label: "Build Planner", icon: Layout },
  { href: "/skill-tree", label: "Skill Tree", icon: GitBranch },
  { href: "/dps-calc", label: "DPS Calculator", icon: Calculator },
];

const secondaryLinks = [
  {
    href: "/news",
    label: "News",
    icon: Newspaper,
    description: "Latest updates, announcements & patch notes",
  },
  {
    href: "/guides",
    label: "Guides",
    icon: FileText,
    description: "Community guides & build tutorials",
  },
];

export function Navigation() {
  const isVisible = useHeaderScroll();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading: authLoading, error: authError, signOut } = useAuth();

  const handleProfileAction = async (value: string) => {
    switch (value) {
      case "profile":
        router.push("/profile");
        break;
      case "signout":
        await signOut();
        break;
    }
  };

  const handleSignIn = () => {
    router.push("/auth/login");
  };

  return (
    <>
      <div className="fixed top-7 mt-12 right-[-6rem] z-20 w-80 transform rotate-45 bg-primary text-primary-foreground py-2 text-center font-bold text-sm shadow-md border border-primary-foreground/20">
        BETA
      </div>
      <nav
        className={cn(
          "fixed top-0 w-full z-30 transition-all duration-300",
          !isVisible ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12 sm:h-16">
            <span className="flex col gap-5">
              <Link href="/" className="flex items-center gap-2 transition-colors">
                <span className="bg-clip-text text-transparent bg-gradient-to-l from-[#F59E0B] via-[#FBBF24] to-[#F97316] font-bold text-xl">
                  POE2 Tools
                </span>
              </Link>
              <span className="w-px h-6 bg-foreground/20 mx-2" aria-hidden="true" />

              <div className="hidden md:flex items-center">
                {/* Primary Links */}
                <div className="flex items-center gap-8">
                  {primaryLinks.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href || pathname?.startsWith(`${href}/`);
                    return (
                      <Link
                        key={href}
                        href={href}
                        prefetch={false}
                        className={cn(
                          "text-base font-medium transition-colors duration-200 relative group flex items-center gap-2",
                          isActive ? "text-primary" : "text-foreground/70 hover:text-primary"
                        )}
                      >
                        {/* <Icon className="w-4 h-4" /> */}
                        {label}
                        {isActive && (
                          <span className="absolute -bottom-[13px] sm:-bottom-[17px] left-0 w-full h-[2px] bg-primary" />
                        )}
                        <span className="absolute -bottom-[13px] sm:-bottom-[17px] left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                      </Link>
                    );
                  })}
                </div>

                {/* Divider */}
                <span className="w-px h-6 bg-foreground/20 mx-5" aria-hidden="true" />

                {/* Secondary Links */}
                <div className="flex items-center gap-6">
                  {secondaryLinks.map(({ href, label, icon: Icon, description }) => {
                    const isActive = pathname === href || pathname?.startsWith(`${href}/`);
                    return (
                      <Link
                        key={href}
                        href={href}
                        prefetch={false}
                        className={cn(
                          "text-sm font-medium transition-colors duration-200 relative group flex items-center gap-2",
                          isActive ? "text-primary" : "text-foreground/70 hover:text-primary",
                          "opacity-70"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                        {description && (
                          <div className="absolute hidden group-hover:block left-0 bottom-full mb-2 p-2 bg-background/95 backdrop-blur-sm border border-border/50 rounded-md shadow-lg whitespace-nowrap z-50">
                            <p className="text-xs text-foreground/60">{description}</p>
                          </div>
                        )}
                        {isActive && (
                          <span className="absolute -bottom-[16px] sm:-bottom-[21px] left-0 w-full h-[2px] bg-primary" />
                        )}
                        <span className="absolute -bottom-[16px] sm:-bottom-[21px] left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </span>

            <div className="flex items-center gap-4">
              {user ? (
                <div className="hidden md:block">
                  <Dropdown
                    trigger={
                      <button
                        className="flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                        disabled={authLoading}
                      >
                        {authLoading ? (
                          <Spinner size="sm" className="w-4 h-4" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                        <span className="max-w-[150px] truncate">{user.email?.split("@")[0]}</span>
                      </button>
                    }
                    items={[
                      {
                        label: "Go to Profile",
                        value: "profile",
                        icon: <Settings className="w-4 h-4" />,
                      },
                      {
                        label: "Sign Out",
                        value: "signout",
                        icon: <LogOut className="w-4 h-4" />,
                      },
                    ]}
                    onChange={handleProfileAction}
                    position="bottom-left"
                    width={180}
                  />
                </div>
              ) : (
                <Button
                  onClick={handleSignIn}
                  variant="ghost"
                  className="flex items-center gap-2 text-base font-medium"
                  disabled={authLoading}
                >
                  {authLoading ? (
                    <Spinner size="sm" className="w-4 h-4" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  Sign In
                </Button>
              )}
              <Button
                onClick={() => setIsMenuOpen(true)}
                variant="ghost"
                size="icon"
                className="p-2 rounded-lg hover:bg-background-secondary/80 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <FullscreenMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {authError && (
        <Toast message={authError} type="error" isVisible={!!authError} onClose={() => {}} />
      )}

      {!user && PROTECTED_ROUTES.some((route) => pathname?.startsWith(route)) && (
        <div className="fixed inset-0 z-20 bg-background/95 backdrop-blur-sm flex items-center justify-center">
          <div className="max-w-md mx-auto p-8 rounded-xl bg-background border border-border/50 shadow-lg text-center space-y-6">
            <User className="w-16 h-16 mx-auto text-primary" />
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Sign In Required</h2>
              <p className="text-foreground/80">Sign in to access your profile and settings.</p>
              <Button
                variant="primary"
                size="lg"
                onClick={handleSignIn}
                className="w-full"
                disabled={authLoading}
              >
                {authLoading ? <Spinner size="sm" className="w-4 h-4" /> : "Sign In"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
