import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { MonitoringProvider } from '@/lib/store/monitoring-context'
import { Sidebar } from '@/components/layout/Sidebar'
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
        <MonitoringProvider>
          <div style={{ minHeight: '100vh', background: '#080c14', display: 'flex' }}>
            <Sidebar />
            <main style={{ flex: 1, minWidth: 0, overflowY: 'auto' }}>{children}</main>
          </div>
        </MonitoringProvider>
      </body>
    </html>
  )
}
