'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getApis, getIncidents } from '@/lib/api'
import { StatusDot } from '@/components/ui/StatusDot'
import { colors } from '@/lib/tokens/colors'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/history', label: 'History' },
  { href: '/incidents', label: 'Incidents' },
] as const

export function Sidebar() {
  const pathname = usePathname()
  const { data: apis = [] } = useQuery({ queryKey: ['apis'], queryFn: getApis })
  const { data: incidents = [] } = useQuery({ queryKey: ['incidents'], queryFn: getIncidents })
  const activeIncCount = incidents.filter(i => i.status === 'active').length

  return (
    <aside
      style={{
        width: 220,
        flexShrink: 0,
        background: 'linear-gradient(180deg, rgba(9, 13, 21, 0.98), rgba(12, 18, 28, 0.98))',
        borderRight: `1px solid ${colors.borderFaint}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}
    >
      <div style={{ padding: '22px 18px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: 'linear-gradient(135deg, #dff8ff 0%, #7ae7ff 35%, #b79aff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 24px rgba(122, 231, 255, 0.18)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="2" fill="#071319" />
              <path d="M6 1v1.5M6 9.5V11M1 6h1.5M9.5 6H11" stroke="#071319" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: colors.textSecondary, textTransform: 'uppercase' }}>
              Pulse
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.04em' }}>Command</div>
          </div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '0 10px', display: 'flex', flexDirection: 'column', gap: 4 }}>
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
                padding: '9px 12px',
                borderRadius: 10,
                fontSize: 13.5,
                fontWeight: isActive ? 700 : 600,
                background: isActive ? colors.accentClaritySubtle : 'transparent',
                color: isActive ? colors.accentClarity : colors.textPrimary,
                textDecoration: 'none',
                border: isActive ? `1px solid ${colors.accentClarityBorder}` : '1px solid transparent',
              }}
            >
              {item.label}
              {item.href === '/incidents' && activeIncCount > 0 && (
                <span
                  style={{
                    background: colors.statusAlert,
                    color: '#fff',
                    fontSize: 10,
                    fontWeight: 700,
                    borderRadius: 999,
                    padding: '2px 6px',
                    fontFamily: 'var(--font-mono)',
                    minWidth: 18,
                    textAlign: 'center',
                  }}
                >
                  {activeIncCount}
                </span>
              )}
            </Link>
          )
        })}

        <div style={{ height: 1, background: colors.borderFaint, margin: '12px 2px' }} />

        <div
          style={{
            padding: '2px 12px 8px',
            fontSize: 10.5,
            fontWeight: 700,
            color: colors.textSecondary,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
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
              padding: '8px 12px',
              borderRadius: 10,
              fontSize: 13,
              background: pathname === `/endpoints/${api.id}` ? colors.surfaceHover : 'transparent',
              color: colors.textPrimary,
              textDecoration: 'none',
              border: pathname === `/endpoints/${api.id}` ? `1px solid ${colors.borderSubtle}` : '1px solid transparent',
            }}
          >
            <StatusDot status={api.status} size={6} />
            <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{api.name}</span>
          </Link>
        ))}
      </nav>

      <div
        style={{
          padding: '14px 20px',
          borderTop: `1px solid ${colors.borderFaint}`,
          fontSize: 11,
          color: colors.textSecondary,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.08em',
        }}
      >
        v0.1.0
      </div>
    </aside>
  )
}
