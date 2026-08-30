import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  website?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: Payload;

  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Bots fill hidden fields; humans don't.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const errors: Record<string, string> = {};
  if (!body.name || body.name.trim().length < 2) errors.name = "আপনার নাম লিখুন।";
  if (!body.email || !EMAIL_RE.test(body.email)) errors.email = "সঠিক ইমেইল দিন।";
  if (!body.message || body.message.trim().length < 12)
    errors.message = "প্রজেক্ট নিয়ে একটু বিস্তারিত লিখুন (১২+ অক্ষর)।";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Wire this to Resend / Postmark / a CRM webhook when you go live.
  console.info("[lead]", {
    at: new Date().toISOString(),
    name: body.name,
    email: body.email,
    company: body.company ?? "",
    projectType: body.projectType ?? "",
    budget: body.budget ?? "",
    message: body.message?.slice(0, 2000),
  });

  return NextResponse.json({
    ok: true,
    message: "ধন্যবাদ — আপনার মেসেজ পেয়েছি। ১২ ঘণ্টার মধ্যে রিপ্লাই করব।",
  });
}
