const FASTAPI_URL = process.env.FASTAPI_URL

export async function POST(_req: Request, ctx: RouteContext<'/api/apis/[id]/checks'>) {
  const { id } = await ctx.params
  const res = await fetch(`${FASTAPI_URL}/api/apis/${id}/checks`, { method: 'POST' })
  const data = await res.json()
  return Response.json(data, { status: res.status })
}