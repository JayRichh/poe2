'use client'

import { Container } from '~/components/ui/Container'
import { Text } from '~/components/ui/Text'
import { Button } from '~/components/ui/Button'
import { AlertCircle } from 'lucide-react'

export default function ProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Container className="max-w-2xl py-8">
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        
        <div className="space-y-2">
          <Text className="text-2xl font-bold">Something went wrong</Text>
          <Text className="text-foreground/60">
            {error.message || 'Failed to load profile settings'}
          </Text>
        </div>

        <Button
          variant="primary"
          onClick={reset}
        >
          Try again
        </Button>
      </div>
    </Container>
  )
}
