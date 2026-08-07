'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getApis, getIncidents, getChecks, addApi } from '@/lib/api'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { ErrorState, EmptyState } from '@/components/ui/StateComponents'
import { SkeletonStatCard, SkeletonEndpointCard, SkeletonIncidentCard } from '@/components/ui/Skeleton'
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

  const {
    data: apis = [],
    isLoading: apisLoading,
    isError: apisError,
    refetch: refetchApis,
  } = useQuery({ queryKey: ['apis'], queryFn: getApis })
  const {
    data: incidents = [],
    isLoading: incidentsLoading,
    isError: incidentsError,
    refetch: refetchIncidents,
  } = useQuery({ queryKey: ['incidents'], queryFn: getIncidents })
  const {
    data: checksPage,
    isLoading: checksLoading,
    isError: checksError,
    refetch: refetchChecks,
  } = useQuery({
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

  const isLoadingAnyQuery = apisLoading || incidentsLoading || checksLoading
  const hasAnyError = apisError || incidentsError || checksError

  const handleRetryAll = () => {
    refetchApis()
    refetchIncidents()
    refetchChecks()
  }

  return (
    <ErrorBoundary>
      <div style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
        {hasAnyError && (
          <div style={{ marginBottom: 20 }}>
            <ErrorState
              title="Failed to load dashboard"
              message="We couldn't fetch your API data. Please check your connection and try again."
              onRetry={handleRetryAll}
            />
          </div>
        )}

        <DashboardHeader
          endpointCount={apis.length}
          onAddApi={() => setShowAdd(true)}
          disabled={isLoadingAnyQuery}
        />

        {isLoadingAnyQuery ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
            {[1, 2, 3, 4].map(i => (
              <SkeletonStatCard key={i} />
            ))}
          </div>
        ) : (
          <DashboardStats apis={apis} incidents={incidents} />
        )}

        {apis.length === 0 && !isLoadingAnyQuery && !apisError ? (
          <EmptyState
            icon="📡"
            title="No endpoints yet"
            message="Add your first API endpoint to start monitoring and get instant alerts when issues occur."
            actionLabel="Add Endpoint"
            onAction={() => setShowAdd(true)}
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, alignItems: 'start' }}>
            {isLoadingAnyQuery ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[1, 2, 3].map(i => (
                  <SkeletonEndpointCard key={i} />
                ))}
              </div>
            ) : apisError ? (
              <ErrorState
                title="Failed to load endpoints"
                message="We couldn't fetch your API endpoints. Please try again."
                onRetry={() => refetchApis()}
              />
            ) : (
              <EndpointList apis={apis} checks={checks} onSelect={id => router.push(`/endpoints/${id}`)} />
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {incidentsLoading ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[1, 2].map(i => (
                    <SkeletonIncidentCard key={i} />
                  ))}
                </div>
              ) : incidentsError ? (
                <ErrorState
                  title="Failed to load incidents"
                  message="We couldn't fetch your incidents. Please try again."
                  onRetry={() => refetchIncidents()}
                />
              ) : (
                <ActiveIncidentsPanel incidents={incidents} onViewIncidents={() => router.push('/incidents')} />
              )}

              {checksLoading ? (
                <SkeletonIncidentCard />
              ) : (
                <RecentChecksList checks={checks} />
              )}
            </div>
          </div>
        )}

        {showAdd && (
          <AddApiModal
            onClose={() => setShowAdd(false)}
            onAdd={api => addApiMutation.mutate(api)}
          />
        )}
      </div>
    </ErrorBoundary>
  )
}