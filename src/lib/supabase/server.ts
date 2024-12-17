import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from './types'
import { RequestCookie, ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'

export const createClient = () => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        async getAll() {
          const cookieStore = await cookies()
          return cookieStore.getAll().map((cookie: RequestCookie) => ({
            name: cookie.name,
            value: cookie.value,
          }))
        },
        async setAll(cookieStrings: { name: string; value: string; options?: Partial<ResponseCookie> }[]) {
          const cookieStore = await cookies()
          for (const { name, value, options = {} } of cookieStrings) {
            cookieStore.set({
              name,
              value,
              ...options,
              sameSite: 'lax',
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
            } as ResponseCookie)
          }
        },
      },
    }
  )
}
