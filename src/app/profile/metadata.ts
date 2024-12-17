import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Profile Settings - POE2 Tools',
    description: 'Manage your POE2 Tools account settings and preferences.',
  }
}
