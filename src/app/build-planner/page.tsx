import { Suspense } from "react";

import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";

import { BuildList } from "./BuildList";

export const dynamic = "force-dynamic";

export default function BuildPlannerPage() {
  return (
    <div className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between gap-4">
        <Text className="text-3xl font-bold">Build Planner</Text>
        <Text className="text-foreground/60">Browse and explore Path of Exile builds</Text>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Text className="text-lg font-medium">Available Builds</Text>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled className="relative group">
              <span>Templates</span>
              <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] font-medium bg-primary text-primary-foreground rounded-full">Soon</span>
            </Button>
            <Button variant="outline" size="sm" disabled className="relative group">
              <span>Public Builds</span>
              <span className="absolute -top-2 -right-2 px-1.5 py-0.5 text-[10px] font-medium bg-primary text-primary-foreground rounded-full">Soon</span>
            </Button>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="text-center py-12">
              <Text className="text-foreground/60">Loading builds...</Text>
            </div>
          }
        >
          <BuildList />
        </Suspense>
      </div>
    </div>
  );
}
