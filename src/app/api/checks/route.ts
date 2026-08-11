const FASTAPI_URL = process.env.FASTAPI_URL

export async function GET(request: Request) {
  const url = new URL(request.url)
  const apiId = url.searchParams.get('apiId') ?? undefined
  const limit = Math.min(Number(url.searchParams.get('limit') ?? 50), 200)
  const offset = Math.max(Number(url.searchParams.get('offset') ?? 0), 0)

  const params = new URLSearchParams({ limit: String(limit), offset: String(offset) })
  if (apiId) params.set('apiId', apiId)

  const res = await fetch(`${FASTAPI_URL}/api/checks?${params.toString()}`)
  const data = await res.json()
  return Response.json(data, { status: res.status })
}