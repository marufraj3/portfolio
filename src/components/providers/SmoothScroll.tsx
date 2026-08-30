"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

function onIdle(cb: () => void, timeout = 1600) {
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    cancelIdleCallback?: (h: number) => void;
  };
  if (typeof w.requestIdleCallback === "function") {
    const id = w.requestIdleCallback(cb, { timeout });
    return () => w.cancelIdleCallback?.(id);
  }
  const t = window.setTimeout(cb, 400);
  return () => window.clearTimeout(t);
}

/**
 * Lenis + GSAP ScrollTrigger share one RAF loop, and both libraries are
 * code-split out of the critical path — they load once the browser is
 * idle, so first paint never pays for them.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    const boot = async () => {
      if (disposed) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const [{ default: LenisCtor }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new LenisCtor({
        lerp: 0.085,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
      });

      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      const onClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
        if (!target) return;
        const id = target.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -84, duration: 1.35 });
        history.replaceState(null, "", id);
      };

      document.addEventListener("click", onClick);
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      const t = window.setTimeout(refresh, 600);

      cleanup = () => {
        document.removeEventListener("click", onClick);
        window.removeEventListener("load", refresh);
        window.clearTimeout(t);
        gsap.ticker.remove(raf);
        lenis.destroy();
        delete window.__lenis;
      };
    };

    const cancelIdle = onIdle(() => void boot());

    return () => {
      disposed = true;
      cancelIdle();
      cleanup?.();
    };
  }, []);

  return <>{children}</>;
}
