'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMonitoring } from '@/lib/store/monitoring-context'
import { StatusDot } from '@/components/ui/StatusDot'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/history', label: 'History' },
  { href: '/incidents', label: 'Incidents' },
] as const

export function Sidebar() {
  const pathname = usePathname()
  const { apis, incidents } = useMonitoring()
  const activeIncCount = incidents.filter(i => i.status === 'active').length

  return (
    <aside
      style={{
        width: 210,
        flexShrink: 0,
        background: '#080c14',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}
    >
      <div style={{ padding: '22px 20px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 7,
              background: 'linear-gradient(135deg, #22d3ee 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="2" fill="white" />
              <path d="M6 1v1.5M6 9.5V11M1 6h1.5M9.5 6H11" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em' }}>Pulse</span>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '0 10px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href || (pathname?.startsWith('/endpoints') && item.href === '/dashboard')
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 11px',
                borderRadius: 7,
                fontSize: 13.5,
                fontWeight: isActive ? 600 : 400,
                background: isActive ? 'rgba(34,211,238,0.08)' : 'transparent',
                color: isActive ? '#22d3ee' : '#475569',
                textDecoration: 'none',
              }}
            >
              {item.label}
              {item.href === '/incidents' && activeIncCount > 0 && (
                <span
                  style={{
                    background: '#f43f5e',
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 700,
                    borderRadius: 9,
                    padding: '1px 5px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {activeIncCount}
                </span>
              )}
            </Link>
          )
        })}

        <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '12px 2px' }} />

        <div
          style={{
            padding: '2px 11px 6px',
            fontSize: 10.5,
            fontWeight: 600,
            color: '#2d3a4d',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
          }}
        >
          Endpoints
        </div>
        {apis.map(api => (
          <Link
            key={api.id}
            href={`/endpoints/${api.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '7px 11px',
              borderRadius: 7,
              fontSize: 13,
              background: pathname === `/endpoints/${api.id}` ? 'rgba(255,255,255,0.04)' : 'transparent',
              color: '#475569',
              textDecoration: 'none',
            }}
          >
            <StatusDot status={api.status} size={6} />
            <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{api.name}</span>
          </Link>
        ))}
      </nav>

      <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: 11, color: '#1e2d3d', fontFamily: 'var(--font-mono)' }}>
        v0.1.0
      </div>
    </aside>
  )
}
