import { processSteps } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import ProcessRail from "./ProcessRail";

export default function Process() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="How we work"
        title="Simple process,"
        highlight="no surprises."
        description="পাঁচটি ধাপ, ফিক্সড দাম আর প্রথম দিন থেকেই লাইভ প্রিভিউ। সবসময় জানবেন কী হয়েছে, এরপর কী আর খরচ কত।"
        align="center"
      />

      <div id="process-timeline" className="relative mt-16 lg:mt-20">
        <ProcessRail />

        <ol className="relative space-y-6 lg:space-y-2">
          {processSteps.map((p, i) => {
            const right = i % 2 === 1;
            return (
              <li
                key={p.step}
                className={`relative pl-14 lg:flex lg:pl-0 ${right ? "lg:justify-end" : "lg:justify-start"}`}
              >
                <span
                  data-node
                  className="absolute left-0 top-4 grid size-[38px] place-items-center rounded-full border border-white/12 bg-ink-900/90 backdrop-blur-md lg:left-1/2 lg:-translate-x-1/2"
                >
                  <span className="absolute inset-0 rounded-full bg-cyan-neon/20 blur-md" />
                  <span className="relative font-mono text-[10px] font-medium text-cyan-neon">
                    {p.step}
                  </span>
                </span>

                <Reveal
                  direction={right ? "left" : "right"}
                  className="lg:w-[calc(50%-56px)]"
                >
                  <GlassCard className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-display text-xl font-semibold text-white">{p.title}</h3>
                      <span className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-fog-300 uppercase">
                        {p.duration}
                      </span>
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed text-fog-300">{p.body}</p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {p.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 text-[11.5px] text-fog-300"
                        >
                          <svg viewBox="0 0 16 16" className="size-3 text-cyan-neon" fill="none" aria-hidden>
                            <path d="m3.5 8.4 3 3 6-6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>

      <Reveal delay={0.1} className="mt-14 flex justify-center">
        <div className="flex flex-col items-center gap-5 text-center">
          <p className="max-w-lg text-[14.5px] leading-relaxed text-fog-300">
            বেশিরভাগ প্রজেক্ট প্রথম কথা বলার <span className="text-white">২–৩ দিনের</span> মধ্যেই
            শুরু হয়। এখন নতুন কাজ নিচ্ছি।
          </p>
          <ButtonLink href="#contact" size="lg" icon={<ArrowIcon />}>
            ফ্রি পরামর্শ নিন
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
