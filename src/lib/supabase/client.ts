import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'
import type { SupabaseClientOptions } from '@supabase/supabase-js'
import type { SupportedStorage } from '@supabase/auth-js'

const createCustomStorage = (persistSession: boolean): SupportedStorage => {
  const isClient = typeof window !== 'undefined'
  if (!isClient) {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      isServer: true
    }
  }

  // Use sessionStorage for everything except refresh token when persistSession is true
  const storage = sessionStorage
  const refreshTokenKey = 'sb-refresh-token'
  const accessTokenKey = 'sb-access-token'
  
  return {
    getItem: (key) => {
      try {
        // Only use localStorage for refresh token when persistSession is true
        if (key === refreshTokenKey && persistSession) {
          const value = localStorage.getItem(key)
          if (value) {
            // Also sync to sessionStorage to maintain consistency
            sessionStorage.setItem(key, value)
            return value
          }
        }
        return storage.getItem(key)
      } catch (error) {
        console.error('Storage getItem error:', error)
        return null
      }
    },
    setItem: (key, value) => {
      try {
        // Store refresh token in localStorage if persistSession is true
        if (key === refreshTokenKey && persistSession) {
          localStorage.setItem(key, value)
        }
        // Always store in sessionStorage for consistency
        storage.setItem(key, value)
      } catch (error) {
        console.error('Storage setItem error:', error)
      }
    },
    removeItem: (key) => {
      try {
        // Remove from both storages to ensure cleanup
        storage.removeItem(key)
        if (key === refreshTokenKey || key === accessTokenKey) {
          localStorage.removeItem(key)
        }
      } catch (error) {
        console.error('Storage removeItem error:', error)
      }
    }
  }
}

export const createClient = (persistSession: boolean = false) => {
  const options: SupabaseClientOptions<'public'> = {
    auth: {
      autoRefreshToken: true,
      persistSession,
      storage: createCustomStorage(persistSession),
      detectSessionInUrl: true,
      flowType: 'pkce',
      debug: process.env.NODE_ENV === 'development'
    },
    global: {
      headers: {
        'x-client-info': 'supabase-js-v2'
      }
    }
  }

  const client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    options
  )

  // Add error logging
  client.auth.onAuthStateChange((event, session) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Auth state changed:', event, session?.user?.id)
    }
  })

  return client
}
