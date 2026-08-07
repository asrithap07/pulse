'use client'

import Link from 'next/link'
import type { Api } from '@/lib/types'
import { StatusPill } from '@/components/ui/StatusPill'
import { Mono } from '@/components/ui/Mono'

export function EndpointHeader({
  api,
  checking,
  onCheck,
  onToggle,
}: {
  api: Api
  checking: boolean
  onCheck: () => void
  onToggle: () => void
}) {
  return (
    <>
      <Link
        href="/dashboard"
        style={{
          background: 'none',
          border: 'none',
          color: '#475569',
          cursor: 'pointer',
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 20,
          padding: 0,
          textDecoration: 'none',
          width: 'fit-content',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Dashboard
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 26, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.025em' }}>{api.name}</h1>
            <StatusPill status={api.status} />
          </div>
          <Mono color="#475569">
            <span style={{ fontSize: 12 }}>{api.url}</span>
          </Mono>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={onCheck}
            disabled={checking}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              background: 'rgba(34,211,238,0.1)',
              border: '1px solid rgba(34,211,238,0.25)',
              color: '#22d3ee',
              cursor: checking ? 'default' : 'pointer',
            }}
          >
            {checking ? 'Checking…' : '↻ Check Now'}
          </button>
          <button
            onClick={onToggle}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.09)',
              color: '#475569',
              cursor: 'pointer',
            }}
          >
            {api.enabled ? 'Pause' : 'Resume'}
          </button>
        </div>
      </div>
    </>
  )
}
