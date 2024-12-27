"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createBuild, updateBuild, type CreateBuildData } from "./builds";
import type { Database } from "~/lib/supabase/types";

type VisibilityType = Database["public"]["Enums"]["visibility_type"];

type BuildFormData = Omit<Database["public"]["Tables"]["builds"]["Insert"], "user_id">;

export async function handleNewBuildSubmit(formData: Partial<BuildFormData>) {
  try {
    if (!formData.name) {
      throw new Error("Build name is required");
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
      throw new Error("Failed to create build");
    }

    // Ensure cache is revalidated before redirect
    revalidatePath("/build-planner");
    revalidatePath(`/build-planner/${newBuild.slug || newBuild.id}`);

    // Use redirect after revalidation
    redirect(`/build-planner/${newBuild.slug || newBuild.id}`);
  } catch (error) {
    console.error("Error in handleNewBuildSubmit:", error);
    throw error;
  }
}

export async function handleBuildSubmit(buildId: string, formData: Partial<BuildFormData>) {
  try {
    if (!formData.name) {
      throw new Error("Build name is required");
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
      throw new Error("Failed to update build");
    }

    // Ensure cache is revalidated before redirect
    revalidatePath("/build-planner");
    revalidatePath(`/build-planner/${updatedBuild.slug || updatedBuild.id}`);

    // Use redirect after revalidation
    redirect(`/build-planner/${updatedBuild.slug || updatedBuild.id}`);
  } catch (error) {
    console.error("Error in handleBuildSubmit:", error);
    throw error;
  }
}
