"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useScrollState } from "@/lib/hooks";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";

function Monogram() {
  return (
    <a href="#hero" className="group flex items-center gap-3" title="Back to top">
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-xl border border-white/12 bg-[linear-gradient(140deg,rgba(79,215,255,0.22),rgba(139,124,255,0.14))] backdrop-blur-md">
        <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(140deg,rgba(79,215,255,0.5),rgba(139,124,255,0.3))]" />
        <span className="relative font-display text-[13px] font-bold tracking-tight text-white">
          {site.initials}
        </span>
      </span>
      <span className="hidden flex-col leading-none sm:flex">
        <span className="font-display text-[15px] font-semibold text-white">{site.shortName}</span>
        <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-fog-400 uppercase">
          {site.role}
        </span>
      </span>
    </a>
  );
}

export default function Navbar() {
  const { scrolled, up } = useScrollState(40);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("hero");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  useEffect(() => {
    const ids = ["hero", ...nav.map((n) => n.href.slice(1))];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-[linear-gradient(90deg,#4fd7ff,#8b7cff,#ff5fa2)]"
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: up ? 0 : -110, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[60] px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          className={cn(
            "container-lux flex items-center justify-between rounded-2xl px-3 py-2.5 transition-all duration-500 sm:px-4",
            scrolled
              ? "glass-strong shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]"
              : "border border-transparent bg-transparent",
          )}
        >
          <Monogram />

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const id = item.href.slice(1);
              const isActive = activeId === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300",
                      isActive ? "text-white" : "text-fog-300 hover:text-white",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full border border-white/12 bg-white/[0.07]"
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <span className="mr-1 hidden items-center gap-2 rounded-full border border-mint-neon/20 bg-mint-neon/[0.07] px-3 py-1.5 md:inline-flex">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint-neon opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-mint-neon" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.16em] text-mint-neon uppercase">
                Available
              </span>
            </span>

            <ButtonLink href="#contact" size="sm" className="hidden sm:inline-flex" icon={<ArrowIcon />}>
              প্রজেক্ট শুরু
            </ButtonLink>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-xl border border-white/12 bg-white/[0.05] backdrop-blur-md lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={cn(
                    "absolute left-0 block h-[1.5px] w-4 bg-white transition-all duration-400",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 block h-[1.5px] w-4 bg-white transition-all duration-300",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-[1.5px] w-4 bg-white transition-all duration-400",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[59] bg-ink-950/80 backdrop-blur-2xl lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.ul
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } } }}
              className="container-lux flex h-full flex-col justify-center gap-1 pb-20"
              onClick={(e) => e.stopPropagation()}
            >
              {[{ label: "Home", href: "#hero" }, ...nav].map((item, i) => (
                <motion.li
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
                    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-4 border-b border-white/[0.06] py-4"
                  >
                    <span className="font-mono text-[11px] text-cyan-neon/70">
                      0{i + 1}
                    </span>
                    <span className="font-display text-3xl font-semibold text-white transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2 sm:text-4xl">
                      {item.label}
                    </span>
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                }}
                className="mt-8 flex flex-col gap-3"
              >
                <ButtonLink href="#contact" size="lg" magnetic={false} onClick={() => setOpen(false)} icon={<ArrowIcon />}>
                  প্রজেক্ট শুরু
                </ButtonLink>
                <a
                  href={`mailto:${site.email}`}
                  className="text-center font-mono text-xs tracking-[0.16em] text-fog-300 uppercase"
                >
                  {site.email}
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
