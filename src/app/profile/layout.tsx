"use client";

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "~/contexts/auth";

import ProfileLoading from "./loading";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?next=/profile");
    }
  }, [loading, user, router]);

  if (loading) {
    return <ProfileLoading />;
  }

  if (!user) {
    return null;
  }

  return children;
}
