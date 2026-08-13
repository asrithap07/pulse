'use client'

import Link from 'next/link'
import type { Api } from '@/lib/types'
import { StatusPill } from '@/components/ui/StatusPill'
import { Mono } from '@/components/ui/Mono'
import { colors } from '@/lib/tokens/colors'

export function EndpointHeader({
  api,
  checking,
  onCheck,
  onToggle,
  onDelete,
}: {
  api: Api
  checking: boolean
  onCheck: () => void
  onToggle: () => void
  onDelete: () => void
}) {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(18, 28, 43, 0.92), rgba(12, 18, 28, 0.96))',
        border: `1px solid ${colors.borderSubtle}`,
        borderRadius: 18,
        padding: '18px 20px 16px',
        marginBottom: 22,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
      }}
    >
      <Link
        href="/dashboard"
        style={{
          background: 'none',
          border: 'none',
          color: colors.textSecondary,
          cursor: 'pointer',
          fontSize: 12.5,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          marginBottom: 18,
          padding: 0,
          textDecoration: 'none',
          width: 'fit-content',
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
        }}
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Dashboard
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 18 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1.1 }}>{api.name}</h1>
            <StatusPill status={api.status} />
          </div>
          <Mono color={colors.textSecondary}>
            <span style={{ fontSize: 12, display: 'inline-block', maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{api.url}</span>
          </Mono>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button
            onClick={onCheck}
            disabled={checking}
            style={{
              padding: '9px 14px',
              borderRadius: 10,
              fontSize: 12.5,
              fontWeight: 700,
              background: checking ? colors.bgDark : 'linear-gradient(135deg, rgba(122,231,255,0.24), rgba(122,231,255,0.12))',
              border: `1px solid ${colors.accentClarityBorder}`,
              color: colors.accentClarity,
              cursor: checking ? 'default' : 'pointer',
              boxShadow: checking ? 'none' : '0 12px 26px rgba(122, 231, 255, 0.12)',
              transition: 'transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease',
            }}
          >
            {checking ? 'Checking…' : '↻ Check now'}
          </button>
          <button
            onClick={onToggle}
            style={{
              padding: '9px 14px',
              borderRadius: 10,
              fontSize: 12.5,
              fontWeight: 700,
              background: 'transparent',
              border: `1px solid ${colors.borderSubtle}`,
              color: colors.textSecondary,
              cursor: 'pointer',
            }}
          >
            {api.enabled ? 'Pause' : 'Resume'}
          </button>
          <button
            onClick={onDelete}
            style={{
              padding: '9px 14px',
              borderRadius: 10,
              fontSize: 12.5,
              fontWeight: 700,
              background: 'rgba(255, 107, 116, 0.06)',
              border: `1px solid ${colors.statusAlertBorder}`,
              color: colors.statusAlert,
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
