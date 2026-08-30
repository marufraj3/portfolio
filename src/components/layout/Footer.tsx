import { nav, site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-40%] h-[70vh] opacity-60"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 100%, rgba(79,215,255,0.18) 0%, rgba(139,124,255,0.08) 45%, transparent 72%)",
        }}
      />

      <div className="container-lux relative">
        {/* Final CTA */}
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[11px] tracking-[0.24em] text-cyan-neon/80 uppercase">
            Let&rsquo;s build
          </p>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,6vw,4.2rem)] font-bold leading-[0.98] tracking-[-0.045em]">
            <span className="text-gradient-soft">Your project,</span>
            <br />
            <span className="text-gradient">done right.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-fog-300">
            নতুন প্রজেক্ট নিচ্ছি। মেসেজ দিন, কল করুন, বা শুধু হাই বলুন — আমি নিজেই সব দেখি।
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <ButtonLink href="#contact" size="lg" icon={<ArrowIcon />}>
              প্রজেক্ট শুরু করি
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} variant="outline" size="lg">
              {site.email}
            </ButtonLink>
          </div>
        </Reveal>

        {/* Giant wordmark */}
        <div aria-hidden className="marquee-mask mt-20 flex overflow-hidden">
          <div className="flex shrink-0 animate-[marquee_40s_linear_infinite] items-center gap-8 pr-8 will-change-transform">
            {Array.from({ length: 2 }).map((_, i) => (
              <span
                key={i}
                className="shrink-0 font-display text-[clamp(3rem,11vw,9rem)] font-extrabold leading-none tracking-[-0.05em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.11)]"
              >
                MARUF AHMED RAJ ✦
              </span>
            ))}
          </div>
        </div>

        {/* Link grid */}
        <div className="mt-16 grid gap-10 border-t border-white/[0.07] py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl border border-white/12 bg-[linear-gradient(140deg,rgba(79,215,255,0.22),rgba(139,124,255,0.14))] font-display text-[12px] font-bold text-white">
                {site.initials}
              </span>
              <span className="font-display text-[15px] font-semibold text-white">{site.name}</span>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-fog-400">
              ওয়েব ডেভেলপার আর ডিজিটাল মার্কেটার — কম খরচে দ্রুত, সুন্দর ওয়েবসাইট আর আসল রেজাল্ট।
            </p>
            <p className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-mint-neon uppercase">
              <span className="size-1.5 rounded-full bg-mint-neon" />
              {site.availability}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[10px] tracking-[0.2em] text-fog-400 uppercase">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-[13.5px] text-fog-300 transition-colors duration-300 hover:text-white"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-fog-400 uppercase">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-[13.5px] text-fog-300 transition-colors duration-300 hover:text-white"
                  >
                    {s.label}
                    <span className="font-mono text-[10px] text-fog-400">{s.handle}</span>
                    <svg viewBox="0 0 12 12" className="size-2.5 opacity-0 transition-opacity group-hover:opacity-100" fill="none">
                      <path d="M3 9 9 3m0 0H4.5M9 3v4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-fog-400 uppercase">Direct</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a href={`mailto:${site.email}`} className="text-[13.5px] text-fog-300 transition-colors hover:text-white">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[13.5px] text-fog-300 transition-colors hover:text-white">
                  {site.phone}
                </a>
              </li>
              <li className="text-[13.5px] text-fog-400">
                {site.location} · {site.timezone}
              </li>
            </ul>
            <ButtonLink href={site.facebook} external variant="outline" size="sm" className="mt-5" magnetic={false}>
              Facebook-এ মেসেজ
            </ButtonLink>
          </div>
        </div>

        {/* Base bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] py-7 sm:flex-row">
          <p className="font-mono text-[10.5px] tracking-[0.12em] text-fog-400 uppercase">
            © {year} {site.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10.5px] tracking-[0.12em] text-fog-400 uppercase">
            Built with Next.js · Three.js · GSAP
          </p>
        </div>
      </div>
    </footer>
  );
}
