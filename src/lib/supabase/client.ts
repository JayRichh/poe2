import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'
import type { SupabaseClientOptions } from '@supabase/supabase-js'
import type { SupportedStorage } from '@supabase/auth-js'

const createCustomStorage = (persistSession: boolean): SupportedStorage => {
  const isClient = typeof window !== 'undefined'
  if (!isClient) {
    // Return no-op storage when running on server
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
      isServer: true
    }
  }

  // Use appropriate storage on client
  const storage = persistSession ? localStorage : sessionStorage
  return {
    getItem: (key) => storage.getItem(key),
    setItem: (key, value) => storage.setItem(key, value),
    removeItem: (key) => storage.removeItem(key)
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
