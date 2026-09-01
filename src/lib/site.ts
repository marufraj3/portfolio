import content from "@/content/site.json";

/**
 * All editable site content lives in `src/content/site.json`.
 * The admin panel (/admin) edits that file — in dev the site hot-
 * reloads instantly; on Vercel a save commits the file to GitHub and
 * the site redeploys with the new content.
 *
 * This module keeps the same exports the components already import,
 * just typed and sourced from the JSON file.
 */

export type Social = { label: string; href: string; handle: string };

export type SiteInfo = {
  name: string;
  shortName: string;
  initials: string;
  role: string;
  tagline: string;
  location: string;
  timezone: string;
  url: string;
  email: string;
  phone: string;
  whatsapp: string;
  facebook: string;
  resume: string;
  availability: string;
  avatar?: string;
  avatarCircle?: string;
  ogImage?: string;
  socials: Social[];
};

export type MediaFile = {
  name: string;
  url: string;
  size: number;
  type: string;
};

export const site = content.site as SiteInfo;

export const nav = content.nav as { label: string; href: string }[];

export const stats = content.stats as {
  value: number;
  suffix: string;
  label: string;
  sub: string;
}[];

export const marqueeWords = content.marqueeWords as string[];

export const clients = content.clients as string[];

export const about = content.about as {
  eyebrow: string;
  heading: string;
  body: string[];
  highlights: { k: string; v: string }[];
  principles: { title: string; body: string }[];
};

export type SkillGroup = {
  title: string;
  blurb: string;
  accent: string;
  items: { name: string; level: number }[];
};

export const skillGroups = content.skillGroups as SkillGroup[];

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  challenge: string;
  solution: string;
  metrics: { label: string; value: string }[];
  stack: string[];
  accent: string;
  featured?: boolean;
  demoLink?: string;
  image?: string;
  screenshot?: string;
};

export const projects = content.projects as Project[];

export type Service = {
  title: string;
  price: string;
  timeline: string;
  description: string;
  includes: string[];
  popular?: boolean;
  icon: "code" | "cart" | "megaphone" | "bot" | "palette" | "gauge" | "clipboard" | "panel";
};

export const services = content.services as Service[];

export const testimonials = content.testimonials as {
  quote: string;
  name: string;
  title: string;
  company: string;
  rating: number;
}[];

export const processSteps = content.processSteps as {
  step: string;
  title: string;
  duration: string;
  body: string;
  deliverables: string[];
}[];

export const faqs = content.faqs as { q: string; a: string }[];
