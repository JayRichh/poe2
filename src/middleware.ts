import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PROTECTED_ROUTES = ['/profile', '/build-planner/create']
const AUTH_ROUTES = ['/auth/login', '/auth/signup', '/auth/reset-password']

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async getAll() {
            return request.cookies.getAll().map(cookie => ({
              name: cookie.name,
              value: cookie.value,
            }))
          },
          async setAll(cookiesList) {
            cookiesList.forEach(({ name, value, ...options }) => {
              response.cookies.set({
                name,
                value,
                ...options,
                sameSite: 'lax',
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
              })
            })
          },
        },
      }
    )

    const { data: { session }, error: sessionError } = await supabase.auth.getSession()
    const pathname = request.nextUrl.pathname

    // Clear cookies if session error or expired
    if (sessionError || !session) {
      const cookiesToClear = ['sb-access-token', 'sb-refresh-token', 'sb-jcumrdfiiuggbwuqcrer-auth-token']
      cookiesToClear.forEach(name => {
        response.cookies.delete(name)
      })
    }

    // Handle protected routes - redirect to login if no session
    if (PROTECTED_ROUTES.some(path => pathname.startsWith(path))) {
      if (!session) {
        const redirectUrl = new URL('/auth/login', request.url)
        redirectUrl.searchParams.set('next', pathname)
        return NextResponse.redirect(redirectUrl)
      }
    }

    // Handle auth routes - redirect to home if already logged in
    if (AUTH_ROUTES.some(path => pathname.startsWith(path))) {
      if (session) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    
    // On error, clear cookies and allow request to continue
    const cookiesToClear = ['sb-access-token', 'sb-refresh-token']
    cookiesToClear.forEach(name => {
      response.cookies.delete(name)
    })

    // If on protected route, redirect to login
    const pathname = request.nextUrl.pathname
    if (PROTECTED_ROUTES.some(path => pathname.startsWith(path))) {
      const redirectUrl = new URL('/auth/login', request.url)
      redirectUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(redirectUrl)
    }

    return response
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)',
  ],
}
