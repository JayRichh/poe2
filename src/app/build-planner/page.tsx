import { Suspense } from "react";

import { BuildPlannerLayout } from "~/components/build-planner/BuildPlannerLayout";
import { Container } from "~/components/ui/Container";

import { getBuilds } from "~/app/actions/builds";

import { BuildList } from "./BuildList";

export const dynamic = "force-dynamic";

export default async function BuildPlannerPage() {
  const builds = await getBuilds({ visibility: "all", includeOwn: true });

  return (
    <BuildPlannerLayout
      title="Build Planner"
      description="Browse and explore Path of Exile 2 builds"
      
    >
      <Container size="xl" noPadding>
        <div>
          <Suspense
            fallback={
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            }
          >
            <BuildList initialBuilds={builds} />
          </Suspense>
        </div>
      </Container>
    </BuildPlannerLayout>
  );
}
