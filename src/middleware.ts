import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PROTECTED_ROUTES = ['/profile', '/build-planner/create']
const AUTH_ROUTES = ['/auth/login', '/auth/signup', '/auth/reset-password']

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname
  const isAuthRoute = AUTH_ROUTES.some(path => pathname.startsWith(path))
  const isProtectedRoute = PROTECTED_ROUTES.some(path => pathname.startsWith(path))

  // Create Supabase client
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

  try {
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    // Clear invalid cookies
    if (sessionError || !session) {
      const cookiesToClear = ['sb-access-token', 'sb-refresh-token']
      cookiesToClear.forEach(name => {
        response.cookies.delete(name)
      })
    }

    // Handle auth routes
    if (isAuthRoute) {
      // If logged in, redirect to home (except for RSC requests)
      if (session && !request.headers.get('rsc')) {
        return NextResponse.redirect(new URL('/', request.url))
      }
      // Always allow access to auth routes
      return response
    }

    // Handle protected routes
    if (isProtectedRoute && !session) {
      const redirectUrl = new URL('/auth/login', request.url)
      redirectUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(redirectUrl)
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    
    // Clear cookies on error
    const cookiesToClear = ['sb-access-token', 'sb-refresh-token']
    cookiesToClear.forEach(name => {
      response.cookies.delete(name)
    })

    // If protected route, redirect to login
    if (isProtectedRoute) {
      const redirectUrl = new URL('/auth/login', request.url)
      redirectUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Allow access to auth routes even on error
    if (isAuthRoute) {
      return response
    }

    return response
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)',
  ],
}
