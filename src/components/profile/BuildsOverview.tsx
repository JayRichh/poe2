"use client";

import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";

import Link from "next/link";

import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";

import type { Database } from "~/lib/supabase/types";

type Build = Database["public"]["Tables"]["builds"]["Row"];

interface BuildsOverviewProps {
  builds: Build[];
  totalBuilds: number;
}

export function BuildsOverview({ builds, totalBuilds }: BuildsOverviewProps) {
  const recentBuilds = builds.slice(0, 3);
  const buildStats = {
    total: totalBuilds,
    templates: builds.filter((b) => b.is_template).length,
    public: builds.filter((b) => b.visibility === "public").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Text className="text-xl font-medium">Your Builds</Text>
        <Link href="/build-planner">
          <Button variant="outline" size="sm" className="gap-2">
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {/* Build Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-full sm:col-span-1 p-6 rounded-xl border-2 border-primary/20 bg-gradient-to-b from-primary/10 to-primary/5"
        >
          <Text className="text-lg font-medium mb-4">Build Statistics</Text>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Text className="text-foreground/60">Total Builds</Text>
              <Text className="font-medium">{buildStats.total}</Text>
            </div>
            <div className="flex justify-between items-center">
              <Text className="text-foreground/60">Templates</Text>
              <Text className="font-medium">{buildStats.templates}</Text>
            </div>
            <div className="flex justify-between items-center">
              <Text className="text-foreground/60">Public Builds</Text>
              <Text className="font-medium">{buildStats.public}</Text>
            </div>
          </div>
        </motion.div>

        {/* Recent Builds */}
        <div className="sm:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <Text className="font-medium">Recent Builds</Text>
            <Link href="/build-planner/new">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                New Build
              </Button>
            </Link>
          </div>

          {recentBuilds.length > 0 ? (
            <div className="grid gap-3">
              {recentBuilds.map((build) => (
                <Link
                  key={build.id}
                  href={`/build-planner/${build.slug || build.id}`}
                  className="group block p-4 rounded-xl border-2 border-border/50 bg-background/95 hover:border-primary/50 hover:bg-muted/30 transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <Text className="font-medium group-hover:text-primary transition-colors">
                        {build.name}
                      </Text>
                      <Text className="text-sm text-foreground/60">
                        {build.poe_class || "Any Class"} • Level {build.level || "?"}
                      </Text>
                    </div>
                    {build.is_template && (
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
                        Template
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 rounded-xl border-2 border-dashed border-border/50">
              <Text className="text-foreground/60">No builds yet</Text>
              <Text className="text-sm text-foreground/40 mt-1">
                Create your first build to get started
              </Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
