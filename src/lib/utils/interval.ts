// The backend stores/interprets `interval` in SECONDS (see app/models.py:
// `interval = Column(Integer, ... default=60)  # seconds between checks`).
// The UI lets people pick a check frequency in minutes because "every 2
// minutes" reads better than "every 120 seconds". These two helpers are the
// only place that conversion should ever happen — route every read/write of
// `api.interval` through them so the two units never drift apart again.

export function minutesToSeconds(minutes: number): number {
  return minutes * 60
}

export function secondsToMinutes(seconds: number): number {
  return Math.round(seconds / 60)
}

export function formatIntervalMinutes(seconds: number): string {
  return `${secondsToMinutes(seconds)}m`
}