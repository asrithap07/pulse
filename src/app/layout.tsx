import type { Metadata } from 'next'
import { Providers } from './providers'
import { Sidebar } from '@/components/layout/Sidebar'
import { BackendWakeGate } from '@/components/BackendWakeGate'
import { colors } from '@/lib/tokens/colors'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pulse — API Monitoring',
  description: 'Uptime and incident monitoring for your APIs',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <BackendWakeGate>
            <div style={{ minHeight: '100vh', background: colors.bgDarkest, display: 'flex' }}>
              <Sidebar />
              <main style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>{children}</main>
            </div>
          </BackendWakeGate>
        </Providers>
      </body>
    </html>
  )
}