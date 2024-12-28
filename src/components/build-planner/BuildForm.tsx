"use client";

import { useState } from "react";
import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";
import type { Database, VisibilityType } from "~/lib/supabase/types";
import type { BuildVisibility } from "~/app/actions/settings";

type BuildInsert = Database["public"]["Tables"]["builds"]["Insert"];

// Helper to convert database visibility to application visibility
function toAppVisibility(visibility: VisibilityType | undefined): BuildVisibility {
  return (visibility === 'private' || visibility === 'unlisted') ? visibility : 'private';
}

type POEClass = "duelist" | "marauder" | "ranger" | "scion" | "shadow" | "templar" | "witch";

// Omit user_id since it's handled by the server
type BuildFormData = Omit<BuildInsert, "user_id">;

interface BuildFormResponse {
  success: boolean;
  buildId: string;
}

interface BuildFormProps {
  initialBuild?: Partial<BuildFormData>;
  onSubmit: (build: Partial<BuildFormData>) => Promise<BuildFormResponse>;
}

export function BuildForm({ initialBuild, onSubmit }: BuildFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [name, setName] = useState(initialBuild?.name || "");
  const [description, setDescription] = useState(initialBuild?.description || "");
  const [poeClass, setPoeClass] = useState<POEClass | "">(
    (initialBuild?.poe_class as POEClass) || ""
  );
  const [level, setLevel] = useState(initialBuild?.level?.toString() || "");
  const [visibility, setVisibility] = useState<BuildVisibility>(
    toAppVisibility(initialBuild?.visibility)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    setLoading(true);
    setError(undefined);

    try {
      const result = await onSubmit({
        name,
        description: description || undefined,
        poe_class: poeClass || undefined,
        level: level ? parseInt(level, 10) : undefined,
        visibility,
        is_template: false, // Default value
      });

      if (result?.success) {
        // Use window.location for full page navigation
        window.location.href = `/build-planner/${result.buildId}`;
      }
    } catch (err) {
      console.error("Error saving build:", err);
      setError(err instanceof Error ? err.message : "Failed to save build");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName = "w-full h-12 rounded-lg bg-background/95 border border-border/50 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors hover:bg-background/80";
  const selectClassName = inputClassName + " appearance-none";

  return (
    <div className="bg-background/95 backdrop-blur-sm border border-border/50 rounded-xl p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Text className="text-sm text-foreground/60">Build Name</Text>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter build name"
              className={inputClassName}
              required
            />
          </div>

          <div className="space-y-2">
            <Text className="text-sm text-foreground/60">Description</Text>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter build description"
              className={`${inputClassName} h-24 py-3 resize-none`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Text className="text-sm text-foreground/60">Class</Text>
              <select
                value={poeClass}
                onChange={(e) => setPoeClass(e.target.value as POEClass)}
                className={selectClassName}
              >
                <option value="">Select class</option>
                <option value="duelist">Duelist</option>
                <option value="marauder">Marauder</option>
                <option value="ranger">Ranger</option>
                <option value="scion">Scion</option>
                <option value="shadow">Shadow</option>
                <option value="templar">Templar</option>
                <option value="witch">Witch</option>
              </select>
            </div>

            <div className="space-y-2">
              <Text className="text-sm text-foreground/60">Level</Text>
              <input
                type="number"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                placeholder="Enter level"
                min="1"
                max="100"
                className={inputClassName}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Text className="text-sm text-foreground/60">Visibility</Text>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as BuildVisibility)}
              className={selectClassName}
              required
            >
              <option value="private">Private - Only visible to you</option>
              <option value="unlisted">Unlisted - Accessible via direct link</option>
              <option value="unlisted" disabled>Public - Visible to everyone (Coming Soon)</option>
            </select>
            <div className="text-xs text-foreground/60 mt-1">
              Public builds are temporarily disabled pending development
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-lg border border-destructive/20 bg-destructive/5">
            <Text className="text-sm text-destructive">{error}</Text>
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Saving..." : "Save Build"}
          </Button>
        </div>
      </form>
    </div>
  );
}
