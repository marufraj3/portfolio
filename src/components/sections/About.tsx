import { about, stats } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import AboutPortrait from "./AboutPortrait";

export default function About() {
  return (
    <Section id="about">
      <div className="grid gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <AboutPortrait />
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="About"
            title="Web development meets"
            highlight="digital marketing."
          />

          <div className="mt-8 space-y-5">
            {about.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-[15px] leading-[1.85] text-fog-300 sm:text-[16.5px]">{p}</p>
              </Reveal>
            ))}
          </div>

          <StaggerGroup className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <GlassCard className="h-full p-4 sm:p-5">
                  <p className="font-display text-3xl font-bold text-gradient sm:text-[2.1rem]">
                    <Counter to={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1.5 text-[12.5px] font-medium text-fog-100">{s.label}</p>
                  <p className="mt-0.5 text-[11px] text-fog-400">{s.sub}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <StaggerGroup className="mt-6 grid gap-3 sm:grid-cols-3">
            {about.principles.map((p, i) => (
              <StaggerItem key={p.title}>
                <GlassCard className="h-full p-5">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-neon/70">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-[15px] font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-fog-400">{p.body}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </Section>
  );
}
