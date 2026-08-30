import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono, Hind_Siliguri } from "next/font/google";
import { site } from "@/lib/site";
import InteractionEngine from "@/components/providers/InteractionEngine";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jet = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mono-jet",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

// Bengali glyphs fall through to Hind Siliguri; Latin stays on Sora/Inter.
const hind = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const description =
  "Maruf Ahmed Raj — Web developer & digital marketer in Dhaka, Bangladesh. Affordable websites, e-commerce, Facebook & Google ads, AI automation, SEO and SMM panel services.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Web Developer & Digital Marketer`,
    template: `%s — ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Maruf Ahmed Raj",
    "web developer Bangladesh",
    "digital marketing Bangladesh",
    "Laravel developer",
    "PHP developer Dhaka",
    "Facebook ads expert",
    "e-commerce website Bangladesh",
    "AI automation",
    "SMM panel",
    "website redesign",
    "freelancer Dhaka",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — Web Developer & Digital Marketer`,
    description,
    siteName: site.name,
    locale: "en_US",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Web Developer & Digital Marketer`,
    description,
    images: ["/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#04050a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      url: site.url,
      image: `${site.url}/avatar.jpg`,
      jobTitle: "Web Developer & Digital Marketer",
      email: `mailto:${site.email}`,
      address: { "@type": "PostalAddress", addressLocality: "Mohammadpur, Dhaka", addressCountry: "BD" },
      sameAs: site.socials.map((s) => s.href),
      knowsAbout: [
        "Web Development",
        "PHP",
        "Laravel",
        "JavaScript",
        "MySQL",
        "Digital Marketing",
        "Facebook Ads",
        "Google Ads",
        "SEO",
        "AI Automation",
        "E-commerce",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${site.name} — Portfolio`,
      description,
      publisher: { "@id": `${site.url}/#person` },
      inLanguage: "en",
    },
    {
      "@type": "ProfessionalService",
      name: `${site.name} — Web Development & Digital Marketing`,
      areaServed: "Bangladesh",
      priceRange: "৳1,500–৳40,000+",
      url: site.url,
      provider: { "@id": `${site.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jet.variable} ${hind.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-xl focus:bg-cyan-neon focus:px-5 focus:py-3 focus:font-medium focus:text-ink-950"
        >
          Skip to content
        </a>
        <InteractionEngine />
        {children}
      </body>
    </html>
  );
}
