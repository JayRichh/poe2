"use client";

import { useState } from "react";

import { Button } from "~/components/ui/Button";
import { Card } from "~/components/ui/Card";
import { Text } from "~/components/ui/Text";

import type { Database } from "~/lib/supabase/types";

type BuildConfig = Database["public"]["Tables"]["build_configs"]["Row"];

interface BuildConfigManagerProps {
  buildId: string;
  configs?: BuildConfig[];
  onUpdate?: (configs: BuildConfig[]) => void;
}

export function BuildConfigManager({ buildId, configs = [], onUpdate }: BuildConfigManagerProps) {
  const [activeConfig, setActiveConfig] = useState("default");
  const [buildConfigs, setBuildConfigs] = useState<BuildConfig[]>(configs);

  const handleAddConfig = () => {
    const newConfig: BuildConfig = {
      id: `config-${buildConfigs.length}`,
      build_id: buildId,
      name: `Config ${buildConfigs.length + 1}`,
      type: "default",
      settings: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updatedConfigs = [...buildConfigs, newConfig];
    setBuildConfigs(updatedConfigs);
    onUpdate?.(updatedConfigs);
  };

  const handleUpdateConfig = (configId: string, updates: Partial<BuildConfig>) => {
    const updatedConfigs = buildConfigs.map((config) => {
      if (config.id === configId) {
        return {
          ...config,
          ...updates,
          updated_at: new Date().toISOString(),
        };
      }
      return config;
    });

    setBuildConfigs(updatedConfigs);
    onUpdate?.(updatedConfigs);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <Text className="text-xl font-semibold">Build Configurations</Text>
        <Button variant="outline" onClick={handleAddConfig} disabled={buildConfigs.length >= 3}>
          Add Config
        </Button>
      </div>

      <div className="flex gap-2 mb-6">
        {buildConfigs.map((config) => (
          <Button
            key={config.id}
            variant={activeConfig === config.id ? "default" : "outline"}
            onClick={() => setActiveConfig(config.id)}
          >
            {config.name}
          </Button>
        ))}
      </div>

      {buildConfigs.map((config) => (
        <div key={config.id} className={activeConfig === config.id ? "block" : "hidden"}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg border border-border/50 bg-background/95">
                <Text className="text-sm text-foreground/60 mb-2">Name</Text>
                <Text className="font-medium">{config.name}</Text>
              </div>
              <div className="p-4 rounded-lg border border-border/50 bg-background/95">
                <Text className="text-sm text-foreground/60 mb-2">Type</Text>
                <Text className="font-medium">{config.type}</Text>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
}
