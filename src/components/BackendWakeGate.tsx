'use client'

import { useEffect, useRef, useState } from 'react'

export function BackendWakeGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const [waking, setWaking] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const wakeStartedAt = useRef(0)

  useEffect(() => {
    let cancelled = false
    let retryTimer: ReturnType<typeof setTimeout> | undefined

    async function ping() {
      try {
        const res = await fetch('/api/health', { cache: 'no-store' })
        if (res.ok && !cancelled) {
          setReady(true)
          return
        }
      } catch {
        // network error — treat same as a down backend, fall through to retry
      }
      if (!cancelled) {
        setWaking(true)
        if (wakeStartedAt.current === 0) wakeStartedAt.current = Date.now()
        retryTimer = setTimeout(ping, 2500)
      }
    }

    ping()
    // Tick the elapsed clock every second so the user sees the wake is still
    // progressing rather than appearing frozen while the backend warms up.
    const elapsedTimer = setInterval(() => {
      if (wakeStartedAt.current === 0) return
      setElapsed(Math.floor((Date.now() - wakeStartedAt.current) / 1000))
    }, 1000)

    return () => {
      cancelled = true
      if (retryTimer) clearTimeout(retryTimer)
      clearInterval(elapsedTimer)
    }
  }, [])

  if (!ready) {
    const mins = Math.floor(elapsed / 60)
    const secs = elapsed % 60
    const elapsedLabel = wakeStartedAt.current > 0 ? (mins > 0 ? `${mins}m ${secs}s` : `${secs}s`) : ''

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: 16,
          background: '#080c14',
          color: '#94a3b8',
        }}
      >
        <div className="bwg-spinner" role="status" aria-label="Loading" />
        <div className="bwg-text" style={{ fontSize: 14 }}>
          {waking ? 'Waking up the backend…' : 'Connecting…'}
        </div>
        {waking && (
          <div style={{ fontSize: 12, color: '#6d7d91' }}>
            Cold start can take a few minutes on the free tier. Elapsed: {elapsedLabel}
          </div>
        )}
        <button
          type="button"
          onClick={() => setReady(true)}
          style={{
            marginTop: 6,
            padding: '8px 14px',
            borderRadius: 10,
            fontSize: 12.5,
            fontWeight: 700,
            cursor: 'pointer',
            background: 'rgba(122, 231, 255, 0.08)',
            border: '1px solid rgba(122, 231, 255, 0.28)',
            color: '#7ae7ff',
          }}
        >
          Skip anyway
        </button>
      </div>
    )
  }

  return <>{children}</>
}