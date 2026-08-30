"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import AvatarPoster from "./AvatarPoster";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

type NavigatorLike = Navigator & {
  connection?: { saveData?: boolean; effectiveType?: string };
  deviceMemory?: number;
};

/**
 * Only spend a WebGL context (and ~500KB of JS) where it genuinely
 * improves the experience: pointer-driven, wide, powered devices.
 * Everywhere else the CSS poster *is* the experience — same art
 * direction, a fraction of the cost.
 */
function shouldRender3D() {
  if (typeof window === "undefined") return false;
  const nav = navigator as NavigatorLike;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (nav.connection?.saveData) return false;
  if (nav.connection?.effectiveType && /2g/.test(nav.connection.effectiveType)) return false;
  if ((nav.hardwareConcurrency ?? 8) < 4) return false;
  if ((nav.deviceMemory ?? 8) < 4) return false;
  if (!window.matchMedia("(min-width: 1024px)").matches) return false;
  if (!window.matchMedia("(pointer: fine)").matches) return false;

  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return false;
  } catch {
    return false;
  }

  return true;
}

export default function HeroVisual() {
  const [mount3D, setMount3D] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!shouldRender3D()) return;

    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (h: number) => void;
    };

    const start = () => setMount3D(true);

    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(start, { timeout: 2200 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(start, 700);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="absolute inset-0">
      <AvatarPoster dim={ready} />
      {mount3D && <HeroScene onLoaded={() => setReady(true)} />}
    </div>
  );
}
