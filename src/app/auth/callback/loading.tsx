import { Container } from '~/components/ui/Container'
import { Text } from '~/components/ui/Text'
import { Spinner } from '~/components/ui/Spinner'

export default function CallbackLoading() {
  return (
    <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
      <Container className="max-w-md py-12">
        <div className="space-y-8">
          <div className="text-center">
            <Text className="text-3xl font-bold opacity-50">Connecting</Text>
            <Text className="text-foreground/60 mt-2">Please wait while we complete the authentication</Text>
          </div>

          <div className="flex justify-center">
            <Spinner size="lg" />
          </div>
        </div>
      </Container>
    </div>
  )
}
