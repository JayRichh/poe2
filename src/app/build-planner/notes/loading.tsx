import { BuildPlannerLayout } from "~/components/build-planner/BuildPlannerLayout";
import { Skeleton } from "~/components/ui/Skeleton";

export default function NotesLoading() {
  return (
    <BuildPlannerLayout
      title="Build Notes"
      description="Document your build strategy and mechanics"
    >
      <div className="flex h-full">
        <div className="w-64 border-r border-border p-4 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-24" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          </div>
          
          <div className="border-t border-border my-4" />
          
          <div className="space-y-2">
            <Skeleton className="h-6 w-24" />
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-8 w-24" />
            </div>
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </div>
    </BuildPlannerLayout>
  );
}
