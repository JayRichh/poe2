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

const SESSION_REFRESH_INTERVAL = 10 * 60 * 1000 // 10 minutes

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
    isInitialized: false,
  })
  const router = useRouter()
  const supabase = createClient()

  const refreshSession = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        throw new Error(`Failed to get session: ${sessionError.message}`)
      }

      if (session?.user) {
        // Check if session is about to expire (within 1 hour)
        const expiresAt = session.expires_at ? session.expires_at * 1000 : 0
        const oneHour = 60 * 60 * 1000
        
        if (Date.now() + oneHour >= expiresAt) {
          // Refresh session if it's about to expire
          const { data: { session: refreshedSession }, error: refreshError } = 
            await supabase.auth.refreshSession()
          
          if (refreshError) throw refreshError
          
          setState(prev => ({ 
            ...prev, 
            user: refreshedSession?.user || null,
            error: null,
            isInitialized: true
          }))
        } else {
          setState(prev => ({ 
            ...prev, 
            user: session.user,
            error: null,
            isInitialized: true
          }))
        }
        
        router.refresh()
      } else {
        setState(prev => ({ 
          ...prev, 
          user: null,
          error: null,
          isInitialized: true
        }))
      }
    } catch (error) {
      console.error('Session refresh error:', error)
      setState(prev => ({
        ...prev,
        user: null,
        error: 'Failed to refresh session',
        isInitialized: true
      }))
      
      // Redirect to login on session error
      if (window.location.pathname !== '/auth/login') {
        router.push('/auth/login')
      }
    } finally {
      setState(prev => ({ ...prev, loading: false }))
    }
  }, [supabase.auth, router])

  useEffect(() => {
    let isMounted = true
    let refreshInterval: NodeJS.Timeout

    const initializeAuth = async () => {
      try {
        await refreshSession()
        
        // Set up periodic session refresh
        refreshInterval = setInterval(refreshSession, SESSION_REFRESH_INTERVAL)
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

    // Initialize auth
    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return

      if (event === 'SIGNED_OUT') {
        setState(prev => ({ 
          ...prev, 
          user: null,
          loading: false,
          error: null,
          isInitialized: true
        }))
        router.refresh()
        router.push('/')
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
  }, [refreshSession, router, supabase.auth])

  const signOut = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      setState(prev => ({ 
        ...prev, 
        user: null,
        error: null 
      }))

      router.refresh()
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
