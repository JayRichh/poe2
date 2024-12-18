'use client'

import { createContext, useContext, useEffect, useState } from 'react'
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
  loading: false,
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

  const refreshSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error) throw error

      setState(prev => ({
        ...prev,
        user: session?.user || null,
        loading: false,
        error: null
      }))
    } catch (error) {
      console.error('Session refresh error:', error)
      // Clear state on error
      setState(prev => ({
        ...prev,
        user: null,
        loading: false,
        error: null
      }))
      // Redirect to login if on protected route
      if (window.location.pathname.startsWith('/profile') || 
          window.location.pathname.startsWith('/build-planner/create')) {
        router.push('/auth/login')
      }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setState(prev => ({ ...prev, user: null, error: null }))
      router.push('/')
    } catch (error) {
      console.error('Sign out error:', error)
      // Clear state even if error occurs
      setState(prev => ({
        ...prev,
        user: null,
        error: null
      }))
      router.push('/')
    }
  }

  useEffect(() => {
    refreshSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setState(prev => ({
          ...prev,
          user: null,
          loading: false,
          error: null
        }))
        router.push('/')
      } else if (session?.user) {
        setState(prev => ({
          ...prev,
          user: session.user,
          loading: false,
          error: null
        }))
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase.auth, router])

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
