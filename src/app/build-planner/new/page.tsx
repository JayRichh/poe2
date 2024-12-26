"use client";

import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";

import { BuildForm } from "~/components/build-planner/BuildForm";
import { createBuild } from "~/app/actions/builds";
import { useAuth } from "~/contexts/auth";
import type { Database } from "~/lib/supabase/types";

type BuildInsert = Database["public"]["Tables"]["builds"]["Insert"];

export default function NewBuildPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  async function handleSubmit(build: Partial<BuildInsert>) {
    if (!user) return;
    const newBuild = await createBuild(build as BuildInsert);
    router.push(`/build-planner/${newBuild.slug || newBuild.id}`);
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">
      {!user && !authLoading && (
        <div className="bg-background/50 border border-border/10 rounded-lg p-4 flex items-center justify-center gap-3 mb-6">
          <Text className="text-sm text-foreground/70">
            Please{" "}
            <Button
              variant="link"
              className="px-1 text-sm font-semibold"
              onClick={() => router.push("/auth/login")}
            >
              sign in
            </Button>{" "}
            to save and share your builds
          </Text>
        </div>
      )}

      <BuildForm 
        onSubmit={handleSubmit}
        initialBuild={{
          visibility: "private",
        }}
      />
    </div>
  );
}
