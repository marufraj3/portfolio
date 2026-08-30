import { skillGroups, marqueeWords } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";

function Bar({ level, accent, delay }: { level: number; accent: string; delay: number }) {
  return (
    <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/[0.07]">
      <span
        data-level
        style={
          {
            "--lvl": level / 100,
            transitionDelay: `${delay}s`,
            background: `linear-gradient(90deg, ${accent}22, ${accent})`,
            boxShadow: `0 0 14px ${accent}66`,
          } as React.CSSProperties
        }
        className="absolute inset-0 block rounded-full"
      />
    </div>
  );
}

export default function Skills() {
  return (
    <Section id="skills">
      {/* Section glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[80vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(79,215,255,0.14) 0%, rgba(79,215,255,0.05) 40%, transparent 70%)",
        }}
      />

      <SectionHeading
        eyebrow="Capabilities"
        title="One person,"
        highlight="every skill you need."
        description="ওয়েব ডেভেলপমেন্ট, ডিজিটাল মার্কেটিং, AI অটোমেশন আর গ্রোথ সার্ভিস — এক জায়গায় সব। আলাদা আলাদা লোক খোঁজার ঝামেলা নেই।"
        align="center"
      />

      <StaggerGroup className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
        {skillGroups.map((group) => (
          <StaggerItem key={group.title} className="group h-full">
            <Tilt className="h-full" max={7}>
              <GlassCard className="h-full overflow-hidden p-6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: group.accent }}
                />
                <span
                  className="mb-5 flex size-10 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: `${group.accent}33`,
                    background: `linear-gradient(140deg, ${group.accent}22, transparent)`,
                    boxShadow: `0 0 24px -8px ${group.accent}`,
                  }}
                >
                  <span className="size-2 rounded-full" style={{ background: group.accent, boxShadow: `0 0 12px ${group.accent}` }} />
                </span>

                <h3 className="font-display text-[17px] font-semibold text-white">{group.title}</h3>
                <p className="mt-2 min-h-[40px] text-[12.5px] leading-relaxed text-fog-400">
                  {group.blurb}
                </p>

                <ul className="mt-6 space-y-3.5">
                  {group.items.map((item, i) => (
                    <li key={item.name}>
                      <div className="mb-1.5 flex items-baseline justify-between gap-2">
                        <span className="text-[13px] text-fog-200">{item.name}</span>
                        <span className="font-mono text-[10px] text-fog-400">{item.level}</span>
                      </div>
                      <Bar level={item.level} accent={group.accent} delay={i * 0.07} />
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Tilt>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Toolbelt marquee */}
      <Reveal className="mt-14" delay={0.1}>
        <div className="marquee-mask flex overflow-hidden">
          <div className="flex shrink-0 animate-[marquee_38s_linear_infinite] gap-3 pr-3 will-change-transform">
            {[...marqueeWords, ...marqueeWords].map((w, i) => (
              <span
                key={`${w}-${i}`}
                className="shrink-0 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 font-mono text-[11px] tracking-[0.14em] text-fog-300 uppercase backdrop-blur-sm"
              >
                {w}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
