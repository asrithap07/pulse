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

export const SEED_APIS: Api[] = [
  {
    id: 'api1', name: 'Payments API', url: 'https://api.stripe.com/v1/charges',
    interval: 1, enabled: true, status: 'healthy', uptime: 99.94, avgLatency: 142,
    lastChecked: '12s ago',
  },
  {
    id: 'api2', name: 'Auth Service', url: 'https://auth.example.com/health',
    interval: 2, enabled: true, status: 'degraded', uptime: 97.2, avgLatency: 890,
    lastChecked: '43s ago',
  },
  {
    id: 'api3', name: 'User Profile API', url: 'https://api.example.com/users/health',
    interval: 5, enabled: true, status: 'healthy', uptime: 99.99, avgLatency: 67,
    lastChecked: '2m ago',
  },
  {
    id: 'api4', name: 'Notification Service', url: 'https://notify.example.com/ping',
    interval: 3, enabled: false, status: 'down', uptime: 88.5, avgLatency: 2400,
    lastChecked: '8m ago',
  },
]

export const SEED_CHECKS: Check[] = [
  ...makeChecks('api1', 'Payments API', true, 1),
  ...makeChecks('api2', 'Auth Service', false, 2),
  ...makeChecks('api3', 'User Profile API', true, 3),
  ...makeChecks('api4', 'Notification Service', false, 4),
]

export const SEED_INCIDENTS: Incident[] = [
  {
    id: 'inc1', apiId: 'api2', apiName: 'Auth Service',
    startTime: new Date(FIXED_NOW - 18 * 60 * 1000).toISOString(),
    failedChecks: 4, status: 'active',
    description: 'Degradation in response time and elevated error rate.',
    ai: {
      summary: 'Auth Service is experiencing elevated response times (avg 890ms) over the last 18 minutes, exceeding the 500ms SLA threshold. 4 checks have returned 503 errors.',
      likelyCause: 'Database connection pool exhaustion — likely caused by a surge in concurrent authentication requests or a slow query holding connections open.',
      evidence: [
        'Response time spike from 145ms → 890ms at 14:22 UTC',
        '4 consecutive 503 Service Unavailable responses',
        'Pattern matches database pool saturation (gradual degradation, not instant failure)',
        'No deployment events recorded in the last 2 hours',
      ],
      confidence: 82,
      actions: [
        'Check database connection pool utilization in your monitoring dashboard',
        'Review slow query logs for queries started around 14:20 UTC',
        'Consider temporarily increasing connection pool size',
        'Restart the auth service pod if pool reset is needed urgently',
      ],
    },
  },
  {
    id: 'inc2', apiId: 'api4', apiName: 'Notification Service',
    startTime: new Date(FIXED_NOW - 4.5 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(FIXED_NOW - 3.1 * 60 * 60 * 1000).toISOString(),
    failedChecks: 18, status: 'resolved',
    description: 'Service fully unreachable. All checks returning connection refused.',
    ai: {
      summary: 'Notification Service was fully down for 84 minutes due to an OOM crash in the worker process.',
      likelyCause: 'Memory leak in the notification queue worker — process consumed 100% available memory and was OOM-killed by the container runtime.',
      evidence: [
        '18 consecutive failed checks with connection refused errors',
        'Service recovered after automatic container restart',
        'Memory usage was trending upward for 3 hours prior',
      ],
      confidence: 91,
      actions: [
        'Add memory limits to container spec',
        'Profile worker for memory leaks in message batch processing',
        'Set up memory usage alerting at 80% threshold',
      ],
    },
  },
]