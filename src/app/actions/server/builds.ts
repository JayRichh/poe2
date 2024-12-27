"use server";

import { revalidatePath } from "next/cache";
import { getServerClient } from "~/app/_actions/supabase";
import { generateSlug } from "~/utils/slug";
import { logActivity } from "./activities";
import type { Database } from "~/lib/supabase/types";

export type Build = Database["public"]["Tables"]["builds"]["Row"];
export type BuildInsert = Database["public"]["Tables"]["builds"]["Insert"];

export type VisibilityType = "private" | "unlisted" | "public";
export interface BuildOptions {
  visibility?: VisibilityType | "all";
  includeOwn?: boolean;
}

export type CreateBuildData = Omit<BuildInsert, "user_id">;
export type UpdateBuildData = Partial<BuildInsert>;

export interface BuildWithRelations extends Build {
  equipment?: Database["public"]["Tables"]["equipment"]["Row"][];
  skill_gems?: Database["public"]["Tables"]["skill_gems"]["Row"][];
  build_configs?: Database["public"]["Tables"]["build_configs"]["Row"][];
}

export async function getBuild(idOrSlug: string): Promise<BuildWithRelations> {
  const supabase = await getServerClient();

  try {
    const query = `
      id,
      name,
      description,
      visibility,
      slug,
      poe_class,
      level,
      notes,
      is_template,
      parent_build_id,
      version,
      tags,
      created_at,
      updated_at,
      user_id,
      equipment:equipment(*),
      skill_gems:skill_gems(*),
      build_configs:build_configs(*)
    `;

    // Try to find by slug first
    let { data, error } = await supabase
      .from("builds")
      .select(query)
      .eq("slug", idOrSlug)
      .single();

    // If not found by slug, try by id
    if (!data && !error) {
      ({ data, error } = await supabase
        .from("builds")
        .select(query)
        .eq("id", idOrSlug)
        .single());
    }

    if (error) {
      if (error.code === "42703") {
        console.error("Column not found error. Migration may not be applied:", error);
        throw new Error("Database schema error. Please contact support.");
      }
      console.error("Database error:", error);
      throw new Error("Failed to fetch build");
    }
    if (!data) throw new Error("Build not found");

    // Get current user if authenticated
    const { data: { user } } = await supabase.auth.getUser();

    // Check visibility and ownership
    if (data.visibility === "private" && (!user || data.user_id !== user.id)) {
      throw new Error("Build not found");
    }

    if (data.visibility === "unlisted" && (!user || data.user_id !== user.id)) {
      throw new Error("Build not found");
    }

    return data;
  } catch (error) {
    console.error("Error in getBuild:", error);
    throw error;
  }
}

export async function getBuilds({ visibility = "all", includeOwn = false }: BuildOptions = {}) {
  const supabase = await getServerClient();
  
  // Get current user if authenticated
  const { data: { user } } = await supabase.auth.getUser();

  let query = supabase.from("builds").select("*");

  if (user) {
    if (visibility === "all") {
      // Show unlisted builds and user's own builds
      query = query.or(`visibility.eq.unlisted,user_id.eq.${user.id}`);
    } else if (visibility === "private") {
      // Only show user's private builds
      query = query.eq("visibility", "private").eq("user_id", user.id);
    } else if (visibility === "unlisted") {
      // Only show user's unlisted builds
      query = query.eq("visibility", "unlisted").eq("user_id", user.id);
    }

    if (includeOwn) {
      // Include user's own builds regardless of visibility
      query = query.or(`user_id.eq.${user.id}`);
    }
  } else {
    // Not authenticated, only show unlisted builds
    query = query.eq("visibility", "unlisted");
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;

  return data || [];
}

export async function createBuild(build: CreateBuildData) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Generate a unique slug from the build name
  const baseSlug = generateSlug(build.name);
  const uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 10)}`;

  const { data, error } = await supabase
    .from("builds")
    .insert([{ ...build, user_id: user.id, slug: uniqueSlug }])
    .select()
    .single();

  if (error) throw error;

  // Log activity
  await logActivity(
    'build',
    'Created new build',
    `Started a new ${build.poe_class || ''} build template`,
    { buildId: data.id, buildName: build.name }
  );

  revalidatePath("/build-planner");
  revalidatePath(`/build-planner/${data.slug || data.id}`);
  return data;
}

export async function updateBuild(id: string, updates: UpdateBuildData) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Verify ownership - try slug first, then id
  let { data: build } = await supabase
    .from("builds")
    .select()
    .eq("slug", id)
    .single();
  
  if (!build) {
    ({ data: build } = await supabase
      .from("builds")
      .select()
      .eq("id", id)
      .single());
  }

  if (!build || build.user_id !== user.id) {
    throw new Error("Build not found or unauthorized");
  }

  // Generate new slug if name is being updated
  let updatedFields = { ...updates };
  if (updates.name) {
    const baseSlug = generateSlug(updates.name);
    updatedFields.slug = `${baseSlug}-${Math.random().toString(36).substring(2, 10)}`;
  }

  const { data, error } = await supabase
    .from("builds")
    .update(updatedFields)
    .eq("id", build.id) // Always use ID for update
    .select()
    .single();

  if (error) throw error;

  // Log activity
  await logActivity(
    'build',
    'Updated build',
    `Made changes to ${build.name}`,
    { buildId: id, updates }
  );

  revalidatePath(`/build-planner/${data.slug || build.id}`);
  return data;
}

export async function deleteBuild(id: string) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Verify ownership
  const { data: build } = await supabase
    .from("builds")
    .select()
    .eq("id", id)
    .single();

  if (!build || build.user_id !== user.id) {
    throw new Error("Not authorized to delete this build");
  }

  const { error } = await supabase
    .from("builds")
    .delete()
    .eq("id", id);

  if (error) throw error;

  // Log activity
  await logActivity(
    'build',
    'Deleted build',
    `Removed ${build.name}`,
    { buildId: id }
  );

  revalidatePath("/build-planner");
  return true;
}
