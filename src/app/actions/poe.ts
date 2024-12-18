'use server'

import { cookies } from 'next/headers'
import { createClient } from '~/lib/supabase/server'
import { POEClient } from '~/lib/poe/client'
import type { POEScope } from '~/types/poe-api'
import type { POEAccountData } from '~/lib/supabase/types'
import type { CookieOptions } from '@supabase/ssr'
import { revalidatePath } from 'next/cache'

const POE_CONFIG = {
  clientId: process.env.NEXT_PUBLIC_POE_CLIENT_ID!,
  clientSecret: process.env.POE_CLIENT_SECRET!,
  redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback?provider=poe`,
  scopes: [
    'account:profile',
    'account:stashes',
    'account:characters'
  ] as POEScope[],
  isConfidentialClient: true
}

const getSupabase = async () => {
  const cookieStore = await cookies()
  return createClient({
    get: (name: string) => cookieStore.get(name),
    set: (opts: { name: string; value: string } & CookieOptions) => cookieStore.set(opts)
  })
}

function generateCodeVerifier() {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export async function connectPOEAccount() {
  const supabase = await getSupabase()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Must be logged in to connect POE account')

  await supabase
    .from('profiles')
    .update({
      poe_account: {
        connected: false,
        accountName: undefined,
        lastSync: new Date().toISOString()
      } satisfies POEAccountData
    })
    .eq('id', user.id)

  // Generate auth URL
  const poeClient = new POEClient(POE_CONFIG)
  const state = crypto.randomUUID()
  const codeVerifier = generateCodeVerifier()
  const authUrl = await poeClient.generateAuthUrl(state, codeVerifier)

  // Store code verifier in cookie for callback
  const cookieStore = await cookies()
  cookieStore.set('poe_code_verifier', codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 5 // 5 minutes
  })

  revalidatePath('/profile')
  return authUrl
}

export async function disconnectPOEAccount() {
  const supabase = await getSupabase()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Must be logged in to disconnect POE account')

  const { error } = await supabase
    .from('profiles')
    .update({
      poe_account: null,
      poe_refresh_token: null
    })
    .eq('id', user.id)

  if (error) throw error

  revalidatePath('/profile')
}

export async function getPOEAccountStatus() {
  const supabase = await getSupabase()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Must be logged in to check POE account status')

  const { data, error } = await supabase
    .from('profiles')
    .select('poe_account')
    .eq('id', user.id)
    .single()

  if (error) throw error

  return data?.poe_account as POEAccountData | null
}

export async function refreshPOEProfile() {
  const supabase = await getSupabase()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Must be logged in to refresh POE profile')

  const { data: profile } = await supabase
    .from('profiles')
    .select('poe_account, poe_refresh_token')
    .eq('id', user.id)
    .single()

  if (!profile?.poe_refresh_token) {
    throw new Error('POE account not connected')
  }

  const poeClient = new POEClient({
    ...POE_CONFIG,
    isConfidentialClient: true
  })

  // The client will handle storing the tokens in the profile
  const poeProfile = await poeClient.getProfile()

  revalidatePath('/profile')
  return poeProfile
}
