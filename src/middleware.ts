import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PROTECTED_ROUTES = ['/profile', '/build-planner/create']

export async function middleware(request: NextRequest) {
  // Skip middleware for static files and API routes
  if (request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|gif|svg)$/) || 
      request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const response = NextResponse.next()

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
    if (sessionError) {
      const cookiesToClear = ['sb-access-token', 'sb-refresh-token']
      cookiesToClear.forEach(name => {
        response.cookies.delete(name)
      })
    }

    // Check if this is an RSC request
    const isRsc = request.headers.get('rsc') === '1'
    const isAuthRoute = request.nextUrl.pathname.startsWith('/auth/')

    // For RSC requests to auth routes, always allow
    if (isRsc && isAuthRoute) {
      return response
    }

    // For non-RSC requests to auth routes when logged in, redirect to home
    if (!isRsc && isAuthRoute && session) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // For protected routes without session, redirect to login
    if (PROTECTED_ROUTES.some(path => request.nextUrl.pathname.startsWith(path)) && !session) {
      const redirectUrl = new URL('/auth/login', request.url)
      redirectUrl.searchParams.set('next', request.nextUrl.pathname)
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

    // For protected routes, redirect to login
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
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
