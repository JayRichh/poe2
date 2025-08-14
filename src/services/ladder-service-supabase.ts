import { createClient } from "@supabase/supabase-js";

import type { ClassDistribution, LadderStats } from "~/types/ladder";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Only initialize the client if the environment variables are available
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export class LadderServiceSupabase {
  static async getLadderStats(): Promise<LadderStats | null> {
    try {
      if (supabase) {
        // Try to fetch from Supabase
        try {
          // Get the most recent ladder stats
          const { data, error } = await supabase
            .from("ladder_stats")
            .select("*")
            .order("timestamp", { ascending: false })
            .limit(1)
            .single();

          if (error) {
            throw error;
          }

          if (data) {
            return data.data as LadderStats;
          }
        } catch (supabaseError) {
          console.warn("Error fetching from Supabase, falling back to JSON:", supabaseError);
        }
      }

      // Fallback to JSON file
      if (typeof window === "undefined") {
        const fs = require("fs");
        const path = require("path");
        const filePath = path.join(process.cwd(), "public", "data", "ladder-stats.json");
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
      } else {
        // Client-side: Use fetch with cache-busting
        const response = await fetch(`/data/ladder-stats.json?_=${Date.now()}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ladder stats (${response.status})`);
        }
        return await response.json();
      }
    } catch (error) {
      console.error("Error loading ladder stats:", error);
      return null;
    }
  }

  static async getClassDistribution(): Promise<ClassDistribution[]> {
    try {
      const stats = await this.getLadderStats();
      return stats?.overall.distribution || [];
    } catch (error) {
      console.error("Error getting class distribution:", error);
      return [];
    }
  }

  static async getLeagueDistribution(league: string): Promise<ClassDistribution[]> {
    try {
      const stats = await this.getLadderStats();
      return stats?.ladders[league]?.distribution || [];
    } catch (error) {
      console.error(`Error getting distribution for league ${league}:`, error);
      return [];
    }
  }

  static async getLeagues(): Promise<string[]> {
    try {
      const stats = await this.getLadderStats();
      return stats ? Object.keys(stats.ladders) : [];
    } catch (error) {
      console.error("Error getting leagues:", error);
      return [];
    }
  }

  static async getTotalPlayers(): Promise<number> {
    try {
      const stats = await this.getLadderStats();
      return stats?.overall.total || 0;
    } catch (error) {
      console.error("Error getting total players:", error);
      return 0;
    }
  }

  static async getLeagueTotalPlayers(league: string): Promise<number> {
    try {
      const stats = await this.getLadderStats();
      return stats?.ladders[league]?.total || 0;
    } catch (error) {
      console.error(`Error getting total players for league ${league}:`, error);
      return 0;
    }
  }

  static async getLastUpdated(): Promise<string | null> {
    try {
      const stats = await this.getLadderStats();
      return stats?.timestamp || null;
    } catch (error) {
      console.error("Error getting last updated timestamp:", error);
      return null;
    }
  }
}
