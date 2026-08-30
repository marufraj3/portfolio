"use client";

import { useEffect, useRef } from "react";

/**
 * The only interactive island in the Process section: a GSAP-scrubbed
 * progress rail plus pop-in nodes. GSAP is imported lazily so it never
 * touches the first-load bundle.
 */
export default function ProcessRail({ scope = "#process-timeline" }: { scope?: string }) {
  const line = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;
    let disposed = false;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;

      const root = document.querySelector(scope);
      if (!root) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          line.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: root, start: "top 72%", end: "bottom 78%", scrub: 0.6 },
          },
        );

        gsap.utils.toArray<HTMLElement>("[data-node]").forEach((node) => {
          gsap.fromTo(
            node,
            { scale: 0.2, opacity: 0.3 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: { trigger: node, start: "top 80%", toggleActions: "play none none reverse" },
            },
          );
        });
      }, root as HTMLElement);
    })();

    return () => {
      disposed = true;
      ctx?.revert();
    };
  }, [scope]);

  return (
    <div className="absolute left-[19px] top-2 h-full w-px bg-white/[0.08] lg:left-1/2 lg:-translate-x-1/2">
      <span
        ref={line}
        className="absolute inset-0 origin-top bg-[linear-gradient(180deg,#4fd7ff,#8b7cff_55%,#ff5fa2)] shadow-[0_0_18px_rgba(79,215,255,0.55)]"
      />
    </div>
  );
}
