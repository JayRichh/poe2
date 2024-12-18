const env = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  },
  poe: {
    clientId: process.env.NEXT_PUBLIC_POE_CLIENT_ID!
  }
}

// Only validate required env vars for features that need them
if (env.supabase.url && !env.supabase.anonKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required when NEXT_PUBLIC_SUPABASE_URL is set')
}

if (env.supabase.anonKey && !env.supabase.url) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is required when NEXT_PUBLIC_SUPABASE_ANON_KEY is set')
}

export default env
