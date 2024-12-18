'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '~/lib/supabase/client'
import { Button } from '~/components/ui/Button'
import { Text } from '~/components/ui/Text'
import { Spinner } from '~/components/ui/Spinner'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import { cn } from '~/utils/cn'
import { useAuth } from '~/contexts/auth'

interface AuthFormProps {
  type: 'login' | 'signup' | 'reset'
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refreshSession } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      const supabase = createClient()

      if (type === 'login') {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (signInError) throw signInError

        await refreshSession()
        const next = searchParams.get('next') || '/'
        window.location.href = next
      } else if (type === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?type=email_confirmation`
          }
        })
        
        if (signUpError) throw signUpError
        
        setMessage(
          'Check your email for the confirmation link. You will be automatically logged in after confirming.'
        )
        
        setEmail('')
        setPassword('')
      } else if (type === 'reset') {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?type=recovery&next=/profile`,
        })
        
        if (resetError) throw resetError
        setMessage('Check your email for the password reset link')
      }
    } catch (err) {
      console.error('Auth error:', err)
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Text className="text-sm text-foreground/60">Email</Text>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-primary/60" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
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

        {type !== 'reset' && (
          <div className="space-y-2">
            <Text className="text-sm text-foreground/60">Password</Text>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-primary/60" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
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
        )}
      </div>

      {error && (
        <div className="p-4 rounded-xl border-2 border-destructive/20 bg-destructive/5 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <Text className="text-sm text-destructive">{error}</Text>
        </div>
      )}

      {message && (
        <div className="p-4 rounded-xl border-2 border-primary/20 bg-primary/5">
          <Text className="text-sm text-primary">{message}</Text>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        className="w-full h-12"
      >
        {loading ? (
          <Spinner size="sm" />
        ) : type === 'login' ? (
          'Sign In'
        ) : type === 'signup' ? (
          'Create Account'
        ) : (
          'Reset Password'
        )}
      </Button>
    </form>
  )
}
