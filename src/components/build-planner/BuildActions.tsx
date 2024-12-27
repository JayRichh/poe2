"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Copy, Trash, Eye, EyeOff, Edit } from "lucide-react";

import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";
import { Dropdown } from "~/components/ui/Dropdown";
import { useBuilds, type Build } from "~/hooks/useBuilds";
import type { VisibilityType } from "~/app/actions/server/builds";

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

  const handleViewDetail = () => {
    router.push(`/build-planner/${build.slug || build.id}`);
  };

  const handleEdit = () => {
    if (!canModify) return;
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
      // Cycle through visibility states: private -> unlisted -> public -> private
      const visibilityStates: Record<string, VisibilityType> = {
        'private': 'unlisted',
        'unlisted': 'public',
        'public': 'private'
      };
      const newVisibility = visibilityStates[build.visibility] || 'private' as VisibilityType;
      
      await updateBuild(build.id, { visibility: newVisibility });
      onVisibilityChange?.();
      onActionComplete?.();
    } catch (err) {
      console.error('Error updating build visibility:', err);
    } finally {
      setLoading(false);
    }
  };

  const getVisibilityLabel = () => {
    switch (build.visibility) {
      case 'private':
        return 'Make Unlisted';
      case 'unlisted':
        return 'Make Public';
      case 'public':
        return 'Make Private';
      default:
        return 'Change Visibility';
    }
  };

  const items = [
    // View Detail - show for non-modifiable builds
    ...(!canModify ? [{
      label: "View Detail",
      value: "view",
      icon: <Eye className="h-4 w-4" />,
      disabled: loading,
    }] : []),
    // Edit - only for builds user can modify
    ...(canModify ? [{
      label: "Edit",
      value: "edit",
      icon: <Edit className="h-4 w-4" />,
      disabled: loading,
    }] : []),
    // Duplicate - only for owned builds or public builds
    ...(canModify || build.visibility === 'public' ? [{
      label: "Duplicate",
      value: "duplicate",
      icon: <Copy className="h-4 w-4" />,
      disabled: loading,
    }] : []),
    // Visibility and Delete - only for builds user can modify
    ...(canModify ? [
      {
        label: getVisibilityLabel(),
        value: "visibility",
        icon: build.visibility === 'public' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />,
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
      case "view":
        handleViewDetail();
        break;
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
