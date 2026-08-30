"use client";

import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { useScrollState } from "@/lib/hooks";

const Icon = {
  mail: (
    <path
      d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9Zm1.8-.2 6.5 5a1.2 1.2 0 0 0 1.4 0l6.5-5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  whatsapp: (
    <path
      d="M12 3.8a8.2 8.2 0 0 0-7 12.4L4 20.2l4.1-1a8.2 8.2 0 1 0 3.9-15.4Zm4.2 11.4c-.2.5-1 1-1.5 1.1-.4 0-.9.2-2.8-.6-2.4-1-3.9-3.4-4-3.6-.1-.2-1-1.3-1-2.4s.6-1.7.8-1.9c.2-.2.4-.3.6-.3h.4c.2 0 .4 0 .5.4l.7 1.7c0 .2 0 .3-.1.5l-.3.4-.3.3c-.1.1-.2.2 0 .5.2.3.7 1.2 1.5 1.9 1 .9 1.8 1.1 2 1.2.3.1.4.1.6-.1l.7-.8c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3v.7Z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  calendar: (
    <path
      d="M4.5 6.5A1.5 1.5 0 0 1 6 5h12a1.5 1.5 0 0 1 1.5 1.5v12A1.5 1.5 0 0 1 18 20H6a1.5 1.5 0 0 1-1.5-1.5v-12ZM8 3.5v3m8-3v3M4.5 10h15M9 14h2m3 0h1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
  ),
  chat: (
    <path
      d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-4 3.5V16H5.5A1.5 1.5 0 0 1 4 14.5v-9Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  arrowUp: (
    <path
      d="M12 19V6m0 0-5.5 5.5M12 6l5.5 5.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
};

function DockButton({
  href,
  label,
  children,
  accent,
  onClick,
}: {
  href?: string;
  label: string;
  children: React.ReactNode;
  accent: string;
  onClick?: () => void;
}) {
  const Comp = (href ? "a" : "button") as unknown as "a";
  return (
    <Comp
      href={href}
      onClick={onClick}
      {...(href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={label}
      className="group/dock relative grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-fog-200 backdrop-blur-xl transition-all duration-400 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 hover:border-white/25 hover:text-white"
      style={{ ["--accent" as string]: accent }}
    >
      <span
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-400 group-hover/dock:opacity-100"
        style={{ background: `radial-gradient(70% 70% at 50% 100%, ${accent}33, transparent)` }}
      />
      <svg viewBox="0 0 24 24" className="relative size-[18px]">
        {children}
      </svg>
      <span className="pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-ink-900/90 px-2.5 py-1.5 font-mono text-[10px] tracking-[0.14em] text-fog-200 uppercase opacity-0 backdrop-blur-md transition-all duration-300 group-hover/dock:opacity-100">
        {label}
      </span>
    </Comp>
  );
}

export default function StickyCTA() {
  const { y } = useScrollState();
  const show = y > 620;

  return (
    <>
      {/* Desktop vertical dock */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2.5 md:flex"
          >
            <div className="flex flex-col gap-2.5 rounded-[22px] border border-white/[0.08] bg-ink-900/50 p-2 backdrop-blur-2xl">
              <DockButton href={`mailto:${site.email}`} label="Email me" accent="#4fd7ff">
                {Icon.mail}
              </DockButton>
              <DockButton href={site.whatsapp} label="WhatsApp" accent="#5ff2c0">
                {Icon.whatsapp}
              </DockButton>
              <DockButton href={site.facebook} label="Facebook" accent="#8b7cff">
                {Icon.chat}
              </DockButton>
              <span className="mx-2 h-px bg-white/10" />
              <DockButton
                label="Back to top"
                accent="#ffffff"
                onClick={() => window.__lenis?.scrollTo(0, { duration: 1.3 }) ?? window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                {Icon.arrowUp}
              </DockButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom bar */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 70 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-3 bottom-3 z-50 md:hidden"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="flex items-center gap-2 rounded-2xl border border-white/[0.09] bg-ink-900/70 p-2 backdrop-blur-2xl">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-mint-neon"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="size-[18px]">
                  {Icon.whatsapp}
                </svg>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-cyan-neon"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" className="size-[18px]">
                  {Icon.mail}
                </svg>
              </a>
              <a
                href="#contact"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[linear-gradient(100deg,#8ee9ff,#4fd7ff_40%,#8b7cff)] text-sm font-semibold text-ink-950"
              >
                প্রজেক্ট শুরু
                <svg viewBox="0 0 20 20" className="size-4" fill="none">
                  <path d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
