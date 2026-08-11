const FASTAPI_URL = process.env.FASTAPI_URL

export async function GET() {
  const res = await fetch(`${FASTAPI_URL}/api/apis`)
  const data = await res.json()
  return Response.json(data, { status: res.status })
}

export async function POST(request: Request) {
  const body = await request.json()
  const res = await fetch(`${FASTAPI_URL}/api/apis`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return Response.json(data, { status: res.status })
}