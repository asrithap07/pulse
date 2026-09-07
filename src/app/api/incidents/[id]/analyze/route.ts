import { NextRequest, NextResponse } from "next/server";

const FASTAPI_URL = (process.env.FASTAPI_URL ?? "http://localhost:8000").replace(/\/+$/, "");

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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