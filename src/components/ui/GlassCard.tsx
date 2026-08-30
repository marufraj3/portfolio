import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Glassmorphism surface with a hairline gradient border and a
 * cursor-tracking spotlight. The pointer math is handled globally by
 * InteractionEngine, so this stays a zero-JS server component.
 */
export function GlassCard({
  children,
  className,
  as: TagProp = "div",
  interactive = true,
  strong = false,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  interactive?: boolean;
  strong?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  const Tag = TagProp as unknown as "div";

  return (
    <Tag
      className={cn(
        strong ? "glass-strong" : "glass",
        "lux-border relative rounded-3xl",
        interactive && "spotlight-card card-lift",
        className,
      )}
      {...rest}
    >
      <div className="relative z-3 h-full">{children}</div>
    </Tag>
  );
}

/** Small frosted pill used for eyebrows, tags and status chips. */
export function Chip({
  children,
  className,
  dot,
}: {
  children: ReactNode;
  className?: string;
  dot?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3.5 py-1.5",
        "font-mono text-[11px] tracking-[0.18em] text-fog-300 uppercase backdrop-blur-md",
        className,
      )}
    >
      {dot && (
        <span className="relative flex size-1.5">
          <span
            className="absolute inline-flex size-full animate-ping rounded-full opacity-70"
            style={{ background: dot }}
          />
          <span
            className="relative inline-flex size-1.5 rounded-full"
            style={{ background: dot, boxShadow: `0 0 10px ${dot}` }}
          />
        </span>
      )}
      {children}
    </span>
  );
}
