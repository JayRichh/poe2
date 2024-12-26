"use client";

import { User } from "lucide-react";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { Text } from "~/components/ui/Text";

import { createBuild } from "~/app/actions/builds";
import { useAuth } from "~/contexts/auth";
import type { Database } from "~/lib/supabase/types";

// Full build type from database
type BuildInsert = Database["public"]["Tables"]["builds"]["Insert"];
type VisibilityType = Database["public"]["Enums"]["visibility_type"];

// Type for visibility options in the UI
type VisibilityOption = {
  value: VisibilityType;
  label: string;
  disabled?: boolean;
  tooltip?: string;
};

// Client-side build creation type (omit server-side fields)
type NewBuild = Omit<BuildInsert, "user_id" | "id" | "created_at" | "updated_at">;

const VISIBILITY_OPTIONS: VisibilityOption[] = [
  { value: "private", label: "Private - Only visible to you" },
  { value: "unlisted", label: "Unlisted - Accessible via direct link" },
  {
    value: "unlisted",
    label: "Public - Visible to everyone",
    disabled: true,
    tooltip: "Public builds are temporarily disabled pending development",
  },
];

const POE_CLASSES = ["Acolyte", "Druid", "Warrior", "Rogue", "Sorcerer", "Ranger"] as const;


export default function NewBuildPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, loading: authLoading } = useAuth();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const build: NewBuild = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      visibility: formData.get("visibility") as VisibilityType,
      poe_class: (formData.get("class") as string) || undefined,
      level: Number(formData.get("level")) || undefined,
    };

    try {
      const newBuild = await createBuild(build as BuildInsert);
      router.push(`/build-planner/${newBuild.slug || newBuild.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create build");
      setIsLoading(false);
    }
  }

  return (
    <Container className="max-w-2xl mx-auto py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <Text className="text-3xl font-bold tracking-tight mb-4">Create New Build</Text>
          <Text className="text-foreground/60 text-balance mx-auto">
            Create a new Path of Exile 2 build to plan your character progression, equipment, and
            skills.
          </Text>
        </div>

        {!user && !authLoading && (
          <div className="bg-background/50 border border-border/10 rounded-lg p-4 flex items-center justify-center gap-3">
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

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-background/50 rounded-lg border border-border/10 p-6"
        >
          <div className="space-y-2">
            <Text>Build Name *</Text>
            <Input
              name="name"
              placeholder="Enter build name"
              required
              minLength={3}
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Text>Description</Text>
            <Input
              name="description"
              placeholder="Brief description of your build"
              maxLength={500}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Text>Class</Text>
              <select
                name="class"
                defaultValue=""
                className="flex h-10 w-full rounded-md border border-border/50 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select class</option>
                {POE_CLASSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Text>Level</Text>
              <Input name="level" type="number" placeholder="Target level" min={1} max={100} />
            </div>
          </div>

          <div className="space-y-2">
            <Text>Visibility *</Text>
            <div className="relative">
              <select
                name="visibility"
                defaultValue="private"
                required
                className="flex h-10 w-full rounded-md border border-border/50 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {VISIBILITY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} disabled={option.disabled}>
                    {option.label} {option.disabled ? "(Coming Soon)" : ""}
                  </option>
                ))}
              </select>
              {VISIBILITY_OPTIONS.find((opt) => opt.disabled && opt.tooltip) && (
                <div className="absolute left-0 -bottom-6 text-xs text-foreground/60">
                  {VISIBILITY_OPTIONS.find((opt) => opt.disabled)?.tooltip}
                </div>
              )}
            </div>
          </div>

          {error && <Text className="text-destructive">{error}</Text>}

          <div className="flex items-center justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/build-planner")}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              disabled={!user || authLoading}
              title={!user ? "Sign in required to create builds" : undefined}
            >
              Create Build
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
