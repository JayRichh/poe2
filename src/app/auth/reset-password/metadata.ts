import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Reset Password - POE2 Tools',
    description: 'Reset your POE2 Tools account password.',
  }
}
