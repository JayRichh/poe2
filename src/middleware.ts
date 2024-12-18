import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PROTECTED_ROUTES = ['/profile', '/build-planner/create']
const AUTH_ROUTES = ['/auth/login', '/auth/signup', '/auth/callback', '/auth/reset-password']

export async function middleware(request: NextRequest) {
  // Early return for static assets and API routes
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/static')
  ) {
    return NextResponse.next()
  }

  const response = NextResponse.next()

  // Skip auth check for auth routes
  const isAuthRoute = AUTH_ROUTES.some(path => request.nextUrl.pathname.startsWith(path))
  if (isAuthRoute) {
    return response
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            response.cookies.set({
              name,
              value,
              ...options,
              sameSite: 'lax',
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
            })
          },
          remove(name: string, options: any) {
            response.cookies.set({
              name,
              value: '',
              ...options,
              maxAge: 0,
            })
          },
        },
      }
    )

    const { data: { session } } = await supabase.auth.getSession()

    // Only protect specific routes
    if (PROTECTED_ROUTES.some(path => request.nextUrl.pathname.startsWith(path)) && !session) {
      const redirectUrl = new URL('/api/auth/login', request.url)
      redirectUrl.searchParams.set('next', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    return response
  } catch (error) {
    console.error('Auth middleware error:', error)
    // On error, allow request to continue but mark as unauthenticated
    response.headers.set('x-auth-status', 'error')
    return response
  }
}

export const config = {
  matcher: [
    // Skip static files and API routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
