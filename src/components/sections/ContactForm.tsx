"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowIcon, Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const projectTypes = [
  "Web Development",
  "Digital Marketing",
  "E-commerce Website",
  "AI Automation",
  "Website Redesign",
  "SEO & Speed",
  "Website Audit",
  "SMM Panel",
  "অন্য কিছু",
];
const budgets = ["৳2,000 – ৳5,000", "৳5,000 – ৳15,000", "৳15,000 – ৳40,000", "৳40,000+", "এখনো ঠিক করিনি"];

const field =
  "w-full rounded-xl border border-white/[0.09] bg-white/[0.035] px-4 py-3 text-[14px] text-white placeholder:text-fog-400 outline-none transition-all duration-300 focus:border-cyan-neon/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(79,215,255,0.12)]";

const selectArrow =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23828d9e' d='M6 8 0 1.4 1.4 0 6 4.6 10.6 0 12 1.4z'/%3E%3C/svg%3E\")";

function Field({
  label,
  error,
  children,
  className,
  htmlFor,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  htmlFor: string;
}) {
  return (
    <div className={cn("block", className)}>
      <label
        htmlFor={htmlFor}
        className="mb-2 block font-mono text-[10px] tracking-[0.18em] text-fog-400 uppercase"
      >
        {label}
      </label>
      {children}
      {error && <span className="mt-1.5 block text-[11.5px] text-magenta-neon">{error}</span>}
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [note, setNote] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        setErrors(json.errors ?? {});
        setStatus("error");
        setNote(json.error ?? "হাইলাইট করা ঘরগুলো একটু চেক করুন।");
        return;
      }

      setStatus("done");
      setNote(json.message ?? "ধন্যবাদ — শিগগিরই যোগাযোগ করব।");
      form.reset();
    } catch {
      setStatus("error");
      setNote("নেটওয়ার্ক সমস্যা। সরাসরি ইমেইল করুন, আমি দেখে নেব।");
    }
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "done" ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col items-center py-12 text-center"
        >
          <motion.span
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="grid size-16 place-items-center rounded-full border border-mint-neon/30 bg-mint-neon/10 text-mint-neon"
          >
            <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" aria-hidden>
              <path d="m5 12.5 4.5 4.5L19 7.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
          <h4 className="mt-6 font-display text-xl font-semibold text-white">মেসেজ পেয়েছি</h4>
          <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-fog-300">{note}</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-6 font-mono text-[11px] tracking-[0.16em] text-cyan-neon uppercase transition-opacity hover:opacity-70"
          >
            আরেকটা পাঠান
          </button>
        </motion.div>
      ) : (
        <form key="form" onSubmit={onSubmit} className="grid gap-4" noValidate>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            className="pointer-events-none absolute size-0 opacity-0"
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="আপনার নাম" error={errors.name} htmlFor="cf-name">
              <input
                id="cf-name"
                name="name"
                type="text"
                required
                placeholder="আপনার নাম"
                className={field}
                autoComplete="name"
              />
            </Field>
            <Field label="ইমেইল" error={errors.email} htmlFor="cf-email">
              <input
                id="cf-email"
                name="email"
                type="email"
                required
                placeholder="you@email.com"
                className={field}
                autoComplete="email"
              />
            </Field>
          </div>

          <Field label="কোম্পানি (ঐচ্ছিক)" htmlFor="cf-company">
            <input
              id="cf-company"
              name="company"
              type="text"
              placeholder="কোম্পানি বা ব্র্যান্ডের নাম"
              className={field}
              autoComplete="organization"
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="সার্ভিস" htmlFor="cf-type">
              <select
                id="cf-type"
                name="projectType"
                className={cn(field, "appearance-none bg-[right_1rem_center] bg-no-repeat pr-10")}
                style={{ backgroundImage: selectArrow }}
              >
                {projectTypes.map((t) => (
                  <option key={t} value={t} className="bg-ink-900">
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="বাজেট" htmlFor="cf-budget">
              <select
                id="cf-budget"
                name="budget"
                className={cn(field, "appearance-none bg-[right_1rem_center] bg-no-repeat pr-10")}
                style={{ backgroundImage: selectArrow }}
              >
                {budgets.map((b) => (
                  <option key={b} value={b} className="bg-ink-900">
                    {b}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="কী বানাতে চান?" error={errors.message} htmlFor="cf-message">
            <textarea
              id="cf-message"
              name="message"
              required
              rows={5}
              placeholder="আপনার প্রজেক্ট, ডেডলাইন আর যা যা দরকার একটু লিখুন…"
              className={cn(field, "resize-none")}
            />
          </Field>

          {status === "error" && note && (
            <p
              role="alert"
              className="rounded-xl border border-magenta-neon/25 bg-magenta-neon/[0.08] px-4 py-3 text-[12.5px] text-magenta-neon"
            >
              {note}
            </p>
          )}

          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="submit"
              size="lg"
              disabled={status === "sending"}
              icon={status === "sending" ? undefined : <ArrowIcon />}
              className="w-full sm:w-auto"
            >
              {status === "sending" ? (
                <span className="flex items-center gap-2.5">
                  <span className="size-3.5 animate-spin rounded-full border-2 border-ink-950/30 border-t-ink-950" />
                  পাঠাচ্ছি…
                </span>
              ) : (
                "মেসেজ পাঠান"
              )}
            </Button>
            <p className="text-[11.5px] leading-relaxed text-fog-400">
              কোনো স্প্যাম নেই।
              <br className="hidden sm:block" /> ১২ ঘণ্টার মধ্যে রিপ্লাই।
            </p>
          </div>
        </form>
      )}
    </AnimatePresence>
  );
}
