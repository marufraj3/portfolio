"use client";

import { cn } from "@/lib/utils";
import { Reveal, SplitWords } from "./Reveal";

export function Section({
  id,
  children,
  className,
  container = true,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  container?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 py-24 sm:py-32 lg:py-40", className)}
    >
      {container ? <div className="container-lux relative">{children}</div> : children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <Reveal>
        <div className={cn("mb-5 flex items-center gap-3", align === "center" && "justify-center")}>
          <span className="h-px w-8 bg-[linear-gradient(90deg,transparent,#4fd7ff)]" />
          <span className="font-mono text-[11px] tracking-[0.24em] text-cyan-neon/85 uppercase">
            {eyebrow}
          </span>
        </div>
      </Reveal>

      <SplitWords
        as="h2"
        text={title}
        className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.04em] text-gradient-soft"
      />

      {highlight && (
        <SplitWords
          as="h3"
          text={highlight}
          delay={0.12}
          className="font-display text-[clamp(2rem,4.6vw,3.5rem)] font-bold leading-[1.03] tracking-[-0.04em] text-gradient"
        />
      )}

      {description && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "mt-6 max-w-2xl text-[15px] leading-relaxed text-fog-300 sm:text-base",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
