'use client'

import { useState } from 'react'
import { useMonitoring } from '@/lib/store/monitoring-context'
import { HistoryFilters, type HistoryFilter } from '@/components/history/HistoryFilters'
import { HistoryTable } from '@/components/history/HistoryTable'

export default function HistoryPage() {
  const { apis } = useMonitoring()
  const [filter, setFilter] = useState<HistoryFilter>('all')
  const [search, setSearch] = useState('')

  const allChecks = apis
    .flatMap(a => a.checks)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .filter(c => filter === 'all' || !c.success)
    .filter(c => !search || c.apiName.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.025em' }}>Check History</h1>
          <p style={{ color: '#475569', fontSize: 13, marginTop: 2 }}>{allChecks.length} checks</p>
        </div>
        <HistoryFilters search={search} onSearchChange={setSearch} filter={filter} onFilterChange={setFilter} />
      </div>

      <HistoryTable checks={allChecks} />
    </div>
  )
}
