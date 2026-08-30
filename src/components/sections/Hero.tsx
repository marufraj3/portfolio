"use client";

import { motion, useReducedMotion } from "framer-motion";
import { clients, marqueeWords, site } from "@/lib/site";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/GlassCard";
import HeroVisual from "./HeroVisual";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.085, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 26, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

function Stars() {
  return (
    <span className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5 stars" >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="size-3.5 fill-cyan-neon">
          <path d="m10 1.6 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7 1-5.6-4.1-4 5.6-.8L10 1.6Z" />
        </svg>
      ))}
    </span>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden pt-20 sm:pt-28 lg:pt-0"
    >
      {/* 3D avatar layer */}
      <div className="pointer-events-none absolute inset-x-0 top-[2svh] h-[34svh] sm:top-[5svh] sm:h-[42svh] lg:inset-y-0 lg:left-auto lg:right-[-4%] lg:h-full lg:w-[54%]">
        <HeroVisual />
      </div>

      <div className="container-lux relative z-10 flex flex-1 items-end pb-6 lg:items-center lg:pb-0">
        <motion.div
          variants={container}
          initial={reduced ? undefined : "hidden"}
          animate={reduced ? undefined : "show"}
          className="mt-[28svh] w-full max-w-2xl sm:mt-[44svh] lg:mt-0 lg:max-w-[52%]"
        >
          <motion.div variants={item}>
            <Chip dot="#5ff2c0" className="mb-5 sm:mb-6">
              {site.availability} · {site.location}
            </Chip>
          </motion.div>

          <motion.p variants={item} className="mb-3 font-mono text-[11px] tracking-[0.22em] text-cyan-neon/80 uppercase sm:mb-4 sm:text-xs">
            Hi, I&rsquo;m {site.name}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-[clamp(2.6rem,7.2vw,5.1rem)] font-bold leading-[0.95] tracking-[-0.045em]"
          >
            <span className="block text-gradient-soft">I build websites</span>
            <span className="block text-gradient">that bring you</span>
            <span className="relative block">
              <span className="text-gradient-soft">real customers.</span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 1.05, ease: EASE }}
                className="absolute -bottom-1 left-0 h-[3px] w-[46%] origin-left rounded-full bg-[linear-gradient(90deg,#4fd7ff,#8b7cff,transparent)]"
              />
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-[15px] leading-relaxed text-fog-300 sm:mt-7 sm:text-[17px]"
          >
            ওয়েব ডেভেলপার আর ডিজিটাল মার্কেটার। আইডিয়া থেকে লঞ্চ পর্যন্ত সব করি —{" "}
            <span className="text-fog-100">PHP, Laravel, JavaScript</span> দিয়ে ওয়েবসাইট বানাই,
            আর Facebook/Google অ্যাড দিয়ে আসল কাস্টমার আনি। একদম কম খরচে।
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-2.5 sm:mt-9 sm:gap-3">
            <ButtonLink
              href="#contact"
              size="md"
              className="sm:h-[54px] sm:px-8 sm:text-[15px]"
              icon={<ArrowIcon />}
            >
              প্রজেক্ট শুরু করি
            </ButtonLink>
            <ButtonLink
              href="#work"
              variant="outline"
              size="md"
              className="sm:h-[54px] sm:px-8 sm:text-[15px]"
            >
              <span className="flex items-center gap-2.5">
                <span className="grid size-5 place-items-center rounded-full border border-white/25">
                  <svg viewBox="0 0 12 12" className="size-2 fill-white" aria-hidden>
                    <path d="M3 1.5 9.5 6 3 10.5V1.5Z" />
                  </svg>
                </span>
                <span className="sm:hidden">কাজ দেখুন</span>
                <span className="hidden sm:inline">আমার কাজ দেখুন</span>
              </span>
            </ButtonLink>
          </motion.div>

          {/* Social proof strip */}
          <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-10 sm:gap-x-7 sm:gap-y-4">
            <div className="flex items-center gap-3">
              <Stars />
              <span className="text-[13px] text-fog-300">
                <span className="font-semibold text-white">5.0</span> রেটিং
              </span>
            </div>
            <span className="hidden h-4 w-px bg-white/12 sm:block" />
            <div className="flex items-center gap-2.5">
              <span className="font-display text-lg font-bold text-white">60+</span>
              <span className="max-w-[110px] text-[12px] leading-tight text-fog-400">
                প্রজেক্ট সম্পন্ন
              </span>
            </div>
            <span className="hidden h-4 w-px bg-white/12 sm:block" />
            <div className="hidden items-center gap-2.5 sm:flex">
              <span className="font-display text-lg font-bold text-white">3+</span>
              <span className="max-w-[120px] text-[12px] leading-tight text-fog-400">
                বছরের অভিজ্ঞতা
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom rail: marquee + scroll cue */}
      <div className="relative z-10 w-full">
        <div className="container-lux mb-5 hidden items-center justify-between lg:flex">
          <a
            href="#about"
            className="group flex items-center gap-3 text-fog-400 transition-colors hover:text-white"
            aria-label="Scroll to about section"
          >
            <span className="relative grid h-9 w-[22px] place-items-start overflow-hidden rounded-full border border-white/15 pt-1.5">
              <motion.span
                animate={reduced ? undefined : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
                className="size-1 rounded-full bg-cyan-neon"
              />
            </span>
            <span className="font-mono text-[10px] tracking-[0.24em] uppercase">Scroll</span>
          </a>
          <div className="flex items-center gap-4 font-mono text-[10px] tracking-[0.22em] text-fog-400 uppercase">
            <span>{site.timezone}</span>
            <span className="h-px w-10 bg-white/15" />
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-cyan-neon">
              {site.email}
            </a>
          </div>
        </div>

        <div className="relative border-y border-white/[0.06] bg-white/[0.015] py-4 backdrop-blur-sm">
          <div className="marquee-mask flex overflow-hidden">
            <div className="flex shrink-0 animate-[marquee_46s_linear_infinite] items-center gap-10 pr-10 will-change-transform">
              {[...clients, ...marqueeWords, ...clients, ...marqueeWords].map((c, i) => (
                <span
                  key={`${c}-${i}`}
                  className="flex shrink-0 items-center gap-10 font-display text-sm font-semibold tracking-[0.14em] text-fog-400 uppercase transition-colors hover:text-white"
                >
                  {c}
                  <span className="size-1 rounded-full bg-cyan-neon/40" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
