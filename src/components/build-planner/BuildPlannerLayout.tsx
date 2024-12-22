"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { Button } from "~/components/ui/Button";
import { BuildPlannerSidebar } from "./BuildPlannerSidebar";
import { useSidebarWidth } from "~/hooks/useSidebarWidth";

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
  const sidebarDimensions = useSidebarWidth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <Container size="xl" noPadding>
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between gap-8">
              <div className="flex flex-col max-w-2xl">
                <Text className="text-3xl font-bold tracking-tight">{title}</Text>
                {description && (
                  <Text className="text-lg text-foreground/60 mt-2">{description}</Text>
                )}
              </div>
              {actions && <div className="flex items-start gap-2">{actions}</div>}
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Sidebar */}
        {sidebar !== false && (
          <div 
            className={`absolute inset-y-0 left-0 z-20 border-r border-border/50 bg-background/80 backdrop-blur-sm ${sidebarDimensions.className}`}
            style={{ width: sidebarDimensions.width }}
          >
            <div className={`sticky ${sidebarDimensions.topOffset} h-full`}>
              <div className={`flex items-center justify-between py-2 border-b border-border/50 ${sidebarDimensions.headerPadding}`}>
                {!sidebarDimensions.isCollapsed && <Text className="font-medium">Navigation</Text>}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={sidebarDimensions.toggleCollapse}
                  className={`p-1.5 hover:bg-muted/50 rounded-lg transition-colors ${sidebarDimensions.isCollapsed ? 'w-full flex justify-center' : ''}`}
                >
                  {sidebarDimensions.isCollapsed ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <ChevronLeft className="w-4 h-4" />
                  )}
                </Button>
              </div>
              {typeof sidebar === "boolean" || !sidebar ? (
                <BuildPlannerSidebar collapsed={sidebarDimensions.isCollapsed} />
              ) : (
                sidebar
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div 
          className={`flex-1 min-h-0 ${isPassiveTree ? "bg-muted/30" : ""}`}
          style={{ 
            marginLeft: sidebar !== false ? sidebarDimensions.width : undefined,
            transition: 'margin-left 0.3s ease'
          }}
        >
          <div className={`h-full ${isPassiveTree ? "" : sidebarDimensions.contentPadding}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
