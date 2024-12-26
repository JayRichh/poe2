import { notFound, redirect } from "next/navigation";

import { BuildPlannerLayout } from "~/components/build-planner/BuildPlannerLayout";
import { getBuild } from "~/app/actions/builds";
import { getServerClient } from "~/app/_actions/supabase";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function EditBuildLayout({ children, params }: LayoutProps) {
  const { id } = await params;
  if (!id) notFound();

  // Get current user
  const supabase = await getServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  try {
    const build = await getBuild(id);
    if (!build) notFound();

    // Check if user has permission to edit
    if (build.user_id !== user.id || build.visibility === 'public') {
      redirect(`/build-planner/${build.slug || build.id}`);
    }

    return (
      <>
        {children}
      </>
    );
  } catch (error) {
    console.error("Error loading build:", error);
    notFound();
  }
}
