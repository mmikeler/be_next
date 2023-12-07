import App from '../c/app'
import { NextAuthProvider } from '../c/provider'
import { getSiteOptions } from '../db/site_options'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Минив3б',
  description: 'Простое создание сайтов без использования шаблонов',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const siteOptions = await getSiteOptions()

  return (
    <NextAuthProvider>
      <App siteOptions={siteOptions}>
        {children}
      </App>
    </NextAuthProvider>
  )
}