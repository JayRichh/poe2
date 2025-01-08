"use server";

import { revalidatePath } from "next/cache";

import { getServerClient } from "~/app/_actions/supabase";
import type { Database } from "~/lib/supabase/types";

export type BuildConfig = Database["public"]["Tables"]["build_configs"]["Row"];
export type BuildConfigInsert = Database["public"]["Tables"]["build_configs"]["Insert"];

export async function getBuildConfigs(buildId: string) {
  const supabase = await getServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase.from("build_configs").select("*").eq("build_id", buildId);

  if (error) throw error;
  return data || [];
}

export async function createBuildConfig(config: BuildConfigInsert) {
  const supabase = await getServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase.from("build_configs").insert([config]).select().single();

  if (error) throw error;

  revalidatePath(`/build-planner/${config.build_id}`);
  revalidatePath(`/build-planner/${config.build_id}/stats`);

  return data;
}

export async function updateBuildConfig(id: string, updates: Partial<BuildConfigInsert>) {
  const supabase = await getServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("build_configs")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  revalidatePath(`/build-planner/${data.build_id}`);
  revalidatePath(`/build-planner/${data.build_id}/stats`);

  return data;
}

export async function deleteBuildConfig(id: string, buildId: string) {
  const supabase = await getServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase.from("build_configs").delete().eq("id", id);

  if (error) throw error;

  revalidatePath(`/build-planner/${buildId}`);
  revalidatePath(`/build-planner/${buildId}/stats`);

  return true;
}
