import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.API_URL || "https://attendance.icheck.today/api/v1/attendance";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${BACKEND}/attendances/dynamic-qr-check-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[proxy/attendances/dynamic-qr-check-in]", err);
    return NextResponse.json(
      { success: false, message: "Proxy error: backend unreachable." },
      { status: 502 }
    );
  }
}
