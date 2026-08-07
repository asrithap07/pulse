import { getIncidents } from '@/lib/db'

export async function GET() {
  return Response.json(getIncidents())
}