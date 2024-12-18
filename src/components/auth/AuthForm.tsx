'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '~/lib/supabase/client'
import { Button } from '~/components/ui/Button'
import { Text } from '~/components/ui/Text'
import { Spinner } from '~/components/ui/Spinner'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import { cn } from '~/utils/cn'
import { useAuth } from '~/contexts/auth'
import { AuthError } from '@supabase/supabase-js'

interface AuthFormProps {
  type: 'login' | 'signup' | 'reset'
}

export function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refreshSession } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  // Initialize remember me from localStorage
  useEffect(() => {
    const remembered = localStorage.getItem('rememberMe') === 'true'
    setRememberMe(remembered)
  }, [])

  // Check for error param on mount
  useEffect(() => {
    const errorMsg = searchParams.get('error')
    if (errorMsg) {
      setError(decodeURIComponent(errorMsg))
    }
  }, [searchParams])

  const handleAuthError = (error: Error | AuthError) => {
    console.error('Auth error details:', {
      name: error.name,
      message: error.message,
      cause: error.cause,
    })
    
    if (error instanceof AuthError) {
      switch (error.status) {
        case 400:
          setError('Invalid credentials')
          break
        case 401:
          setError('Unauthorized')
          break
        case 403:
          setError('Email not verified')
          break
        case 422:
          setError('Invalid email or password format')
          break
        case 429:
          setError('Too many attempts. Please try again later')
          break
        default:
          setError(error.message)
      }
    } else {
      setError(error.message)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      console.log('Starting auth process:', { type, email })
      
      // Create client with persistence setting
      const supabase = createClient(rememberMe)

      if (type === 'login') {
        console.log('Attempting sign in...')
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        
        if (signInError) {
          console.error('Sign in error:', signInError)
          throw signInError
        }

        console.log('Sign in successful:', { user: data.user?.id })

        // Store remember me preference
        localStorage.setItem('rememberMe', rememberMe.toString())

        // Refresh session to ensure we have latest auth state
        console.log('Refreshing session...')
        await refreshSession()

        // Get the next URL from search params or default to home
        const next = searchParams.get('next') || '/'
        console.log('Redirecting to:', next)
        
        // Use window.location for hard navigation to ensure clean state
        window.location.href = next
      } else if (type === 'signup') {
        console.log('Attempting sign up...')
        
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?type=email_confirmation`,
            data: {
              remember_me: rememberMe
            }
          }
        })
        
        if (signUpError) {
          console.error('Sign up error:', signUpError)
          throw signUpError
        }

        console.log('Sign up successful:', { user: data.user?.id })
        
        setMessage(
          'Check your email for the confirmation link. You will be automatically logged in after confirming.'
        )
        
        // Clear form
        setEmail('')
        setPassword('')
        setRememberMe(false)
      } else if (type === 'reset') {
        console.log('Attempting password reset...')
        
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/callback?type=recovery&next=/profile`,
        })
        
        if (resetError) {
          console.error('Password reset error:', resetError)
          throw resetError
        }

        console.log('Password reset email sent')
        setMessage('Check your email for the password reset link')
      }
    } catch (err) {
      handleAuthError(err instanceof Error ? err : new Error('An unexpected error occurred'))
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

        {type === 'login' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-border/50 text-primary focus:ring-primary/20"
              />
              <label htmlFor="rememberMe" className="text-sm text-foreground/60">
                Remember me
              </label>
            </div>
            <button
              type="button"
              onClick={() => router.push('/auth/reset-password')}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </button>
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
