import type { CookieOptions } from '@supabase/ssr'
import { createClient } from './server'

type CookieStore = {
  get: (name: string) => { value: string } | undefined
  set: (opts: { name: string; value: string } & CookieOptions) => void
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
