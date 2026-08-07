'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Api, Check, Incident } from '@/lib/types'
import { INITIAL_APIS, INITIAL_INCIDENTS } from '@/lib/mock-data'

interface MonitoringContextValue {
  apis: Api[]
  incidents: Incident[]
  addApi: (api: Api) => void
  toggleApi: (id: string) => void
  checkApi: (id: string) => void
}

const MonitoringContext = createContext<MonitoringContextValue | null>(null)

// NOTE: this currently seeds from mock data and holds state in memory only.
// Swap the useState initial values / actions for real API + Supabase calls
// once the backend is wired up — the rest of the app just consumes the hook
// below, so nothing downstream needs to change.
export function MonitoringProvider({ children }: { children: ReactNode }) {
  const [apis, setApis] = useState<Api[]>(INITIAL_APIS)
  const [incidents] = useState<Incident[]>(INITIAL_INCIDENTS)

  function addApi(api: Api) {
    setApis(prev => [...prev, api])
  }

  function toggleApi(id: string) {
    setApis(prev => prev.map(a => (a.id === id ? { ...a, enabled: !a.enabled } : a)))
  }

  function checkApi(id: string) {
    setApis(prev =>
      prev.map(a => {
        if (a.id !== id) return a
        const nc: Check = {
          id: `ck${Date.now()}`,
          apiId: id,
          apiName: a.name,
          timestamp: new Date().toISOString(),
          statusCode: 200,
          responseTime: Math.floor(80 + Math.random() * 160),
          success: true,
        }
        return { ...a, lastChecked: 'just now', checks: [...a.checks, nc] }
      }),
    )
  }

  return (
    <MonitoringContext.Provider value={{ apis, incidents, addApi, toggleApi, checkApi }}>
      {children}
    </MonitoringContext.Provider>
  )
}

export function useMonitoring() {
  const ctx = useContext(MonitoringContext)
  if (!ctx) throw new Error('useMonitoring must be used within a MonitoringProvider')
  return ctx
}
