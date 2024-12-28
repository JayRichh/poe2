"use server";

import { revalidatePath } from "next/cache";
import { createBuild, updateBuild, type CreateBuildData } from "./builds";
import type { Database } from "~/lib/supabase/types";

type VisibilityType = Database["public"]["Enums"]["visibility_type"];

export type BuildFormData = Omit<Database["public"]["Tables"]["builds"]["Insert"], "user_id">;

export interface BuildFormResponse {
  success: boolean;
  buildId: string;
  error?: string;
}

export async function handleNewBuildSubmit(formData: Partial<BuildFormData>): Promise<BuildFormResponse> {
  try {
    if (!formData.name) {
      return { success: false, buildId: "", error: "Build name is required" };
    }

    // Transform partial form data to required CreateBuildData
    // Ensure visibility is either private or unlisted
    const visibility: VisibilityType = formData.visibility === "unlisted" ? "unlisted" : "private";
    
    const buildData: CreateBuildData = {
      name: formData.name,
      description: formData.description || "",
      visibility,
      poe_class: formData.poe_class || "",
      level: formData.level || 1,
      notes: formData.notes || "",
      is_template: formData.is_template || false,
      parent_build_id: formData.parent_build_id,
      version: formData.version || "1.0.0",
      tags: formData.tags || [],
      slug: formData.slug,
    };

    const newBuild = await createBuild(buildData);
    if (!newBuild) {
      return { success: false, buildId: "", error: "Failed to create build" };
    }

    // Revalidate paths
    revalidatePath('/build-planner');
    revalidatePath(`/build-planner/${newBuild.slug || newBuild.id}`);
    revalidatePath(`/build-planner/${newBuild.id}`);
    
    return { success: true, buildId: newBuild.slug || newBuild.id };
  } catch (error) {
    console.error("Error in handleNewBuildSubmit:", error);
    return { 
      success: false, 
      buildId: "", 
      error: error instanceof Error ? error.message : "Failed to create build" 
    };
  }
}

export async function handleBuildSubmit(buildId: string, formData: Partial<BuildFormData>): Promise<BuildFormResponse> {
  try {
    if (!formData.name) {
      return { success: false, buildId, error: "Build name is required" };
    }

    const buildData = {
      name: formData.name,
      description: formData.description || "",
      visibility: formData.visibility,
      poe_class: formData.poe_class || "",
      level: formData.level || 1,
      notes: formData.notes || "",
      is_template: formData.is_template || false,
      parent_build_id: formData.parent_build_id,
      version: formData.version || "1.0.0",
      tags: formData.tags || [],
      slug: formData.slug,
    };

    const updatedBuild = await updateBuild(buildId, buildData);
    if (!updatedBuild) {
      return { success: false, buildId, error: "Failed to update build" };
    }

    // Revalidate all possible paths
    revalidatePath('/build-planner');
    revalidatePath(`/build-planner/${buildId}`);
    revalidatePath(`/build-planner/${buildId}/edit`);
    revalidatePath(`/build-planner/${updatedBuild.id}`);
    revalidatePath(`/build-planner/${updatedBuild.id}/edit`);
    if (updatedBuild.slug) {
      revalidatePath(`/build-planner/${updatedBuild.slug}`);
      revalidatePath(`/build-planner/${updatedBuild.slug}/edit`);
    }

    // Wait for revalidation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, buildId: updatedBuild.slug || updatedBuild.id };
  } catch (error) {
    console.error("Error in handleBuildSubmit:", error);
    return { 
      success: false, 
      buildId, 
      error: error instanceof Error ? error.message : "Failed to update build" 
    };
  }
}
