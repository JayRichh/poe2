import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

export const createClient = () => {
  const client = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
        storage: typeof window !== 'undefined' ? window.sessionStorage : undefined
      },
      cookies: {
        getAll() {
          if (typeof document === 'undefined') return []
          return document.cookie.split(';').reduce((cookies, cookie) => {
            const [name, value] = cookie.split('=').map(c => c.trim())
            if (name && value) {
              cookies.push({ name, value })
            }
            return cookies
          }, [] as { name: string; value: string }[])
        },
        setAll(cookies) {
          if (typeof document === 'undefined') return
          cookies.forEach(({ name, value, ...options }) => {
            document.cookie = `${name}=${value}; path=/; samesite=lax; max-age=${60 * 60 * 24 * 7}`
          })
        }
      }
    }
  )

  return client
}
