"use server";

import { revalidatePath } from "next/cache";
import { getServerClient } from "~/app/_actions/supabase";
import type { Database } from "~/lib/supabase/types";

export type Equipment = Database["public"]["Tables"]["equipment"]["Row"];
export type EquipmentInsert = Database["public"]["Tables"]["equipment"]["Insert"];

export async function getEquipment(buildId: string) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("equipment")
    .select("*")
    .eq("build_id", buildId);

  if (error) throw error;
  return data || [];
}

export async function createEquipment(equipment: EquipmentInsert) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("equipment")
    .insert([equipment])
    .select()
    .single();

  if (error) throw error;

  revalidatePath(`/build-planner/${equipment.build_id}`);
  revalidatePath(`/build-planner/${equipment.build_id}/equipment`);
  
  return data;
}

export interface UpdateEquipmentParams {
  id: string;
  updates: Partial<EquipmentInsert>;
}

export async function updateEquipment(params: UpdateEquipmentParams) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("equipment")
    .update(params.updates)
    .eq("id", params.id)
    .select()
    .single();

  if (error) throw error;

  revalidatePath(`/build-planner/${data.build_id}`);
  revalidatePath(`/build-planner/${data.build_id}/equipment`);
  
  return data;
}

export async function deleteEquipment(id: string) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data: equipment, error: getError } = await supabase
    .from("equipment")
    .select("build_id")
    .eq("id", id)
    .single();

  if (getError) throw getError;

  const { error: deleteError } = await supabase
    .from("equipment")
    .delete()
    .eq("id", id);

  if (deleteError) throw deleteError;

  revalidatePath(`/build-planner/${equipment.build_id}`);
  revalidatePath(`/build-planner/${equipment.build_id}/equipment`);
  
  return true;
}
