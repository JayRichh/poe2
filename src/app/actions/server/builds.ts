"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
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
  cache?: RequestCache;
}

export type CreateBuildData = Omit<BuildInsert, "user_id">;
export type UpdateBuildData = Partial<BuildInsert>;

export interface BuildWithRelations extends Build {
  equipment?: Database["public"]["Tables"]["equipment"]["Row"][];
  skill_gems?: Database["public"]["Tables"]["skill_gems"]["Row"][];
  build_configs?: Database["public"]["Tables"]["build_configs"]["Row"][];
}

// Helper to check if string is a valid UUID
const isValidUUID = (str: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};

// Unified function to find build by id or slug
async function findBuild(supabase: any, idOrSlug: string, selectQuery = "*") {
  // Try by slug first
  const { data: slugData, error: slugError } = await supabase
    .from("builds")
    .select(selectQuery)
    .eq("slug", idOrSlug)
    .maybeSingle();
  
  if (!slugError && slugData) {
    return slugData;
  }

  // If not found by slug and input is a valid UUID, try by id
  if (isValidUUID(idOrSlug)) {
    const { data: idData, error: idError } = await supabase
      .from("builds")
      .select(selectQuery)
      .eq("id", idOrSlug)
      .maybeSingle();
    
    if (!idError && idData) {
      return idData;
    }
  }

  return null;
}

export async function getBuild(idOrSlug: string): Promise<BuildWithRelations | null> {
  const supabase = await getServerClient();

  try {
    const { data: { user } } = await supabase.auth.getUser();

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

    const build = await findBuild(supabase, idOrSlug, query);
    if (!build) return null;

    // Check visibility and ownership before returning
    const isOwner = user && build.user_id === user.id;
    const isPublic = build.visibility === "public";
    const canAccess = isOwner || isPublic;

    return canAccess ? build : null;
  } catch (error) {
    console.error("Error in getBuild:", error);
    return null;
  }
}

export async function getBuilds({ visibility = "all", includeOwn = false, cache = "default" }: BuildOptions = {}) {
  const supabase = await getServerClient();
  
  // Get current user if authenticated
  const { data: { user } } = await supabase.auth.getUser();

  let query = supabase.from("builds").select("*");

  // Optimize query based on visibility and user status
  if (user) {
    if (visibility === "all") {
      query = query.or(`visibility.eq.public,user_id.eq.${user.id}`);
    } else if (visibility === "private" || visibility === "unlisted") {
      query = query.eq("visibility", visibility).eq("user_id", user.id);
    } else {
      query = query.eq("visibility", "public");
      if (includeOwn) {
        query = query.or(`user_id.eq.${user.id}`);
      }
    }
  } else {
    // Non-authenticated users only see public builds
    query = query.eq("visibility", "public");
  }

  // Cache headers are handled by Next.js page config
  const { data, error } = await query
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function createBuild(build: CreateBuildData) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const baseSlug = generateSlug(build.name);
  const uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 10)}`;

  const { data, error } = await supabase
    .from("builds")
    .insert([{ ...build, user_id: user.id, slug: uniqueSlug }])
    .select()
    .single();

  if (error) throw error;

  await logActivity(
    'build',
    'Created new build',
    `Started a new ${build.poe_class || ''} build template`,
    { buildId: data.id, buildName: build.name }
  );

  // Only revalidate necessary paths
  revalidatePath('/build-planner');
  return data;
}

export async function updateBuild(id: string, updates: UpdateBuildData) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const foundBuild = await findBuild(supabase, id);
  if (!foundBuild || foundBuild.user_id !== user.id) {
    throw new Error("Build not found or unauthorized");
  }

  let updatedFields = { ...updates };
  if (updates.name) {
    const baseSlug = generateSlug(updates.name);
    updatedFields.slug = `${baseSlug}-${Math.random().toString(36).substring(2, 10)}`;
  }

  const { data, error } = await supabase
    .from("builds")
    .update(updatedFields)
    .eq("id", foundBuild.id)
    .select()
    .single();

  if (error) throw new Error(`Failed to update build: ${error.message}`);
  if (!data) throw new Error("Failed to update build: No data returned");

  await logActivity(
    'build',
    'Updated build',
    `Made changes to ${foundBuild.name}`,
    { buildId: id, updates }
  );

  // Only revalidate current build path and list
  revalidatePath('/build-planner');
  revalidatePath(`/build-planner/${data.slug || data.id}`);
  
  return data;
}

export async function deleteBuild(id: string) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const foundBuild = await findBuild(supabase, id);
  if (!foundBuild || foundBuild.user_id !== user.id) {
    throw new Error("Not authorized to delete this build");
  }

  const { error } = await supabase
    .from("builds")
    .delete()
    .eq("id", foundBuild.id);

  if (error) throw error;

  await logActivity(
    'build',
    'Deleted build',
    `Removed ${foundBuild.name}`,
    { buildId: id }
  );

  // Only revalidate list path
  revalidatePath('/build-planner');
  
  return true;
}
