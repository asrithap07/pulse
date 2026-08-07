import { getApis, addApi } from '@/lib/db'

export async function GET() {
  return Response.json(getApis())
}

export async function POST(request: Request) {
  const body = await request.json()
  const api = addApi(body)
  return Response.json(api, { status: 201 })
}