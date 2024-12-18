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
  loading: false, 
  error: null,
  isInitialized: false,
  signOut: async () => {},
  refreshSession: async () => {},
})

const SESSION_REFRESH_INTERVAL = 2 * 60 * 1000 // 2 minutes

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: false,
    error: null,
    isInitialized: false,
  })
  const router = useRouter()
  const supabase = createClient()

  const clearAuthState = useCallback(async () => {
    try {
      // Let Supabase handle cookie/storage cleanup
      await supabase.auth.signOut()
      
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
    if (!state.isInitialized) {
      // Only show loading on initial load
      setState(prev => ({ ...prev, loading: true }))
    }
    
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        await clearAuthState()
        throw sessionError
      }

      if (!session?.user) {
        setState(prev => ({ 
          ...prev, 
          user: null,
          error: null,
          isInitialized: true,
          loading: false
        }))
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
        isInitialized: true,
        loading: false
      }))
      
      router.refresh()
    } catch (error) {
      console.error('Session refresh error:', error)
      
      setState(prev => ({
        ...prev,
        user: null,
        error: 'Failed to refresh session',
        isInitialized: true,
        loading: false
      }))

      // Only redirect if not on an auth page
      if (!window.location.pathname.startsWith('/auth/')) {
        router.push('/auth/login')
      }
    }
  }, [supabase.auth, router, clearAuthState, state.isInitialized])

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
            loading: false
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
