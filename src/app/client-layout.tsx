"use client";

import { Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { Navigation } from "~/components/Navigation";
import { Footer } from "~/components/Footer";
import { GradientBackground } from "~/components/ui/GradientBackground";
import { Spinner } from "~/components/ui/Spinner";
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
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        {/* Background gradient */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <GradientBackground variant="radial" />
        </div>

        {/* Navigation */}
        <Suspense fallback={<NavigationLoading />}>
          <Navigation />
        </Suspense>

        {/* Main content */}
        <main className="flex-1 pt-16 sm:pt-20 relative z-10">
          <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)]">
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
