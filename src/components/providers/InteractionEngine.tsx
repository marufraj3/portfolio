"use client";

import { useEffect } from "react";

/**
 * One client component powers every micro-interaction on the page:
 * scroll reveals, card spotlights, 3D tilt and magnetic buttons.
 *
 * Sections stay React Server Components (zero hydration cost) and simply
 * emit data-attributes; this engine attaches a handful of delegated,
 * rAF-throttled listeners. That is the difference between hydrating
 * ~90 client components and hydrating one.
 */
export default function InteractionEngine() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    /* ---------------- Scroll reveals ---------------- */
    if (reduced) {
      document
        .querySelectorAll("[data-reveal],[data-split],[data-stagger]")
        .forEach((el) => el.classList.add("is-in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              io.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.1 },
      );

      const observeAll = () =>
        document
          .querySelectorAll("[data-reveal]:not(.is-in),[data-split]:not(.is-in),[data-stagger]:not(.is-in)")
          .forEach((el) => io.observe(el));

      observeAll();

      // Anything rendered later (accordions, form states) joins automatically.
      const mo = new MutationObserver(() => observeAll());
      mo.observe(document.body, { childList: true, subtree: true });

      cleanups.push(() => {
        io.disconnect();
        mo.disconnect();
      });
    }

    /* ---------------- Pointer-driven effects ---------------- */
    if (fine && !reduced) {
      let frame = 0;
      let lastEvent: PointerEvent | null = null;
      let tilted: HTMLElement | null = null;
      let magnet: HTMLElement | null = null;

      const apply = () => {
        frame = 0;
        const e = lastEvent;
        if (!e) return;
        const target = e.target as HTMLElement | null;
        if (!target?.closest) return;

        // Spotlight on glass cards
        const card = target.closest<HTMLElement>(".spotlight-card");
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        }

        // 3D tilt
        const tilt = target.closest<HTMLElement>("[data-tilt]");
        if (tilted && tilted !== tilt) {
          tilted.style.setProperty("--rx", "0deg");
          tilted.style.setProperty("--ry", "0deg");
          tilted.style.setProperty("--tz", "0px");
          tilted.classList.remove("is-tilting");
          tilted = null;
        }
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const max = Number(tilt.dataset.tilt || 7);
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          tilt.style.setProperty("--rx", `${(-py * max * 2).toFixed(2)}deg`);
          tilt.style.setProperty("--ry", `${(px * max * 2).toFixed(2)}deg`);
          tilt.style.setProperty("--tz", "6px");
          tilt.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
          tilt.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
          tilt.classList.add("is-tilting");
          tilted = tilt;
        }

        // Magnetic buttons
        const mag = target.closest<HTMLElement>("[data-magnetic]");
        if (magnet && magnet !== mag) {
          magnet.style.setProperty("--mgx", "0px");
          magnet.style.setProperty("--mgy", "0px");
          magnet.classList.remove("is-magnetic");
          magnet = null;
        }
        if (mag) {
          const r = mag.getBoundingClientRect();
          const strength = Number(mag.dataset.magnetic || 0.3);
          mag.style.setProperty("--mgx", `${((e.clientX - (r.left + r.width / 2)) * strength).toFixed(1)}px`);
          mag.style.setProperty("--mgy", `${((e.clientY - (r.top + r.height / 2)) * strength).toFixed(1)}px`);
          mag.classList.add("is-magnetic");
          magnet = mag;
        }
      };

      const onMove = (e: PointerEvent) => {
        lastEvent = e;
        if (!frame) frame = requestAnimationFrame(apply);
      };

      const onLeave = () => {
        if (tilted) {
          tilted.style.setProperty("--rx", "0deg");
          tilted.style.setProperty("--ry", "0deg");
          tilted.style.setProperty("--tz", "0px");
          tilted.classList.remove("is-tilting");
          tilted = null;
        }
        if (magnet) {
          magnet.style.setProperty("--mgx", "0px");
          magnet.style.setProperty("--mgy", "0px");
          magnet.classList.remove("is-magnetic");
          magnet = null;
        }
      };

      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);

      cleanups.push(() => {
        if (frame) cancelAnimationFrame(frame);
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("blur", onLeave);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
