import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '~/lib/supabase/actions'

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

    const response = new NextResponse()
    const supabase = createMiddlewareClient(request, response)

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Error exchanging code for session:', error.message)
      return NextResponse.redirect(new URL('/auth/login', requestUrl.origin))
    }

    // Handle different callback types
    if (type === 'recovery') {
      const redirectResponse = NextResponse.redirect(new URL('/auth/reset-password', requestUrl.origin))
      // Copy cookies from the middleware client response
      response.headers.forEach((value, key) => {
        if (key.toLowerCase() === 'set-cookie') {
          redirectResponse.headers.set(key, value)
        }
      })
      return redirectResponse
    }

    if (type === 'email_confirmation') {
      const redirectResponse = NextResponse.redirect(new URL('/profile', requestUrl.origin))
      // Copy cookies from the middleware client response
      response.headers.forEach((value, key) => {
        if (key.toLowerCase() === 'set-cookie') {
          redirectResponse.headers.set(key, value)
        }
      })
      return redirectResponse
    }

    // Default redirect with RSC cache busting
    const redirectTo = next 
      ? new URL(next, requestUrl.origin)
      : new URL('/profile', requestUrl.origin)

    // Add timestamp to force a fresh request
    redirectTo.searchParams.set('_t', Date.now().toString())

    const redirectResponse = NextResponse.redirect(redirectTo)
    
    // Copy cookies from the middleware client response
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'set-cookie') {
        redirectResponse.headers.set(key, value)
      }
    })
    
    // Set cache control headers to prevent stale RSC data
    redirectResponse.headers.set('Cache-Control', 'no-store, must-revalidate')
    redirectResponse.headers.set('Pragma', 'no-cache')
    
    return redirectResponse
  } catch (error) {
    console.error('Callback error:', error)
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}
