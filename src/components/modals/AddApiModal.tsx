'use client'

import { useState, type CSSProperties, type FormEvent } from 'react'
import type { Api } from '@/lib/types'
import { Label } from '@/components/ui/Label'
import { colors } from '@/lib/tokens/colors'
import { minutesToSeconds } from '@/lib/utils/interval'

// Options are minutes, purely for display/selection. `api.interval` on the
// wire is always seconds — see src/lib/utils/interval.ts.
const INTERVAL_OPTIONS_MINUTES = [1, 2, 3, 5]

export function AddApiModal({ onClose, onAdd }: { onClose: () => void; onAdd: (api: Omit<Api, 'id' | 'status' | 'uptime' | 'avgLatency' | 'lastChecked'>) => void }) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [intervalMinutes, setIntervalMinutes] = useState(2)

  function submit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !url.trim()) return
    onAdd({
      name: name.trim(),
      url: url.trim(),
      interval: minutesToSeconds(intervalMinutes),
      enabled: true,
    })
    onClose()
  }

  const inputStyle: CSSProperties = {
    width: '100%',
    background: colors.bgDarkest,
    border: `1px solid ${colors.borderSubtle}`,
    borderRadius: 8,
    padding: '10px 13px',
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: 'var(--font-sans)',
    marginBottom: 16,
    outline: 'none',
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: colors.overlay,
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        style={{
          background: colors.bgDark,
          border: `1px solid ${colors.borderActive}`,
          borderRadius: 14,
          padding: 28,
          width: 420,
          maxWidth: '92vw',
        }}
      >
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 22 }}>Add Endpoint</h2>
        <form onSubmit={submit}>
          <Label>Name</Label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Payments API" style={inputStyle} />
          <Label>URL</Label>
          <input
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://api.example.com/health"
            style={{ ...inputStyle, fontFamily: 'var(--font-mono)', fontSize: 13 }}
          />
          <Label>Check interval</Label>
          <div style={{ display: 'flex', gap: 8, marginBottom: 26 }}>
            {INTERVAL_OPTIONS_MINUTES.map(n => (
              <button
                key={n}
                type="button"
                onClick={() => setIntervalMinutes(n)}
                style={{
                  flex: 1,
                  padding: '8px 0',
                  borderRadius: 7,
                  fontSize: 13,
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  background: intervalMinutes === n ? colors.accentClarityMuted : colors.bgDarkest,
                  border: `1px solid ${intervalMinutes === n ? colors.accentClarity : colors.borderSubtle}`,
                  color: intervalMinutes === n ? colors.accentClarity : colors.textSecondary,
                  cursor: 'pointer',
                }}
              >
                {n}m
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                background: 'transparent',
                border: `1px solid ${colors.borderSubtle}`,
                color: colors.textSecondary,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                flex: 2,
                padding: '10px 0',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                background: colors.accentClarity,
                border: 'none',
                color: colors.bgDarkest,
                cursor: 'pointer',
              }}
            >
              Start Monitoring
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}