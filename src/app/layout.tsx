import type { Metadata } from 'next'
import { Providers } from './providers'
import { Sidebar } from '@/components/layout/Sidebar'
import { colors } from '@/lib/tokens/colors'
import './globals.css'

import { Geist, IBM_Plex_Mono } from 'next/font/google'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'Pulse — API Monitoring',
  description: 'Uptime and incident monitoring for your APIs',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${plexMono.variable}`}>
      <body>
        <Providers>
          <div style={{ minHeight: '100vh', background: colors.bgDarkest, display: 'flex' }}>
            <Sidebar />
            <main style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}