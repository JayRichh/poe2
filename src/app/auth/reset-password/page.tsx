'use client'

import { useState } from 'react'
import { Container } from '~/components/ui/Container'
import { Text } from '~/components/ui/Text'
import { Button } from '~/components/ui/Button'
import { createClient } from '~/lib/supabase/client'
import { Lock } from 'lucide-react'
import { cn } from '~/utils/cn'
import { useRouter } from 'next/navigation'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        router.push('/profile')
      }, 2000)
    } catch (err) {
      console.error('Error resetting password:', err)
      setError('Failed to reset password. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container className="max-w-md py-8">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <Text className="text-2xl font-bold">Reset Password</Text>
          <Text className="text-foreground/60">
            Enter your new password below
          </Text>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Text className="text-sm text-foreground/60">New Password</Text>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-primary/60" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className={cn(
                  'pl-11 w-full h-12 rounded-xl',
                  'bg-background/95',
                  'border-2 border-border/50',
                  'focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
                  'placeholder:text-foreground/40'
                )}
                placeholder="Enter new password"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-xl border-2 border-destructive/20 bg-destructive/5">
              <Text className="text-sm text-destructive">{error}</Text>
            </div>
          )}

          {success && (
            <div className="p-4 rounded-xl border-2 border-primary/20 bg-primary/5">
              <Text className="text-sm text-primary">
                Password reset successful! Redirecting...
              </Text>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading || success}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </Container>
  )
}
