"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Copy, Trash, Eye, EyeOff, Edit } from "lucide-react";

import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";
import { Dropdown } from "~/components/ui/Dropdown";
import { useBuilds, type Build } from "~/hooks/useBuilds";

interface BuildActionsProps {
  build: Build;
  canModify?: boolean;
  onVisibilityChange?: () => void;
  onActionComplete?: () => void;
}

export function BuildActions({ 
  build, 
  canModify = false, 
  onVisibilityChange, 
  onActionComplete 
}: BuildActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { createBuild, deleteBuild, updateBuild } = useBuilds();

  const handleEdit = () => {
    router.push(`/build-planner/${build.slug || build.id}/edit`);
  };

  const handleDuplicate = async () => {
    setLoading(true);
    try {
      // Only copy specific fields we want to duplicate
      const newBuild = await createBuild({
        name: `${build.name} (Copy)`,
        description: build.description,
        poe_class: build.poe_class,
        level: build.level,
        notes: build.notes,
        is_template: build.is_template,
        version: build.version,
        tags: build.tags,
        visibility: 'private', // Always private for copies
        parent_build_id: build.id // Track original build
      });
      if (newBuild) {
        router.push(`/build-planner/${newBuild.slug || newBuild.id}`);
        onActionComplete?.();
      }
    } catch (err) {
      console.error('Error duplicating build:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!canModify || !window.confirm('Are you sure you want to delete this build?')) return;

    setLoading(true);
    try {
      await deleteBuild(build.id);
      router.refresh();
      onActionComplete?.();
    } catch (err) {
      console.error('Error deleting build:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async () => {
    if (!canModify) return;
    
    setLoading(true);
    try {
      // Temporarily only toggle between private and unlisted
      const newVisibility = build.visibility === 'unlisted' ? 'private' : 'unlisted';
      await updateBuild(build.id, { visibility: newVisibility });
      onVisibilityChange?.();
      onActionComplete?.();
    } catch (err) {
      console.error('Error updating build visibility:', err);
    } finally {
      setLoading(false);
    }
  };

  const items = [
    ...(canModify ? [{
      label: "Edit",
      value: "edit",
      icon: <Edit className="h-4 w-4" />,
      disabled: loading,
    }] : []),
    {
      label: "Duplicate",
      value: "duplicate",
      icon: <Copy className="h-4 w-4" />,
      disabled: loading,
    },
    ...(canModify ? [
      {
        label: build.visibility === 'unlisted' ? "Make Private" : "Make Unlisted",
        value: "visibility",
        icon: build.visibility === 'unlisted' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />,
        disabled: loading,
      },
      {
        label: "Delete",
        value: "delete",
        icon: <Trash className="h-4 w-4" />,
        disabled: loading,
        className: "text-red-500 hover:bg-red-500/10 hover:text-red-500",
      }
    ] : [])
  ];

  const handleAction = (value: string) => {
    switch (value) {
      case "edit":
        handleEdit();
        break;
      case "duplicate":
        handleDuplicate();
        break;
      case "visibility":
        toggleVisibility();
        break;
      case "delete":
        handleDelete();
        break;
    }
  };

  return (
    <Dropdown
      trigger={
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-primary/10"
          disabled={loading}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      }
      items={items}
      onChange={handleAction}
      position="bottom-right"
      width={256}
      className=""
      itemClassName="transition-all duration-150 hover:translate-x-1 text-[0.9375rem] font-medium whitespace-nowrap"
    />
  );
}
