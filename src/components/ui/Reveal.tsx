import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Server components. All motion is CSS; a single global IntersectionObserver
   (see InteractionEngine) adds `.is-in` when the element enters the viewport. */

type Dir = "up" | "down" | "left" | "right" | "none";

export function Reveal({
  children,
  className,
  delay = 0,
  duration,
  direction = "up",
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Dir;
  as?: ElementType;
  style?: React.CSSProperties;
}) {
  const Comp = Tag as unknown as "div";
  return (
    <Comp
      data-reveal={direction}
      className={className}
      style={{
        ...style,
        transitionDelay: delay ? `${delay}s` : undefined,
        transitionDuration: duration ? `${duration}s` : undefined,
      }}
    >
      {children}
    </Comp>
  );
}

/** Headline that lifts in word by word. */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const Comp = Tag as unknown as "h2";
  const words = text.split(" ");

  return (
    <Comp data-split className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-flex overflow-hidden pb-[0.1em] align-bottom">
          <span
            className={cn("inline-block", wordClassName)}
            style={{ transitionDelay: `${(delay + i * stagger).toFixed(3)}s` }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Comp>
  );
}

export function StaggerGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <div
      data-stagger
      className={className}
      style={
        {
          "--stagger": `${stagger}s`,
          "--stagger-delay": `${delay}s`,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div data-stagger-item className={className}>
      {children}
    </div>
  );
}
