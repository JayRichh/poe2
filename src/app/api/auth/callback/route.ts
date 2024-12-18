import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerClient } from '~/lib/supabase/actions'

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const next = requestUrl.searchParams.get('next')
    const type = requestUrl.searchParams.get('type')

    if (!code) {
      console.error('No code provided in callback')
      return NextResponse.redirect(new URL('/', requestUrl.origin))
    }

    const supabase = await getServerClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Error exchanging code for session:', error.message)
      return NextResponse.redirect(new URL('/auth/login', requestUrl.origin))
    }

    // Handle different callback types
    if (type === 'recovery') {
      return NextResponse.redirect(new URL('/auth/reset-password', requestUrl.origin))
    }

    if (type === 'email_confirmation') {
      return NextResponse.redirect(new URL('/profile', requestUrl.origin))
    }

    // Default redirect with RSC cache busting
    const redirectTo = next 
      ? new URL(next, requestUrl.origin)
      : new URL('/profile', requestUrl.origin)

    // Add timestamp to force a fresh request
    redirectTo.searchParams.set('_t', Date.now().toString())

    const response = NextResponse.redirect(redirectTo)
    
    // Set cache control headers to prevent stale RSC data
    response.headers.set('Cache-Control', 'no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    
    return response
  } catch (error) {
    console.error('Callback error:', error)
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}
