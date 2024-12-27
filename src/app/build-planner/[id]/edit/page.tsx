import { notFound } from "next/navigation";

import { BuildForm } from "~/components/build-planner/BuildForm";

import { getBuild } from "~/app/actions/server/builds";
import { handleBuildSubmit } from "~/app/actions/server/build-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBuildPage({ params }: PageProps) {
  const { id } = await params;
  if (!id) notFound();

  try {
    const build = await getBuild(id);
    if (!build) notFound();

    return (
      <div className="max-w-2xl mx-auto mt-6">
        <BuildForm 
          initialBuild={build} 
          onSubmit={handleBuildSubmit.bind(null, id)} 
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading build:", error);
    notFound();
  }
}
