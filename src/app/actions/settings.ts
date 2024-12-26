"use server";

import { revalidatePath } from "next/cache";

import { getServerClient } from "~/app/_actions/supabase";

export type BuildVisibility = 'private' | 'unlisted';

export type BuildSettings = {
  defaultVisibility: BuildVisibility;
  autoSync: boolean;
};

export type SettingsUpdateResponse = {
  success: boolean;
  error?: string;
};

export async function updateBuildSettings(settings: BuildSettings): Promise<SettingsUpdateResponse> {
  const supabase = await getServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return { success: false, error: userError.message };
  }
  if (!user) {
    return { success: false, error: "Not authenticated" };
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      build_settings: settings,
    })
    .eq("id", user.id);

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  revalidatePath("/profile");
  return { success: true };
}

export async function getBuildSettings(): Promise<BuildSettings | null> {
  const supabase = await getServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("build_settings")
    .eq("id", user.id)
    .single();

  if (error || !data) {
    return null;
  }

  return data.build_settings || null;
}
