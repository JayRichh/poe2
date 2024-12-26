"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { deleteBuild } from "~/app/actions/builds";
import { Toast } from "~/components/ui/Toast";
import { ActionDropdown } from "./ActionDropdown";

import type { Database } from "~/lib/supabase/types";
type Build = Database["public"]["Tables"]["builds"]["Row"];

interface BuildActionsProps {
  build: Build;
  canModify: boolean;
  onActionComplete?: () => void;
}

export function BuildActions({ build, canModify, onActionComplete }: BuildActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();
  const router = useRouter();

  if (!canModify) return null;

  const handleEdit = () => {
    router.push(`/build-planner/${build.slug || build.id}/edit`);
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteBuild(build.id);
        router.refresh();
        onActionComplete?.();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete build");
      }
    });
  };

  return (
    <>
      <ActionDropdown
        onEdit={handleEdit}
        onDelete={handleDelete}
        disabled={isPending}
      />

      {error && (
        <Toast 
          message={error}
          type="error"
          isVisible={!!error}
          onClose={() => setError(undefined)}
        />
      )}
    </>
  );
}
