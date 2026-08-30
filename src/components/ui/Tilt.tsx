import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 3D tilt surface. Rotation is written to CSS custom properties by the
 * global InteractionEngine and applied by the compositor — no per-card
 * JavaScript, no re-renders, steady 60fps.
 */
export function Tilt({
  children,
  className,
  max = 7,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  glare?: boolean;
}) {
  return (
    <div data-tilt={max} className={cn("tilt-surface", className)}>
      {children}
      {glare && <span aria-hidden className="tilt-glare" />}
    </div>
  );
}
