import { redirect } from "next/navigation";
import { getServerClient } from "~/app/_actions/supabase";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function NewBuildLayout({ children }: LayoutProps) {
  // Get current user
  const supabase = await getServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  return children;
}
