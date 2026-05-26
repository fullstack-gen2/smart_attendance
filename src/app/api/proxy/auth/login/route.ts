import { NextRequest, NextResponse } from "next/server";

const BACKEND = process.env.API_URL || "https://attendance.icheck.today";

/**
 * Proxy for POST /api/v1/auth/login
 *
 * Browser → Next.js server (same origin, no CORS) → Backend
 * This completely avoids the browser-to-backend CORS preflight.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${BACKEND}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("[proxy/auth/login]", err);
    return NextResponse.json(
      { success: false, message: "Proxy error: backend unreachable." },
      { status: 502 }
    );
  }
}
