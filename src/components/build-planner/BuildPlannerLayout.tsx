"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { BuildPlannerSidebar } from "./BuildPlannerSidebar";

interface BuildPlannerLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
  sidebar?: ReactNode | boolean;
  fullWidth?: boolean;
}

export function BuildPlannerLayout({
  children,
  title,
  description,
  actions,
  sidebar,
  fullWidth,
}: BuildPlannerLayoutProps) {
  const pathname = usePathname();
  const isPassiveTree = pathname === "/build-planner";

  return (
    <div className="min-h-screen flex flex-col pt-12">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border/50">
        <Container size="xl" noPadding>
          <div className="px-4 sm:px-6 lg:px-8 py-4 mt-4">
            <div className="flex justify-between gap-8">
              <div className="flex flex-col max-w-2xl">
                <Text className="text-3xl font-bold tracking-tight">{title}</Text>
                {description && (
                  <Text className="text-lg text-foreground/60 mt-2 pb-2">{description}</Text>
                )}
              </div>
              {actions && <div className="flex items-start gap-2">{actions}</div>}
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0">
        {/* Sidebar */}
        {sidebar !== false && (
          <div className="w-80 flex-shrink-0 border-r border-border/50 overflow-y-auto bg-background/50">
            <div className="sticky top-0 h-full">
              {typeof sidebar === "boolean" || !sidebar ? <BuildPlannerSidebar /> : sidebar}
            </div>
          </div>
        )}

        {/* Content */}
        <div className={`flex-1 overflow-y-auto -ml-80 min-h-0 ${isPassiveTree ? "bg-muted/30" : ""}`}>
          <Container
            size="xl"
            noPadding
            className={`h-full ${fullWidth ? "max-w-none" : ""}`}
          >
            <div className={`h-full py-4 ${isPassiveTree ? "px-0" : ""}`}>
              {children}
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}