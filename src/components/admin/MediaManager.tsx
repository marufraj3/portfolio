"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MediaFile } from "@/lib/site";

/**
 * Admin media library: upload, preview, copy URL and delete images.
 * Files live in `public/uploads/` (local) or the repo via GitHub API
 * (Vercel / production).
 */
export default function MediaManager() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/media", { cache: "no-store" });
      const json = (await res.json()) as { ok?: boolean; files?: MediaFile[]; error?: string };
      if (!res.ok || !json.ok) {
        setMessage({ ok: false, text: json.error || "ছবির তালিকা লোড করা যায়নি।" });
        return;
      }
      setFiles(json.files ?? []);
    } catch {
      setMessage({ ok: false, text: "নেটওয়ার্ক সমস্যা।" });
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function upload(file: File) {
    setBusy(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/media", { method: "POST", body: fd });
      const json = (await res.json()) as {
        ok?: boolean;
        media?: MediaFile;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setMessage({ ok: false, text: json.error || "আপলোড করা যায়নি।" });
      } else {
        setMessage({ ok: true, text: "ছবি আপলোড হয়েছে।" });
        await load();
      }
    } catch {
      setMessage({ ok: false, text: "নেটওয়ার্ক সমস্যা।" });
    } finally {
      setBusy(false);
    }
  }

  async function remove(name: string) {
    if (!window.confirm(`"${name}" ডিলিট করবেন?`)) return;
    try {
      const res = await fetch("/api/admin/media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setMessage({ ok: false, text: json.error || "ডিলিট করা যায়নি।" });
        return;
      }
      setMessage({ ok: true, text: "ডিলিট হয়ে গেছে।" });
      await load();
    } catch {
      setMessage({ ok: false, text: "নেটওয়ার্ক সমস্যা।" });
    }
  }

  function copy(url: string) {
    navigator.clipboard
      .writeText(url)
      .then(() => setMessage({ ok: true, text: `URL কপি হয়েছে: ${url}` }))
      .catch(() => setMessage({ ok: false, text: "কপি করা যায়নি।" }));
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-base font-bold text-fog-100">ছবি আপলোড</h3>
            <p className="mt-1 text-xs leading-relaxed text-fog-400">
              JPG, PNG, WebP, GIF, SVG বা AVIF — সর্বোচ্চ 8MB। আপলোডের পর URL
              কপি করে প্রজেক্টের <span className="text-fog-200">ছবি</span> বা{" "}
              <span className="text-fog-200">Screenshot</span> ফিল্ডে যোগ করতে পারবেন।
            </p>
          </div>
          <button
            type="button"
            disabled={busy}
            onClick={() => fileRef.current?.click()}
            className="shrink-0 rounded-xl bg-cyan-neon px-5 py-2.5 font-display text-sm font-bold text-ink-950 transition-opacity disabled:opacity-40"
          >
            {busy ? "আপলোড হচ্ছে…" : "ছবি বাছুন"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            multiple
            onChange={(e) => {
              const list = Array.from(e.target.files ?? []);
              if (list.length) upload(list[0]);
              e.currentTarget.value = "";
            }}
          />
        </div>
      </div>

      {message && (
        <div
          className={`rounded-xl border px-4 py-3 text-xs leading-relaxed ${
            message.ok
              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
              : "border-red-400/20 bg-red-400/10 text-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-display text-base font-bold text-fog-100">মিডিয়া লাইব্রেরি</h3>
            <p className="mt-1 text-xs text-fog-400">{files.length}টি ছবি</p>
          </div>
          <button
            type="button"
            onClick={load}
            className="rounded-lg border border-white/12 px-3 py-2 text-xs font-semibold text-fog-300 transition-colors hover:border-white/30 hover:text-white"
          >
            রিফ্রেশ
          </button>
        </div>

        {files.length === 0 ? (
          <div className="grid h-40 place-items-center rounded-xl border border-dashed border-white/12 text-sm text-fog-400">
            এখনো কোনো ছবি আপলোড হয়নি।
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((f) => (
              <div key={f.name} className="overflow-hidden rounded-xl border border-white/10 bg-ink-900/40">
                <div className="relative aspect-16/10 bg-ink-900/70">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={f.url} alt={f.name} className="size-full object-cover" loading="lazy" />
                  <span className="absolute right-2 top-2 rounded-md bg-black/60 px-2 py-0.5 font-mono text-[9px] text-fog-200 backdrop-blur">
                    {(f.size / 1024).toFixed(0)}KB
                  </span>
                </div>
                <div className="space-y-2 p-3">
                  <p className="truncate font-mono text-[11px] text-fog-300" title={f.url}>
                    {f.url}
                  </p>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => copy(f.url)}
                      className="flex-1 rounded-lg border border-cyan-neon/40 bg-cyan-neon/10 px-2 py-1.5 text-[11px] font-semibold text-cyan-neon transition-colors hover:bg-cyan-neon/20"
                    >
                      URL কপি
                    </button>
                    <a
                      href={f.url}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-lg border border-white/12 px-2.5 py-1.5 text-[11px] text-fog-300 transition-colors hover:text-white"
                    >
                      খুলুন
                    </a>
                    <button
                      type="button"
                      onClick={() => remove(f.name)}
                      className="rounded-lg border border-red-400/30 px-2.5 py-1.5 text-[11px] text-red-300 transition-colors hover:bg-red-400/10"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
