import { NextRequest, NextResponse } from "next/server";

const FASTAPI_URL = process.env.FASTAPI_URL;

export async function POST(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const res = await fetch(`${FASTAPI_URL}/api/incidents/${id}/analyze`, {
    method: "POST",
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }
  return NextResponse.json(data);
}