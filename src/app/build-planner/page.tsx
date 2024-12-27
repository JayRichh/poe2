import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";
import { BuildList } from "./BuildList";
import { getBuilds } from "~/app/actions/server/builds";

export const dynamic = 'force-dynamic';

async function getInitialBuilds() {
  return getBuilds({ visibility: "all", includeOwn: true });
}

export default async function BuildPlannerPage() {
  const initialBuilds = await getInitialBuilds();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Text className="text-4xl font-bold tracking-tight gradient-text bg-gradient-to-r from-primary via-accent to-primary">
              Build Planner
            </Text>
            <Text className="text-lg text-foreground/60 mt-2">
              Create, manage, and share your Path of Exile 2 builds
            </Text>
          </div>
          <Link href="/build-planner/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Build
            </Button>
          </Link>
        </div>

        {/* Build List */}
        <Suspense
          fallback={
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
          }
        >
          <BuildList initialBuilds={initialBuilds} />
        </Suspense>
      </div>
    </div>
  );
}
