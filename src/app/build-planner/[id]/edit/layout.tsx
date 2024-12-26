import { notFound } from "next/navigation";

import { BuildPlannerLayout } from "~/components/build-planner/BuildPlannerLayout";
import { getBuild } from "~/app/actions/builds";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function EditBuildLayout({ children, params }: LayoutProps) {
  const { id } = await params;
  if (!id) notFound();

  const build = await getBuild(id).catch(error => {
    console.error("Error loading build:", error);
    return null;
  });

  if (!build) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-6 max-w-md w-full">
          <h1 className="text-xl font-semibold mb-2">Unable to Load Build</h1>
          <p className="text-foreground/60">
            The build could not be loaded. It may have been deleted or you may not have permission to view it.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
