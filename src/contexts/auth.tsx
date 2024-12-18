'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '~/lib/supabase/client'
import { useRouter } from 'next/navigation'

type AuthState = {
  user: User | null
  loading: boolean
  error: string | null
  isInitialized: boolean
}

type AuthContextType = AuthState & {
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  isInitialized: false,
  signOut: async () => {},
  refreshSession: async () => {},
})

const SESSION_REFRESH_INTERVAL = 2 * 60 * 1000 // 2 minutes

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
    isInitialized: false,
  })
  const router = useRouter()
  const supabase = createClient()

  const clearAuthState = useCallback(async () => {
    try {
      // Clear Supabase session
      await supabase.auth.signOut()
      
      // Clear all auth-related storage
      if (typeof window !== 'undefined') {
        // Clear session storage
        sessionStorage.clear()
        
        // Clear specific localStorage items
        const authKeys = ['sb-refresh-token', 'supabase.auth.token']
        authKeys.forEach(key => localStorage.removeItem(key))
      }

      setState(prev => ({
        ...prev,
        user: null,
        error: null,
        isInitialized: true,
        loading: false
      }))

      router.refresh()
    } catch (error) {
      console.error('Error clearing auth state:', error)
    }
  }, [supabase.auth, router])

  const refreshSession = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        await clearAuthState()
        throw sessionError
      }

      if (!session?.user) {
        await clearAuthState()
        return
      }

      // Check if session is expired
      const expiresAt = session.expires_at ? session.expires_at * 1000 : 0
      if (Date.now() >= expiresAt) {
        await clearAuthState()
        return
      }

      setState(prev => ({ 
        ...prev, 
        user: session.user,
        error: null,
        isInitialized: true
      }))
      
      router.refresh()
    } catch (error) {
      console.error('Session refresh error:', error)
      await clearAuthState()
      
      // Only set error state if we're not already redirecting to auth
      if (!window.location.pathname.startsWith('/auth/')) {
        setState(prev => ({
          ...prev,
          error: 'Session expired. Please sign in again.'
        }))
      }
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }, [supabase.auth, router, clearAuthState])

  useEffect(() => {
    let isMounted = true
    let refreshInterval: NodeJS.Timeout

    const initializeAuth = async () => {
      try {
        await refreshSession()
        
        if (isMounted) {
          refreshInterval = setInterval(refreshSession, SESSION_REFRESH_INTERVAL)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        if (isMounted) {
          setState(prev => ({
            ...prev,
            error: 'Failed to initialize authentication',
            isInitialized: true,
          }))
        }
      }
    }

    initializeAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return

      if (event === 'SIGNED_OUT') {
        await clearAuthState()
        
        // Only redirect if not already on an auth page
        if (!window.location.pathname.startsWith('/auth/')) {
          router.push('/auth/login')
        }
      } else if (session?.user) {
        setState(prev => ({ 
          ...prev, 
          user: session.user,
          loading: false,
          error: null,
          isInitialized: true
        }))
        router.refresh()
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
      if (refreshInterval) clearInterval(refreshInterval)
    }
  }, [refreshSession, router, supabase.auth, clearAuthState])

  const signOut = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      await clearAuthState()
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
      setState(prev => ({
        ...prev,
        error: 'Failed to sign out. Please try again.',
      }))
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }

  return (
    <AuthContext.Provider value={{ ...state, signOut, refreshSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
