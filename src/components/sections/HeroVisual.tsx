"use client";

import AvatarPoster from "./AvatarPoster";

/**
 * The hero portrait is a single clean, bordered image on every device.
 * The previous WebGL orb (neon rings, particles, color grading) was
 * removed so the portrait stays color-free inside its frame — and the
 * page ships without the ~500KB of 3D JavaScript.
 */
export default function HeroVisual() {
  return (
    <div className="absolute inset-0">
      <AvatarPoster />
    </div>
  );
}
