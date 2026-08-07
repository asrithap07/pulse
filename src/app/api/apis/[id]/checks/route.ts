import { addCheck } from '@/lib/db'

export async function POST(_req: Request, ctx: RouteContext<'/api/apis/[id]/checks'>) {
  const { id } = await ctx.params
  const check = addCheck(id, {
    statusCode: 200,
    responseTime: Math.floor(80 + Math.random() * 160),
    success: true,
  })
  if (!check) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(check, { status: 201 })
}