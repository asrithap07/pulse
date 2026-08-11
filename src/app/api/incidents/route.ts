const FASTAPI_URL = process.env.FASTAPI_URL

export async function GET() {
  const res = await fetch(`${FASTAPI_URL}/api/incidents`)
  const data = await res.json()
  return Response.json(data, { status: res.status })
}