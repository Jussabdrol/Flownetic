import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: 'Procesmanagement App',
  description: 'Professionele bedrijfsprocessmanagement applicatie',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
