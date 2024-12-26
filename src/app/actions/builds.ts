"use server";

import { revalidatePath } from "next/cache";

import { getServerClient } from "~/app/_actions/supabase";
import { generateSlug } from "~/utils/slug";
import type { Database } from "~/lib/supabase/types";

type Build = Database["public"]["Tables"]["builds"]["Row"];
type BuildInsert = Database["public"]["Tables"]["builds"]["Insert"];
type BuildUpdate = Database["public"]["Tables"]["builds"]["Update"];

interface BuildWithRelations extends Build {
  author_name?: any;
  equipment?: Database["public"]["Tables"]["equipment"]["Row"][];
  skill_gems?: Database["public"]["Tables"]["skill_gems"]["Row"][];
  build_configs?: Database["public"]["Tables"]["build_configs"]["Row"][];
}

export async function createBuild(build: BuildInsert) {
  const supabase = await getServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Must be logged in to create builds");

  // Generate a unique slug from the build name
  const baseSlug = generateSlug(build.name);
  const uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 10)}`;

  const { data, error } = await supabase
    .from("builds")
    .insert([{ ...build, user_id: user.id, slug: uniqueSlug }])
    .select()
    .single();

  if (error) throw error;

  revalidatePath("/build-planner");
  return data;
}

export async function updateBuild(idOrSlug: string, updates: BuildUpdate) {
  const supabase = await getServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Must be logged in to update builds");

  // Verify ownership - try slug first, then id
  let { data: build } = await supabase.from("builds").select().eq("slug", idOrSlug).single();
  
  if (!build) {
    ({ data: build } = await supabase.from("builds").select().eq("id", idOrSlug).single());
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

  revalidatePath(`/build-planner/${data.slug || build.id}`);
  return data;
}

export async function deleteBuild(id: string) {
  const supabase = await getServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Must be logged in to delete builds");

  // Verify ownership
  const { data: build } = await supabase.from("builds").select().eq("id", id).single();

  if (!build || build.user_id !== user.id) {
    throw new Error("Build not found or unauthorized");
  }

  const { error } = await supabase.from("builds").delete().eq("id", id);

  if (error) throw error;

  revalidatePath("/build-planner");
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

    // Check visibility - only private/unlisted builds need auth
    if (data.visibility === "private" || data.visibility === "unlisted") {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user || data.user_id !== user.id) {
        throw new Error("Build not found or unauthorized");
      }
    }

    return data;
  } catch (error) {
    console.error("Error in getBuild:", error);
    throw error;
  }
}

export async function getBuilds({
  userId,
  visibility = "unlisted",
  includeOwn = true
}: {
  userId?: string;
  visibility?: "private" | "unlisted" | "public" | "all";
  includeOwn?: boolean;
} = {}): Promise<Build[]> {
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
      user_id
    `;

    let buildsQuery = supabase.from("builds").select(query);

    // Get current user if includeOwn is true
    let currentUser = null;
    if (includeOwn) {
      const { data: { user } } = await supabase.auth.getUser();
      currentUser = user;
    }

    if (userId) {
      buildsQuery = buildsQuery.eq("user_id", userId);
    } else if (visibility === "all") {
      if (currentUser) {
        buildsQuery = buildsQuery.or(`visibility.in.(public,unlisted),user_id.eq.${currentUser.id}`);
      } else {
        buildsQuery = buildsQuery.in("visibility", ["public", "unlisted"]);
      }
    } else {
      if (currentUser) {
        buildsQuery = buildsQuery.or(`visibility.eq.${visibility},user_id.eq.${currentUser.id}`);
      } else {
        buildsQuery = buildsQuery.eq("visibility", visibility);
      }
    }

    let { data, error } = await buildsQuery.order("created_at", { ascending: false });

    if (error) {
      if (error.code === "42703") {
        console.error("Column not found error. Migration may not be applied:", error);
        throw new Error("Database schema error. Please contact support.");
      }
      console.error("Database error:", error);
      throw new Error("Failed to fetch builds");
    }

    return data || [];
  } catch (error) {
    console.error("Error in getBuilds:", error);
    throw error;
  }
}

export async function updateBuildAndRedirect(id: string, updates: BuildUpdate) {
  try {
    const build = await updateBuild(id, updates);
    if (!build) {
      throw new Error("Build update failed - no build returned");
    }
    return build.slug || build.id;
  } catch (error) {
    console.error("Error in updateBuildAndRedirect:", error);
    if (error instanceof Error) {
      throw error; // Preserve the original error message
    }
    throw new Error("Failed to update build");
  }
}

export async function cloneBuild(id: string, updates: Partial<BuildInsert> = {}) {
  const supabase = await getServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Must be logged in to clone builds");

  // Get original build with relations
  const original = await getBuild(id);

  // Generate a unique slug for the cloned build
  const baseSlug = generateSlug(updates.name || `${original.name} (Clone)`);
  const uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 10)}`;

  // Create new build
  const { data: newBuild, error: buildError } = await supabase
    .from("builds")
    .insert([
      {
        ...original,
        ...updates,
        id: undefined,
        user_id: user.id,
        created_at: undefined,
        updated_at: undefined,
        slug: uniqueSlug,
      },
    ])
    .select()
    .single();

  if (buildError) throw buildError;

  // Clone relations if they exist
  if (original.equipment?.length) {
    const { error: equipError } = await supabase.from("equipment").insert(
      original.equipment.map((item) => ({
        ...item,
        id: undefined,
        build_id: newBuild.id,
        created_at: undefined,
        updated_at: undefined,
      }))
    );
    if (equipError) throw equipError;
  }

  if (original.skill_gems?.length) {
    const { error: gemsError } = await supabase.from("skill_gems").insert(
      original.skill_gems.map((gem) => ({
        ...gem,
        id: undefined,
        build_id: newBuild.id,
        created_at: undefined,
        updated_at: undefined,
      }))
    );
    if (gemsError) throw gemsError;
  }

  if (original.build_configs?.length) {
    const { error: configError } = await supabase.from("build_configs").insert(
      original.build_configs.map((config) => ({
        ...config,
        id: undefined,
        build_id: newBuild.id,
        created_at: undefined,
        updated_at: undefined,
      }))
    );
    if (configError) throw configError;
  }

  revalidatePath("/build-planner");
  return newBuild;
}
