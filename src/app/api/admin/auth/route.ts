import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionValue,
  isPasswordConfigured,
  verifyPassword,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  // Lightweight probe used by the login page.
  return NextResponse.json({ ok: true, configured: isPasswordConfigured() });
}

export async function POST(req: Request) {
  let password = "";
  try {
    const body = (await req.json()) as { password?: string };
    password = body.password ?? "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!(await verifyPassword(password))) {
    return NextResponse.json(
      { ok: false, error: "ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।" },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createSessionValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
