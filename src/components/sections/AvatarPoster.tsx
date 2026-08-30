"use client";

import Image from "next/image";

const BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAUABQDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAYDBAUH/8QAJhAAAgIBBAEDBQEAAAAAAAAAAQIDBBEABRIhMQYTQRQiUWFxgf/EABYBAQEBAAAAAAAAAAAAAAAAAAMEAv/EABsRAQACAwEBAAAAAAAAAAAAAAEAAgMRMSFB/9oADAMBAAIRAxEAPwDR3XdKm3xh7T4LdKo7Zj+APJ0oT+p5ZWCVK0ULMeKmVucn6UdD/dJvVdmSzvsyu2VgRUjXPQGASfyST+hphtEEcU8bIuG9ph3+j/dcYuNbsprsbnrEz//Z";

/**
 * Hero portrait: the real image in a clean frame — subtle border,
 * 10px radius, no colored overlays. Used as the LCP paint on every
 * device (the WebGL orb was removed along with its neon effects).
 */
export default function AvatarPoster() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative aspect-square w-[78%] max-w-[520px]">
        <Image
          src="/avatar.webp"
          alt="Portrait of Maruf Ahmed Raj, web developer and digital marketer"
          width={1024}
          height={1024}
          priority
          fetchPriority="high"
          placeholder="blur"
          blurDataURL={BLUR}
          sizes="(max-width: 1024px) 78vw, 520px"
          className="size-full rounded-[10px] border-2 border-white/30 object-cover shadow-[0_28px_70px_-30px_rgba(0,0,0,0.8)]"
        />
      </div>
    </div>
  );
}
