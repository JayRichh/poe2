"use client";

import {
  Calculator,
  Cog,
  Coins,
  FileText,
  GitBranch,
  Layout,
  LogIn,
  LogOut,
  Menu,
  Newspaper,
  Settings,
  Timer,
  User,
  Users,
  Zap,
  BarChart,
} from "lucide-react";

import { memo, useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useHeaderScroll } from "~/hooks/useHeaderScroll";

import { cn } from "~/utils/cn";

import { useAuth } from "~/contexts/auth";

import { Avatar } from "./profile/Avatar";
import { Button } from "./ui/Button";
import { Dropdown } from "./ui/Dropdown";
import { FullscreenMenu } from "./ui/FullscreenMenu";
import { Spinner } from "./ui/Spinner";
import { Toast } from "./ui/Toast";

const MemoizedAvatar = memo(Avatar);

const ProfileSection = memo(function ProfileSection({
  user,
  loading,
  onSignIn,
  onProfileAction,
  refreshSession,
}: {
  user: any;
  loading: boolean;
  onSignIn: () => void;
  onProfileAction: (value: string) => void;
  refreshSession: () => Promise<void>;
}) {
  if (user) {
    return (
      <div className="hidden lg:block">
        <Dropdown
          trigger={
            <button
              className="flex items-center gap-2 text-base font-medium text-foreground hover:text-primary transition-colors"
              disabled={loading}
            >
              <div className="flex items-center gap-2">
                {loading ? (
                  <>
                    <div className="w-8 h-8 rounded-full bg-primary/5 animate-pulse" />
                    <div className="w-24 h-4 bg-primary/5 animate-pulse rounded" />
                  </>
                ) : (
                  <>
                    <MemoizedAvatar
                      uid={user.id}
                      url={user.user_metadata?.avatar_url}
                      size={32}
                      onUpload={async () => {
                        await refreshSession();
                      }}
                      showUploadUI={false}
                      className="border border-border/50"
                    />
                    <span className="max-w-[150px] truncate">
                      {user.user_metadata?.name || user.email?.split("@")[0]}
                    </span>
                  </>
                )}
              </div>
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
          onChange={onProfileAction}
          position="bottom-left"
          width={180}
        />
      </div>
    );
  }

  return (
    <Button
      onClick={onSignIn}
      variant="ghost"
      className="hidden lg:flex items-center gap-2 text-base font-medium"
      disabled={loading}
    >
      {loading ? <Spinner size="sm" /> : <LogIn className="w-4 h-4" />}
      Sign In
    </Button>
  );
});

const PROTECTED_ROUTES = ["/profile"];

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType;
};

type NavItemWithDropdown = {
  label: string;
  items: NavItem[];
};

const primaryLinks: (NavItem | NavItemWithDropdown)[] = [
  {
    label: "Calculators",
    items: [
      { href: "/calculators/dps", label: "DPS Calculator", icon: Zap },
      { href: "/calculators/speed", label: "Speed Calculator", icon: Timer },
      { href: "/calculators/currency", label: "Currency Calculator", icon: Coins },
    ],
  },
  { href: "/builds", label: "Statistics", icon: BarChart },
  {
    label: "Builds",
    items: [
      { href: "/skill-tree", label: "Skill Tree", icon: GitBranch },
      { href: "/build-planner", label: "Build Planner", icon: Layout },
    ],
  },
];

const secondaryLinks: NavItem[] = [
  { href: "/mechanics", label: "Mechanics", icon: Cog },
  { href: "/guides", label: "Guides", icon: FileText },
  { href: "/ascendancies", label: "Ascendancies", icon: Users },
  { href: "/news", label: "News", icon: Newspaper },
];

export function Navigation() {
  const isVisible = useHeaderScroll();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading: authLoading, error: authError, signOut, refreshSession } = useAuth();

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

  const isDropdownItem = (item: NavItem | NavItemWithDropdown): item is NavItemWithDropdown => {
    return !("href" in item) && "items" in item;
  };

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
                <span className="bg-clip-text text-transparent bg-gradient-to-l from-[#F59E0B] via-[#FBBF24] to-[#F97316] font-bold text-2xl">
                  POE2 Tools
                </span>
              </Link>

              <div className="hidden lg:flex items-center">
                <div className="flex items-center space-x-10">
                  {primaryLinks.map((item) => {
                    if (isDropdownItem(item)) {
                      return (
                        <Dropdown
                          key={item.label}
                          trigger={
                            <button
                              className="text-base font-medium tracking-wide text-foreground/90 hover:text-primary transition-colors flex items-center gap-2.5 py-1"
                              aria-label={`${item.label} menu`}
                              aria-expanded="false"
                              aria-haspopup="true"
                            >
                              {item.label}
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
                          items={item.items.map((subItem) => ({
                            label: subItem.label,
                            value: subItem.href,
                            icon: <subItem.icon  />,
                          }))}
                          onChange={(value) => router.push(value)}
                          position="bottom-left"
                          width={280}
                        />
                      );
                    }

                    const isActive =
                      pathname === item.href || pathname?.startsWith(`${item.href}/`);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        prefetch={false}
                        className={cn(
                          "text-[15px] font-medium tracking-wide transition-colors duration-200 relative group",
                          isActive ? "text-primary" : "text-foreground/90 hover:text-primary"
                        )}
                      >
                        {item.label}
                        {isActive && (
                          <span className="absolute -bottom-4 left-0 w-full h-0.5 bg-primary" />
                        )}
                      </Link>
                    );
                  })}
                </div>

                <div className="flex items-center space-x-8 border-l border-foreground/10 ml-10 pl-10">
                  {secondaryLinks.map(({ href, label }) => {
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

            <div className="flex items-center gap-4">
              <ProfileSection
                user={user}
                loading={authLoading}
                onSignIn={handleSignIn}
                onProfileAction={handleProfileAction}
                refreshSession={refreshSession}
              />
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

      {authError && (
        <Toast message={authError} type="error" isVisible={!!authError} onClose={() => {}} />
      )}

      {!user && !authLoading && PROTECTED_ROUTES.some((route) => pathname?.startsWith(route)) && (
        <div className="fixed inset-0 z-[90] bg-background/95 backdrop-blur-sm flex items-center justify-center">
          <div className="max-w-md mx-auto p-8 rounded-xl bg-background border border-border/50 shadow-lg text-center space-y-6">
            {authLoading ? (
              <div className="py-8">
                <Spinner size="lg" />
              </div>
            ) : (
              <>
                <User className="w-16 h-16 mx-auto text-primary" />
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Sign In Required</h2>
                  <p className="text-foreground/80">Sign in to access your profile and settings.</p>
                  <Button variant="primary" size="lg" onClick={handleSignIn} className="w-full">
                    Sign In
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
