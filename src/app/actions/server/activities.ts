"use server";

import { getServerClient } from "~/app/_actions/supabase";
import type { Database } from "~/lib/supabase/types";
import type { Activity, ActivityType } from "~/types/activity";

export async function logActivity(
  type: ActivityType,
  title: string,
  description: string,
  metadata?: any
) {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { error } = await supabase
    .from("activities")
    .insert({
      user_id: user.id,
      type,
      title,
      description,
      metadata
    });

  if (error) throw error;
}

export async function getRecentActivities(limit = 10, offset = 0): Promise<Activity[]> {
  const supabase = await getServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Get one extra item to determine if there are more
  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit);

  if (error) throw error;
  return data as Activity[];
}
