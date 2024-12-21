"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { Text } from "~/components/ui/Text";

import { createBuild } from "~/app/actions/builds";
import type { Database } from "~/lib/supabase/types";

// Full build type from database
type BuildInsert = Database["public"]["Tables"]["builds"]["Insert"];
type VisibilityType = Database["public"]["Enums"]["visibility_type"];

// Client-side build creation type (omit server-side fields)
type NewBuild = Omit<BuildInsert, "user_id" | "id" | "created_at" | "updated_at">;

const POE_CLASSES = [
  "Acolyte",
  "Druid",
  "Warrior",
  "Rogue",
  "Sorcerer",
  "Ranger",
] as const;

const VISIBILITY_OPTIONS: { value: VisibilityType; label: string }[] = [
  { value: "private", label: "Private - Only visible to you" },
  { value: "unlisted", label: "Unlisted - Accessible via direct link" },
  { value: "public", label: "Public - Visible to everyone" },
];

export default function NewBuildPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const build: NewBuild = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      visibility: formData.get("visibility") as VisibilityType,
      poe_class: formData.get("class") as string || undefined,
      level: Number(formData.get("level")) || undefined,
    };

    try {
      const newBuild = await createBuild(build as BuildInsert);
      router.push(`/build-planner/${newBuild.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create build");
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <Text className="text-3xl font-bold tracking-tight mb-4">Create New Build</Text>
          <Text className="text-foreground/60 text-balance">
            Create a new Path of Exile 2 build to plan your character progression, equipment, and skills.
          </Text>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
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
              <Input
                name="level"
                type="number"
                placeholder="Target level"
                min={1}
                max={100}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Text>Visibility *</Text>
            <select
              name="visibility"
              defaultValue="private"
              required
              className="flex h-10 w-full rounded-md border border-border/50 bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {VISIBILITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <Text className="text-destructive">{error}</Text>
          )}

          <div className="flex items-center gap-4 pt-4">
            <Button type="submit" variant="primary" isLoading={isLoading}>
              Create Build
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/build-planner")}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}
