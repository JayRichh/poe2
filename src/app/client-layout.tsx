"use client";

import { Suspense } from "react";

import { ThemeProvider } from "next-themes";

import { Footer } from "~/components/Footer";
import { Navigation } from "~/components/Navigation";
import { GradientBackground } from "~/components/ui/GradientBackground";
import { Spinner } from "~/components/ui/Spinner";

import { useDefaultDarkMode } from "~/hooks/useDefaultDarkMode";

import { AuthProvider } from "~/contexts/auth";

function NavigationLoading() {
  return (
    <div className="h-16 sm:h-20 border-b border-border/50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <Spinner size="sm" variant="primary" />
    </div>
  );
}

function MainContentLoading() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[60vh]">
      <Spinner size="lg" variant="primary" />
    </div>
  );
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useDefaultDarkMode();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AuthProvider>
        {/* Background gradient */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <GradientBackground variant="mesh" interactive={false} />
        </div>

        {/* Navigation */}
        <Suspense fallback={<NavigationLoading />}>
          <Navigation />
        </Suspense>

        {/* Main content */}
        <main className="flex-1 pt-12 sm:pt-16 relative z-10">
          <div className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)]">
            <Suspense fallback={<MainContentLoading />}>{children}</Suspense>
          </div>
        </main>

        {/* Footer */}
        <div className="relative z-10 mt-auto">
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
