import type { Metadata } from 'next'
import { HomeView } from '@views/home'

export const metadata: Metadata = {
  title: 'Daimyo',
  description: 'Daimyo'
}

export default function Home() {
  return <HomeView />
}
