import type { Api, Check, CheckPage, Incident } from '@/lib/types'

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init)
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

export function getApis(): Promise<Api[]> {
  return request<Api[]>('/api/apis')
}

export function getApi(id: string): Promise<Api> {
  return request<Api>(`/api/apis/${id}`)
}

export function addApi(input: Omit<Api, 'id' | 'status' | 'uptime' | 'avgLatency' | 'lastChecked'>): Promise<Api> {
  return request<Api>('/api/apis', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
}

export function toggleApi(id: string): Promise<Api> {
  return request<Api>(`/api/apis/${id}`, { method: 'PATCH' })
}

export function deleteApi(id: string): Promise<Api> {
  return request<Api>(`/api/apis/${id}`, { method: 'DELETE' })
}

export function getChecks(apiId?: string, limit = 50, offset = 0): Promise<CheckPage> {
  const params = new URLSearchParams({ limit: String(limit), offset: String(offset) })
  if (apiId) params.set('apiId', apiId)
  return request<CheckPage>(`/api/checks?${params.toString()}`)
}

export function triggerCheck(apiId: string): Promise<Check> {
  return request<Check>(`/api/apis/${apiId}/checks`, { method: 'POST' })
}

export function getIncidents(): Promise<Incident[]> {
  return request<Incident[]>('/api/incidents')
}