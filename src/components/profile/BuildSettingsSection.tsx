"use client";

import { motion } from "framer-motion";
import { Globe, Link2, Lock, RefreshCw } from "lucide-react";

import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";

import { cn } from "~/utils/cn";

import type { BuildSettingsUpdate, BuildVisibility } from "~/types/profile";

interface VisibilityOption {
  id: BuildVisibility | "public";
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  comingSoon?: boolean;
}

interface BuildSettingsSectionProps {
  poeConnected: boolean;
  autoSync: boolean;
  settingsLoading: boolean;
  defaultBuildVisibility: BuildVisibility;
  onSettingsUpdate: (settings: BuildSettingsUpdate) => void;
}

const publicOption = {
  id: "public" as const,
  label: "Public",
  description: "Visible to everyone in build listings",
  icon: Globe,
  disabled: true,
  comingSoon: true,
};

const visibilityOptions: VisibilityOption[] = [
  publicOption,
  {
    id: "unlisted",
    label: "Unlisted",
    description: "Share with direct links only",
    icon: Link2,
    disabled: false,
    comingSoon: false,
  },
  {
    id: "private",
    label: "Private",
    description: "Only visible to you",
    icon: Lock,
    disabled: false,
    comingSoon: false,
  },
] as const;

export function BuildSettingsSection({
  poeConnected,
  autoSync,
  settingsLoading,
  defaultBuildVisibility,
  onSettingsUpdate,
}: BuildSettingsSectionProps) {
  return (
    <div className="space-y-8">
      {/* Visibility Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <Text className="font-medium">Build Visibility</Text>
          <Text className="text-sm text-foreground/60">Default for new builds</Text>
        </div>

        <div className="grid gap-4">
          {visibilityOptions.map((option) => {
            const Icon = option.icon;
            const isActive = defaultBuildVisibility === option.id;
            return (
              <motion.div
                key={option.id}
                whileHover={!option.disabled ? { scale: 1.01 } : undefined}
                className={cn(
                  "relative p-4 rounded-xl border-2 transition-colors",
                  isActive ? "border-primary/50 bg-primary/5" : "border-border/50 bg-background/95",
                  option.disabled ? "opacity-50" : "cursor-pointer"
                )}
                onClick={() =>
                  !option.disabled &&
                  option.id !== "public" &&
                  onSettingsUpdate({ defaultVisibility: option.id })
                }
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Icon className="w-5 h-5 text-primary/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Text className="font-medium">{option.label}</Text>
                      {option.comingSoon && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <Text className="text-sm text-foreground/60 mt-1">{option.description}</Text>
                  </div>
                  {isActive && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Auto-Sync Settings */}
      {poeConnected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-xl border-2 border-border/50 bg-background/95"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Text className="font-medium">Auto-Sync Characters</Text>
              <Text className="text-sm text-foreground/60">
                Automatically import character updates
              </Text>
            </div>
            <Button
              type="button"
              variant={autoSync ? "primary" : "outline"}
              size="sm"
              onClick={() => onSettingsUpdate({ autoSync: !autoSync })}
              disabled={settingsLoading}
              className="gap-2"
            >
              <RefreshCw className={cn("w-4 h-4", autoSync && "animate-spin")} />
              {autoSync ? "Enabled" : "Disabled"}
            </Button>
          </div>
          <Text className="text-xs text-foreground/40 mt-4">
            When enabled, your characters will be automatically synced every 24 hours
          </Text>
        </motion.div>
      )}
    </div>
  );
}
