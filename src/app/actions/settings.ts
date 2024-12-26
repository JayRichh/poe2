"use server";

import { revalidatePath } from "next/cache";

import { getServerClient } from "~/app/_actions/supabase";

import type { Database, VisibilityType } from "~/lib/supabase/types";

// Application currently only supports these types
export type BuildVisibility = Exclude<VisibilityType, 'public'>;

export type BuildSettings = {
  defaultVisibility: BuildVisibility;
  autoSync: boolean;
};

// Type guard to ensure visibility is supported
function isValidVisibility(visibility: VisibilityType): visibility is BuildVisibility {
  return visibility === 'private' || visibility === 'unlisted';
}

// Type to ensure database compatibility
type DatabaseBuildSettings = Database['public']['Tables']['profiles']['Row']['build_settings'];

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

  if (data.build_settings) {
    const dbSettings = data.build_settings as DatabaseBuildSettings;
    if (!dbSettings) return null;
    
    const visibility = dbSettings.defaultVisibility;
    
    // Convert database settings to application settings
    const settings: BuildSettings = {
      defaultVisibility: isValidVisibility(visibility) ? visibility : 'unlisted',
      autoSync: dbSettings.autoSync
    };
    
    return settings;
  }
  return null;
}
