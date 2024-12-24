import { Container } from "~/components/ui/Container";
import { Skeleton } from "~/components/ui/Skeleton";
import { Text } from "~/components/ui/Text";

const DEFAULT_SECTIONS = [
  "Build Overview",
  "Build Progression",
  "Equipment Guide",
  "Skill Setup",
  "Visual Guides",
] as const;

const QUICK_LINKS = ["Passive Tree", "Equipment", "Skills", "Stats"] as const;

export default function NotesLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Editor Toolbar */}
      <div className="p-2 rounded-lg border border-border/50 bg-background flex items-center gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8" />
        ))}
        <div className="h-8 border-l border-border/50 mx-2" />
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8" />
        ))}
      </div>

      {/* Editor Content */}
      <div className="space-y-6">
        {DEFAULT_SECTIONS.map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <div className="p-6 rounded-lg border border-border/50 min-h-[200px] space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-5/6" />
              <div className="pl-6 space-y-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Skeleton className="h-2 w-2 rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-screen w-64 border-l border-border/50 bg-background p-4">
        <div className="space-y-2">
          {DEFAULT_SECTIONS.map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg" />
          ))}
        </div>

        <div className="border-t border-border/30 my-4" />

        <div className="px-4">
          <Text className="text-sm font-medium text-foreground/70 px-1 mb-2">Quick Links</Text>
          <div className="space-y-1">
            {QUICK_LINKS.map((_, i) => (
              <Skeleton key={i} className="h-9 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
