"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode } from "react";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { useSidebarWidth } from "~/hooks/useSidebarWidth";

interface ContentLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
  sidebar: ReactNode;
}

export function ContentLayout({ children, title, description, actions, sidebar }: ContentLayoutProps) {
  const sidebarState = useSidebarWidth();

  return (
    <div className="min-h-screen flex flex-col mt-11 relative overflow-clip">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-11 z-30">
        <Container size="xl" noPadding>
          <div className="px-6 sm:px-8 py-6">
            <div className="flex justify-between gap-8">
              <div className="flex flex-col max-w-2xl">
                <Text className="text-3xl font-bold tracking-tight">{title}</Text>
                {description && (
                  <Text className="text-lg text-foreground/80 mt-3">{description}</Text>
                )}
              </div>
              {actions && <div className="flex items-start gap-2">{actions}</div>}
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Sidebar */}
        <div
          className={`sticky top-0 h-screen border-r border-border/50 bg-background/80 backdrop-blur-sm ${sidebarState.className}`}
          style={{ 
            width: sidebarState.width, 
            maxHeight: 'calc(100vh - 2.75rem)',
            overflowY: 'auto',
            overscrollBehavior: 'contain'
          }}
        >
          <div className={`sticky ${sidebarState.topOffset} h-full`}>
            <div
              className={`flex items-center justify-between py-3 border-b border-border/50 ${sidebarState.headerPadding}`}
            >
              {!sidebarState.isCollapsed && <Text className="font-medium">Categories</Text>}
              <Button
                variant="ghost"
                size="icon"
                onClick={sidebarState.toggleCollapse}
                className={`p-2 hover:bg-primary/10 rounded-lg transition-colors ${
                  sidebarState.isCollapsed
                    ? "w-full flex justify-center bg-primary/5"
                    : "hover:text-primary"
                }`}
              >
                {sidebarState.isCollapsed ? (
                  <ChevronRight className="w-4 h-4" />
                ) : (
                  <ChevronLeft className="w-4 h-4" />
                )}
              </Button>
            </div>
            {sidebar}
          </div>
        </div>

        {/* Content */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain"
          style={{
            marginLeft: sidebarState.width,
            transition: "margin-left 0.3s ease",
            height: 'calc(100vh - 2.75rem)'
          }}
        >
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">{children}</div>
        </div>
      </div>
    </div>
  );
}
