import { projects, type Project } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Tilt";
import { ArrowIcon, ButtonLink } from "@/components/ui/Button";
import ProjectVisual from "./ProjectVisual";
import CaseStudyDisclosure from "./CaseStudyRow";

function CaseStudyRow({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;

  return (
    <Reveal className="group">
      <GlassCard className="overflow-hidden p-4 sm:p-6 lg:p-7">
        <div
          className={`grid items-center gap-6 lg:gap-10 ${
            flip ? "lg:grid-cols-[1fr_1.05fr]" : "lg:grid-cols-[1.05fr_1fr]"
          }`}
        >
          {/* Visual */}
          <div className={flip ? "lg:order-2" : ""}>
            <Tilt max={6} scale={1.008} className="aspect-16/11 w-full">
              <div className="size-full overflow-hidden rounded-[22px] border border-white/[0.07]">
                <ProjectVisual accent={project.accent} variant={index + 1} label={project.title} />
              </div>
            </Tilt>
          </div>

          {/* Copy */}
          <div className={`px-1 sm:px-2 ${flip ? "lg:order-1" : ""}`}>
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.18em] uppercase"
                style={{
                  color: project.accent,
                  borderColor: `${project.accent}33`,
                  background: `${project.accent}12`,
                }}
              >
                {project.category}
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-fog-400 uppercase">
                {project.year}
              </span>
            </div>

            <h3 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.35rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white">
              {project.title}
            </h3>

            <p className="mt-3 max-w-lg text-[14.5px] leading-relaxed text-fog-300">
              {project.summary}
            </p>

            <div className="mt-6 grid grid-cols-3 gap-2.5">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5 text-center backdrop-blur-sm transition-colors duration-500 group-hover:border-white/15"
                >
                  <p
                    className="font-display text-[clamp(1rem,2vw,1.35rem)] font-bold leading-none"
                    style={{ color: project.accent }}
                  >
                    {m.value}
                  </p>
                  <p className="mt-1.5 text-[10px] leading-tight text-fog-400">{m.label}</p>
                </div>
              ))}
            </div>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-md border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-fog-400"
                >
                  {s}
                </li>
              ))}
            </ul>

            <CaseStudyDisclosure project={project} />
          </div>
        </div>
      </GlassCard>
    </Reveal>
  );
}

function MiniCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * 0.08} className="group h-full">
      <Tilt max={7} className="h-full">
        <GlassCard className="flex h-full flex-col overflow-hidden p-5">
          <div className="aspect-16/10 w-full overflow-hidden rounded-2xl border border-white/[0.07]">
            <ProjectVisual accent={project.accent} variant={index + 21} label={project.title} />
          </div>
          <div className="mt-5 flex flex-1 flex-col">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-display text-lg font-semibold text-white">{project.title}</h3>
              <span className="font-mono text-[10px] text-fog-400">{project.year}</span>
            </div>
            <p
              className="mt-1 font-mono text-[10px] tracking-[0.16em] uppercase"
              style={{ color: project.accent }}
            >
              {project.category}
            </p>
            <p className="mt-3 flex-1 text-[13px] leading-relaxed text-fog-400">{project.summary}</p>
            <div className="mt-4 flex flex-wrap gap-3 border-t border-white/[0.06] pt-4">
              {project.metrics.slice(0, 2).map((m) => (
                <div key={m.label} className="flex items-baseline gap-1.5">
                  <span className="font-display text-sm font-bold" style={{ color: project.accent }}>
                    {m.value}
                  </span>
                  <span className="text-[10px] text-fog-400">{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </Tilt>
    </Reveal>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="work">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Selected work"
          title="Real work,"
          highlight="real results."
          description="ওয়েবসাইট, ই-কমার্স, অ্যাড ক্যাম্পেইন আর অটোমেশন — কিছু কাজের নমুনা। যেকোনোটিতে ক্লিক করে সমস্যা, সমাধান আর ফলাফল দেখুন।"
        />
        <Reveal delay={0.2} direction="left">
          <ButtonLink href="#contact" variant="outline" size="md" icon={<ArrowIcon />}>
            একই রকম কিছু দরকার?
          </ButtonLink>
        </Reveal>
      </div>

      <div className="mt-16 flex flex-col gap-6">
        {featured.map((p, i) => (
          <CaseStudyRow key={p.slug} project={p} index={i} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {rest.map((p, i) => (
          <MiniCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
