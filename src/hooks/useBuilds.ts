"use client";

import { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

import { createClient } from "~/lib/supabase/client";
import type { Database } from "~/lib/supabase/types";

type Build = Database["public"]["Tables"]["builds"]["Row"];
type BuildInsert = Database["public"]["Tables"]["builds"]["Insert"];
type BuildUpdate = Database["public"]["Tables"]["builds"]["Update"];

export function useBuilds() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const createBuild = useCallback(
    async (build: BuildInsert) => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: err } = await supabase.from("builds").insert(build).select().single();

        if (err) throw err;

        router.refresh();
        return data;
      } catch (err) {
        console.error("Error creating build:", err);
        setError("Failed to create build");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router, supabase]
  );

  const updateBuild = useCallback(
    async (id: string, updates: BuildUpdate) => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: err } = await supabase
          .from("builds")
          .update(updates)
          .eq("id", id)
          .select()
          .single();

        if (err) throw err;

        router.refresh();
        return data;
      } catch (err) {
        console.error("Error updating build:", err);
        setError("Failed to update build");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router, supabase]
  );

  const deleteBuild = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        const { error: err } = await supabase.from("builds").delete().eq("id", id);

        if (err) throw err;

        router.refresh();
      } catch (err) {
        console.error("Error deleting build:", err);
        setError("Failed to delete build");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router, supabase]
  );

  const getBuild = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        const { data, error: err } = await supabase
          .from("builds")
          .select(
            `
          *,
          equipment (*),
          skill_gems (*),
          build_configs (*)
        `
          )
          .eq("id", id)
          .single();

        if (err) throw err;

        return data;
      } catch (err) {
        console.error("Error fetching build:", err);
        setError("Failed to fetch build");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [supabase]
  );

  const getBuilds = useCallback(
    async ({
      userId,
      visibility,
      isTemplate,
      limit = 10,
      offset = 0,
    }: {
      userId?: string;
      visibility?: Database["public"]["Enums"]["visibility_type"];
      isTemplate?: boolean;
      limit?: number;
      offset?: number;
    } = {}) => {
      setLoading(true);
      setError(null);

      try {
        let query = supabase
          .from("builds")
          .select("*")
          .range(offset, offset + limit - 1)
          .order("updated_at", { ascending: false });

        if (userId) {
          query = query.eq("user_id", userId);
        }

        if (visibility) {
          query = query.eq("visibility", visibility);
        }

        if (typeof isTemplate === "boolean") {
          query = query.eq("is_template", isTemplate);
        }

        const { data, error: err } = await query;

        if (err) throw err;

        return data;
      } catch (err) {
        console.error("Error fetching builds:", err);
        setError("Failed to fetch builds");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [supabase]
  );

  const cloneBuild = useCallback(
    async (id: string, updates: Partial<BuildInsert> = {}) => {
      setLoading(true);
      setError(null);

      try {
        // Get original build with all related data
        const original = await getBuild(id);
        if (!original) throw new Error("Build not found");

        // Create new build
        const { data: newBuild, error: buildError } = await supabase
          .from("builds")
          .insert({
            ...original,
            id: undefined,
            parent_build_id: original.id,
            name: `Copy of ${original.name}`,
            ...updates,
          })
          .select()
          .single();

        if (buildError) throw buildError;

        // Clone equipment
        if (original.equipment?.length) {
          const { error: equipError } = await supabase.from("equipment").insert(
            original.equipment.map((item) => ({
              ...item,
              id: undefined,
              build_id: newBuild.id,
            }))
          );

          if (equipError) throw equipError;
        }

        // Clone skill gems
        if (original.skill_gems?.length) {
          const { error: gemsError } = await supabase.from("skill_gems").insert(
            original.skill_gems.map((gem) => ({
              ...gem,
              id: undefined,
              build_id: newBuild.id,
            }))
          );

          if (gemsError) throw gemsError;
        }

        // Clone build configs
        if (original.build_configs?.length) {
          const { error: configError } = await supabase.from("build_configs").insert(
            original.build_configs.map((config) => ({
              ...config,
              id: undefined,
              build_id: newBuild.id,
            }))
          );

          if (configError) throw configError;
        }

        router.refresh();
        return newBuild;
      } catch (err) {
        console.error("Error cloning build:", err);
        setError("Failed to clone build");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [getBuild, router, supabase]
  );

  return {
    loading,
    error,
    createBuild,
    updateBuild,
    deleteBuild,
    getBuild,
    getBuilds,
    cloneBuild,
  };
}
