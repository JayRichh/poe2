import { Container } from '~/components/ui/Container'
import { Text } from '~/components/ui/Text'
import { Spinner } from '~/components/ui/Spinner'

export default function ProfileLoading() {
  return (
    <Container className="max-w-2xl py-8 space-y-8">
      <div>
        <Text className="text-3xl font-bold">Profile Settings</Text>
        <Text className="text-foreground/60">Manage your account settings and preferences</Text>
      </div>

      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner size="lg" variant="primary" />
      </div>
    </Container>
  )
}
