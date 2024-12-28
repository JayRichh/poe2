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
}

export type CreateBuildData = Omit<BuildInsert, "user_id">;
export type UpdateBuildData = Partial<BuildInsert>;

export interface BuildWithRelations extends Build {
  equipment?: Database["public"]["Tables"]["equipment"]["Row"][];
  skill_gems?: Database["public"]["Tables"]["skill_gems"]["Row"][];
  build_configs?: Database["public"]["Tables"]["build_configs"]["Row"][];
}

export async function getBuild(idOrSlug: string): Promise<BuildWithRelations | null> {
  const supabase = await getServerClient();

  try {
    // Get current user first
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

    // Helper to check if string is a valid UUID
    const isValidUUID = (str: string) => {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      return uuidRegex.test(str);
    };

    let build;

    // Try by slug first
    const { data: slugData, error: slugError } = await supabase
      .from("builds")
      .select(query)
      .eq("slug", idOrSlug)
      .maybeSingle();
    
    if (!slugError && slugData) {
      build = slugData;
    }

    // If not found by slug and input is a valid UUID, try by id
    if (!build && isValidUUID(idOrSlug)) {
      const { data: idData, error: idError } = await supabase
        .from("builds")
        .select(query)
        .eq("id", idOrSlug)
        .maybeSingle();
      
      if (!idError && idData) {
        build = idData;
      }
    }

    // If build not found, return null
    if (!build) {
      return null;
    }

    // Check visibility and ownership before returning
    const isOwner = user && build.user_id === user.id;
    const isPublic = build.visibility === "public";
    const canAccess = isOwner || isPublic;

    // If not authorized, return null
    if (!canAccess) {
      return null;
    }

    return build;
  } catch (error) {
    console.error("Error in getBuild:", error);
    return null;
  }
}

export async function getBuilds({ visibility = "all", includeOwn = false }: BuildOptions = {}) {
  const supabase = await getServerClient();
  
  // Get current user if authenticated
  const { data: { user } } = await supabase.auth.getUser();

  let query = supabase.from("builds").select("*");

  // Base query for public builds
  if (visibility === "all") {
    // Show public builds and user's own builds if authenticated
    query = query.or(
      user 
        ? `visibility.eq.public,user_id.eq.${user.id}` 
        : 'visibility.eq.public'
    );
  } else if (visibility === "public") {
    // Only show public builds
    query = query.eq("visibility", "public");
  } else if (visibility === "unlisted") {
    // Show unlisted builds only if user is authenticated and owns them
    if (user) {
      query = query.eq("visibility", "unlisted").eq("user_id", user.id);
    } else {
      return []; // No unlisted builds for non-authenticated users
    }
  } else if (visibility === "private") {
    // Show private builds only if user is authenticated and owns them
    if (user) {
      query = query.eq("visibility", "private").eq("user_id", user.id);
    } else {
      return []; // No private builds for non-authenticated users
    }
  }

  // Include user's own builds if requested and authenticated
  if (includeOwn && user) {
    query = query.or(`user_id.eq.${user.id}`);
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

  // Revalidate all build planner routes
  revalidatePath('/build-planner');
  revalidatePath(`/build-planner/${data.slug || data.id}`);
  return data;
}

export async function updateBuild(id: string, updates: UpdateBuildData) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Helper to check if string is a valid UUID
  const isValidUUID = (str: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  };

  let foundBuild;
  
  // Try by slug first
  const { data: slugData, error: slugError } = await supabase
    .from("builds")
    .select()
    .eq("slug", id)
    .maybeSingle();
  
  if (!slugError && slugData) {
    foundBuild = slugData;
  }

  // If not found by slug and input is a valid UUID, try by id
  if (!foundBuild && isValidUUID(id)) {
    const { data: idData, error: idError } = await supabase
      .from("builds")
      .select()
      .eq("id", id)
      .maybeSingle();
    
    if (!idError && idData) {
      foundBuild = idData;
    }
  }

  // If still no match or not the owner, fail
  if (!foundBuild || foundBuild.user_id !== user.id) {
    throw new Error("Build not found or unauthorized");
  }

  // Store old paths for revalidation
  const oldPaths = [
    `/build-planner/${foundBuild.slug || foundBuild.id}`,
    `/build-planner/${foundBuild.slug || foundBuild.id}/edit`,
    `/build-planner/${foundBuild.id}`,
    `/build-planner/${foundBuild.id}/edit`,
  ];

  // Generate new slug if name is being updated
  let updatedFields = { ...updates };
  if (updates.name) {
    const baseSlug = generateSlug(updates.name);
    updatedFields.slug = `${baseSlug}-${Math.random().toString(36).substring(2, 10)}`;
  }

  const { data, error } = await supabase
    .from("builds")
    .update(updatedFields)
    .eq("id", foundBuild.id) // Always use ID for update
    .select()
    .single();

  if (error) {
    console.error("Error updating build:", error);
    throw new Error(`Failed to update build: ${error.message}`);
  }

  if (!data) {
    throw new Error("Failed to update build: No data returned");
  }

  // Log activity
  await logActivity(
    'build',
    'Updated build',
    `Made changes to ${foundBuild.name}`,
    { buildId: id, updates }
  );

  // Revalidate all possible paths
  revalidatePath('/build-planner');
  
  // Revalidate old paths
  oldPaths.forEach(path => revalidatePath(path));
  
  // Revalidate new paths
  revalidatePath(`/build-planner/${data.slug || data.id}`);
  revalidatePath(`/build-planner/${data.slug || data.id}/edit`);
  revalidatePath(`/build-planner/${data.id}`);
  revalidatePath(`/build-planner/${data.id}/edit`);
  
  return data;
}

export async function deleteBuild(id: string) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Helper to check if string is a valid UUID
  const isValidUUID = (str: string) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  };

  let foundBuild;
  
  // Try by slug first
  const { data: slugData, error: slugError } = await supabase
    .from("builds")
    .select()
    .eq("slug", id)
    .maybeSingle();
  
  if (!slugError && slugData) {
    foundBuild = slugData;
  }

  // If not found by slug and input is a valid UUID, try by id
  if (!foundBuild && isValidUUID(id)) {
    const { data: idData, error: idError } = await supabase
      .from("builds")
      .select()
      .eq("id", id)
      .maybeSingle();
    
    if (!idError && idData) {
      foundBuild = idData;
    }
  }

  // If still no match or not the owner, fail
  if (!foundBuild || foundBuild.user_id !== user.id) {
    throw new Error("Not authorized to delete this build");
  }

  const { error } = await supabase
    .from("builds")
    .delete()
    .eq("id", foundBuild.id);

  if (error) throw error;

  // Log activity
  await logActivity(
    'build',
    'Deleted build',
    `Removed ${foundBuild.name}`,
    { buildId: id }
  );

  // Revalidate paths
  revalidatePath('/build-planner');
  revalidatePath(`/build-planner/${foundBuild.slug || foundBuild.id}`);
  revalidatePath(`/build-planner/${foundBuild.id}`);
  
  return true;
}
