"use client";

import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import AvatarOrb from "./AvatarOrb";
import Particles from "./Particles";
import { BackGlow, NeonLights, Rings } from "./Decor";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/hooks";

/** Scales the whole rig so the composition holds from 360px to 4K. */
function ResponsiveRig({ children, pointer }: { children: ReactNode; pointer: React.RefObject<THREE.Vector2> }) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const s = Math.min(1.12, Math.max(0.62, viewport.width / 5.6));

  useFrame((state, delta) => {
    if (!group.current) return;
    // Whole-rig counter-parallax adds depth between layers.
    const p = pointer.current;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, p.x * 0.12, 2.4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -p.y * 0.1, 2.4, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, p.x * 0.08, 2, delta);
  });

  return (
    <group ref={group} scale={s}>
      {children}
    </group>
  );
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    const id = requestAnimationFrame(onReady);
    return () => cancelAnimationFrame(id);
  }, [onReady]);
  return null;
}

export default function HeroScene({ onLoaded }: { onLoaded?: () => void }) {
  const pointer = useRef(new THREE.Vector2(0, 0));
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();

  // Pointer tracking, ref-only so React never re-renders on move.
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        pointer.current.set(
          (e.clientX / window.innerWidth) * 2 - 1,
          -((e.clientY / window.innerHeight) * 2 - 1),
        );
        raf = 0;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Gyro drift on touch devices so the scene still reacts.
  useEffect(() => {
    if (!isMobile || reduced) return;
    const onTilt = (e: DeviceOrientationEvent) => {
      const g = (e.gamma ?? 0) / 45;
      const b = ((e.beta ?? 45) - 45) / 45;
      pointer.current.set(THREE.MathUtils.clamp(g, -1, 1), THREE.MathUtils.clamp(-b, -1, 1));
    };
    window.addEventListener("deviceorientation", onTilt);
    return () => window.removeEventListener("deviceorientation", onTilt);
  }, [isMobile, reduced]);

  // Only render frames while the hero is on screen.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.02 });
    io.observe(el);
    const onVis = () => setActive(!document.hidden && !!wrap.current);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 42, near: 0.1, far: 40 }}
        dpr={[1, isMobile ? 1.6 : 2]}
        frameloop={active && !reduced ? "always" : "demand"}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearAlpha(0);
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.06;
        }}
        style={{ pointerEvents: "none" }}
      >
        <Suspense fallback={null}>
          <NeonLights />
          <ResponsiveRig pointer={pointer}>
            <BackGlow />
            <Rings />
            <AvatarOrb pointer={pointer} />
            <Particles count={isMobile ? 520 : 1200} pointer={pointer} />
          </ResponsiveRig>
          <Ready onReady={() => onLoaded?.()} />
        </Suspense>
      </Canvas>
    </div>
  );
}
