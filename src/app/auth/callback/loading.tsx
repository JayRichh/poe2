import { Spinner } from '~/components/ui/Spinner'
import { Text } from '~/components/ui/Text'

export default function AuthCallbackLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <Spinner size="lg" variant="primary" className="mx-auto" />
        <div className="space-y-2">
          <Text className="text-xl font-medium">Confirming your account...</Text>
          <Text className="text-foreground/60">
            Please wait while we verify your email and set up your account.
          </Text>
        </div>
      </div>
    </div>
  )
}
