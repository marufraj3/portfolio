/**
 * Minimal admin auth: password from env + HMAC-signed session cookie.
 * Uses only Web APIs (crypto.subtle) so it works in both the Node
 * runtime (API routes) and the Edge runtime (middleware).
 */

export const SESSION_COOKIE = "pf_admin";
export const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

/** Dev-only fallback so the panel is usable before env vars are set. */
export const DEV_PASSWORD = "admin123";

export function getAdminPassword(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (pw && pw.length > 0) return pw;
  // In production we refuse the fallback — an open admin on a live
  // site is worse than an admin that asks you to set a variable.
  return process.env.NODE_ENV === "production" ? null : DEV_PASSWORD;
}

export function isPasswordConfigured(): boolean {
  return getAdminPassword() !== null;
}

export function isDefaultPassword(): boolean {
  return getAdminPassword() === DEV_PASSWORD;
}

function getSecret(): string {
  return (
    process.env.ADMIN_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "portfolio-admin-dev-secret"
  );
}

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return toHex(sig);
}

function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function verifyPassword(pw: string): Promise<boolean> {
  const expected = getAdminPassword();
  if (!expected) return false;
  return constantTimeEqual(pw, expected);
}

export async function createSessionValue(): Promise<string> {
  const expires = Date.now() + SESSION_TTL_SECONDS * 1000;
  return `${expires}.${await hmac(expires.toString())}`;
}

export async function verifySessionValue(value: string | undefined | null): Promise<boolean> {
  if (!value) return false;
  const dot = value.lastIndexOf(".");
  if (dot < 0) return false;
  const expires = value.slice(0, dot);
  const signature = value.slice(dot + 1);
  if (!/^\d+$/.test(expires) || Number(expires) < Date.now()) return false;
  const expected = await hmac(expires);
  return constantTimeEqual(signature, expected);
}
