"use client";

import { useState } from "react";
import { LogIn, Eye } from "lucide-react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Text } from "./ui/Text";
import { cn } from "~/utils/cn";
import { useAuth } from "~/contexts/auth";
import Link from "next/link";
import type { Database } from "~/lib/supabase/types";

type VisibilityType = Database['public']['Enums']['visibility_type'];

interface POEPreferences {
  defaultBuildVisibility: VisibilityType;
  theme: 'light' | 'dark' | 'system';
}

interface FirstTimeSetupProps {
  isOpen: boolean;
  onComplete: (preferences: POEPreferences) => void;
  onClose: () => void;
}

const STORAGE_KEYS = {
  SETUP_COMPLETED: 'hasCompletedSetup',
  POE_PREFERENCES: 'poePreferences',
};

export function FirstTimeSetup({ isOpen, onComplete, onClose }: FirstTimeSetupProps) {
  const [defaultVisibility, setDefaultVisibility] = useState<VisibilityType>('private');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [error, setError] = useState<string | undefined>();
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError(undefined);
    setIsProcessing(true);

    try {
      const preferences: POEPreferences = {
        defaultBuildVisibility: defaultVisibility,
        theme
      };

      // Save preferences to localStorage
      localStorage.setItem(STORAGE_KEYS.SETUP_COMPLETED, 'true');
      localStorage.setItem(STORAGE_KEYS.POE_PREFERENCES, JSON.stringify(preferences));
      
      onComplete(preferences);
    } catch (err) {
      console.error('Setup error:', err);
      setError('Failed to complete setup. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Sign In Required" className="max-w-md">
        <div className="space-y-6 py-4">
          <Text className="text-center text-foreground/60">
            Please sign in to complete setup and start using POE Tools.
          </Text>
          <div className="flex justify-center">
            <Link href="/auth/login">
              <Button variant="primary" className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome to POE Tools!" className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <Text className="text-lg font-medium">Default Build Visibility</Text>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'private', label: 'Private', description: 'Only visible to you' },
                { value: 'unlisted', label: 'Unlisted', description: 'Visible with link' },
                { value: 'public', label: 'Public', description: 'Visible to everyone' }
              ].map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => setDefaultVisibility(option.value as VisibilityType)}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left relative",
                    defaultVisibility === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border/50 bg-background/95"
                  )}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <Text className="font-medium">{option.label}</Text>
                    </div>
                    <Text className="text-sm text-foreground/60">{option.description}</Text>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Text className="text-lg font-medium">Theme Preference</Text>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: 'light', label: 'Light', description: 'Light theme' },
                { value: 'dark', label: 'Dark', description: 'Dark theme' },
                { value: 'system', label: 'System', description: 'Match system' }
              ].map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left",
                    theme === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border/50 bg-background/95"
                  )}
                >
                  <div className="space-y-1">
                    <Text className="font-medium">{option.label}</Text>
                    <Text className="text-sm text-foreground/60">{option.description}</Text>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl border-2 border-destructive/20 bg-destructive/5">
            <Text className="text-sm text-destructive">{error}</Text>
          </div>
        )}

        <div className="flex justify-between pt-6 border-t border-border/50">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isProcessing}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isProcessing}
          >
            {isProcessing ? "Setting up..." : "Complete Setup"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
