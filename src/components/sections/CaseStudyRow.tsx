"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** The expandable case-study drawer — the only stateful part of a project row. */
export default function CaseStudyDisclosure({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("", className)}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="group/btn inline-flex items-center gap-2.5 text-[13px] font-medium text-white transition-colors hover:text-cyan-neon"
      >
        <span className="grid size-7 place-items-center rounded-full border border-white/15 transition-colors group-hover/btn:border-cyan-neon/50">
          <motion.svg
            viewBox="0 0 12 12"
            className="size-3 fill-current"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            aria-hidden
          >
            <path d="M5.25 1.5h1.5v9h-1.5z" />
            <path d="M1.5 5.25h9v1.5h-9z" />
          </motion.svg>
        </span>
        {open ? "Hide case study" : "Read the case study"}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mt-5 grid gap-4 border-t border-white/[0.07] pt-5 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-fog-400 uppercase">
                  The challenge
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-fog-300">
                  {project.challenge}
                </p>
              </div>
              <div>
                <p
                  className="font-mono text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: project.accent }}
                >
                  What I built
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-fog-300">
                  {project.solution}
                </p>
              </div>
            </div>

            {project.screenshot && (
              <div className="mt-5 border-t border-white/[0.07] pt-5">
                <p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-fog-400 uppercase">
                  Screenshot
                </p>
                <div className="aspect-16/10 w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-ink-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.screenshot}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
