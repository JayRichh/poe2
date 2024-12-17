'use client'

import { useState, useTransition } from 'react'
import { Container } from '~/components/ui/Container'
import { Text } from '~/components/ui/Text'
import { Button } from '~/components/ui/Button'
import { useAuth } from '~/contexts/auth'
import { usePOEAccount } from '~/hooks/usePOEAccount'
import { User, Mail, Key, Link2, CheckCircle2, RefreshCw } from 'lucide-react'
import { cn } from '~/utils/cn'
import { updateProfile, updatePassword } from '~/app/actions/profile'
import { useRouter } from 'next/navigation'
import { Spinner } from '~/components/ui/Spinner'

export default function ProfilePage() {
  const router = useRouter()
  const { user, signOut, refreshSession } = useAuth()
  const { 
    loading: poeLoading,
    error: poeError,
    poeAccount,
    poeProfile,
    connectPOE,
    disconnectPOE,
    refreshProfile
  } = usePOEAccount()
  const [name, setName] = useState(user?.user_metadata?.name || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      await updateProfile(name)
      setMessage('Profile updated successfully')
      // Refresh session to get updated user metadata
      await refreshSession()
    } catch (err) {
      console.error('Error updating profile:', err)
      setError('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (!user?.email) return

    const newPassword = prompt('Enter your new password')
    if (!newPassword) return

    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      await updatePassword(newPassword)
      setMessage('Password updated successfully')
      // Refresh session after password change
      await refreshSession()
    } catch (err) {
      console.error('Error updating password:', err)
      setError('Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    startTransition(async () => {
      try {
        await signOut()
        router.push('/')
      } catch (err) {
        console.error('Error signing out:', err)
        setError('Failed to sign out')
      }
    })
  }

  // Show loading state during transitions
  if (isPending) {
    return (
      <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center justify-center">
        <Spinner size="lg" variant="primary" />
      </div>
    )
  }

  // Redirect if not authenticated
  if (!user) {
    startTransition(() => {
      router.push('/auth/login')
    })
    return null
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] p-4">
      <Container className="max-w-2xl py-8 space-y-8">
        <div>
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
                    'pl-11 w-full h-12 rounded-xl',
                    'bg-background/95',
                    'border-2 border-border/50',
                    'text-foreground/60'
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Text className="text-sm text-foreground/60">Display Name</Text>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-primary/60" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className={cn(
                    'pl-11 w-full h-12 rounded-xl',
                    'bg-background/95',
                    'border-2 border-border/50',
                    'focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
                    'placeholder:text-foreground/40'
                  )}
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl border-2 border-destructive/20 bg-destructive/5">
              <Text className="text-sm text-destructive">{error}</Text>
            </div>
          )}

          {message && (
            <div className="p-4 rounded-xl border-2 border-primary/20 bg-primary/5">
              <Text className="text-sm text-primary">{message}</Text>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              disabled={loading || isPending}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>

        <div className="space-y-4 pt-6 border-t border-border/50">
          <Text className="text-lg font-medium">Connections</Text>

          <div className="flex items-center justify-between p-4 rounded-xl border-2 border-border/50 bg-background/95">
            <div className="flex items-center gap-3">
              {poeAccount?.connected ? (
                <CheckCircle2 className="h-5 w-5 text-primary" />
              ) : (
                <Link2 className="h-5 w-5 text-primary/60" />
              )}
              <div>
                <Text className="font-medium">Path of Exile Account</Text>
                <Text className="text-sm text-foreground/60">
                  {poeAccount?.connected
                    ? `Connected as ${poeAccount.accountName}`
                    : 'Connect your POE account to sync characters'}
                </Text>
                {poeAccount?.connected && poeAccount.lastSync && (
                  <Text className="text-xs text-foreground/40">
                    Last synced: {new Date(poeAccount.lastSync).toLocaleString()}
                  </Text>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {poeAccount?.connected && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={refreshProfile}
                  disabled={poeLoading || isPending}
                  className="p-2"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
              <Button
                type="button"
                variant={poeAccount?.connected ? "outline" : "primary"}
                onClick={poeAccount?.connected ? disconnectPOE : connectPOE}
                disabled={poeLoading || isPending}
              >
                {poeLoading 
                  ? 'Loading...' 
                  : poeAccount?.connected 
                    ? 'Disconnect' 
                    : 'Connect'
                }
              </Button>
            </div>
          </div>

          {poeError && (
            <div className="p-4 rounded-xl border-2 border-destructive/20 bg-destructive/5">
              <Text className="text-sm text-destructive">{poeError}</Text>
            </div>
          )}
        </div>

        <div className="space-y-4 pt-6 border-t border-border/50">
          <Text className="text-lg font-medium">Security</Text>
          
          <div className="flex items-center justify-between p-4 rounded-xl border-2 border-border/50 bg-background/95">
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
              onClick={handleChangePassword}
              disabled={loading || isPending}
            >
              Change Password
            </Button>
          </div>

          <Button
            type="button"
            variant="destructive"
            onClick={handleSignOut}
            disabled={loading || isPending}
            className="w-full"
          >
            Sign Out
          </Button>
        </div>
      </Container>
    </div>
  )
}
