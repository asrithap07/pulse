import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Providers } from './providers'
import { Sidebar } from '@/components/layout/Sidebar'
import { colors } from '@/lib/tokens/colors'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata: Metadata = {
  title: 'Pulse — API Monitoring',
  description: 'Uptime and incident monitoring for your APIs',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
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