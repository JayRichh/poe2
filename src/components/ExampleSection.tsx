"use client";

import { ReactNode, Suspense, memo, useMemo } from "react";

import { Skeleton } from "~/components/ui/Skeleton";
import { Spinner } from "~/components/ui/Spinner";
import { Text } from "~/components/ui/Text";

import { useActiveSection } from "~/hooks/useActiveSection";

import { cn } from "~/utils/cn";

function LoadingContent() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
        <div className="overflow-hidden xl:sticky xl:top-48 xl:self-start rounded-xl border-2 border-border/50">
          <Skeleton variant="rectangular" height={400} animation="wave" />
        </div>
        <div className="min-h-[400px] rounded-xl border-2 border-border/50 flex items-center justify-center">
          <Spinner size="lg" variant="primary" />
        </div>
      </div>
    </div>
  );
}

interface ExampleSectionProps {
  id: string;
  category: string;
  title: string;
  description: string;
  children: ReactNode;
}

const ExampleSectionContent = memo(function ExampleSectionContent({
  id,
  category,
  title,
  description,
  children,
}: ExampleSectionProps) {
  const { section: activeSection, category: activeCategory } = useActiveSection();

  const isActive = useMemo(
    () => activeSection === id || (!activeSection && activeCategory === category),
    [activeSection, activeCategory, id, category]
  );

  return (
    <section
      id={id}
      data-section
      data-category={category}
      className={cn(
        "w-full py-12 transition-all duration-300 ease-in-out border-b border-border/10",
        isActive && "bg-muted/50 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <Text variant="h3" className="mb-3">
            {title}
          </Text>
          <Text variant="body" className="text-foreground-secondary">
            {description}
          </Text>
        </div>
        <div className="mt-10">
          <Suspense fallback={<LoadingContent />}>{children}</Suspense>
        </div>
      </div>
    </section>
  );
});

export function ExampleSection(props: ExampleSectionProps) {
  return <ExampleSectionContent {...props} />;
}

interface ExampleContainerProps {
  _category: string;
  title: string;
  description: string;
  children: ReactNode;
}

export const ExampleContainer = memo(function ExampleContainer({
  _category,
  title,
  description,
  children,
}: ExampleContainerProps) {
  return (
    <div className="flex flex-col min-h-full">
      <div className="py-8 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <Text variant="h2" className="mb-3">
            {title}
          </Text>
          <Text variant="body" className="text-foreground-secondary">
            {description}
          </Text>
        </div>
      </div>
      <div className="flex-1 pb-12">
        <Suspense
          fallback={
            <div className="animate-in fade-in duration-300">
              <LoadingContent />
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
});
