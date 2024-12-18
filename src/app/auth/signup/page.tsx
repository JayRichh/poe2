import { Container } from '~/components/ui/Container'
import { Text } from '~/components/ui/Text'
import { AuthForm } from '~/components/auth/AuthForm'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-3rem)] sm:min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Container className="max-w-md py-12">
        <div className="space-y-8">
          <div className="text-center">
            <Text className="text-3xl font-bold">Create Account</Text>
            <Text className="text-foreground/60 mt-2">Join POE2 Tools to get started</Text>
          </div>

          <AuthForm type="signup" />

          <div className="text-center">
            <Text className="text-sm text-foreground/60">
              Already have an account?{' '}
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
