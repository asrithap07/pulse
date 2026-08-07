'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMonitoring } from '@/lib/store/monitoring-context'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { EndpointList } from '@/components/dashboard/EndpointList'
import { ActiveIncidentsPanel } from '@/components/dashboard/ActiveIncidentsPanel'
import { RecentChecksList } from '@/components/dashboard/RecentChecksList'
import { AddApiModal } from '@/components/modals/AddApiModal'

export default function DashboardPage() {
  const { apis, incidents, addApi } = useMonitoring()
  const [showAdd, setShowAdd] = useState(false)
  const router = useRouter()

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
      <DashboardHeader endpointCount={apis.length} onAddApi={() => setShowAdd(true)} />
      <DashboardStats apis={apis} incidents={incidents} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' }}>
        <EndpointList apis={apis} onSelect={id => router.push(`/endpoints/${id}`)} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <ActiveIncidentsPanel incidents={incidents} onViewIncidents={() => router.push('/incidents')} />
          <RecentChecksList apis={apis} />
        </div>
      </div>

      {showAdd && <AddApiModal onClose={() => setShowAdd(false)} onAdd={addApi} />}
    </div>
  )
}
