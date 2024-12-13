"use client";

import { useState } from "react";
import { DollarSign, LogIn } from "lucide-react";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { Text } from "./ui/Text";
import { cn } from "~/utils/cn";
import type { BudgetPreference } from "~/types/gift-list";
import { generateDemoData } from "~/utils/demo-data";
import { useAuth } from "~/contexts/auth";
import { giftListApi } from "~/services/gift-list-api";
import Link from "next/link";

interface FirstTimeSetupProps {
  isOpen: boolean;
  onComplete: (preferences: BudgetPreference) => void;
  onClose: () => void;
}

const QUICK_BUDGETS = [
  { label: "$50", value: "50" },
  { label: "$100", value: "100" },
  { label: "$200", value: "200" },
];

const STORAGE_KEYS = {
  SETUP_COMPLETED: 'hasCompletedSetup',
  BUDGET_PREFERENCES: 'budgetPreferences',
};

export function FirstTimeSetup({ isOpen, onComplete, onClose }: FirstTimeSetupProps) {
  const [defaultBudget, setDefaultBudget] = useState<string>("");
  const [trackingLevel, setTrackingLevel] = useState<BudgetPreference["trackingLevel"]>("both");
  const [enableAnalytics, setEnableAnalytics] = useState(true);
  const [isGeneratingDemo, setIsGeneratingDemo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError(null);
    setIsGeneratingDemo(true);

    try {
      // Generate and store demo data in Supabase if no data exists
      await generateDemoData();

      // Save preferences to Supabase
      const preferences: BudgetPreference = {
        defaultBudget: defaultBudget ? parseFloat(defaultBudget) : undefined,
        trackingLevel,
        enableAnalytics,
        priceRanges: [
          { min: 0, max: 50, label: "Budget" },
          { min: 50, max: 150, label: "Moderate" },
          { min: 150, max: 99999, label: "Premium" },
        ],
      };

      await giftListApi.updateBudgetPreferences(preferences);

      // Mark setup as completed
      localStorage.setItem(STORAGE_KEYS.SETUP_COMPLETED, 'true');
      localStorage.setItem(STORAGE_KEYS.BUDGET_PREFERENCES, JSON.stringify(preferences));
      
      onComplete(preferences);

    } catch (err) {
      console.error('Setup error:', err);
      setError('Failed to complete setup. Please try again.');
    } finally {
      setIsGeneratingDemo(false);
    }
  };

  if (!user) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Sign In Required" className="max-w-md">
        <div className="space-y-6 py-4">
          <Text className="text-center text-foreground/60">
            Please sign in to complete setup and start using Gift List.
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
    <Modal isOpen={isOpen} onClose={onClose} title="Welcome to Gift List!" className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <Text className="text-lg font-medium">Default Gift Budget</Text>
            <div className="grid grid-cols-3 gap-4">
              {QUICK_BUDGETS.map((budget) => (
                <button
                  type="button"
                  key={budget.value}
                  onClick={() => setDefaultBudget(budget.value)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all",
                    defaultBudget === budget.value
                      ? "border-primary bg-primary/5"
                      : "border-border/50 bg-background/95"
                  )}
                >
                  <Text className={cn(
                    "text-xl font-semibold text-center",
                    defaultBudget === budget.value ? "text-primary" : "text-foreground/80"
                  )}>
                    {budget.label}
                  </Text>
                </button>
              ))}
            </div>

            <div className="relative">
              <Text className="text-sm font-medium text-foreground/60 mb-2">Custom amount</Text>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <DollarSign className="h-5 w-5 text-primary/60" />
                </div>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={defaultBudget}
                  onChange={(e) => setDefaultBudget(e.target.value)}
                  placeholder="Enter custom budget"
                  className={cn(
                    "pl-11 w-full h-12 rounded-xl",
                    "bg-background/95",
                    "border-2 border-border/50",
                    "focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                    "placeholder:text-foreground/40"
                  )}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Text className="text-lg font-medium">Budget Tracking</Text>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "group", label: "Group Level", description: "Track per group" },
                { value: "member", label: "Member Level", description: "Track per person" },
                { value: "both", label: "Combined", description: "Track both" }
              ].map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => setTrackingLevel(option.value as BudgetPreference["trackingLevel"])}
                  className={cn(
                    "p-4 rounded-xl border-2 text-left relative",
                    trackingLevel === option.value
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

          <div className="space-y-3">
            <Text className="text-lg font-medium">Analytics</Text>
            <button
              type="button"
              onClick={() => setEnableAnalytics(!enableAnalytics)}
              className={cn(
                "w-full p-4 rounded-xl border-2 text-left",
                enableAnalytics ? "border-primary bg-primary/5" : "border-border/50 bg-background/95"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Text className="font-medium">Enable Analytics Dashboard</Text>
                  <Text className="text-sm text-foreground/60">Get insights into your gift giving patterns</Text>
                </div>
                <div className={cn(
                  "w-12 h-7 rounded-full transition-colors",
                  enableAnalytics ? "bg-primary" : "bg-foreground/20"
                )}>
                  <div className={cn(
                    "w-5 h-5 rounded-full bg-white transform transition-transform m-1",
                    enableAnalytics ? "translate-x-5" : "translate-x-0"
                  )} />
                </div>
              </div>
            </button>
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
            disabled={isGeneratingDemo}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isGeneratingDemo}
          >
            {isGeneratingDemo ? "Setting up..." : "Complete Setup"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
