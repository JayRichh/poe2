"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift as GiftIcon, Users, PieChart, Settings, Sun, Moon, Monitor, DollarSign, RefreshCw, ShoppingCart, AlertCircle, Upload, LogOut, User } from "lucide-react";
import { Button } from "./Button";
import { cn } from "../../utils/cn";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Select } from "./Select";
import { Text } from "./Text";
import { CSVImport } from "./CSVImport";
import { Modal } from "./Modal";
import type { BudgetPreference, Group, Member, Gift } from "~/types/gift-list";
import { usePlannedGifts } from "~/hooks/gift-list/usePlannedGifts";
import { useAuth } from "~/contexts/auth";
import { createClient } from "~/lib/supabase/client";

const STORAGE_KEYS = {
  SETUP_COMPLETED: 'hasCompletedSetup',
  BUDGET_PREFERENCES: 'budgetPreferences',
  GROUPS: 'gift-list-groups',
  MEMBERS: 'gift-list-members',
  GIFTS: 'gift-list-gifts'
};

const mainLinks = [
  { label: "Groups", path: "/groups", icon: Users },
  { label: "All Gifts", path: "/gifts", icon: GiftIcon },
  { label: "Analytics", path: "/analytics", icon: PieChart },
];

const themeOptions = [
  { label: "Light", value: "light", icon: Sun },
  { label: "Dark", value: "dark", icon: Moon },
  { label: "System", value: "system", icon: Monitor },
];

const animations = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
  container: {
    hidden: { clipPath: "circle(0% at 95% 5%)" },
    visible: {
      clipPath: "circle(150% at 95% 5%)",
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
    exit: {
      clipPath: "circle(0% at 95% 5%)",
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
  },
  content: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 0.3, duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  },
  item: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { 
      opacity: 0,
      x: -10,
      transition: { duration: 0.2 }
    }
  }
};

