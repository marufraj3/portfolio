"use client";

import Image from "next/image";
import { seeded } from "@/lib/utils";
import { site } from "@/lib/site";

const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYDBAUH/8QAJhAAAgIBBAEDBQEAAAAAAAAAAQIDBBEABRIhMQYTQRQiUWFxgf/EABYBAQEBAAAAAAAAAAAAAAAAAAMEAv/EABsRAQACAwEBAAAAAAAAAAAAAAEAAgMRMSFB/9oADAMBAAIRAxEAPwDR3XdKm3xh7T4LdKo7Zj+APJ0oT+p5ZWCVK0ULMeKmVucn6UdD/dJvVdmSzvsyu2VgRUjXPQGASfyST+hphtEEcU8bIuG9ph3+j/dcYuNbsprsbnrEz//Z";

const rand = seeded(97531);
const dots = Array.from({ length: 22 }, (_, i) => ({
  // Orbit radius: this far beyond the frame edge, as % of the box,
  // so the particles are visible around the portrait at every size.
  offset: 4 + rand() * 10,
  size: 2 + rand() * 3.5,
  duration: 14 + rand() * 18,
  delay: -rand() * 20,
  color: i % 5 === 0 ? "#8b7cff" : i % 3 === 0 ? "#ffffff" : "#4fd7ff",
  reverse: i % 2 === 0,
}));

/**
 * Avatar presentation: the circular portrait over its animated
 * background (ambient halo, rim light sweep, orbit ring + particles),
 * with no border/frame around it. Nothing sits on the portrait
 * itself, and the page background shows through the corners.
 */
export default function AvatarPoster() {
  const avatarSrc = site.avatarCircle || "/avatar-circle.webp";
  const remoteAvatar = /^https?:\/\//i.test(avatarSrc);

  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative aspect-square w-[78%] max-w-[520px]">
        {/* Ambient halo */}
        <div
          aria-hidden
          className="absolute -inset-[22%] motion-safe:animate-[float-slow_9s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(31,124,214,0.38) 0%, rgba(109,91,255,0.16) 40%, rgba(79,215,255,0.05) 58%, transparent 72%)",
          }}
        />

        {/* Conic sweep ring */}
        <div
          aria-hidden
          className="absolute -inset-[6%] rounded-full opacity-60 motion-safe:animate-[spin_26s_linear_infinite]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(79,215,255,0.55) 60deg, transparent 130deg, transparent 230deg, rgba(139,124,255,0.45) 300deg, transparent 360deg)",
            // Ring hugs the portrait rim (~50–53% of the box), like the original.
            maskImage: "radial-gradient(circle, transparent 63%, #000 64%, #000 66%, transparent 67%)",
            WebkitMaskImage: "radial-gradient(circle, transparent 63%, #000 64%, #000 66%, transparent 67%)",
          }}
        />

        {/* Tilted orbital ellipse */}
        <div
          aria-hidden
          className="absolute -inset-[16%] rounded-[50%] border border-cyan-neon/15 motion-safe:animate-[spin_38s_linear_infinite_reverse]"
          style={{ transform: "rotateX(72deg)" }}
        />

        {/* Orbiting particles */}
        <div aria-hidden className="absolute inset-0">
          {dots.map((d, i) => (
            <span
              key={i}
              className="absolute inset-0 motion-safe:animate-[spin_var(--dur)_linear_infinite]"
              style={{
                ["--dur" as string]: `${d.duration}s`,
                animationDelay: `${d.delay}s`,
                animationDirection: d.reverse ? "reverse" : "normal",
              }}
            >
              <span
                className="absolute left-1/2 block rounded-full"
                style={{
                  top: `-${d.offset}%`,
                  width: d.size,
                  height: d.size,
                  background: d.color,
                  boxShadow: `0 0 ${d.size * 3}px ${d.color}`,
                  transform: "translate(-50%, -50%)",
                  opacity: 0.85,
                }}
              />
            </span>
          ))}
        </div>

        {/* Portrait — circular photo inside the framed animated backdrop */}
        {remoteAvatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarSrc}
            alt="Portrait of Maruf Ahmed Raj, web developer and digital marketer"
            loading="eager"
            className="relative size-full rounded-[10px] object-cover"
          />
        ) : (
          <Image
            src={avatarSrc}
            alt="Portrait of Maruf Ahmed Raj, web developer and digital marketer"
            width={800}
            height={800}
            priority
            fetchPriority="high"
            placeholder="blur"
            blurDataURL={BLUR}
            sizes="(max-width: 1024px) 78vw, 520px"
            className="relative size-full rounded-[10px] object-cover"
          />
        )}
      </div>
    </div>
  );
}
