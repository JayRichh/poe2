"use server";

import { redirect } from "next/navigation";
import { updateBuildAndRedirect } from "./builds";
import type { Database } from "~/lib/supabase/types";

type BuildFormData = Omit<Database["public"]["Tables"]["builds"]["Insert"], "user_id">;

export async function handleBuildSubmit(buildId: string, updates: Partial<BuildFormData>) {
  const redirectPath = await updateBuildAndRedirect(buildId, updates);
  // Let Next.js handle the redirect naturally
  redirect(`/build-planner/${redirectPath}`);
}
