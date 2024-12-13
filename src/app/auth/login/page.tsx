'use client'

import { AuthForm } from '~/components/auth/AuthForm'
import { Text } from '~/components/ui/Text'
import { useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')

  return (
    <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {error && (
          <div className="p-4 rounded-xl border-2 border-destructive/20 bg-destructive/5">
            <Text className="text-sm text-destructive">
              {error === 'access_denied' && error_description?.includes('expired')
                ? 'The confirmation link has expired. Please request a new one by trying to sign in.'
                : error_description || 'An error occurred during authentication'}
            </Text>
          </div>
        )}
        <AuthForm mode="signin" />
      </div>
    </div>
  )
}
