'use client'

import { useState } from 'react'
import type { Incident } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { fmtDateTime, duration } from '@/lib/utils/format'
import { IncidentAiAnalysis } from '@/components/incidents/IncidentAiAnalysis'

export function IncidentCard({ incident, defaultOpen = false }: { incident: Incident; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  const active = incident.status === 'active'

  return (
    <Card glow={active ? 'red' : 'none'}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', cursor: 'pointer' }}
      >
        {/* Left: name + timestamp */}
        <div style={{ flex: '1 1 220px', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 4 }}>
            <span style={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {incident.apiName}
            </span>
            <span
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                padding: '2px 7px',
                borderRadius: 9,
                background: active ? 'rgba(244,63,94,0.1)' : 'rgba(16,185,129,0.1)',
                color: active ? '#f43f5e' : '#10b981',
                flexShrink: 0,
              }}
            >
              {active ? 'ACTIVE' : 'RESOLVED'}
            </span>
          </div>
          <div style={{ fontSize: 12, color: '#475569', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>
            {fmtDateTime(incident.startTime)}
          </div>
        </div>

        {/* Middle: quick stats, horizontal */}
        <div style={{ display: 'flex', gap: 24, flexShrink: 0 }}>
          <QuickStat label="Duration" value={duration(incident.startTime, incident.endTime)} />
          <QuickStat label="Failed" value={String(incident.failedChecks)} />
          {incident.ai && (
            <QuickStat
              label="Confidence"
              value={`${incident.ai.confidence}%`}
              color={incident.ai.confidence > 80 ? '#10b981' : '#f59e0b'}
            />
          )}
        </div>

        {/* Right: chevron */}
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          style={{ color: '#334155', transform: open ? 'rotate(90deg)' : undefined, transition: 'transform 0.2s', flexShrink: 0 }}
        >
          <path d="M5.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Expandable detail */}
      <div
        style={{
          maxHeight: open ? 900 : 0,
          opacity: open ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.25s ease, opacity 0.2s ease',
        }}
      >
        <div style={{ padding: '4px 20px 16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <StatCard label="Duration" value={duration(incident.startTime, incident.endTime)} color={active ? '#f43f5e' : undefined} />
          <StatCard label="Failed Checks" value={String(incident.failedChecks)} />
          <StatCard label="Status" value={active ? 'Ongoing' : 'Resolved'} color={active ? '#f43f5e' : '#10b981'} />
        </div>

        {incident.ai && <IncidentAiAnalysis ai={incident.ai} />}
      </div>
    </Card>
  )
}

function QuickStat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div style={{ textAlign: 'right' }}>
      <div style={{ fontSize: 10, color: '#334155', marginBottom: 2 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: color ?? '#c8d6e5' }}>{value}</div>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div
      style={{
        background: '#080c14',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 10,
        padding: '16px 18px',
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 10 }}>
        {label}
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, color: color ?? '#e2e8f0', letterSpacing: '-.02em' }}>
        {value}
      </div>
    </div>
  )
}