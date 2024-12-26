"use client";

import { CheckCircle2, Key, Link2, Mail, RefreshCw, User, X, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { Text } from "~/components/ui/Text";

import { usePOEAccount } from "~/hooks/usePOEAccount";
import { cn } from "~/utils/cn";
import { validateName } from "~/utils/validation";
import { updatePassword, updateProfile } from "~/app/actions/profile";
import { BuildSettings, getBuildSettings, updateBuildSettings } from "~/app/actions/settings";
import { VisibilityType } from "~/lib/supabase/types";
import { useAuth } from "~/contexts/auth";

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut, refreshSession } = useAuth();
  const {
    loading: poeLoading,
    error: poeError,
    poeAccount,
    poeProfile,
    connectPOE,
    disconnectPOE,
    refreshProfile,
  } = usePOEAccount();
  const [name, setName] = useState<string>("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [setupProgress, setSetupProgress] = useState(0);
  const [buildCount, setBuildCount] = useState(0);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [autoSync, setAutoSync] = useState(false);
  const [defaultBuildVisibility, setDefaultBuildVisibility] = useState<VisibilityType>('private');
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
    async function loadSettings() {
      const settings = await getBuildSettings();
      if (settings) {
        setAutoSync(settings.autoSync);
        setDefaultBuildVisibility(settings.defaultVisibility);
      }
    }
    loadSettings();
  }, [user, router, poeAccount?.connected, defaultBuildVisibility]);

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

  const handleSettingsUpdate = async (
    newSettings: { autoSync?: boolean; defaultVisibility?: VisibilityType }
  ) => {
    setSettingsLoading(true);
    try {
      const settings: BuildSettings = {
        autoSync: newSettings.autoSync ?? autoSync,
        defaultVisibility: newSettings.defaultVisibility ?? defaultBuildVisibility,
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

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] p-4">
      <Container className="max-w-2xl py-8 space-y-10">
        {isNewUser ? (
          <div className="p-6 rounded-xl border-2 border-primary/20 bg-primary/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
              <Text className="font-medium text-lg">Welcome to POE2 Tools!</Text>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Text className="text-foreground/80">Let's get your profile set up:</Text>
                <ul className="list-disc list-inside space-y-1 text-sm text-foreground/60 ml-2">
                  <li className={cn(name ? "text-primary/60 line-through" : "")}>
                    Set your display name to personalize your experience
                  </li>
                  <li className={cn(poeAccount?.connected ? "text-primary/60 line-through" : "")}>
                    Connect your POE account to sync characters and builds
                  </li>
                  <li className={cn(defaultBuildVisibility !== 'private' ? "text-primary/60 line-through" : "")}>
                    Configure your build sharing preferences
                  </li>
                </ul>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-foreground/60">
                  <span>Profile Setup Progress</span>
                  <span>{setupProgress}%</span>
                </div>
                <div className="h-1 bg-border/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${setupProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl border-2 border-primary/20 bg-primary/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <Text className="font-medium">Profile Features in Development</Text>
            </div>
            <Text className="text-sm text-foreground/60">
              More features coming soon including build synchronization, character imports, build
              sharing, and advanced profile customization.
            </Text>
          </div>
        )}

        <div className="flex flex-col space-y-1">
          <Text className="text-3xl font-bold">Profile Settings</Text>
          <Text className="text-foreground/60">Manage your account settings and preferences</Text>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Text className="text-sm text-foreground/60">Email</Text>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-primary/60" />
                </div>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className={cn(
                    "pl-11 w-full h-12 rounded-xl",
                    "bg-background/95",
                    "border-2 border-border/50",
                    "text-foreground/60"
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Text className="text-sm text-foreground/60">Display Name</Text>
                <Text className="text-xs text-destructive">Required</Text>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-primary/60" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => validateAndSetName(e.target.value)}
                  placeholder={isNewUser ? "Choose a display name to get started" : "Enter your display name"}
                  className={cn(
                    "pl-11 pr-10 w-full h-12 rounded-xl",
                    "bg-background/95",
                    "border-2",
                    validationError 
                      ? "border-destructive/50 focus:border-destructive/50 focus:ring-2 focus:ring-destructive/20"
                      : "border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                    "placeholder:text-foreground/40"
                  )}
                />
                {name && (
                  <button
                    type="button"
                    onClick={clearName}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-foreground/40 hover:text-foreground/60 transition-colors"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                )}
              </div>
              {validationError ? (
                <Text className="text-sm text-destructive">{validationError}</Text>
              ) : (
                <Text className="text-xs text-foreground/40">
                  This name will be displayed on your builds and profile
                </Text>
              )}
            </div>
          </div>

          {submitError && (
            <div className="p-4 rounded-xl border-2 border-destructive/20 bg-destructive/5">
              <Text className="text-sm text-destructive">{submitError}</Text>
            </div>
          )}

          {submitMessage && (
            <div className="p-4 rounded-xl border-2 border-primary/20 bg-primary/5">
              <Text className="text-sm text-primary">{submitMessage}</Text>
            </div>
          )}

          <div className="flex justify-end">
            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading || !!validationError || !name.trim()}
            >
              {loading ? "Saving..." : isNewUser ? "Complete Profile Setup" : "Save Changes"}
            </Button>
          </div>
        </form>

        <div className="space-y-4 pt-8 border-t border-border/50">
          <div className="flex items-center justify-between">
            <Text className="text-xl font-medium">Connections</Text>
            {buildCount > 0 && (
                <Text className="text-sm text-foreground/60">
                  POE account connection feature is currently in development
                </Text>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border-2 border-border/50 bg-background/95 gap-4">
            <div className="flex items-center gap-3">
              {poeAccount?.connected ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <Link2 className="h-5 w-5 text-primary/60" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <Text className="font-medium">Path of Exile Account</Text>
                  {poeAccount?.connected && poeProfile && 'characters' in poeProfile && Array.isArray(poeProfile.characters) && (
                    <Text className="text-xs text-foreground/60 px-2 py-0.5 rounded-full bg-primary/10">
                      {poeProfile.characters.length} {poeProfile.characters.length === 1 ? 'character' : 'characters'}
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
                  <Text className="text-xs text-foreground/40">
                    Last synced: {new Date(poeAccount.lastSync).toLocaleString()}
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
                  onClick={refreshProfile}
                  disabled={poeLoading}
                  className="p-2"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
              <div className="relative flex flex-col items-center">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={true}
                  className="opacity-50"
                >
                  Connect
                </Button>
                <Text className="absolute -bottom-5 text-[11px] text-foreground/40 whitespace-nowrap">
                  Coming soon
                </Text>
              </div>
            </div>
          </div>

          {poeError && (
            <div className="p-4 rounded-xl border-2 border-destructive/20 bg-destructive/5">
              <Text className="text-sm text-destructive">{poeError}</Text>
            </div>
          )}
        </div>

        <div className="space-y-4 pt-6 border-t border-border/50">
          <div className="flex items-center justify-between">
            <Text className="text-xl font-medium">Build Settings</Text>
            <Text className="text-sm text-foreground/60 mt-1">Default settings for new builds</Text>
          </div>

          <div className="flex flex-col p-6 rounded-xl border-2 border-border/50 bg-background/95 space-y-6">
            <div className="space-y-2">
              <div className="space-y-1">
                <Text className="font-medium">Build Visibility</Text>
                <Text className="text-sm text-foreground/60">Control who can access your builds</Text>
              </div>
              <div className="space-y-6">
                <div className="flex flex-wrap items-start gap-6">
                  <div className="relative flex flex-col items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={true}
                      className="opacity-50 min-w-[80px]"
                    >
                      Public
                    </Button>
                    <Text className="absolute -bottom-5 text-[11px] text-foreground/40 whitespace-nowrap">
                      Coming soon
                    </Text>
                  </div>
                  <div className="flex flex-col items-center">
                    <Button
                      type="button"
                      variant={defaultBuildVisibility === 'unlisted' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleSettingsUpdate({ defaultVisibility: 'unlisted' })}
                      disabled={settingsLoading}
                      className="min-w-[80px]"
                    >
                      Unlisted
                    </Button>
                    {defaultBuildVisibility === 'unlisted' && (
                      <Text className="mt-1.5 text-xs text-foreground/60">
                        Link sharing only
                      </Text>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <Button
                      type="button"
                      variant={defaultBuildVisibility === 'private' ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => handleSettingsUpdate({ defaultVisibility: 'private' })}
                      disabled={settingsLoading}
                      className="min-w-[80px]"
                    >
                      Private
                    </Button>
                    {defaultBuildVisibility === 'private' && (
                      <Text className="mt-1.5 text-xs text-foreground/60">
                        Only you
                      </Text>
                    )}
                  </div>
                </div>
                <Text className="text-sm text-foreground/60 bg-background/50 p-3 rounded-lg">
                  {defaultBuildVisibility === 'unlisted' 
                    ? 'Share your builds with others using a direct link while keeping them hidden from public listings'
                    : 'Keep your builds private and visible only to you'}
                </Text>
              </div>
            </div>

            {poeAccount?.connected && (
              <div className="space-y-3 pt-6 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <Text className="font-medium">Auto-Sync Characters</Text>
                    <Text className="text-sm text-foreground/60">
                      Automatically import character updates
                    </Text>
                  </div>
                  <Button
                    type="button"
                    variant={autoSync ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => handleSettingsUpdate({ autoSync: !autoSync })}
                    disabled={settingsLoading}
                  >
                    {autoSync ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
                <Text className="text-xs text-foreground/40">
                  When enabled, your characters will be automatically synced every 24 hours
                </Text>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4 pt-8 border-t border-border/50">
          <Text className="text-xl font-medium">Security</Text>

          <div className="flex flex-col p-4 rounded-xl border-2 border-border/50 bg-background/95">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Key className="h-5 w-5 text-primary/60" />
                <div>
                  <Text className="font-medium">Password</Text>
                  <Text className="text-sm text-foreground/60">Change your password</Text>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                disabled={loading}
                className="sm:flex-shrink-0"
              >
                {showPasswordForm ? <X className="h-4 w-4 mr-2" /> : null}
                {showPasswordForm ? "Cancel" : "Change Password"}
              </Button>
            </div>

            {showPasswordForm && (
              <form onSubmit={handleChangePassword} className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Text className="text-sm text-foreground/60">New Password</Text>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className={cn(
                      "w-full h-12 px-4 rounded-xl",
                      "bg-background/95",
                      "border-2 border-border/50",
                      "focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                      "placeholder:text-foreground/40"
                    )}
                    required
                    minLength={6}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" variant="primary" disabled={loading || !newPassword}>
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                </div>
              </form>
            )}
          </div>

          <Button
            type="button"
            variant="destructive"
            onClick={handleSignOut}
            disabled={loading}
            className="w-full"
          >
            Sign Out
          </Button>
        </div>
      </Container>
    </div>
  );
}
