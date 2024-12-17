import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { POEClient } from '~/lib/poe/client'
import type { POEScope } from '~/types/poe-api'
import type { POEAccountData } from '~/lib/supabase/types'
import { createClient } from '~/lib/supabase/server'

const POE_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_POE_CLIENT_ID!,
  redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
  scopes: [
    'account:profile',
    'account:characters',
    'account:leagues'
  ] as POEScope[],
  isConfidentialClient: false
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const state = requestUrl.searchParams.get('state')
  const next = requestUrl.searchParams.get('next')
  const provider = requestUrl.searchParams.get('provider')
  const type = requestUrl.searchParams.get('type')
  
  // Handle email confirmation callback
  if (type === 'email_confirmation' && code) {
    const supabase = createClient()
    
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) throw error

      // Create response with redirect
      const response = NextResponse.redirect(
        new URL('/profile?verified=true', requestUrl.origin)
      )

      // Set the auth cookie data
      const cookieStore = await cookies()
      const supabaseCookies = cookieStore.getAll()
      supabaseCookies.forEach(cookie => {
        response.cookies.set(cookie.name, cookie.value, {
          ...cookie,
          sameSite: 'lax',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production'
        })
      })

      return response
    } catch (error) {
      console.error('Email confirmation error:', error)
      return NextResponse.redirect(
        new URL(`/auth/login?error=${encodeURIComponent('Email confirmation failed')}`, requestUrl.origin)
      )
    }
  }

  // Handle POE OAuth callback
  if (provider === 'poe' && code && state) {
    // Get state and verifier from cookies
    const cookieStore = await cookies()
    const storedState = cookieStore.get('poeOAuthState')?.value
    const storedVerifier = cookieStore.get('poeOAuthVerifier')?.value

    if (!storedState || state !== storedState) {
      return NextResponse.redirect(
        new URL(`/profile?error=${encodeURIComponent('Invalid OAuth state')}`, requestUrl.origin)
      )
    }

    if (!storedVerifier) {
      return NextResponse.redirect(
        new URL(`/profile?error=${encodeURIComponent('Missing OAuth verifier')}`, requestUrl.origin)
      )
    }

    try {
      const poeClient = new POEClient(POE_CONFIG)
      const tokenResponse = await poeClient.exchangeCode(code, storedVerifier)

      // Store POE account info in Supabase
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        throw new Error('User not found')
      }

      await supabase
        .from('profiles')
        .update({
          poe_account: {
            connected: true,
            accountName: tokenResponse.username,
            lastSync: new Date().toISOString()
          } as POEAccountData,
          poe_refresh_token: tokenResponse.refresh_token
        })
        .eq('id', user.id)

      // Clear OAuth cookies and redirect
      const response = NextResponse.redirect(
        new URL('/profile?poe=connected', requestUrl.origin)
      )
      response.cookies.delete('poeOAuthState')
      response.cookies.delete('poeOAuthVerifier')
      return response

    } catch (error) {
      console.error('POE OAuth error:', error)
      return NextResponse.redirect(
        new URL(`/profile?error=${encodeURIComponent('Failed to connect POE account')}`, requestUrl.origin)
      )
    }
  }

  // Handle regular auth callback
  if (code && !provider && !type) {
    const supabase = createClient()
    
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) throw error

      // Create response with redirect
      const response = NextResponse.redirect(
        new URL(next || '/profile', requestUrl.origin)
      )

      // Set the auth cookie data
      const cookieStore = await cookies()
      const supabaseCookies = cookieStore.getAll()
      supabaseCookies.forEach(cookie => {
        response.cookies.set(cookie.name, cookie.value, {
          ...cookie,
          sameSite: 'lax',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production'
        })
      })

      return response
    } catch (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(
        new URL(`/auth/login?error=${encodeURIComponent('Authentication failed')}`, requestUrl.origin)
      )
    }
  }

  // Fallback redirect for any unhandled cases
  return NextResponse.redirect(
    new URL('/', requestUrl.origin)
  )
}
