import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Web Developer & Digital Marketer`,
    short_name: site.shortName,
    description:
      "Maruf Ahmed Raj — affordable web development, digital marketing, e-commerce, AI automation and SMM services in Dhaka, Bangladesh.",
    start_url: "/",
    display: "standalone",
    background_color: "#04050a",
    theme_color: "#04050a",
    icons: [
      { src: "/icon.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
