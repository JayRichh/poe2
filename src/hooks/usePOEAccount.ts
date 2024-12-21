"use client";

import { useCallback, useEffect, useState } from "react";

import { connectPOEAccount, disconnectPOEAccount, refreshPOEProfile } from "~/app/actions/poe";
import { createClient } from "~/lib/supabase/client";
import type { POEAccountData } from "~/lib/supabase/types";
import type { POEProfile } from "@/types/poe-api";

export function usePOEAccount() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [poeAccount, setPoeAccount] = useState<POEAccountData | null>(null);
  const [poeProfile, setPoeProfile] = useState<POEProfile | null>(null);
  const [hasRefreshToken, setHasRefreshToken] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function loadPOEAccount() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setPoeAccount(null);
          setHasRefreshToken(false);
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("poe_account, poe_refresh_token")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setPoeAccount(data.poe_account || null);
        setHasRefreshToken(!!data.poe_refresh_token);
      } catch (err) {
        console.error("Error loading POE account:", err);
        setError(err instanceof Error ? err.message : "Failed to load POE account");
      } finally {
        setLoading(false);
      }
    }

    loadPOEAccount();

    // Subscribe to profile changes
    const channel = supabase
      .channel("profile-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
        },
        async (payload: { new: Record<string, any> }) => {
          const {
            data: { user },
          } = await supabase.auth.getUser();
          if (user && payload.new && payload.new.id === user.id) {
            setPoeAccount(payload.new.poe_account || null);
            setHasRefreshToken(!!payload.new.poe_refresh_token);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase]);

  const connectPOE = useCallback(async () => {
    try {
      setLoading(true);
      const authUrl = await connectPOEAccount();
      window.location.href = authUrl;
    } catch (err) {
      console.error("Error connecting POE account:", err);
      setError(err instanceof Error ? err.message : "Failed to connect POE account");
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnectPOE = useCallback(async () => {
    try {
      setLoading(true);
      await disconnectPOEAccount();
      setPoeAccount(null);
      setHasRefreshToken(false);
      setPoeProfile(null);
    } catch (err) {
      console.error("Error disconnecting POE account:", err);
      setError(err instanceof Error ? err.message : "Failed to disconnect POE account");
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    try {
      setLoading(true);
      const profile = await refreshPOEProfile();
      setPoeProfile(profile);
    } catch (err) {
      console.error("Error refreshing POE profile:", err);
      setError(err instanceof Error ? err.message : "Failed to refresh POE profile");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    poeAccount,
    poeProfile,
    hasRefreshToken,
    connectPOE,
    disconnectPOE,
    refreshProfile,
  };
}
