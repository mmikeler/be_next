import { NextAuthProvider } from '@/c/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Jost } from 'next/font/google'

const font = Jost({ subsets: ['cyrillic', 'latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'Минив3б',
  description: 'Лёгкое создание сайтов без использования шаблонов',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={font.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  )
}