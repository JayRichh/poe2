"use client";

import { Suspense } from "react";
import { Card } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";
import { BuildConfigManager } from "~/components/build-planner/BuildConfigManager";
import { useBuild } from "~/contexts/build";
import { useAuth } from "~/contexts/auth";
import { createBuildConfig, updateBuildConfig, deleteBuildConfig } from "~/app/actions/server/build-configs";
import type { BuildConfig } from "~/app/actions/server/build-configs";

export default function StatsPage() {
  const { user } = useAuth();
  const build = useBuild();
  
  const canModify = Boolean(user && build.user_id === user.id && build.visibility !== 'public');

  const handleConfigsUpdate = async (newConfigs: BuildConfig[]) => {
    if (!canModify) return;
    
    try {
      const currentConfigs = build.build_configs || [];
      
      // Find configs to delete
      const configsToDelete = currentConfigs.filter(
        current => !newConfigs.find(config => config.id === current.id)
      );

      // Find configs to create
      const configsToCreate = newConfigs.filter(
        config => !config.id || !currentConfigs.find(current => current.id === config.id)
      );

      // Find configs to update
      const configsToUpdate = newConfigs.filter(
        config => config.id && currentConfigs.find(current => current.id === config.id)
      );

      // Execute operations
      await Promise.all([
        ...configsToDelete.map(config => deleteBuildConfig(config.id, build.id)),
        ...configsToCreate.map(config => createBuildConfig({ ...config, build_id: build.id })),
        ...configsToUpdate.map(config => updateBuildConfig(config.id, config))
      ]);

    } catch (error) {
      console.error("Error updating build configs:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <Text className="text-xl font-semibold mb-4">Build Configurations</Text>
        <Text className="text-foreground/60 mb-6">
          Manage your build variants and stat configurations
        </Text>

        <Suspense
          fallback={
            <div className="h-48 animate-pulse rounded-xl bg-foreground/5" />
          }
        >
          <BuildConfigManager
            buildId={build.id}
            configs={build.build_configs}
            onUpdate={handleConfigsUpdate}
          />
        </Suspense>
      </Card>

      {/* TODO: Add DPS Calculator integration */}
      <Card className="p-6">
        <Text className="text-xl font-semibold mb-4">Build Statistics</Text>
        <Text className="text-foreground/60">
          Build statistics and DPS calculations will be available in a future update
        </Text>
      </Card>
    </div>
  );
}
