import { cookies } from 'next/headers'
import { createClient } from './server'
import type { CookieOptions } from '@supabase/ssr'

export const getServerClient = async () => {
  const cookieStore = await cookies()
  return createClient({
    get: (name: string) => cookieStore.get(name),
    set: (opts: { name: string; value: string } & CookieOptions) => cookieStore.set(opts)
  })
}

// Helper for middleware which uses a different cookie store
export const createMiddlewareClient = (request: Request, response: Response) => {
  return createClient({
    get: (name: string) => {
      const cookies = request.headers.get('cookie')?.split('; ') || []
      const cookie = cookies.find(c => c.startsWith(`${name}=`))
      return cookie ? { value: cookie.split('=')[1] } : undefined
    },
    set: (opts: { name: string; value: string } & CookieOptions) => {
      response.headers.set(
        'Set-Cookie',
        `${opts.name}=${opts.value}; Path=${opts.path || '/'}; SameSite=${opts.sameSite || 'lax'}${opts.httpOnly ? '; HttpOnly' : ''}${opts.secure ? '; Secure' : ''}`
      )
    }
  })
}
