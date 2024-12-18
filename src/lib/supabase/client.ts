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

  // Always use sessionStorage for auth state to prevent stale states across tabs/sessions
  // persistSession only affects refresh token storage
  const storage = sessionStorage
  const refreshTokenKey = 'sb-refresh-token'
  
  return {
    getItem: (key) => {
      // Store refresh token in localStorage if persistSession is true
      if (key === refreshTokenKey && persistSession) {
        return localStorage.getItem(key)
      }
      return storage.getItem(key)
    },
    setItem: (key, value) => {
      // Store refresh token in localStorage if persistSession is true
      if (key === refreshTokenKey && persistSession) {
        localStorage.setItem(key, value)
      } else {
        storage.setItem(key, value)
      }
    },
    removeItem: (key) => {
      // Remove from both storages to ensure cleanup
      storage.removeItem(key)
      if (key === refreshTokenKey) {
        localStorage.removeItem(key)
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
      flowType: 'pkce'
    },
    global: {
      headers: {
        'x-client-info': 'supabase-js-v2'
      }
    }
  }

  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    options
  )
}
