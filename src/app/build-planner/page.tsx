import { Suspense } from "react";
import { BuildList } from "./BuildList";
import { getBuilds } from "~/app/actions/builds";
import { Container } from "~/components/ui/Container";
import { BuildPlannerLayout } from "~/components/build-planner/BuildPlannerLayout";

export const dynamic = "force-dynamic";

export default async function BuildPlannerPage() {
  const builds = await getBuilds();

  return (
    <BuildPlannerLayout
      title="Build Planner"
      description="Browse and explore Path of Exile 2 builds"
      actions={
        <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
          Beta
        </span>
      }
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
