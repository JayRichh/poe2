import { createServerClient, type CookieOptions } from '@supabase/ssr'
import type { Database } from './types'

export const createClient = (cookieStore: {
  get: (name: string) => { value: string } | undefined
  set: (opts: { name: string; value: string } & CookieOptions) => void
}) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options, maxAge: 0 })
        }
      }
    }
  )
}
