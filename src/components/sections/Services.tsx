import { services, type Service } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const icons: Record<Service["icon"], React.ReactNode> = {
  code: (
    <path
      d="m9 8-4 4 4 4M15 8l4 4-4 4M13.5 5l-3 14"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  cart: (
    <>
      <path d="M4 5h2l1.6 10h9L18.5 8H6.2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="19" r="1.3" strokeWidth="1.4" />
      <circle cx="16" cy="19" r="1.3" strokeWidth="1.4" />
    </>
  ),
  megaphone: (
    <>
      <path d="M5 9v6h3l7 4V5L8 9H5Z" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M18 9.5a3.5 3.5 0 0 1 0 5" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  bot: (
    <>
      <rect x="5" y="8" width="14" height="10" rx="2.5" strokeWidth="1.4" />
      <path d="M12 4.5V8M8.8 13h.01M15.2 13h.01" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="3.6" r="1" strokeWidth="1.4" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18c1.4 0 1.9-1 1.9-1.9 0-1.5 1-2.1 2.1-2.1H17A3.4 3.4 0 0 0 20.5 12 8.5 8.5 0 0 0 12 3Z" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="8" cy="11" r="1" strokeWidth="1.3" />
      <circle cx="12" cy="8" r="1" strokeWidth="1.3" />
      <circle cx="16" cy="10.5" r="1" strokeWidth="1.3" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 16a8 8 0 0 1 16 0" strokeWidth="1.4" strokeLinecap="round" />
      <path d="m12 16 4.2-3.4" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.1" strokeWidth="1.4" />
    </>
  ),
  clipboard: (
    <>
      <path d="M9 5H7a1.5 1.5 0 0 0-1.5 1.5v12A1.5 1.5 0 0 0 7 20h10a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 17 5h-2" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="9" y="3.5" width="6" height="3" rx="1" strokeWidth="1.4" />
      <path d="m8.6 12 2 2 3.8-4.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  panel: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" strokeWidth="1.4" />
      <path d="M4 9.5h16M9.5 9.5V20" strokeWidth="1.4" />
    </>
  ),
};

function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn("size-3.5 shrink-0", className)} fill="none" aria-hidden>
      <path d="m3.5 8.4 3 3 6-6.8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Services() {
  return (
    <Section id="services" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/4 size-[520px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(139,124,255,0.20) 0%, rgba(139,124,255,0.07) 38%, transparent 68%)",
        }}
      />

      <SectionHeading
        eyebrow="Services"
        title="Real services."
        highlight="Prices that fit BD."
        description="ওয়েব ডেভেলপমেন্ট থেকে ডিজিটাল মার্কেটিং — প্রতিটি সার্ভিসে ফিক্সড দাম, সময়মতো ডেলিভারি আর লঞ্চের পরেও সাপোর্ট। কোনো লুকানো চার্জ নেই।"
        align="center"
      />

      <StaggerGroup className="mt-16 grid gap-4 lg:grid-cols-2" stagger={0.1}>
        {services.map((s) => (
          <StaggerItem key={s.title} className="group h-full">
            <Tilt max={5} scale={1.006} className="h-full">
              <GlassCard
                strong={s.popular}
                className={cn(
                  "flex h-full flex-col p-6 sm:p-8",
                  s.popular && "border-cyan-neon/25",
                )}
              >
                {s.popular && (
                  <>
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-10 -top-px h-px bg-[linear-gradient(90deg,transparent,#4fd7ff,transparent)]"
                    />
                    <span className="absolute right-6 top-6 rounded-full border border-cyan-neon/30 bg-cyan-neon/10 px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-cyan-neon uppercase">
                      জনপ্রিয়
                    </span>
                  </>
                )}

                <span className="mb-6 grid size-12 place-items-center rounded-2xl border border-white/10 bg-[linear-gradient(140deg,rgba(79,215,255,0.16),transparent)] text-cyan-neon transition-all duration-500 group-hover:border-cyan-neon/35 group-hover:shadow-[0_0_30px_-8px_rgba(79,215,255,0.7)]">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" aria-hidden>
                    {icons[s.icon]}
                  </svg>
                </span>

                <h3 className="font-display text-xl font-semibold text-white sm:text-[22px]">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-fog-300">{s.description}</p>

                <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-display text-2xl font-bold text-gradient">{s.price}</span>
                  <span className="font-mono text-[11px] tracking-[0.14em] text-fog-400 uppercase">
                    {s.timeline}
                  </span>
                </div>

                <ul className="mt-6 grid gap-2.5 border-t border-white/[0.07] pt-6 sm:grid-cols-2">
                  {s.includes.map((inc) => (
                    <li key={inc} className="flex items-start gap-2.5 text-[13px] text-fog-200">
                      <Check className="mt-[3px] text-cyan-neon" />
                      {inc}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center justify-between gap-4">
                  <ButtonLink
                    href="#contact"
                    size="sm"
                    variant={s.popular ? "primary" : "outline"}
                    magnetic={false}
                    icon={<ArrowIcon />}
                  >
                    কোটেশন নিন
                  </ButtonLink>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-fog-400 uppercase">
                    ফ্রি পরামর্শ
                  </span>
                </div>
              </GlassCard>
            </Tilt>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal delay={0.1} className="mt-6">
        <GlassCard className="flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-center gap-5">
            <span className="hidden size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.04] sm:grid">
              <svg viewBox="0 0 24 24" className="size-5 text-mint-neon" fill="none" stroke="currentColor">
                <path d="M12 3v18M3 12h18" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-white">
                লিস্টে নেই এমন কিছু দরকার?
              </h3>
              <p className="mt-1.5 max-w-xl text-[13.5px] leading-relaxed text-fog-400">
                কাস্টম ওয়েব অ্যাপ, মাসিক রিটেইনার, বা অন্য যেকোনো ডিজিটাল কাজ — সমস্যাটা বলুন,
                আমি সৎভাবে বলে দেব আমি সঠিক মানুষ কিনা।
              </p>
            </div>
          </div>
          <ButtonLink href="#contact" size="md" className="shrink-0" icon={<ArrowIcon />}>
            কথা বলি
          </ButtonLink>
        </GlassCard>
      </Reveal>
    </Section>
  );
}
