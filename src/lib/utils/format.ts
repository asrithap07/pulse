export function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function duration(start: string, end?: string) {
  const ms = (end ? new Date(end) : new Date()).getTime() - new Date(start).getTime()
  const m = Math.floor(ms / 60000)
  return m < 60 ? `${m}m` : `${Math.floor(m / 60)}h ${m % 60}m`
}

/** Human-friendly relative time. Passes through sentinel strings like "Never" or "just now". */
export function timeAgo(value: string): string {
  const sentinels = ['Never', 'never', 'just now', 'Just added', 'just added']
  if (sentinels.includes(value)) return value

  const date = new Date(value)
  if (isNaN(date.getTime())) return value

  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  if (seconds < 5) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
}
