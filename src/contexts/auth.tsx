"use client";

import { User } from "@supabase/supabase-js";

import { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { createClient } from "~/lib/supabase/client";

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

type AuthContextType = AuthState & {
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  signOut: async () => {},
  refreshSession: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const client = createClient();

  const refreshSession = async () => {
    try {
      const {
        data: { session },
      } = await client.auth.getSession();

      if (session) {
        const {
          data: { user },
          error: userError,
        } = await client.auth.getUser();
        if (userError) throw userError;

        setState((prev) => ({
          ...prev,
          user: user,
          loading: false,
          error: null,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          user: null,
          loading: false,
          error: null,
        }));
      }
    } catch (error) {
      console.error("Session refresh error:", error);
      setState((prev) => ({
        ...prev,
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : "Session refresh failed",
      }));
    }
  };

  const signOut = async () => {
    try {
      await client.auth.signOut();
      setState((prev) => ({ ...prev, user: null, error: null }));
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out error:", error);
      setState((prev) => ({
        ...prev,
        user: null,
        error: error instanceof Error ? error.message : "Sign out failed",
      }));
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await refreshSession();
      setIsInitialized(true);
    };
    initialize();

    const {
      data: { subscription },
    } = client.auth.onAuthStateChange(async (event, session) => {
      if (!isInitialized) return;
      if (event === "SIGNED_OUT") {
        setState((prev) => ({
          ...prev,
          user: null,
          loading: false,
          error: null,
        }));
        router.push("/");
      } else if (session) {
        // Verify user data when session changes
        const {
          data: { user },
          error: userError,
        } = await client.auth.getUser();
        if (userError) throw userError;

        setState((prev) => ({
          ...prev,
          user: user,
          loading: false,
          error: null,
        }));
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [client.auth, router]);

  return (
    <AuthContext.Provider value={{ ...state, signOut, refreshSession }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
