import { getApi, toggleApi } from '@/lib/db'

export async function GET(_req: Request, ctx: RouteContext<'/api/apis/[id]'>) {
  const { id } = await ctx.params
  const api = getApi(id)
  if (!api) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(api)
}

export async function PATCH(_req: Request, ctx: RouteContext<'/api/apis/[id]'>) {
  const { id } = await ctx.params
  const api = toggleApi(id)
  if (!api) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(api)
}