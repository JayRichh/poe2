'use client'

import { useState } from 'react'
import { Container } from '~/components/ui/Container'
import { Text } from '~/components/ui/Text'
import { Button } from '~/components/ui/Button'
import { useAuth } from '~/contexts/auth'
import { createClient } from '~/lib/supabase/client'
import { User, Mail, Key, Trash2 } from 'lucide-react'
import { cn } from '~/utils/cn'

export default function ProfilePage() {
  const { user, signOut } = useAuth()
  const [name, setName] = useState(user?.user_metadata?.name || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const supabase = createClient()

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        data: { name }
      })

      if (updateError) throw updateError

      const { error: profileError } = await supabase
        .from('profiles')
        .update({ name })
        .eq('id', user.id)

      if (profileError) throw profileError

      setMessage('Profile updated successfully')
    } catch (err) {
      console.error('Error updating profile:', err)
      setError('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    if (!user?.email) return

    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      // Instead of sending a reset email, we'll update the user's password directly
      const { error } = await supabase.auth.updateUser({
        password: prompt('Enter your new password') || ''
      })

      if (error) throw error

      setMessage('Password updated successfully')
    } catch (err) {
      console.error('Error updating password:', err)
      setError('Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!user) return
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) return

    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      // First get all groups for this user
      const { data: groups, error: groupsError } = await supabase
        .from('groups')
        .select('id')
        .eq('user_id', user.id)
      if (groupsError) throw groupsError
      const groupIds = groups.map(g => g.id)

      if (groupIds.length > 0) {
        // Get all members in these groups
        const { data: members, error: membersError } = await supabase
          .from('members')
          .select('id')
          .in('group_id', groupIds)
        if (membersError) throw membersError
        const memberIds = members.map(m => m.id)

        if (memberIds.length > 0) {
          // Delete all gifts for these members
          const { error: giftsError } = await supabase
            .from('gifts')
            .delete()
            .in('member_id', memberIds)
          if (giftsError) throw giftsError
        }

        // Delete all members in these groups
        const { error: membersDeleteError } = await supabase
          .from('members')
          .delete()
          .in('group_id', groupIds)
        if (membersDeleteError) throw membersDeleteError

        // Delete all groups
        const { error: groupsDeleteError } = await supabase
          .from('groups')
          .delete()
          .eq('user_id', user.id)
        if (groupsDeleteError) throw groupsDeleteError
      }

      // Delete profile
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id)
      if (profileError) throw profileError

      // Delete user account
      const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id)
      if (deleteError) throw deleteError

      // Sign out after successful deletion
      await signOut()
    } catch (err) {
      console.error('Error deleting account:', err)
      setError('Failed to delete account')
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut()
    } catch (err) {
      console.error('Error signing out:', err)
      setError('Failed to sign out')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
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
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>

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
            disabled={loading}
          >
            Change Password
          </Button>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl border-2 border-destructive/20 bg-destructive/5">
          <div className="flex items-center gap-3">
            <Trash2 className="h-5 w-5 text-destructive" />
            <div>
              <Text className="font-medium">Delete Account</Text>
              <Text className="text-sm text-foreground/60">Permanently delete your account and all data</Text>
            </div>
          </div>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={loading}
          >
            Delete Account
          </Button>
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
  )
}
