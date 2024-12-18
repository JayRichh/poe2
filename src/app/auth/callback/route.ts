import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '~/lib/supabase/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next')

  // Create response early to handle cookies
  const response = NextResponse.redirect(new URL('/', requestUrl.origin))

  if (!code) {
    // Clear any existing auth cookies if no code
    const cookiesToClear = ['sb-access-token', 'sb-refresh-token']
    cookiesToClear.forEach(name => {
      response.cookies.delete(name)
    })
    return response
  }

  try {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) throw error

    // Redirect to the intended destination or profile
    const redirectUrl = new URL(next || '/profile', requestUrl.origin)
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('Auth callback error:', error)

    // Clear any existing auth cookies on error
    const cookiesToClear = ['sb-access-token', 'sb-refresh-token']
    cookiesToClear.forEach(name => {
      response.cookies.delete(name)
    })

    // Redirect to login with error
    const loginUrl = new URL('/auth/login', requestUrl.origin)
    loginUrl.searchParams.set('error', 'Authentication failed')
    if (next) loginUrl.searchParams.set('next', next)
    return NextResponse.redirect(loginUrl)
  }
}
