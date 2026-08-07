import { getChecks } from '@/lib/db'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const apiId = url.searchParams.get('apiId') ?? undefined
  const limit = Math.min(Number(url.searchParams.get('limit') ?? 50), 200)
  const offset = Math.max(Number(url.searchParams.get('offset') ?? 0), 0)
  return Response.json(getChecks(apiId, limit, offset))
}