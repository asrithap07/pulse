import type { Api, Check, Incident } from '@/lib/types'

// Deterministic pseudo-random generator so server and client render identical data
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const FIXED_NOW = 1750000000000 // fixed timestamp so SSR and client match

export function makeChecks(apiId: string, apiName: string, healthy = true, seed = 1): Check[] {
  const rand = seededRandom(seed)
  return Array.from({ length: 24 }, (_, i) => {
    const success = healthy ? rand() > 0.05 : i < 6 ? false : rand() > 0.05
    return {
      id: `ck-${apiId}-${i}`,
      apiId,
      apiName,
      timestamp: new Date(FIXED_NOW - (23 - i) * 5 * 60 * 1000).toISOString(),
      statusCode: success ? 200 : rand() > 0.5 ? 503 : 504,
      responseTime: success ? Math.floor(80 + rand() * 180) : Math.floor(2000 + rand() * 1000),
      success,
      error: success ? undefined : 'Connection timeout',
    }
  })
}

// NOTE: `interval` is in SECONDS (matches the backend's Service.interval
// column). These values are 1m/2m/5m/3m expressed in seconds, so they
// render correctly through formatIntervalMinutes() in the UI.
export const SEED_APIS: Api[] = [
  {
    id: 'api1', name: 'Payments API', url: 'https://api.stripe.com/v1/charges',
    interval: 60, enabled: true, status: 'healthy', uptime: 99.94, avgLatency: 142,
    lastChecked: '12s ago',
  },
  {
    id: 'api2', name: 'Auth Service', url: 'https://auth.example.com/health',
    interval: 120, enabled: true, status: 'degraded', uptime: 97.2, avgLatency: 890,
    lastChecked: '43s ago',
  },
  {
    id: 'api3', name: 'User Profile API', url: 'https://api.example.com/users/health',
    interval: 300, enabled: true, status: 'healthy', uptime: 99.99, avgLatency: 67,
    lastChecked: '2m ago',
  },
  {
    id: 'api4', name: 'Notification Service', url: 'https://notify.example.com/ping',
    interval: 180, enabled: false, status: 'down', uptime: 88.5, avgLatency: 2400,
    lastChecked: '8m ago',
  },
]

export const SEED_CHECKS: Check[] = [
  ...makeChecks('api1', 'Payments API', true, 1),
  ...makeChecks('api2', 'Auth Service', false, 2),
  ...makeChecks('api3', 'User Profile API', true, 3),
  ...makeChecks('api4', 'Notification Service', false, 4),
]