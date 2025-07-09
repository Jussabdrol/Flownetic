import type { Metadata } from 'next'
// Note: Google Fonts (Inter) temporarily disabled due to network restrictions
// import { Inter } from 'next/font/google'
import './globals.css'

// const inter = Inter({ 
//   subsets: ['latin'],
//   display: 'swap',
//   fallback: ['system-ui', 'arial']
// })

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
