"use client";

import { ArrowRight, GitBranch, Plus, Settings, Shield, User } from "lucide-react";

import { useState } from "react";

import Link from "next/link";

import { ActivityFeed } from "~/components/profile/ActivityFeed";
import { BuildSettingsSection } from "~/components/profile/BuildSettingsSection";
import { BuildsOverview } from "~/components/profile/BuildsOverview";
import { ConnectionsSection } from "~/components/profile/ConnectionsSection";
import { ProfileForm } from "~/components/profile/ProfileForm";
import { SecuritySection } from "~/components/profile/SecuritySection";
import { WelcomeBanner } from "~/components/profile/WelcomeBanner";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { TabControl } from "~/components/ui/TabControl";
import { Text } from "~/components/ui/Text";

import { useProfileSettings } from "~/hooks/useProfileSettings";

type TabId = "overview" | "builds" | "settings" | "security";

const tabs: Array<{ id: TabId; label: string; icon: React.ReactNode }> = [
  { id: "overview", label: "Profile", icon: <User className="w-4 h-4" /> },
  { id: "builds", label: "My Builds", icon: <GitBranch className="w-4 h-4" /> },
  { id: "settings", label: "Preferences", icon: <Settings className="w-4 h-4" /> },
  { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
];

export default function ProfilePage() {
  const {
    user,
    builds,
    name,
    isNewUser,
    setupProgress,
    buildCount,
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
  } = useProfileSettings();

  const [activeTab, setActiveTab] = useState<TabId>("overview");

  // Profile page disabled when authentication is disabled
  return (
    <div className="min-h-screen bg-background pt-4">
      <Container className="py-8">
        <div className="text-center space-y-4">
          <User className="w-16 h-16 mx-auto text-foreground/40" />
          <div>
            <Text className="text-2xl font-bold">Profile Temporarily Unavailable</Text>
            <Text className="text-lg text-foreground/60 mt-2">
              Profile features are disabled while authentication is paused. All tools remain available without login.
            </Text>
          </div>
        </div>
      </Container>
    </div>
  );
}
