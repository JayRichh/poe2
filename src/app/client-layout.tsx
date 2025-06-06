"use client";

import { Suspense, useEffect, useMemo } from "react";

import { ThemeProvider } from "next-themes";
import { usePathname } from "next/navigation";

import { Footer } from "~/components/Footer";
import { Navigation } from "~/components/Navigation";
import { QueryProvider } from "~/components/providers/QueryProvider";
import { ContextSelector } from "~/components/shared/ContextSelector";
import { GlobalSearch } from "~/components/shared/GlobalSearch";
import { GradientBackground } from "~/components/ui/GradientBackground";
import { Spinner } from "~/components/ui/Spinner";
import { WIPBanner } from "~/components/ui/WIPBanner";

import { useDefaultDarkMode } from "~/hooks/useDefaultDarkMode";
import { useHeaderScroll } from "~/hooks/useHeaderScroll";

import { cn } from "~/utils/cn";
import { shimmer, toBase64 } from "~/utils/image";

import { AuthProvider } from "~/contexts/auth";
import { SearchProvider } from "~/contexts/search";

import { ScrollToTopButton } from "../components/home/ScrollToTopButton";

function NavigationLoading() {
  return (
    <div className="h-16 sm:h-20 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <Spinner size="sm" variant="primary" />
    </div>
  );
}

function MainContentLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] relative">
      <div
        className="absolute inset-0 bg-gradient-to-br from-background via-background/50 to-background"
        style={{
          backgroundImage: `url('data:image/svg+xml;base64,${toBase64(shimmer(1200, 800))}')`,
        }}
      />
      <div className="relative z-10">
        <Spinner size="lg" variant="primary" />
      </div>
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useDefaultDarkMode();
  const isVisible = useHeaderScroll();
  const pathname = usePathname();

  useEffect(() => {
    // Initialize GoatCounter
    window.goatcounter = {
      no_onload: true,
      allow_local: true,
      path: pathname,
    };

    // Load GoatCounter script
    const script = document.createElement("script");
    script.async = true;
    script.src = "//gc.zgo.at/count.js";
    script.dataset.goatcounter = "https://poe2.goatcounter.com/count";
    document.head.appendChild(script);

    // Track initial page view
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({
        path: pathname,
      });
    }
  }, []);

  // Track client-side navigation
  useEffect(() => {
    if (window.goatcounter && window.goatcounter.count) {
      window.goatcounter.count({
        path: pathname,
      });
    }
  }, [pathname]);

  // Check if current route has sub-navigation
  const hasSubNav = useMemo(() => {
    return ["/news", "/news/patch-notes", "/build-planner"].some((path) =>
      pathname.startsWith(path)
    );
  }, [pathname]);

  const isHomePage = pathname === "/";
  const isSkillTree = pathname === "/skill-tree";

  return (
    <SearchProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <QueryProvider>
          <AuthProvider>
            <WIPBanner />
            {/* Background gradient */}
            <div className="fixed inset-0 z-[5] pointer-events-none">
              <GradientBackground variant="mesh" interactive={false} />
            </div>

            {/* Navigation */}
            <div className="fixed top-0 left-0 right-0 z-[50]">
              <Suspense fallback={<NavigationLoading />}>
                <Navigation />
              </Suspense>
            </div>

            {/* Context Selector & Global Search */}
            {!isHomePage && !isSkillTree && (
              <div
                className={cn(
                  "fixed top-0 left-0 right-0 z-[40]",
                  "transition-transform duration-300",
                  isVisible
                    ? hasSubNav
                      ? "translate-y-24 sm:translate-y-28"
                      : "translate-y-12 sm:translate-y-16"
                    : "translate-y-0"
                )}
              >
                <div className="bg-background/95 backdrop-blur-sm border-b border-border/30">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center h-11 gap-3">
                      <div className="flex-shrink-0">
                        <ContextSelector />
                      </div>
                      <div className="flex-1 max-w-3xl mx-auto">
                        <GlobalSearch />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main content */}
            <main
              className={cn(
                "flex-1 relative z-[20]",
                isHomePage ? "mt-16 sm:mt-20" : hasSubNav ? "mt-[6.5rem]" : "mt-[4rem]"
              )}
            >
              <div className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)]">
                <Suspense fallback={<MainContentLoading />}>{children}</Suspense>
              </div>
            </main>

            {/* Footer */}
            <div className="relative z-10 mt-auto">
              <Footer />
              <ScrollToTopButton />
            </div>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </SearchProvider>
  );
}
