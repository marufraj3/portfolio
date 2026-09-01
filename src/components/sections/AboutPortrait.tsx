"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { about, site } from "@/lib/site";
import { GlassCard } from "@/components/ui/GlassCard";

/** Scroll-parallax portrait card — the interactive island of the About section. */
export default function AboutPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : ["-5%", "5%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [-3.5, 3.5]);
  const avatarSrc = site.avatar || "/avatar.webp";
  const remoteAvatar = /^https?:\/\//i.test(avatarSrc);

  return (
    <div ref={ref} className="relative">
      <motion.div style={{ y }} className="relative mx-auto max-w-[420px] lg:sticky lg:top-32">
        <div className="perspective-1200">
          <motion.div
            style={{ rotate }}
            className="group relative aspect-4/5 overflow-hidden rounded-[28px] border border-white/10 will-change-transform"
          >
            {remoteAvatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarSrc}
                alt="Maruf Ahmed Raj — web developer and digital marketer, in his studio"
                loading="lazy"
                className="size-full scale-[1.08] object-cover object-center transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.14]"
              />
            ) : (
              <Image
                src={avatarSrc}
                alt="Maruf Ahmed Raj — web developer and digital marketer, in his studio"
                width={900}
                height={900}
                sizes="(max-width: 1024px) 80vw, 420px"
                className="size-full scale-[1.08] object-cover object-center transition-transform duration-[1.4s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.14]"
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(4,5,10,0.92)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(79,215,255,0.18),transparent_60%)] mix-blend-screen" />

            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/10 bg-ink-900/70 px-4 py-3 backdrop-blur-xl">
              <div>
                <p className="font-display text-sm font-semibold text-white">Maruf Ahmed Raj</p>
                <p className="font-mono text-[10px] tracking-[0.18em] text-fog-400 uppercase">
                  Mohammadpur · Dhaka
                </p>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-mint-neon/25 bg-mint-neon/10 px-2.5 py-1">
                <span className="size-1.5 rounded-full bg-mint-neon" />
                <span className="font-mono text-[9px] tracking-[0.16em] text-mint-neon uppercase">
                  Open
                </span>
              </span>
            </div>
          </motion.div>
        </div>

        <GlassCard className="mt-5 p-5">
          <dl className="grid gap-3.5">
            {about.highlights.map((h) => (
              <div key={h.k} className="flex items-baseline justify-between gap-4">
                <dt className="font-mono text-[10px] tracking-[0.18em] text-fog-400 uppercase">
                  {h.k}
                </dt>
                <dd className="text-right text-[13px] text-fog-100">{h.v}</dd>
              </div>
            ))}
          </dl>
        </GlassCard>
      </motion.div>
    </div>
  );
}
