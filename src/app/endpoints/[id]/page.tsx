'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useMonitoring } from '@/lib/store/monitoring-context'
import { EndpointHeader } from '@/components/endpoints/EndpointHeader'
import { EndpointStats } from '@/components/endpoints/EndpointStats'
import { EndpointChecksPanel } from '@/components/endpoints/EndpointChecksPanel'
import { EndpointIncidentHistory } from '@/components/endpoints/EndpointIncidentHistory'

export default function EndpointDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { apis, incidents, toggleApi, checkApi } = useMonitoring()
  const [checking, setChecking] = useState(false)

  const api = apis.find(a => a.id === id)

  if (!api) {
    return (
      <div style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ color: '#475569', fontSize: 14 }}>No endpoint found with id &ldquo;{id}&rdquo;.</p>
      </div>
    )
  }

  const apiIncidents = incidents.filter(i => i.apiId === api.id)

  function handleCheck() {
    setChecking(true)
    checkApi(api!.id)
    setTimeout(() => setChecking(false), 1200)
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
      <EndpointHeader api={api} checking={checking} onCheck={handleCheck} onToggle={() => toggleApi(api.id)} />
      <EndpointStats api={api} />
      <EndpointChecksPanel api={api} />
      <EndpointIncidentHistory incidents={apiIncidents} />
    </div>
  )
}
