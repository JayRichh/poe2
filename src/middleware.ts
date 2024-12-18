import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PROTECTED_ROUTES = ['/profile', '/build-planner/create']
const PUBLIC_ROUTES = ['/auth/login', '/auth/signup', '/auth/callback', '/auth/reset-password']

export async function middleware(request: NextRequest) {
  // Skip middleware for auth routes and RSC requests to auth endpoints
  const isAuthRoute = PUBLIC_ROUTES.some(path => request.nextUrl.pathname.startsWith(path))
  const isRSCAuthRequest = request.headers.get('rsc') === '1' && request.nextUrl.pathname.startsWith('/auth')
  
  if (isAuthRoute || isRSCAuthRequest) {
    return NextResponse.next()
  }

  const response = NextResponse.next()

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
    const { data: { session } } = await supabase.auth.getSession()

    // Only protect specific routes
    if (PROTECTED_ROUTES.some(path => request.nextUrl.pathname.startsWith(path)) && !session) {
      const redirectUrl = new URL('/auth/login', request.url)
      redirectUrl.searchParams.set('next', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
    // Continue without redirecting on auth errors
    return response
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}
