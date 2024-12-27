import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "~/contexts/auth";
import { usePOEAccount } from "~/hooks/usePOEAccount";
import { validateName } from "~/utils/validation";
import { updatePassword, updateProfile } from "~/app/actions/profile";
import { BuildSettings, getBuildSettings, updateBuildSettings } from "~/app/actions/settings";
import { getBuilds } from "~/app/actions/builds";
import type { Database } from "~/lib/supabase/types";

type Build = Database["public"]["Tables"]["builds"]["Row"];
import type { BuildVisibility, POEProfile, POEAccount, BuildSettingsUpdate } from "~/types/profile";

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
  const [builds, setBuilds] = useState<Build[]>([]);
  const [buildCount, setBuildCount] = useState(0);
  const [buildsLoading, setBuildsLoading] = useState(true);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [autoSync, setAutoSync] = useState(false);
  const [defaultBuildVisibility, setDefaultBuildVisibility] = useState<BuildVisibility>('private');
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
    if (defaultBuildVisibility !== 'private') progress += 30;
    setSetupProgress(progress);
    // Load initial settings
    loadSettings();
    // Load builds
    loadBuilds();
  }, [user, router, poeAccount?.connected, defaultBuildVisibility]);

  const loadBuilds = useCallback(async () => {
    if (!user) return;
    
    setBuildsLoading(true);
    try {
      const userBuilds = await getBuilds({ visibility: "all", includeOwn: true });
      setBuilds(userBuilds);
      setBuildCount(userBuilds.length);
    } catch (err) {
      console.error("Error loading builds:", err);
    } finally {
      setBuildsLoading(false);
    }
  }, [user]);

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
        defaultVisibility: (newSettings.defaultVisibility ?? defaultBuildVisibility) as BuildVisibility,
      };
      const result = await updateBuildSettings(settings);
      if (result.success) {
        if (newSettings.autoSync !== undefined) setAutoSync(newSettings.autoSync);
        if (newSettings.defaultVisibility !== undefined) setDefaultBuildVisibility(newSettings.defaultVisibility);
        setSubmitMessage("Settings updated successfully");
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
  };
}
