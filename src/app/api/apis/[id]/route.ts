const FASTAPI_URL = process.env.FASTAPI_URL

export async function GET(_req: Request, ctx: RouteContext<'/api/apis/[id]'>) {
  const { id } = await ctx.params
  const res = await fetch(`${FASTAPI_URL}/api/apis/${id}`)
  const data = await res.json()
  return Response.json(data, { status: res.status })
}

export async function PATCH(_req: Request, ctx: RouteContext<'/api/apis/[id]'>) {
  const { id } = await ctx.params
  const res = await fetch(`${FASTAPI_URL}/api/apis/${id}`, { method: 'PATCH' })
  const data = await res.json()
  return Response.json(data, { status: res.status })
}