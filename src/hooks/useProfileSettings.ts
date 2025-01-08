import { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useBuilds } from "~/hooks/useBuilds";
import { usePOEAccount } from "~/hooks/usePOEAccount";

import { validateName } from "~/utils/validation";

import { updatePassword, updateProfile } from "~/app/actions/profile";
import { logActivity } from "~/app/actions/server/activities";
import { BuildSettings, getBuildSettings, updateBuildSettings } from "~/app/actions/settings";
import { useAuth } from "~/contexts/auth";
import type { Database } from "~/lib/supabase/types";
import type { BuildSettingsUpdate, BuildVisibility, POEAccount, POEProfile } from "~/types/profile";

type Build = Database["public"]["Tables"]["builds"]["Row"];

export function useProfileSettings() {
  const router = useRouter();
  const { user, signOut, refreshSession } = useAuth();
  const {
    loading: poeLoading,
    error: poeError,
    poeAccount,
    poeProfile,
    refreshProfile,
  } = usePOEAccount();

  const [name, setName] = useState<string>("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [setupProgress, setSetupProgress] = useState(0);
  const { builds, loading: buildsLoading } = useBuilds({
    visibility: "all",
    includeOwn: true,
  });
  const buildCount = builds.length;
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [autoSync, setAutoSync] = useState(false);
  const [defaultBuildVisibility, setDefaultBuildVisibility] = useState<BuildVisibility>("private");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
      return;
    }
    const hasName = !!user.user_metadata?.name;
    setName(user.user_metadata?.name || "");
    setIsNewUser(!hasName);
    // Calculate setup progress
    let progress = 0;
    if (hasName) progress += 30;
    if (poeAccount?.connected) progress += 40;
    if (defaultBuildVisibility !== "private") progress += 30;
    setSetupProgress(progress);
    // Load initial settings
    loadSettings();
  }, [user, router, poeAccount?.connected, defaultBuildVisibility]);

  const loadSettings = async () => {
    const settings = await getBuildSettings();
    if (settings) {
      setAutoSync(settings.autoSync);
      setDefaultBuildVisibility(settings.defaultVisibility);
    }
  };

  const validateAndSetName = (value: string) => {
    const validation = validateName(value);
    if (validation.error) {
      setValidationError(validation.error);
    } else {
      setValidationError(null);
    }
    setName(value);
  };

  const clearName = () => {
    setName("");
    setValidationError(null);
  };

  const handleSettingsUpdate = async (newSettings: BuildSettingsUpdate) => {
    setSettingsLoading(true);
    try {
      const settings: BuildSettings = {
        autoSync: newSettings.autoSync ?? autoSync,
        defaultVisibility: (newSettings.defaultVisibility ??
          defaultBuildVisibility) as BuildVisibility,
      };
      const result = await updateBuildSettings(settings);
      if (result.success) {
        if (newSettings.autoSync !== undefined) setAutoSync(newSettings.autoSync);
        if (newSettings.defaultVisibility !== undefined)
          setDefaultBuildVisibility(newSettings.defaultVisibility);
        setSubmitMessage("Settings updated successfully");

        // Log activity
        await logActivity("settings", "Updated settings", "Changed build settings preferences", {
          autoSync: settings.autoSync,
          defaultVisibility: settings.defaultVisibility,
        });
      } else {
        setSubmitError(result.error || "Failed to update settings");
      }
    } catch (err) {
      console.error("Error updating settings:", err);
      setSubmitError("Failed to update settings");
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setSubmitError(null);
    setSubmitMessage(null);

    if (!user) return;

    setLoading(true);
    // Validate before submission
    const validation = validateName(name);
    if (!validation.valid && validation.error) {
      setValidationError(validation.error);
      setLoading(false);
      return;
    }

    try {
      const result = await updateProfile(name);
      if (result.success) {
        setSubmitMessage("Profile updated successfully");
        await refreshSession();

        // Log activity
        await logActivity("profile", "Profile updated", "Changed display name", { newName: name });
      } else {
        setSubmitError(result.error || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setSubmitError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email || !newPassword) return;

    setLoading(true);
    setSubmitError(null);
    setSubmitMessage(null);

    try {
      await updatePassword(newPassword);
      setSubmitMessage("Password updated successfully");
      setShowPasswordForm(false);
      setNewPassword("");
      await refreshSession();

      // Log activity
      await logActivity("settings", "Security updated", "Changed account password");
    } catch (err) {
      console.error("Error updating password:", err);
      setSubmitError("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
      router.replace("/auth/login");
    } catch (err) {
      console.error("Error signing out:", err);
      setSubmitError("Failed to sign out");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (url: string) => {
    if (!user) return;

    try {
      // Update user metadata
      setSubmitError(null);
      setSubmitMessage(null);

      const response = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar_url: url }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update avatar");
      }

      const result = await response.json();
      if (!result.success || !result.user) {
        throw new Error("Failed to update avatar");
      }

      // Force a session refresh to get the updated user data
      await refreshSession();
      router.refresh(); // Refresh the page to update all components
      setSubmitMessage("Avatar updated successfully");

      // Log activity
      await logActivity("profile", "Profile updated", "Changed avatar image");
    } catch (err) {
      console.error("Error updating avatar:", err);
      setSubmitError("Failed to update avatar");
      throw err; // Re-throw to handle in the UI
    }
  };

  return {
    // User & Profile State
    user,
    name,
    isNewUser,
    setupProgress,
    // Build State
    builds,
    buildCount,
    buildsLoading,
    autoSync,
    defaultBuildVisibility,
    loading,
    settingsLoading,
    validationError,
    submitError,
    submitMessage,
    showPasswordForm,
    newPassword,
    poeLoading,
    poeError,
    poeAccount,
    poeProfile,

    // Actions
    validateAndSetName,
    clearName,
    handleSettingsUpdate,
    handleUpdateProfile,
    handleChangePassword,
    handleSignOut,
    refreshProfile,
    setShowPasswordForm,
    setNewPassword,
    handleAvatarUpload,
  };
}
