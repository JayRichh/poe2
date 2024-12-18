import { Container } from '~/components/ui/Container'
import { Text } from '~/components/ui/Text'
import { AuthForm } from '~/components/auth/AuthForm'
import Link from 'next/link'

export default function ResetPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Container className="max-w-md py-12">
        <div className="space-y-8">
          <div className="text-center">
            <Text className="text-3xl font-bold">Reset Password</Text>
            <Text className="text-foreground/60 mt-2">Enter your email to receive a reset link</Text>
          </div>

          <AuthForm type="reset" />

          <div className="text-center">
            <Text className="text-sm text-foreground/60">
              Remember your password?{' '}
              <Link 
                href="/auth/login"
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Sign in
              </Link>
            </Text>
          </div>
        </div>
      </Container>
    </div>
  )
}
