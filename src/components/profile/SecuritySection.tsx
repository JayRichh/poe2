"use client";

import { Key, X, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "~/components/ui/Button";
import { Text } from "~/components/ui/Text";
import { FormField } from "~/components/shared/FormField";
import { cn } from "~/utils/cn";

interface SecuritySectionProps {
  loading: boolean;
  showPasswordForm: boolean;
  newPassword: string;
  onPasswordChange: (value: string) => void;
  onTogglePasswordForm: () => void;
  onPasswordSubmit: (e: React.FormEvent) => void;
  onSignOut: () => void;
}

export function SecuritySection({
  loading,
  showPasswordForm,
  newPassword,
  onPasswordChange,
  onTogglePasswordForm,
  onPasswordSubmit,
  onSignOut,
}: SecuritySectionProps) {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col p-6 rounded-xl border-2 border-border/50 bg-background/95"
      >
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
            variant={showPasswordForm ? "outline" : "primary"}
            onClick={onTogglePasswordForm}
            disabled={loading}
            className="sm:flex-shrink-0"
          >
            {showPasswordForm ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Key className="h-4 w-4 mr-2" />
                Change Password
              </>
            )}
          </Button>
        </div>

        {showPasswordForm && (
          <form onSubmit={onPasswordSubmit} className="mt-4 space-y-4">
            <FormField
              label="New Password"
              icon={<Key className="h-5 w-5 text-primary/60" />}
              hint="Must be at least 6 characters long"
            >
              <input
                type="password"
                value={newPassword}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="Enter new password"
                className={cn(
                  "pl-11 w-full h-12 rounded-xl",
                  "bg-background/95",
                  "border-2 border-border/50",
                  "focus:border-primary/50 focus:ring-2 focus:ring-primary/20",
                  "placeholder:text-foreground/40"
                )}
                required
                minLength={6}
              />
            </FormField>
            <div className="flex justify-end">
              <Button type="submit" variant="primary" disabled={loading || !newPassword}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Button
          type="button"
          variant="destructive"
          onClick={onSignOut}
          disabled={loading}
          className="w-full gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </motion.div>
    </div>
  );
}
