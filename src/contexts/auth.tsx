"use client";

import { User } from "@supabase/supabase-js";

import { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

// import { createClient } from "~/lib/supabase/client";

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
    loading: false,
    error: null,
  });
  const [isInitialized, setIsInitialized] = useState(true);
  const router = useRouter();
  // const client = createClient();
  const queryClient = useQueryClient();

  const refreshSession = async () => {
    // Supabase client disabled - always return no user
    setState((prev) => ({
      ...prev,
      user: null,
      loading: false,
      error: null,
    }));
  };

  const signOut = async () => {
    // Supabase client disabled - just clear state and redirect
    setState((prev) => ({ ...prev, user: null, error: null }));
    window.location.href = "/";
  };

  useEffect(() => {
    // Supabase client disabled - just initialize with no user
    const initialize = async () => {
      await refreshSession();
      setIsInitialized(true);
    };
    initialize();
  }, [router]);

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
