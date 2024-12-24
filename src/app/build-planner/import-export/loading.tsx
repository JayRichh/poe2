import { Container } from "~/components/ui/Container";
import { Skeleton } from "~/components/ui/Skeleton";
import { Text } from "~/components/ui/Text";

const EXPORT_OPTIONS = ["Everything", "Passive Tree", "Equipment", "Skills", "Notes"] as const;

const IMPORT_SOURCES = ["From File", "From Clipboard", "From Code", "From URL"] as const;

export default function ImportExportLoading() {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 bg-background/50 rounded-xl border border-border/50 shadow-sm">
      {/* Export */}
      <div className="space-y-6 p-4 rounded-lg bg-background">
        <Text className="text-xl font-medium">Export Build</Text>

        <div className="space-y-3">
          {EXPORT_OPTIONS.map((_, i) => (
            <div key={i} className="p-3 rounded-lg border border-border/50 space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border border-border/50 space-y-4">
            <Text className="font-medium">Export Format</Text>
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-16 rounded-lg" />
              <Skeleton className="h-16 rounded-lg" />
            </div>
          </div>

          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>

      {/* Import */}
      <div className="space-y-6 p-4 rounded-lg bg-background">
        <Text className="text-xl font-medium">Import Build</Text>

        <div className="space-y-3">
          {IMPORT_SOURCES.map((_, i) => (
            <div key={i} className="p-3 rounded-lg border border-border/50 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-4 w-full ml-7" />
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="p-8 rounded-lg border-2 border-dashed border-border/50 flex flex-col items-center justify-center min-h-[200px] space-y-4">
            <Skeleton className="h-8 w-8" />
            <div className="space-y-2 text-center">
              <Skeleton className="h-5 w-32 mx-auto" />
              <Skeleton className="h-4 w-48 mx-auto" />
            </div>
          </div>

          <Skeleton className="h-10 w-full rounded-lg" />
        </div>

        <div className="p-4 rounded-lg bg-muted/30 flex items-center gap-2">
          <Skeleton className="h-5 w-5 flex-shrink-0" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}
