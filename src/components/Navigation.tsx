"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Gift, Users, PieChart, GiftIcon, Menu, User, LogIn, Settings, LogOut, Calculator } from "lucide-react";
import { useHeaderScroll } from "~/hooks/useHeaderScroll";
import { cn } from "~/utils/cn";
import { useState, useEffect } from "react";
import { FullscreenMenu } from "./ui/FullscreenMenu";
import { Toast } from "./ui/Toast";
import { Button } from "./ui/Button";
import { Spinner } from "./ui/Spinner";
import { useAuth } from "~/contexts/auth";
import { Dropdown } from "./ui/Dropdown";

const PROTECTED_ROUTES = ["/groups", "/gifts", "/analytics"];
const STORAGE_KEYS = {
  SETUP_COMPLETED: 'hasCompletedSetup',
};

const navLinks = [
  { href: "/dps-calc", label: "DPS Calculator", icon: Calculator },
  { href: "/groups", label: "Groups", icon: Users },
  { href: "/gifts", label: "All Gifts", icon: Gift },
  { href: "/analytics", label: "Analytics", icon: PieChart },
];

export function Navigation() {
  const isVisible = useHeaderScroll();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasCheckedSetup, setHasCheckedSetup] = useState(false);
  const [showSetupToast, setShowSetupToast] = useState(false);
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
  const { user, loading: authLoading, error: authError, signOut } = useAuth();

  useEffect(() => {
    const setupCompleted = localStorage.getItem(STORAGE_KEYS.SETUP_COMPLETED);
    setHasCompletedSetup(!!setupCompleted);
    
    if (!setupCompleted && PROTECTED_ROUTES.some(route => pathname?.startsWith(route))) {
      setShowSetupToast(true);
      setTimeout(() => setShowSetupToast(false), 6000);
    }
    setHasCheckedSetup(true);
  }, [pathname]);

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

  if (!hasCheckedSetup || authLoading) {
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
            <Link 
              href="/"
              className="flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
            >
              <GiftIcon className="w-6 h-6" />
              <span className="text-lg">POE2 Tools</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || pathname?.startsWith(`${href}/`);
                const isProtected = PROTECTED_ROUTES.includes(href);
                
                if (isProtected && !user) return null;

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

              {!user && (
                <Link
                  href="/auth/login"
                  className="flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              )}
            </div>

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

      <Toast
        message="Please complete the first-time setup to access this feature"
        type="info"
        isVisible={showSetupToast}
        onClose={() => setShowSetupToast(false)}
      />

      {authError && (
        <Toast
          message={authError}
          type="error"
          isVisible={!!authError}
          onClose={() => {}}
        />
      )}

      {(!hasCompletedSetup || !user) && PROTECTED_ROUTES.some(route => pathname?.startsWith(route)) && (
        <div className="fixed inset-0 z-20 bg-background/95 backdrop-blur-sm flex items-center justify-center">
          <div className="max-w-md mx-auto p-8 rounded-xl bg-background border border-border/50 shadow-lg text-center space-y-6">
            <GiftIcon className="w-16 h-16 mx-auto text-primary" />
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                {!user ? 'Sign In Required' : 'Setup Required'}
              </h2>
              <p className="text-foreground/80">
                {!user 
                  ? 'Sign in to access Gift List features and manage your gifts.'
                  : 'Complete the first-time setup to access Gift List features and start managing your gifts.'
                }
              </p>
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push(!user ? '/auth/login' : '/?setup=true')}
                className="w-full"
              >
                {!user ? 'Sign In' : 'Complete Setup'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
