"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Link2, RefreshCw } from "lucide-react";

import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";

import { cn } from "~/utils/cn";

import type { POEAccount, POEProfile } from "~/types/profile";

const SYNC_INTERVAL = 24; // hours

interface ConnectionsSectionProps {
  isNewUser: boolean;
  buildCount: number;
  poeLoading: boolean;
  poeError?: string | null;
  poeAccount?: POEAccount | null;
  poeProfile?: POEProfile | null;
  onRefreshProfile: () => void;
}

export function ConnectionsSection({
  isNewUser,
  buildCount,
  poeLoading,
  poeError,
  poeAccount,
  poeProfile,
  onRefreshProfile,
}: ConnectionsSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <Text className="text-xl font-medium">Connections</Text>
        {buildCount > 0 && (
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <AlertCircle className="w-4 h-4" />
            POE account connection feature is currently in development
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-xl border-2 border-border/50 bg-background/95 gap-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
          <div className="flex items-center gap-3">
            {poeAccount?.connected ? (
              <CheckCircle2 className="h-5 w-5 text-primary" />
            ) : (
              <Link2 className="h-5 w-5 text-primary/60" />
            )}
            <div>
              <div className="flex items-center gap-2">
                <Text className="font-medium">Path of Exile Account</Text>
                {poeAccount?.connected &&
                  poeProfile &&
                  "characters" in poeProfile &&
                  Array.isArray(poeProfile.characters) && (
                    <Text className="text-xs text-foreground/60 px-2 py-0.5 rounded-full bg-primary/10">
                      {poeProfile.characters.length}{" "}
                      {poeProfile.characters.length === 1 ? "character" : "characters"}
                    </Text>
                  )}
              </div>
              <Text className="text-sm text-foreground/60">
                {poeAccount?.connected
                  ? `Connected as ${poeAccount.accountName}`
                  : isNewUser
                    ? "Connect your POE account to start syncing your characters"
                    : "Connect your POE account to sync characters"}
              </Text>
              {poeAccount?.connected && poeAccount.lastSync && (
                <Text className="text-xs text-foreground/40 flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Last synced {new Date(poeAccount.lastSync).toLocaleString()}
                  <span className="text-foreground/20 mx-1">•</span>
                  Updates every {SYNC_INTERVAL} hours
                </Text>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 sm:flex-shrink-0">
            {poeAccount?.connected && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={onRefreshProfile}
                disabled={poeLoading}
                className="p-2"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
            <motion.div
              className="relative flex flex-col items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={true}
                className="opacity-50 min-w-[100px]"
              >
                Connect
              </Button>
              <Text className="absolute -bottom-5 text-[11px] text-foreground/40 whitespace-nowrap">
                Coming soon
              </Text>
            </motion.div>
          </div>
        </div>
      </div>

      {poeError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl border-2 border-destructive/20 bg-destructive/5"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-destructive" />
            <Text className="text-sm text-destructive">{poeError}</Text>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
