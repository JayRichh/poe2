'use server'

import { cookies } from 'next/headers'
import { createClient } from '~/lib/supabase/server'
import { POEClient } from '~/lib/poe/client'
import type { POEScope } from '~/types/poe-api'
import type { POEAccountData } from '~/lib/supabase/types'
import { revalidatePath } from 'next/cache'

const POE_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_POE_CLIENT_ID!,
  redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback?provider=poe`,
  scopes: [
    'account:profile',
    'account:characters',
    'account:leagues'
  ] as POEScope[],
  isConfidentialClient: false
}

export async function initiatePOEAuth() {
  const state = crypto.randomUUID()
  const codeVerifier = crypto.randomUUID()
  const cookieStore = await cookies()

  // Store state and verifier in cookies
  cookieStore.set('poeOAuthState', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 5 // 5 minutes
  })
  cookieStore.set('poeOAuthVerifier', codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 5 // 5 minutes
  })

  // Update account status to connecting
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Must be logged in to connect POE account')
  }

  await supabase
    .from('profiles')
    .update({
      poe_account: {
        connected: false,
        lastSync: new Date().toISOString()
      } as POEAccountData
    })
    .eq('id', user.id)

  revalidatePath('/profile')

  // Generate auth URL
  const poeClient = new POEClient(POE_CONFIG)
  return poeClient.generateAuthUrl(state, codeVerifier)
}

export async function disconnectPOEAccount() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Must be logged in to disconnect POE account')
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      poe_account: null,
      poe_refresh_token: null
    })
    .eq('id', user.id)

  if (error) throw error

  revalidatePath('/profile')
  return { success: true }
}

export async function getPOEAccountStatus() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('poe_account, poe_refresh_token')
    .eq('id', user.id)
    .single()

  if (error) {
    throw error
  }

  return {
    poeAccount: data.poe_account,
    hasRefreshToken: !!data.poe_refresh_token
  }
}

export async function refreshPOEProfile() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Must be logged in to refresh POE profile')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('poe_account, poe_refresh_token')
    .eq('id', user.id)
    .single()

  if (!profile || !profile.poe_refresh_token) {
    throw new Error('No POE refresh token available')
  }

  const poeClient = new POEClient(POE_CONFIG)
  const poeProfile = await poeClient.getProfile()

  await supabase
    .from('profiles')
    .update({
      poe_account: {
        connected: true,
        accountName: poeProfile.name,
        lastSync: new Date().toISOString()
      } as POEAccountData
    })
    .eq('id', user.id)

  revalidatePath('/profile')
  return poeProfile
}
