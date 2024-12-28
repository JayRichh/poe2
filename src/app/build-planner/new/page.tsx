"use client";

import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";

import { BuildForm } from "~/components/build-planner/BuildForm";
import { useAuth } from "~/contexts/auth";
import { handleNewBuildSubmit } from "~/app/actions/server/build-form";
import type { Database } from "~/lib/supabase/types";

type BuildFormData = Omit<Database["public"]["Tables"]["builds"]["Insert"], "user_id">;

export default function NewBuildPage() {
  const { user, loading: authLoading } = useAuth();

  async function handleSubmit(formData: Partial<BuildFormData>) {
    if (!user || !formData.name) {
      throw new Error("User must be logged in and build name is required");
    }
    return handleNewBuildSubmit(formData);
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
              onClick={() => window.location.href = "/auth/login"}
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
