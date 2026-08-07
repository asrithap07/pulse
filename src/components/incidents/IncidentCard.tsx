'use client'

import { useState } from 'react'
import type { Incident } from '@/lib/types'
import { Card } from '@/components/ui/Card'
import { fmtDateTime, duration } from '@/lib/utils/format'
import { IncidentAiAnalysis } from '@/components/incidents/IncidentAiAnalysis'
import { colors } from '@/lib/tokens/colors'

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
                background: incident.status === 'active' ? colors.statusAlertBg : colors.statusVitalBg,
                color: incident.status === 'active' ? colors.statusAlert : colors.statusVital,
              }}
            >
              {incident.status === 'active' ? 'ACTIVE' : 'RESOLVED'}
            </span>
          </div>
          <div style={{ fontSize: 12, color: colors.textSecondary, fontFamily: 'var(--font-mono)' }}>
            {fmtDateTime(incident.startTime)} · {duration(incident.startTime, incident.endTime)} · {incident.failedChecks} failed
          </div>
        </div>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          aria-hidden="true"
          style={{
            color: colors.textTertiary,
            transform: open ? 'rotate(90deg)' : undefined,
            transition: 'transform 0.2s',
            flexShrink: 0,
          }}
        >
          <path d="M5.5 3.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {open && incident.ai && <IncidentAiAnalysis ai={incident.ai} />}
    </Card>
  )
}
