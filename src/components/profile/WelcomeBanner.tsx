"use client";

import { motion } from "framer-motion";

import { Text } from "~/components/ui/Text";

import { cn } from "~/utils/cn";

import { ProgressBar } from "./ProgressBar";

interface WelcomeBannerProps {
  name: string;
  isConnected: boolean;
  buildVisibility: string;
  setupProgress: number;
}

export function WelcomeBanner({
  name,
  isConnected,
  buildVisibility,
  setupProgress,
}: WelcomeBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 rounded-xl border-2 border-primary/20 bg-gradient-to-b from-primary/10 to-primary/5 space-y-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-50" />
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
          <Text className="font-medium text-xl tracking-tight">Welcome to POE2 Tools!</Text>
        </div>
        <div className="space-y-2">
          <Text className="text-foreground/80">Let's get your profile set up:</Text>
          <ul className="list-disc list-inside space-y-1 text-sm text-foreground/60 ml-2">
            <li className={cn(name ? "text-primary/60 line-through" : "")}>
              Set your display name to personalize your experience
            </li>
            <li className={cn(isConnected ? "text-primary/60 line-through" : "")}>
              Connect your POE account to sync characters and builds
            </li>
            <li className={cn(buildVisibility !== "private" ? "text-primary/60 line-through" : "")}>
              Configure your build sharing preferences
            </li>
          </ul>
        </div>
        <ProgressBar progress={setupProgress} label="Profile Setup Progress" />
      </div>
    </motion.div>
  );
}
