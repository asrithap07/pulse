import type { Api, Check, CheckPage, Incident } from '@/lib/types'
import { SEED_APIS, SEED_CHECKS, SEED_INCIDENTS } from '@/lib/mock-data'

// In-memory store. Swap these for real database calls (e.g. Supabase/Prisma)
// once the backend is wired up — the API routes below just consume these functions.
let apis: Api[] = [...SEED_APIS]
let checks: Check[] = [...SEED_CHECKS]
let incidents: Incident[] = [...SEED_INCIDENTS]

export function getApis(): Api[] {
  return apis
}

export function getApi(id: string): Api | undefined {
  return apis.find(a => a.id === id)
}

export function addApi(input: Omit<Api, 'id' | 'status' | 'uptime' | 'avgLatency' | 'lastChecked'>): Api {
  const api: Api = {
    ...input,
    id: `api${Date.now()}`,
    status: 'healthy',
    uptime: 100,
    avgLatency: 0,
    lastChecked: 'Just added',
  }
  apis = [...apis, api]
  return api
}

export function toggleApi(id: string): Api | undefined {
  const api = getApi(id)
  if (!api) return undefined
  apis = apis.map(a => (a.id === id ? { ...a, enabled: !a.enabled } : a))
  return getApi(id)
}

export function getChecks(apiId?: string, limit = 50, offset = 0): CheckPage {
  const filtered = apiId ? checks.filter(c => c.apiId === apiId) : checks
  const sorted = [...filtered].sort((a, b) => b.timestamp.localeCompare(a.timestamp))
  return {
    checks: sorted.slice(offset, offset + limit),
    total: sorted.length,
    limit,
    offset,
  }
}

export function addCheck(apiId: string, check: Omit<Check, 'id' | 'apiId' | 'apiName' | 'timestamp'>): Check | undefined {
  const api = getApi(apiId)
  if (!api) return undefined
  const newCheck: Check = {
    ...check,
    id: `ck${Date.now()}`,
    apiId,
    apiName: api.name,
    timestamp: new Date().toISOString(),
  }
  checks = [newCheck, ...checks]
  apis = apis.map(a => (a.id === apiId ? { ...a, lastChecked: 'just now' } : a))
  return newCheck
}

export function getIncidents(): Incident[] {
  return incidents
}

export function getIncidentsForApi(apiId: string): Incident[] {
  return incidents.filter(i => i.apiId === apiId)
}