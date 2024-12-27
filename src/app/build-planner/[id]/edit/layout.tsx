import { notFound, redirect } from "next/navigation";
import { getServerClient } from "~/app/_actions/supabase";
import { getBuild } from "~/app/actions/server/builds";
import type { Database } from "~/lib/supabase/types";

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
    // Get the build and check permissions
    const build = await getBuild(id);
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
