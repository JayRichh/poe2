import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Authenticating - POE2 Tools',
    description: 'Completing authentication process for POE2 Tools.',
    robots: {
      index: false,
      follow: false,
    }
  }
}
