'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getApis, getIncidents, getChecks, addApi } from '@/lib/api'
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { DashboardStats } from '@/components/dashboard/DashboardStats'
import { EndpointList } from '@/components/dashboard/EndpointList'
import { ActiveIncidentsPanel } from '@/components/dashboard/ActiveIncidentsPanel'
import { RecentChecksList } from '@/components/dashboard/RecentChecksList'
import { AddApiModal } from '@/components/modals/AddApiModal'

export default function DashboardPage() {
  const queryClient = useQueryClient()
  const [showAdd, setShowAdd] = useState(false)
  const router = useRouter()

  const { data: apis = [] } = useQuery({ queryKey: ['apis'], queryFn: getApis })
  const { data: incidents = [] } = useQuery({ queryKey: ['incidents'], queryFn: getIncidents })
  const { data: checksPage } = useQuery({
    queryKey: ['checks'],
    queryFn: () => getChecks(undefined, 200, 0),
  })
  const checks = checksPage?.checks ?? []

  const addApiMutation = useMutation({
    mutationFn: addApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apis'] })
    },
  })

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
      <DashboardHeader endpointCount={apis.length} onAddApi={() => setShowAdd(true)} />
      <DashboardStats apis={apis} incidents={incidents} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' }}>
        <EndpointList apis={apis} checks={checks} onSelect={id => router.push(`/endpoints/${id}`)} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <ActiveIncidentsPanel incidents={incidents} onViewIncidents={() => router.push('/incidents')} />
          <RecentChecksList checks={checks} />
        </div>
      </div>

      {showAdd && (
        <AddApiModal
          onClose={() => setShowAdd(false)}
          onAdd={api => addApiMutation.mutate(api)}
        />
      )}
    </div>
  )
}