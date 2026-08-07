export type Status = 'healthy' | 'degraded' | 'down'

export interface Check {
  id: string
  apiId: string
  apiName: string
  timestamp: string
  statusCode: number
  responseTime: number
  success: boolean
  error?: string
}

export interface CheckPage {
  checks: Check[]
  total: number
  limit: number
  offset: number
}

export interface Api {
  id: string
  name: string
  url: string
  interval: number
  enabled: boolean
  status: Status
  uptime: number
  avgLatency: number
  lastChecked: string
}

export interface AiAnalysis {
  summary: string
  likelyCause: string
  evidence: string[]
  confidence: number
  actions: string[]
}

export interface Incident {
  id: string
  apiId: string
  apiName: string
  startTime: string
  endTime?: string
  failedChecks: number
  status: 'active' | 'resolved'
  description: string
  ai?: AiAnalysis
}