import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${process.env.FASTAPI_URL}/health`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ status: "down" }, { status: 503 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    // backend asleep/unreachable — this is the expected case on cold start
    return NextResponse.json({ status: "down" }, { status: 503 });
  }
}