import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

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

    // Auth routes that should redirect to home if already logged in
    const authRoutes = ['/auth/login', '/auth/signup', '/auth/reset-password']
    const isAuthRoute = authRoutes.some(path => 
      request.nextUrl.pathname.startsWith(path)
    )

    // Protected routes that require authentication
    const protectedPaths = [
      '/profile',
      '/build-planner/create'
    ]
    const isProtectedPath = protectedPaths.some(path => 
      request.nextUrl.pathname.startsWith(path)
    )

    // Try to get the session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    // Handle session errors by allowing access to auth routes
    if (sessionError) {
      console.error('Session error:', sessionError)
      
      // If on protected route, redirect to login
      if (isProtectedPath) {
        const redirectUrl = new URL('/auth/login', request.url)
        redirectUrl.searchParams.set('next', request.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
      }
      
      // For auth routes or public routes, continue without redirect
      // This allows access to login page when session is invalid
      return response
    }

    // Handle protected routes when not authenticated
    if (isProtectedPath && !session) {
      const redirectUrl = new URL('/auth/login', request.url)
      redirectUrl.searchParams.set('next', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Only redirect from auth routes if we have a valid session
    if (session?.user && isAuthRoute) {
      // Get the intended destination or default to home
      const next = request.nextUrl.searchParams.get('next') || '/'
      return NextResponse.redirect(new URL(next, request.url))
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
    
    // On critical errors, allow the request to continue
    // This ensures auth routes are always accessible
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
