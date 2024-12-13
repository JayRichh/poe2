'use client'

import { useState } from 'react'
import { createClient } from '~/lib/supabase/client'
import { Button } from '~/components/ui/Button'
import { Text } from '~/components/ui/Text'
import { cn } from '~/utils/cn'
import { Mail, Lock, Github } from 'lucide-react'

type AuthMode = 'signin' | 'signup' | 'forgot'

export function AuthForm({ mode: initialMode = 'signin' }: { mode?: AuthMode }) {
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/reset-password`,
        })
        if (error) throw error
        setSuccess('Password reset instructions have been sent to your email')
      } else {
        const { error } = mode === 'signin'
          ? await supabase.auth.signInWithPassword({ email, password })
          : await supabase.auth.signUp({
              email,
              password,
              options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
              },
            })
        if (error) throw error
        if (mode === 'signup') {
          setSuccess('Please check your email to confirm your account')
        }
      }
    } catch (error: any) {
      setError(error?.message || 'An error occurred during authentication')
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          // Use Supabase's default callback URL for OAuth
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
          queryParams: {
            // Add any additional OAuth scopes if needed
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      if (error) throw error
    } catch (error: any) {
      setError(error?.message || 'An error occurred during OAuth sign in')
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Text className="text-2xl font-bold text-center">
          {mode === 'signin' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
        </Text>
        <Text className="text-sm text-foreground/60 text-center">
          {mode === 'signin'
            ? 'Sign in to access your gift lists'
            : mode === 'signup'
            ? 'Create an account to start organizing your gifts'
            : 'Enter your email to receive reset instructions'}
        </Text>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
                className={cn(
                  'pl-11 w-full h-12 rounded-xl',
                  'bg-background/95',
                  'border-2 border-border/50',
                  'focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
                  'placeholder:text-foreground/40'
                )}
                placeholder="Enter your email"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
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
                  className={cn(
                    'pl-11 w-full h-12 rounded-xl',
                    'bg-background/95',
                    'border-2 border-border/50',
                    'focus:border-primary/50 focus:ring-2 focus:ring-primary/20',
                    'placeholder:text-foreground/40'
                  )}
                  placeholder="Enter your password"
                />
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="p-4 rounded-xl border-2 border-destructive/20 bg-destructive/5">
            <Text className="text-sm text-destructive">{error}</Text>
          </div>
        )}

        {success && (
          <div className="p-4 rounded-xl border-2 border-green-500/20 bg-green-500/5">
            <Text className="text-sm text-green-600">{success}</Text>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={loading}
        >
          {loading
            ? 'Loading...'
            : mode === 'signin'
            ? 'Sign In'
            : mode === 'signup'
            ? 'Create Account'
            : 'Send Reset Instructions'}
        </Button>
      </form>

      {mode !== 'forgot' && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-foreground/60">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthSignIn('github')}
          >
            <Github className="h-5 w-5 mr-2" />
            GitHub
          </Button>
        </>
      )}

      <div className="text-center space-y-2">
        {mode === 'signin' ? (
          <>
            <button
              type="button"
              onClick={() => setMode('forgot')}
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </button>
            <Text className="text-sm text-foreground/60">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </Text>
          </>
        ) : mode === 'signup' ? (
          <Text className="text-sm text-foreground/60">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setMode('signin')}
              className="text-primary hover:underline"
            >
              Sign in
            </button>
          </Text>
        ) : (
          <Text className="text-sm text-foreground/60">
            Remember your password?{' '}
            <button
              type="button"
              onClick={() => setMode('signin')}
              className="text-primary hover:underline"
            >
              Sign in
            </button>
          </Text>
        )}
      </div>
    </div>
  )
}
