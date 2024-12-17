import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Sign In - POE2 Tools',
    description: 'Sign in to your POE2 Tools account to access build planning, DPS calculations, and more.',
  }
}
