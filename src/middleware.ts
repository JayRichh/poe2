import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    // Create server client with latest cookie API
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
                maxAge: 60 * 60 * 24 * 7, // 1 week
              })
            })
          },
        },
      }
    )

    // Try to get the session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
      console.error('Session error:', sessionError)
      // Clear session cookies on error
      const cookieNames = ['sb-access-token', 'sb-refresh-token']
      cookieNames.forEach(name => response.cookies.delete(name))
      return response
    }

    // Protected routes that require authentication
    const protectedPaths = [
      '/profile',
      '/build-planner/create'
    ]

    const isProtectedPath = protectedPaths.some(path => 
      request.nextUrl.pathname.startsWith(path)
    )

    // Auth routes that should redirect to home if already logged in
    const authRoutes = ['/auth/login', '/auth/signup', '/auth/reset-password']
    const isAuthRoute = authRoutes.some(path => 
      request.nextUrl.pathname.startsWith(path)
    )

    // Handle protected routes
    if (isProtectedPath && !session) {
      const redirectUrl = new URL('/auth/login', request.url)
      redirectUrl.searchParams.set('next', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Handle auth routes when logged in
    if (session && isAuthRoute) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Set security headers
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    )

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (public assets)
     * - api routes (internal API endpoints)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api).*)',
  ],
}
