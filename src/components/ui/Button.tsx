import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Universal (server-safe) buttons. The magnetic pull is delegated to the
   global InteractionEngine via `data-magnetic`, so these render as plain
   HTML with zero hydration cost inside server sections. */

type Common = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  magnetic?: boolean;
};

const sizes = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-12 px-6 text-sm",
  lg: "h-[54px] px-8 text-[15px]",
};

function skin(variant: Common["variant"]) {
  switch (variant) {
    case "ghost":
      return "text-fog-200 hover:text-white bg-transparent border border-transparent hover:border-white/12 hover:bg-white/[0.04]";
    case "outline":
      return "text-white glass hover:border-white/25";
    default:
      return "text-ink-950 bg-[linear-gradient(100deg,#8ee9ff_0%,#4fd7ff_38%,#8b7cff_100%)] shadow-[0_10px_40px_-12px_rgba(79,215,255,0.65)] hover:shadow-[0_18px_60px_-14px_rgba(79,215,255,0.9)]";
  }
}

const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium transition-[transform,box-shadow,background,border-color,color] duration-400 ease-[cubic-bezier(.16,1,.3,1)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

function Sheen({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.65),transparent)] transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-full" />
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  magnetic = true,
  external,
  ...rest
}: Common & { href: string; external?: boolean } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <span className="magnet inline-flex" {...(magnetic ? { "data-magnetic": 0.28 } : {})}>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={cn(base, sizes[size], skin(variant), className)}
        {...rest}
      >
        <Sheen show={variant === "primary"} />
        <span className="relative z-10 flex items-center gap-2.5">
          {children}
          {icon}
        </span>
      </a>
    </span>
  );
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  magnetic = false,
  ...rest
}: Common & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <span
      className={cn(
        "magnet inline-flex",
        className && /\bw-full\b/.test(className) && "w-full sm:w-auto",
      )}
      {...(magnetic ? { "data-magnetic": 0.24 } : {})}
    >
      <button className={cn(base, sizes[size], skin(variant), className)} {...rest}>
        <Sheen show={variant === "primary"} />
        <span className="relative z-10 flex items-center gap-2.5">
          {children}
          {icon}
        </span>
      </button>
    </span>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={cn(
        "size-4 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-1",
        className,
      )}
    >
      <path
        d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
