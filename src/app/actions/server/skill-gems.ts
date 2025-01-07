"use server";

import { revalidatePath } from "next/cache";
import { getServerClient } from "~/app/_actions/supabase";
import type { Database } from "~/lib/supabase/types";

export type SkillGem = Database["public"]["Tables"]["skill_gems"]["Row"];
export type SkillGemInsert = Database["public"]["Tables"]["skill_gems"]["Insert"];

export async function getSkillGems(buildId: string) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("skill_gems")
    .select("*")
    .eq("build_id", buildId);

  if (error) throw error;
  return data || [];
}

export async function createSkillGem(skillGem: SkillGemInsert) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("skill_gems")
    .insert([skillGem])
    .select()
    .single();

  if (error) throw error;

  revalidatePath(`/build-planner/${skillGem.build_id}`);
  revalidatePath(`/build-planner/${skillGem.build_id}/skills`);
  
  return data;
}

export async function updateSkillGem(id: string, updates: Partial<SkillGemInsert>) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("skill_gems")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  revalidatePath(`/build-planner/${data.build_id}`);
  revalidatePath(`/build-planner/${data.build_id}/skills`);
  
  return data;
}

export async function deleteSkillGem(id: string, buildId: string) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("skill_gems")
    .delete()
    .eq("id", id);

  if (error) throw error;

  revalidatePath(`/build-planner/${buildId}`);
  revalidatePath(`/build-planner/${buildId}/skills`);
  
  return true;
}
