"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";

/**
 * Fixed atmosphere layer. Every glow is a radial-gradient rather than a
 * blurred element: gradients rasterise in a fraction of the time of a
 * `filter: blur(120px)` layer, which matters a lot on mobile GPUs.
 * Motion is transform/opacity only, so it never touches layout.
 */
export default function Background() {
  const halo = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let tx = 0.5;
    let ty = 0.35;
    let cx = 0.5;
    let cy = 0.35;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight;
    };

    const tick = () => {
      const dx = tx - cx;
      const dy = ty - cy;
      if (Math.abs(dx) > 0.0005 || Math.abs(dy) > 0.0005) {
        cx += dx * 0.05;
        cy += dy * 0.05;
        if (halo.current) {
          halo.current.style.transform = `translate3d(${(cx * 100).toFixed(2)}vw, ${(cy * 100).toFixed(2)}vh, 0) translate(-50%, -50%)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* Base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#0b1526_0%,#06070e_45%,#04050a_100%)]" />

      {/* Aurora fields — pure gradients, animated on the compositor */}
      <div
        className="absolute -top-[26vh] left-[-14vw] size-[70vw] will-change-transform motion-safe:animate-[aurora_26s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(31,124,214,0.30) 0%, rgba(31,124,214,0.12) 32%, rgba(31,124,214,0.03) 55%, transparent 72%)",
        }}
      />
      <div
        className="absolute top-[14vh] right-[-18vw] size-[62vw] will-change-transform motion-safe:animate-[aurora_34s_ease-in-out_infinite_reverse]"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(124,92,255,0.26) 0%, rgba(124,92,255,0.10) 34%, rgba(124,92,255,0.03) 56%, transparent 72%)",
        }}
      />
      <div
        className="absolute bottom-[-24vh] left-[18vw] size-[58vw] will-change-transform motion-safe:animate-[aurora_42s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(255,95,162,0.16) 0%, rgba(255,95,162,0.06) 36%, transparent 68%)",
        }}
      />

      {/* Cursor halo (desktop only) */}
      <div
        ref={halo}
        className="absolute left-0 top-0 hidden size-[46vw] max-w-[760px] will-change-transform lg:block"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(99,216,255,0.13) 0%, rgba(99,216,255,0.05) 35%, transparent 66%)",
        }}
      />

      {/* Grid */}
      <div className="grid-lines absolute inset-0 opacity-70" />

      {/* Vignette + grain */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_50%,transparent_45%,rgba(2,3,6,0.85)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-soft-light"
        style={{ backgroundImage: "url(/noise.png)", backgroundSize: "128px 128px" }}
      />
    </div>
  );
}
