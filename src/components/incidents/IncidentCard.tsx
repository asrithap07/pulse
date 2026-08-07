'use client'

import { useState } from 'react'
import type { Incident } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { fmtDateTime, duration } from '@/lib/utils/format'
import { IncidentAiAnalysis } from '@/components/incidents/IncidentAiAnalysis'

export function IncidentCard({ incident, defaultOpen = false }: { incident: Incident; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <Card glow={incident.status === 'active' ? 'red' : 'none'}>
      <div onClick={() => setOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', cursor: 'pointer' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 4 }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{incident.apiName}</span>
            <span
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                padding: '2px 7px',
                borderRadius: 9,
                background: incident.status === 'active' ? 'rgba(244,63,94,0.1)' : 'rgba(16,185,129,0.1)',
                color: incident.status === 'active' ? '#f43f5e' : '#10b981',
              }}
            >
              {incident.status === 'active' ? 'ACTIVE' : 'RESOLVED'}
            </span>
          </div>
          <div style={{ fontSize: 12, color: '#475569', fontFamily: 'var(--font-mono)' }}>
            {fmtDateTime(incident.startTime)} · {duration(incident.startTime, incident.endTime)} · {incident.failedChecks} failed
          </div>
        </div>
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

      {open && incident.ai && <IncidentAiAnalysis ai={incident.ai} />}
    </Card>
  )
}
