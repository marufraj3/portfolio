"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [configured, setConfigured] = useState(true);

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((d) => setConfigured(!!d.configured))
      .catch(() => setConfigured(true));
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Login ব্যর্থ হয়েছে।");
        setBusy(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("নেটওয়ার্ক সমস্যা — আবার চেষ্টা করুন।");
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-svh place-items-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl border border-cyan-neon/30 bg-cyan-neon/10 font-display text-xl font-bold text-cyan-neon">
            MR
          </div>
          <h1 className="font-display text-2xl font-bold text-fog-100">Portfolio Admin</h1>
          <p className="mt-2 text-sm text-fog-400">সাইটের কনটেন্ট এডিট করতে লগইন করুন</p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
        >
          {!configured && (
            <p className="mb-4 rounded-xl border border-amber-400/30 bg-amber-400/10 p-3 text-xs leading-relaxed text-amber-200">
              Production-এ <code className="font-mono">ADMIN_PASSWORD</code> সেট করা নেই। Vercel →
              Settings → Environment Variables-এ যোগ করে আবার চেষ্টা করুন।
            </p>
          )}

          <label className="mb-2 block font-mono text-[11px] tracking-[0.18em] text-fog-400 uppercase">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/12 bg-ink-900 px-4 py-3 text-fog-100 outline-none transition-colors placeholder:text-fog-400/50 focus:border-cyan-neon/60"
          />

          {error && (
            <p className="mt-3 rounded-xl border border-red-400/30 bg-red-400/10 px-3 py-2 text-xs text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={busy || !password}
            className="mt-5 w-full rounded-xl bg-cyan-neon px-4 py-3 font-display text-sm font-bold text-ink-950 transition-opacity disabled:opacity-40"
          >
            {busy ? "চেক করা হচ্ছে…" : "লগইন"}
          </button>

          <p className="mt-4 text-center text-[11px] text-fog-400/70">
            ডিফল্ট পাসওয়ার্ড (dev): <code className="font-mono text-fog-300">admin123</code> —
            production-এ <code className="font-mono text-fog-300">ADMIN_PASSWORD</code> সেট করুন।
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-fog-400/70">
          <Link href="/" className="transition-colors hover:text-cyan-neon">
            ← সাইটে ফিরে যান
          </Link>
        </p>
      </div>
    </main>
  );
}
