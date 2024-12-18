import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '~/lib/supabase/server'

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

    const supabase = await createClient()

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

    // Default redirect
    const redirectTo = next 
      ? new URL(next, requestUrl.origin)
      : new URL('/profile', requestUrl.origin)

    return NextResponse.redirect(redirectTo)
  } catch (error) {
    console.error('Callback error:', error)
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}
