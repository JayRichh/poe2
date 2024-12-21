"use client";

import { ReactNode } from "react";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";
import { NewsSidebar } from "./NewsSidebar";

interface NewsLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function NewsLayout({
  children,
  title,
  description,
  actions,
}: NewsLayoutProps) {
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
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-border/50 overflow-y-auto bg-background/50">
          <div className="sticky top-0">
            <NewsSidebar />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <Container size="xl" noPadding className="h-full">
            {children}
          </Container>
        </div>
      </div>
    </div>
  );
}
