import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Route protection configuration
const PROTECTED_ROUTES = ['/profile', '/build-planner/create']
const GUEST_ROUTES = ['/auth/login', '/auth/signup', '/auth/reset-password']
const VERIFIED_ROUTES = ['/profile/settings', '/build-planner/create']

// CSRF exempt paths (no CSRF check needed)
const CSRF_EXEMPT = [
  '/auth/callback',
  '/_next',
  '/api/health',
  '/favicon.ico',
  '/static'
]

export async function middleware(request: NextRequest) {
  try {
    // Create response early to handle cookies
    const response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    // Set security headers
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.headers.set('X-XSS-Protection', '1; mode=block')
    response.headers.set('X-Permitted-Cross-Domain-Policies', 'none')
    response.headers.set(
      'Permissions-Policy',
      'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    )
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    )

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

    // Check if route requires CSRF protection
    const requiresCsrf = !CSRF_EXEMPT.some(path => 
      request.nextUrl.pathname.startsWith(path)
    )

    // Validate CSRF token for non-GET requests on protected routes
    if (requiresCsrf && request.method !== 'GET') {
      const csrfToken = request.cookies.get('csrf-token')?.value
      const csrfHeader = request.headers.get('x-csrf-token')

      if (!csrfToken || !csrfHeader || csrfToken !== csrfHeader) {
        return new NextResponse(
          JSON.stringify({ error: 'Invalid CSRF token' }),
          { status: 403 }
        )
      }
    }

    // Get current path info
    const pathname = request.nextUrl.pathname
    const isProtectedRoute = PROTECTED_ROUTES.some(path => 
      pathname.startsWith(path)
    )
    const isGuestRoute = GUEST_ROUTES.some(path => 
      pathname.startsWith(path)
    )
    const requiresVerification = VERIFIED_ROUTES.some(path => 
      pathname.startsWith(path)
    )

    // Try to get the session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    // Handle session errors by clearing cookies
    if (sessionError) {
      const cookiesToClear = [
        'sb-access-token',
        'sb-refresh-token',
        'supabase-auth-token',
        'csrf-token'
      ]
      cookiesToClear.forEach(name => {
        response.cookies.delete(name)
      })

      // If on protected route, redirect to login
      if (isProtectedRoute) {
        const redirectUrl = new URL('/auth/login', request.url)
        redirectUrl.searchParams.set('next', pathname)
        return NextResponse.redirect(redirectUrl)
      }

      return response
    }

    // Generate new CSRF token if needed
    if (!request.cookies.has('csrf-token')) {
      const newCsrfToken = crypto.getRandomValues(new Uint8Array(32))
      const csrfTokenString = Buffer.from(newCsrfToken).toString('base64')
      response.cookies.set('csrf-token', csrfTokenString, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })
    }

    // Handle protected routes
    if (isProtectedRoute) {
      if (!session) {
        const redirectUrl = new URL('/auth/login', request.url)
        redirectUrl.searchParams.set('next', pathname)
        return NextResponse.redirect(redirectUrl)
      }

      // Check email verification for routes that require it
      if (requiresVerification && !session.user.email_confirmed_at) {
        return NextResponse.redirect(
          new URL('/auth/verify-email', request.url)
        )
      }
    }

    // Handle guest routes (login, signup, etc)
    if (isGuestRoute && session) {
      const next = request.nextUrl.searchParams.get('next') || '/'
      return NextResponse.redirect(new URL(next, request.url))
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    
    // On critical errors, clear auth cookies and redirect appropriately
    const response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
    
    // Clear all auth related cookies
    const cookiesToClear = [
      'sb-access-token',
      'sb-refresh-token',
      'supabase-auth-token',
      'csrf-token'
    ]
    cookiesToClear.forEach(name => {
      response.cookies.delete(name)
    })

    // If protected path, redirect to login
    if (PROTECTED_ROUTES.some(path => request.nextUrl.pathname.startsWith(path))) {
      const redirectUrl = new URL('/auth/login', request.url)
      redirectUrl.searchParams.set('next', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    return response
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
