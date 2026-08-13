'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getApi, getIncidents, getChecks, triggerCheck, toggleApi, deleteApi } from '@/lib/api'
import { EndpointHeader } from '@/components/endpoints/EndpointHeader'
import { EndpointStats } from '@/components/endpoints/EndpointStats'
import { EndpointChecksPanel } from '@/components/endpoints/EndpointChecksPanel'
import { EndpointIncidentHistory } from '@/components/endpoints/EndpointIncidentHistory'
import { colors } from '@/lib/tokens/colors'

export default function EndpointDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [checking, setChecking] = useState(false)

  const { data: api } = useQuery({
    queryKey: ['apis', id],
    queryFn: () => getApi(id),
  })

  const { data: incidents = [] } = useQuery({
    queryKey: ['incidents', id],
    queryFn: () => getIncidents().then(all => all.filter(i => i.apiId === id)),
  })

  const { data: checksPage } = useQuery({
    queryKey: ['checks', id],
    queryFn: () => getChecks(id, 50, 0),
  })

  const checkMutation = useMutation({
    mutationFn: triggerCheck,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checks', id] })
      queryClient.invalidateQueries({ queryKey: ['apis'] })
    },
  })

  const toggleMutation = useMutation({
    mutationFn: toggleApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apis', id] })
      queryClient.invalidateQueries({ queryKey: ['apis'] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apis'] })
      router.push('/dashboard')
    },
  })

  if (!api) {
    return (
      <div style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ color: colors.textSecondary, fontSize: 14 }}>No endpoint found with id &ldquo;{id}&rdquo;.</p>
      </div>
    )
  }

  const currentApi = api

  function handleCheck() {
    setChecking(true)
    checkMutation.mutate(currentApi.id)
    setTimeout(() => setChecking(false), 1200)
  }

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
      <EndpointHeader
        api={currentApi}
        checking={checking}
        onCheck={handleCheck}
        onToggle={() => toggleMutation.mutate(currentApi.id)}
        onDelete={() => deleteMutation.mutate(currentApi.id)}
      />
      <EndpointStats api={currentApi} />
      <EndpointChecksPanel api={currentApi} checks={checksPage?.checks ?? []} />
      <EndpointIncidentHistory incidents={incidents} />
    </div>
  )
}