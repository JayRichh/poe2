"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, User, LogIn, Settings, LogOut, Calculator, Layout } from "lucide-react";
import { useHeaderScroll } from "~/hooks/useHeaderScroll";
import { cn } from "~/utils/cn";
import { useState } from "react";
import { FullscreenMenu } from "./ui/FullscreenMenu";
import { Toast } from "./ui/Toast";
import { Button } from "./ui/Button";
import { Spinner } from "./ui/Spinner";
import { useAuth } from "~/contexts/auth";
import { Dropdown } from "./ui/Dropdown";

const PROTECTED_ROUTES = ["/profile"];

const navLinks = [
  { href: "/build-planner", label: "Build Planner", icon: Layout },
  { href: "/dps-calc", label: "DPS Calculator", icon: Calculator },
];

export function Navigation() {
  const isVisible = useHeaderScroll();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading: authLoading, error: authError, signOut } = useAuth();

  const handleProfileAction = async (value: string) => {
    switch (value) {
      case 'profile':
        router.push('/profile');
        break;
      case 'signout':
        await signOut();
        router.push('/auth/login');
        break;
    }
  };

  if (authLoading) {
    return (
      <nav className="fixed top-0 w-full z-30">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-16 sm:h-20">
            <Spinner size="sm" variant="primary" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-30 transition-all duration-300",
          !isVisible ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            <span className="flex col gap-5">
              <Link 
                href="/"
                className="flex items-center gap-2 transition-colors"
                >
                <span className="bg-clip-text text-transparent bg-gradient-to-l from-[#F59E0B] via-[#FBBF24] to-[#F97316] font-bold text-xl">
                  POE2 Tools
                </span>
              </Link>
              <span className="w-px h-6 bg-foreground/20 mx-2" aria-hidden="true" />

              <div className="hidden md:flex items-center space-x-5">
                {navLinks.map(({ href, label, icon: Icon }) => {
                  const isActive = pathname === href || pathname?.startsWith(`${href}/`);

                  return (
                    <Link
                      key={href}
                      href={href}
                      prefetch={false}
                      className={cn(
                        "text-base font-medium transition-colors duration-200 relative group flex items-center gap-2",
                        isActive ? "text-primary" : "text-foreground hover:text-primary"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                      {isActive && (
                        <span className="absolute -bottom-[23px] sm:-bottom-[27px] left-0 w-full h-[2px] bg-primary" />
                      )}
                      <span className="absolute -bottom-[23px] sm:-bottom-[27px] left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                    </Link>
                  );
                })}
              </div>
            </span>

            <div className="flex items-center gap-4">
              {user && (
                <div className="hidden md:block">
                  <Dropdown
                    trigger={
                      <button className="flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors">
                        <User className="w-4 h-4" />
                        <span className="max-w-[150px] truncate">
                          {user.email?.split('@')[0]}
                        </span>
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
              )}

              {!user && (
                <Link
                  href="/auth/login"
                  className="flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
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

      <FullscreenMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      {authError && (
        <Toast
          message={authError}
          type="error"
          isVisible={!!authError}
          onClose={() => {}}
        />
      )}

      {!user && PROTECTED_ROUTES.some(route => pathname?.startsWith(route)) && (
        <div className="fixed inset-0 z-20 bg-background/95 backdrop-blur-sm flex items-center justify-center">
          <div className="max-w-md mx-auto p-8 rounded-xl bg-background border border-border/50 shadow-lg text-center space-y-6">
            <User className="w-16 h-16 mx-auto text-primary" />
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Sign In Required</h2>
              <p className="text-foreground/80">
                Sign in to access your profile and settings.
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/auth/login')}
                className="w-full"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
