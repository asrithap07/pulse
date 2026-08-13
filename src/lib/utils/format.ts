/**
 * Parse a string that the backend emits as UTC. If the string already carries
 * a timezone marker (Z or ±HH:MM), `new Date` handles it correctly. If it's a
 * naive ISO string (no marker), JS would normally treat it as LOCAL time — we
 * force it to UTC so it renders correctly in the user's local zone.
 */
export function parseUtcDate(value: string): Date {
  // Already zoned (UTC "Z" or explicit offset) — let Date handle it.
  if (/[zZ]|[+-]\d{2}:\d{2}$/.test(value)) return new Date(value)
  // Naive datetime (e.g. "2024-08-13T14:30:00" or "2024-08-13 14:30") — treat as UTC.
  return new Date(value + 'Z')
}

export function fmtTime(iso: string) {
  return parseUtcDate(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function fmtDateTime(iso: string) {
  return parseUtcDate(iso).toLocaleString([], {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function duration(start: string, end?: string) {
  const ms = (end ? parseUtcDate(end) : new Date()).getTime() - parseUtcDate(start).getTime()
  const m = Math.floor(ms / 60000)
  return m < 60 ? `${m}m` : `${Math.floor(m / 60)}h ${m % 60}m`
}

/** Human-friendly relative time. Passes through sentinel strings like "Never" or "just now". */
export function timeAgo(value: string): string {
  const sentinels = ['Never', 'never', 'just now', 'Just added', 'just added']
  if (sentinels.includes(value)) return value

  const date = parseUtcDate(value)
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
