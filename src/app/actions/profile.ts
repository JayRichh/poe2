"use server";

import { revalidatePath } from "next/cache";

import { getServerClient } from "~/app/_actions/supabase";

import { validateName } from "~/utils/validation";

export type ProfileUpdateResponse = {
  success: boolean;
  error?: string;
};

export async function updateProfile(name: string): Promise<ProfileUpdateResponse> {
  // Validate name
  const validation = validateName(name);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  const supabase = await getServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("Not authenticated");

  // Update auth metadata
  const { error: updateError } = await supabase.auth.updateUser({
    data: { name },
  });

  if (updateError) {
    return { success: false, error: updateError.message };
  }

  // Update profile
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ name })
    .eq("id", user.id);

  if (profileError) {
    return { success: false, error: profileError.message };
  }

  revalidatePath("/profile");
  return { success: true };
}

export async function updatePassword(newPassword: string) {
  const supabase = await getServerClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
}

export async function deleteAccount() {
  const supabase = await getServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("Not authenticated");

  // Delete profile (cascades to other data via DB triggers)
  const { error: deleteError } = await supabase.from("profiles").delete().eq("id", user.id);

  if (deleteError) throw deleteError;

  // Sign out after deletion
  await supabase.auth.signOut();
}
