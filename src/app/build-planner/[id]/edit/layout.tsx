import { Suspense } from "react";

import { redirect } from "next/navigation";

import { getServerClient } from "~/app/_actions/supabase";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export default async function EditBuildLayout({ children, params }: LayoutProps) {
  const { id } = await params;
  // Check authentication only - build fetch is handled by parent layout and page
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] p-4">
      <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-foreground/5" />}>
        {children}
      </Suspense>
    </div>
  );
}
