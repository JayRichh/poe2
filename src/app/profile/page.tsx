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

  if (!user || !user.id) {
    return (
      <div className="min-h-screen bg-background pt-4">
        <Container className="py-8">
          <div className="text-center">
            <Text className="text-lg text-foreground/60">Please sign in to view your profile</Text>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-4">
      <Container className="py-8">
        {/* Development Notice */}
        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 mb-8">
          <Text className="font-medium text-lg">Profile Features in Development</Text>
          <Text className="text-sm text-foreground/60 mt-1">
            More features coming soon including build synchronization, character imports, build
            sharing, and advanced profile customization.
          </Text>
        </div>

        {/* Profile Header */}
        <div className="text-center mb-8">
          <Text className="text-4xl font-bold tracking-tight gradient-text bg-gradient-to-r from-primary via-accent to-primary">
            Profile Settings
          </Text>
          <Text className="text-lg text-foreground/60 mt-2">
            Manage your account settings and preferences
          </Text>
        </div>

        {/* Tab Navigation */}
        <TabControl<TabId>
          tabs={tabs}
          activeTab={activeTab}
          onChange={(id) => setActiveTab(id)}
          className="mb-8"
        />

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "overview" && (
            <div className="space-y-8">
              <div className="max-w-2xl mx-auto">
                <ProfileForm
                  email={user.email || ""}
                  name={name}
                  isNewUser={isNewUser}
                  loading={loading}
                  validationError={validationError}
                  submitError={submitError}
                  submitMessage={submitMessage}
                  userId={user.id}
                  avatarUrl={user.user_metadata?.avatar_url || null}
                  onNameChange={validateAndSetName}
                  onNameClear={clearName}
                  onSubmit={handleUpdateProfile}
                  onAvatarUpload={handleAvatarUpload}
                />
              </div>
              <div className="mt-12 space-y-8">
                <div className="grid grid-cols-3 gap-6">
                  <div className="p-6 rounded-xl border-2 border-border/50 bg-background/95">
                    <Text className="text-sm text-foreground/60">Total Builds</Text>
                    <Text className="text-3xl font-medium mt-1">{buildCount}</Text>
                  </div>
                  <div className="p-6 rounded-xl border-2 border-border/50 bg-background/95">
                    <Text className="text-sm text-foreground/60">Templates</Text>
                    <Text className="text-3xl font-medium mt-1">
                      {builds.filter((b) => b.is_template).length}
                    </Text>
                  </div>
                  <div className="p-6 rounded-xl border-2 border-border/50 bg-background/95">
                    <Text className="text-sm text-foreground/60">Public Builds</Text>
                    <Text className="text-3xl font-medium mt-1">
                      {builds.filter((b) => b.visibility === "public").length}
                    </Text>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <Text className="text-xl font-medium">Recent Builds</Text>
                      <div className="flex gap-2">
                        <Link href="/build-planner/new">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Plus className="w-4 h-4" />
                            New Build
                          </Button>
                        </Link>
                        <Link href="/build-planner">
                          <Button variant="outline" size="sm" className="gap-2">
                            View All
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {builds.slice(0, 3).map((build) => (
                        <Link
                          key={build.id}
                          href={`/build-planner/${build.slug || build.id}`}
                          className="block p-4 rounded-xl border-2 border-border/50 bg-background/95 hover:border-primary/50 hover:bg-muted/30 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <Text className="font-medium">{build.name}</Text>
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
                  </div>

                  <div>
                    <Text className="text-xl font-medium mb-6">Recent Activity</Text>
                    <ActivityFeed />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "builds" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Text className="text-xl font-medium">Your Builds</Text>
                <div className="flex gap-2">
                  <Link href="/build-planner/new">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Plus className="w-4 h-4" />
                      New Build
                    </Button>
                  </Link>
                  <Link href="/build-planner">
                    <Button variant="outline" size="sm" className="gap-2">
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {builds.map((build) => (
                  <Link
                    key={build.id}
                    href={`/build-planner/${build.slug || build.id}`}
                    className="block p-4 rounded-xl border border-border/50 bg-background/95 hover:border-primary/50 hover:bg-muted/30 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <Text className="font-medium">{build.name}</Text>
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
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-8 max-w-3xl mx-auto">
              <ConnectionsSection
                isNewUser={isNewUser}
                buildCount={buildCount}
                poeLoading={poeLoading}
                poeError={poeError}
                poeAccount={poeAccount}
                poeProfile={poeProfile}
                onRefreshProfile={refreshProfile}
              />

              <BuildSettingsSection
                poeConnected={!!poeAccount?.connected}
                autoSync={autoSync}
                settingsLoading={settingsLoading}
                defaultBuildVisibility={defaultBuildVisibility}
                onSettingsUpdate={handleSettingsUpdate}
              />
            </div>
          )}

          {activeTab === "security" && (
            <div className="max-w-xl mx-auto">
              <SecuritySection
                loading={loading}
                showPasswordForm={showPasswordForm}
                newPassword={newPassword}
                onPasswordChange={setNewPassword}
                onTogglePasswordForm={() => setShowPasswordForm(!showPasswordForm)}
                onPasswordSubmit={handleChangePassword}
                onSignOut={handleSignOut}
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
