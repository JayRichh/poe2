"use client";

import { motion } from "framer-motion";
import { Mail, Upload, User, XCircle } from "lucide-react";

import { FormField } from "~/components/shared/FormField";
import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";

import { cn } from "~/utils/cn";

import { Avatar } from "./Avatar";

interface ProfileFormProps {
  email: string;
  name: string;
  isNewUser: boolean;
  loading: boolean;
  validationError?: string | null;
  submitError?: string | null;
  submitMessage?: string | null;
  userId: string;
  avatarUrl: string | null;
  onNameChange: (value: string) => void;
  onNameClear: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onAvatarUpload: (url: string) => Promise<void>;
}

export function ProfileForm({
  email,
  name,
  isNewUser,
  loading,
  validationError,
  submitError,
  submitMessage,
  userId,
  avatarUrl,
  onNameChange,
  onNameClear,
  onSubmit,
  onAvatarUpload,
}: ProfileFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6"
      >
        <div className="flex justify-center">
          {userId ? (
            <Avatar
              uid={userId}
              url={avatarUrl}
              size={120}
              onUpload={(url: string) => {
                onAvatarUpload(url).catch((error) => {
                  console.error("Error in avatar upload:", error);
                  throw error;
                });
              }}
              className="border-4 border-background"
            />
          ) : (
            <div className="w-[120px] h-[120px] rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="w-1/2 h-1/2 text-primary/40" />
            </div>
          )}
        </div>
        <FormField label="Email" icon={<Mail className="h-5 w-5 text-primary/60" />}>
          <div className="relative">
            <input
              type="email"
              value={email}
              disabled
              className={cn(
                "pl-11 w-full h-12 rounded-xl",
                "bg-background/95",
                "border-2 border-border/50",
                "text-foreground/60",
                "transition-all duration-200"
              )}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                Verified
              </span>
            </div>
          </div>
        </FormField>

        <FormField
          label="Display Name"
          required
          icon={<User className="h-5 w-5 text-primary/60" />}
          error={validationError || undefined}
          hint="This name will be displayed on your builds and profile"
        >
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder={
                isNewUser ? "Choose a display name to get started" : "Enter your display name"
              }
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
                onClick={onNameClear}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-foreground/40 hover:text-foreground/60 transition-colors"
              >
                <XCircle className="h-5 w-5" />
              </button>
            )}
          </div>
        </FormField>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
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

        <div className="flex justify-center">
          <Button
            type="submit"
            variant="primary"
            disabled={loading || !!validationError || !name.trim()}
          >
            {loading ? "Saving..." : isNewUser ? "Complete Profile Setup" : "Save Changes"}
          </Button>
        </div>
      </motion.div>
    </form>
  );
}
