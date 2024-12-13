'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '~/lib/supabase/client'

type AuthState = {
  user: User | null
  loading: boolean
  error: string | null
}

type AuthContextType = AuthState & {
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signOut: async () => {},
})

// Keys that need to be cleared for legacy data cleanup
const LEGACY_STORAGE_KEYS = [
  'hasCompletedSetup',
  'budgetPreferences',
  'gift-list-groups',
  'gift-list-members',
  'gift-list-gifts',
  'supabase-migration-completed'
];

// Key to track if legacy cleanup has been performed
const LEGACY_CLEANUP_KEY = 'gift-list-legacy-cleanup-completed';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })
  const supabase = createClient()

  useEffect(() => {
    let isMounted = true

    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          throw new Error(`Failed to get session: ${sessionError.message}`)
        }

        // Only perform legacy cleanup if:
        // 1. User is logging in (session exists)
        // 2. Cleanup hasn't been performed before
        if (session?.user && !localStorage.getItem(LEGACY_CLEANUP_KEY)) {
          // Clear legacy localStorage keys
          LEGACY_STORAGE_KEYS.forEach(key => {
            localStorage.removeItem(key);
          });
          // Mark cleanup as completed
          localStorage.setItem(LEGACY_CLEANUP_KEY, 'true');
          console.log('Legacy data cleanup completed');
        }

        if (session?.user && isMounted) {
          setState(prev => ({ ...prev, user: session.user }))
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        if (isMounted) {
          setState(prev => ({
            ...prev,
            error: 'Failed to initialize authentication. Please refresh the page.',
          }))
        }
      } finally {
        if (isMounted) {
          setState(prev => ({ ...prev, loading: false }))
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

      if (session?.user) {
        setState(prev => ({ 
          ...prev, 
          user: session.user,
          loading: false,
          error: null 
        }))
      } else {
        setState(prev => ({ 
          ...prev, 
          user: null,
          loading: false,
          error: null 
        }))
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

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
    <AuthContext.Provider value={{ ...state, signOut }}>
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
