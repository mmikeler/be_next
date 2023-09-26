import { NextAuthProvider } from '@/c/provider'
import './globals.css'
import type { Metadata } from 'next'
import { Jost } from 'next/font/google'

const font = Jost({ subsets: ['cyrillic', 'latin'], weight: ['400'] })

export const metadata: Metadata = {
  title: 'Miniweb',
  description: 'Generated Mini Website',
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