function UserProfile({ user, onSignOut, onNavigate }: { user: any; onSignOut: () => void; onNavigate: (path: string) => void }) {
  return (
    <motion.div
      variants={animations.item}
      initial="hidden"
      animate="visible"
      className="p-4 rounded-xl border-2 border-primary/20 bg-primary/5"
    >
      <div className="flex items-start gap-3">
        <User className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
        <div className="space-y-2 w-full">
          <Text className="font-medium">{user.email}</Text>
          <div className="grid gap-2">
            <Button
              variant="outline"
              onClick={() => onNavigate('/profile')}
              className="w-full flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Go to Profile
            </Button>
            <Button
              variant="outline"
              onClick={onSignOut}
              className="w-full flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function NavigationSection({ pathname, onNavigate, isAuthenticated }: { pathname: string; onNavigate: (path: string) => void; isAuthenticated: boolean }) {
  if (!isAuthenticated) return null;
  
  return (
    <div className="space-y-6">
      <Text className="text-lg font-medium">Navigation</Text>
      <div className="grid gap-4">
        {mainLinks.map((item, index) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <motion.div
              key={item.path}
              custom={index}
              variants={animations.item}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <button
                onClick={() => onNavigate(item.path)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left transition-all",
                  isActive 
                    ? "border-primary bg-primary/5" 
                    : "border-border/50 bg-background/95 hover:border-primary/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <Text className="font-medium">{item.label}</Text>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ResetConfirmationModal({ isOpen, onClose, onConfirm, isResetting }: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isResetting: boolean;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reset Application">
      <div className="space-y-6 p-4">
        <div className="space-y-4">
          <Text className="text-lg font-medium">Are you sure?</Text>
          <Text className="text-foreground/60">
            This action will:
          </Text>
          <ul className="list-disc list-inside space-y-2 text-foreground/60">
            <li>Delete all your groups, members, and gifts</li>
            <li>Clear all your preferences and settings</li>
            <li>Sign you out of your account</li>
            <li>Return you to the login screen</li>
          </ul>
          <Text className="text-foreground/60">
            This action cannot be undone.
          </Text>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isResetting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isResetting}
          >
            {isResetting ? "Resetting..." : "Yes, Reset Everything"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export function FullscreenMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const [budgetPrefs, setBudgetPrefs] = React.useState<BudgetPreference | null>(null);
  const { plannedGifts } = usePlannedGifts();
  const [hasCompletedSetup, setHasCompletedSetup] = React.useState(false);
  const { user, signOut } = useAuth();
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);
  const [isResetting, setIsResetting] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!user);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  React.useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  React.useEffect(() => {
    if (isAuthenticated) {
      const setupCompleted = localStorage.getItem(STORAGE_KEYS.SETUP_COMPLETED);
      setHasCompletedSetup(!!setupCompleted);
      
      const storedPrefs = localStorage.getItem(STORAGE_KEYS.BUDGET_PREFERENCES);
      if (storedPrefs) {
        setBudgetPrefs(JSON.parse(storedPrefs));
      }
    } else {
      setHasCompletedSetup(false);
      setBudgetPrefs(null);
    }
  }, [isAuthenticated]);

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleNavigation = (path: string) => {
    onClose();
    router.push(path);
  };

  const handleSetupClick = () => {
    onClose();
    router.push('/?setup=true');
  };

  const handleSignOut = async () => {
    await signOut();
    onClose();
    router.push('/auth/login');
  };

  const handleResetConfirm = async () => {
    if (!user) return;
    setIsResetting(true);

    try {
      const supabase = createClient();

      // First get all group IDs for the user
      const { data: groups } = await supabase
        .from('groups')
        .select('id')
        .eq('user_id', user.id);

      if (groups && groups.length > 0) {
        const groupIds = groups.map(g => g.id);

        // Get all member IDs for these groups
        const { data: members } = await supabase
          .from('members')
          .select('id')
          .in('group_id', groupIds);

        if (members && members.length > 0) {
          const memberIds = members.map(m => m.id);

          // Delete all gifts for these members
          await supabase
            .from('gifts')
            .delete()
            .in('member_id', memberIds);
        }

        // Delete all members in these groups
        await supabase
          .from('members')
          .delete()
          .in('group_id', groupIds);

        // Delete all groups
        await supabase
          .from('groups')
          .delete()
          .eq('user_id', user.id);
      }

      // Delete profile
      await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);

      // Delete user account
      const { error: deleteUserError } = await supabase.auth.admin.deleteUser(user.id);
      if (deleteUserError) {
        console.error('Error deleting user account:', deleteUserError);
      }

      // Clear local storage
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });

      setBudgetPrefs(null);
      setHasCompletedSetup(false);

      // Sign out after cleanup
      await signOut();

      setShowResetConfirm(false);
      onClose();
      router.push('/auth/login');

    } catch (error) {
      console.error('Error resetting application:', error);
    } finally {
      setIsResetting(false);
    }
  };

  const handleImport = async (data: { groups: Group[], members: Member[], gifts: Gift[] }) => {
    if (!user) return;

    try {
      const supabase = createClient();

      // Import groups
      for (const group of data.groups) {
        const { error: groupError } = await supabase
          .from('groups')
          .insert({
            ...group,
            user_id: user.id
          });

        if (groupError) {
          console.error('Group import error:', groupError);
          throw groupError;
        }
      }

      // Import members - transform data to match database schema
      for (const member of data.members) {
        const { error: memberError } = await supabase
          .from('members')
          .insert({
            id: member.id,
            group_id: member.groupId,
            name: member.name,
            slug: member.slug,
            created_at: member.createdAt,
            updated_at: member.updatedAt
          });

        if (memberError) {
          console.error('Member import error:', memberError);
          throw memberError;
        }
      }

      // Import gifts - transform data to match database schema
      for (const gift of data.gifts) {
        const { error: giftError } = await supabase
          .from('gifts')
          .insert({
            id: gift.id,
            member_id: gift.memberId,
            name: gift.name,
            description: gift.notes,
            cost: gift.cost,
            status: gift.status,
            tags: gift.tags,
            created_at: gift.createdAt,
            updated_at: gift.updatedAt
          });

        if (giftError) {
          console.error('Gift import error:', giftError);
          throw giftError;
        }
      }

      router.refresh();
      onClose();
    } catch (error) {
      console.error('Error importing data:', error);
    }
  };

  const updateBudgetPreferences = (updates: Partial<BudgetPreference>) => {
    const newPrefs = { ...budgetPrefs, ...updates } as BudgetPreference;
    setBudgetPrefs(newPrefs);
    localStorage.setItem(STORAGE_KEYS.BUDGET_PREFERENCES, JSON.stringify(newPrefs));
  };

  if (!mounted) return null;

  return (
    <>
      {createPortal(
        <div className="fixed inset-0 z-[99] pointer-events-none">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={animations.backdrop}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed inset-0 z-[99] bg-gradient-to-br from-background/95 via-background to-background pointer-events-auto backdrop-blur-md"
                onClick={onClose}
              />
            )}
          </AnimatePresence>

          <motion.div
            ref={menuRef}
            variants={animations.container}
            initial="hidden"
            animate={isOpen ? "visible" : "hidden"}
            className={cn(
              "fixed inset-0 z-[100] flex min-h-screen w-screen flex-col bg-gradient-to-br from-background via-background to-background/90",
              isOpen ? "pointer-events-auto" : "pointer-events-none"
            )}
          >
            <motion.div
              variants={animations.content}
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
              className="border-b border-border/50 px-6 py-4"
            >
              <div className="max-w-7xl w-full mx-auto flex items-center justify-between px-4 sm:px-8">
                <Text className="text-3xl font-bold">Menu</Text>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={onClose}
                  className="text-foreground hover:bg-background/95 p-3"
                  aria-label="Close menu"
                >
                  <X className="h-9 w-9" />
                </Button>
              </div>
            </motion.div>

            <motion.div
              variants={animations.content}
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
              className="flex-1 overflow-y-auto overscroll-contain"
            >
              <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                  <div className="space-y-8">
                    {user && <UserProfile user={user} onSignOut={handleSignOut} onNavigate={handleNavigation} />}

                    {isAuthenticated && !hasCompletedSetup && (
                      <motion.div
                        variants={animations.item}
                        initial="hidden"
                        animate="visible"
                        className="p-4 rounded-xl border-2 border-primary/20 bg-primary/5"
                      >
                        <div className="flex items-start gap-3">
                          <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                          <div className="space-y-2">
                            <Text className="font-medium">Setup Required</Text>
                            <Text className="text-sm text-foreground/60">Complete the first-time setup to access all features.</Text>
                            <Button
                              variant="primary"
                              onClick={handleSetupClick}
                              className="w-full mt-2"
                            >
                              Complete Setup
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <NavigationSection pathname={pathname} onNavigate={handleNavigation} isAuthenticated={isAuthenticated} />

                    {isAuthenticated && hasCompletedSetup && plannedGifts.length > 0 && (
                      <div className="space-y-6">
                        <Text className="text-lg font-medium flex items-center gap-2">
                          <ShoppingCart className="h-5 w-5" />
                          To Buy
                        </Text>
                        <div className="grid gap-4">
                          {plannedGifts.map((gift, index) => (
                            <motion.div
                              key={gift.id}
                              custom={index}
                              variants={animations.item}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: 0.4 + index * 0.1 }}
                              className="p-4 rounded-xl border-2 border-border/50 bg-background/95"
                            >
                              <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                  <Text className="font-medium">{gift.name}</Text>
                                  <Text className="text-sm text-foreground/60">${gift.cost.toFixed(2)}</Text>
                                </div>
                                {gift.priority && (
                                  <span className={cn(
                                    "px-3 py-1 rounded-full text-sm",
                                    gift.priority === 1 ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400" :
                                    gift.priority === 2 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400" :
                                    "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                                  )}>
                                    Priority {gift.priority}
                                  </span>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-8">
                    <Text className="text-lg font-medium">Settings</Text>
                    <div className="space-y-6">
                      <div className="p-4 rounded-xl border-2 border-border/50 bg-background/95 space-y-4">
                        <Text className="font-medium">Theme</Text>
                        <div className="grid grid-cols-3 gap-4">
                          {themeOptions.map(({ label, value, icon: Icon }, index) => (
                            <motion.button
                              key={value}
                              custom={index}
                              variants={animations.item}
                              initial="hidden"
                              animate="visible"
                              transition={{ delay: 0.6 + index * 0.1 }}
                              onClick={() => setTheme(value)}
                              className={cn(
                                "p-4 rounded-xl border-2 transition-all",
                                theme === value
                                  ? "border-primary bg-primary/5"
                                  : "border-border/50 bg-background/95 hover:border-primary/50"
                              )}
                            >
                              <div className="flex flex-col items-center gap-2">
                                <Icon className="h-5 w-5" />
                                <Text className="text-sm font-medium">{label}</Text>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {isAuthenticated && hasCompletedSetup && (
                        <CSVImport onImport={handleImport} />
                      )}

                      {isAuthenticated && budgetPrefs && (
                        <div className="p-4 rounded-xl border-2 border-border/50 bg-background/95 space-y-4">
                          <Text className="font-medium">Budget Preferences</Text>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Text className="text-sm text-foreground/60">Default Budget</Text>
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                  <DollarSign className="h-5 w-5 text-primary/60" />
                                </div>
                                <input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={budgetPrefs.defaultBudget || ""}
                                  onChange={(e) => updateBudgetPreferences({ defaultBudget: parseFloat(e.target.value) })}
                                  placeholder="Enter default budget"
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

                            <div className="space-y-2">
                              <Text className="text-sm text-foreground/60">Budget Tracking Level</Text>
                              <div className="grid grid-cols-3 gap-4">
                                {[
                                  { value: "group", label: "Group", description: "Track per group" },
                                  { value: "member", label: "Member", description: "Track per person" },
                                  { value: "both", label: "Combined", description: "Track both" }
                                ].map((option) => (
                                  <button
                                    key={option.value}
                                    onClick={() => updateBudgetPreferences({ trackingLevel: option.value as BudgetPreference["trackingLevel"] })}
                                    className={cn(
                                      "p-4 rounded-xl border-2 text-left relative",
                                      budgetPrefs.trackingLevel === option.value
                                        ? "border-primary bg-primary/5"
                                        : "border-border/50 bg-background/95 hover:border-primary/50"
                                    )}
                                  >
                                    <div className="space-y-1">
                                      <Text className="text-sm font-medium">{option.label}</Text>
                                      <Text className="text-xs text-foreground/60">{option.description}</Text>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>

                            <button
                              onClick={() => updateBudgetPreferences({ enableAnalytics: !budgetPrefs.enableAnalytics })}
                              className={cn(
                                "w-full p-4 rounded-xl border-2 text-left",
                                budgetPrefs.enableAnalytics ? "border-primary bg-primary/5" : "border-border/50 bg-background/95 hover:border-primary/50"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                  <Text className="font-medium">Enable Analytics</Text>
                                  <Text className="text-sm text-foreground/60">Get insights into your gift giving patterns</Text>
                                </div>
                                <div className={cn(
                                  "w-12 h-7 rounded-full transition-colors",
                                  budgetPrefs.enableAnalytics ? "bg-primary" : "bg-foreground/20"
                                )}>
                                  <div className={cn(
                                    "w-5 h-5 rounded-full bg-white transform transition-transform m-1",
                                    budgetPrefs.enableAnalytics ? "translate-x-5" : "translate-x-0"
                                  )} />
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      )}

                      {isAuthenticated && (
                        <div className="p-4 rounded-xl border-2 border-border/50 bg-background/95 space-y-4">
                          <Text className="font-medium">Reset Application</Text>
                          <Button
                            variant="destructive"
                            onClick={() => setShowResetConfirm(true)}
                            className="w-full flex items-center justify-center gap-2"
                          >
                            <RefreshCw className="h-5 w-5" />
                            Reset All Data
                          </Button>
                          <Text className="text-sm text-foreground/60">
                            This will clear all your data and preferences, and return you to the setup screen.
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>,
        document.body
      )}

      <ResetConfirmationModal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={handleResetConfirm}
        isResetting={isResetting}
      />
    </>
  );
}
