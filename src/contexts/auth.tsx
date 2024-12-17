'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { User } from '@supabase/supabase-js'
import { createClient } from '~/lib/supabase/client'
import { useRouter } from 'next/navigation'

type AuthState = {
  user: User | null
  loading: boolean
  error: string | null
}

type AuthContextType = AuthState & {
  signOut: () => Promise<void>
  refreshSession: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  signOut: async () => {},
  refreshSession: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })
  const router = useRouter()
  const supabase = createClient()

  const refreshSession = useCallback(async () => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) {
        throw new Error(`Failed to get session: ${sessionError.message}`)
      }

      if (session?.user) {
        setState(prev => ({ 
          ...prev, 
          user: session.user,
          error: null 
        }))
        router.refresh()
      } else {
        setState(prev => ({ 
          ...prev, 
          user: null,
          error: null 
        }))
      }
    } catch (error) {
      console.error('Session refresh error:', error)
      setState(prev => ({
        ...prev,
        error: 'Failed to refresh session',
      }))
    }
  }, [supabase.auth, router])

  useEffect(() => {
    let isMounted = true

    const initializeAuth = async () => {
      try {
        await refreshSession()
      } catch (error) {
        console.error('Auth initialization error:', error)
        if (isMounted) {
          setState(prev => ({
            ...prev,
            error: 'Failed to initialize authentication',
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
        router.refresh()
      } else {
        setState(prev => ({ 
          ...prev, 
          user: null,
          loading: false,
          error: null 
        }))
        router.refresh()
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
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
