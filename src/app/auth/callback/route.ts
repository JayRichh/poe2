import { cookies } from 'next/headers'
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
    return response
  }

  const supabase = createClient()
  
  try {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) throw error

    // Redirect to the intended destination or profile
    return NextResponse.redirect(new URL(next || '/profile', requestUrl.origin))
  } catch (error) {
    console.error('Auth callback error:', error)

    // Clear any existing auth cookies
    const cookiesToClear = ['sb-access-token', 'sb-refresh-token']
    cookiesToClear.forEach(name => {
      response.cookies.delete(name)
    })

    // Redirect to login with error
    return NextResponse.redirect(
      new URL(`/auth/login?error=${encodeURIComponent('Authentication failed')}`, requestUrl.origin)
    )
  }
}
