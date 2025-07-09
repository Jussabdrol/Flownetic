import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Procesmanagement App',
  description: 'Professionele bedrijfsprocessmanagement applicatie',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl">
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}
