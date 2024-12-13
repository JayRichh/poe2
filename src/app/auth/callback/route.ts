import { createClient } from '~/lib/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/groups'
  const origin = process.env.NEXT_PUBLIC_SITE_URL || requestUrl.origin // Fallback to request origin
  const error = requestUrl.searchParams.get('error')
  const error_description = requestUrl.searchParams.get('error_description')

  // If there's an error, redirect to login with error params
  if (error) {
    const errorUrl = new URL('/auth/login', origin)
    errorUrl.searchParams.set('error', error)
    errorUrl.searchParams.set('error_description', error_description || '')
    return NextResponse.redirect(errorUrl)
  }

  if (code) {
    const cookieStore = cookies()
    const supabase = createClient()

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Get the user to check if they're new
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        // Check if this is a new user (no profile record yet)
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single()

        if (!profile && user.email) {
          // Create profile for new user
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name || user.email.split('@')[0]
            })

          if (profileError) {
            console.error('Error creating profile:', profileError)
          }
        }

        // Handle password reset flow
        if (next === '/reset-password') {
          return NextResponse.redirect(new URL('/auth/reset-password', origin))
        }

        // For new users, redirect to setup
        if (!profile) {
          return NextResponse.redirect(new URL('/?setup=true', origin))
        }
      }

      // Default redirect for existing users
      return NextResponse.redirect(new URL(next, origin))
    } else {
      // If there's an error exchanging the code, redirect to login with error
      const errorUrl = new URL('/auth/login', origin)
      errorUrl.searchParams.set('error', 'session_error')
      errorUrl.searchParams.set('error_description', error.message)
      return NextResponse.redirect(errorUrl)
    }
  }

  // Return to login if there's no code
  return NextResponse.redirect(new URL('/auth/login', origin))
}
