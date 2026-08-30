import { clients, testimonials } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

function Quote({ t }: { t: (typeof testimonials)[number] }) {
  const initials = t.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <GlassCard className="flex h-full w-[86vw] shrink-0 flex-col p-6 sm:w-[420px] sm:p-7">
      <div className="flex items-center justify-between">
        <span className="flex gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
          {Array.from({ length: t.rating }).map((_, i) => (
            <svg key={i} viewBox="0 0 20 20" className="size-3.5 fill-cyan-neon" aria-hidden>
              <path d="m10 1.6 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7 1-5.6-4.1-4 5.6-.8L10 1.6Z" />
            </svg>
          ))}
        </span>
        <svg viewBox="0 0 32 32" className="size-7 fill-white/[0.07]" aria-hidden>
          <path d="M12.5 6C8 8.4 5 12.9 5 18.2 5 22.6 7.6 26 11.6 26c3 0 5.4-2.3 5.4-5.3 0-3-2-5.1-4.8-5.1-.6 0-1.3.1-1.5.2.5-2.6 3-5.6 5.6-7.1L12.5 6Zm14 0c-4.5 2.4-7.5 6.9-7.5 12.2 0 4.4 2.6 7.8 6.6 7.8 3 0 5.4-2.3 5.4-5.3 0-3-2-5.1-4.8-5.1-.6 0-1.3.1-1.5.2.5-2.6 3-5.6 5.6-7.1L26.5 6Z" />
        </svg>
      </div>

      <blockquote className="mt-5 flex-1 text-[14.5px] leading-[1.75] text-fog-200">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      <div className="mt-6 flex items-center gap-3 border-t border-white/[0.07] pt-5">
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/12 bg-[linear-gradient(140deg,rgba(79,215,255,0.25),rgba(139,124,255,0.18))] font-display text-[12px] font-semibold text-white">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13.5px] font-semibold text-white">{t.name}</p>
          <p className="truncate font-mono text-[10px] tracking-[0.14em] text-fog-400 uppercase">
            {t.title} · {t.company}
          </p>
        </div>
      </div>
    </GlassCard>
  );
}

function Row({ items, reverse }: { items: typeof testimonials; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-mask group flex overflow-hidden py-2">
      <div
        className="flex shrink-0 gap-4 pr-4 will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{
          animation: `marquee ${reverse ? 56 : 48}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((t, i) => (
          <Quote key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <Section id="testimonials" container={false} className="overflow-hidden">
      <div className="container-lux">
        <SectionHeading
          eyebrow="Social proof"
          title="Clients who"
          highlight="keep coming back."
          description="ছোট বিজনেস থেকে ব্র্যান্ড — যাদের সাথে কাজ করেছি, তাদের কিছু কথা। কম খরচে ভালো কাজ পেয়ে তারা বারবার ফিরে আসেন।"
          align="center"
        />

        {/* Rating summary */}
        <Reveal delay={0.12} className="mt-10 flex justify-center">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-7 py-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-bold text-white">5.0</span>
              <div>
                <span className="flex gap-0.5" role="img" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" className="size-3 fill-cyan-neon" aria-hidden>
                      <path d="m10 1.6 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7 1-5.6-4.1-4 5.6-.8L10 1.6Z" />
                    </svg>
                  ))}
                </span>
                <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-fog-400 uppercase">
                  গড় রেটিং
                </p>
              </div>
            </div>
            <span className="hidden h-8 w-px bg-white/10 sm:block" />
            <div>
              <span className="font-display text-3xl font-bold text-white">45+</span>
              <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-fog-400 uppercase">
                খুশি ক্লায়েন্ট
              </p>
            </div>
            <span className="hidden h-8 w-px bg-white/10 sm:block" />
            <div>
              <span className="font-display text-3xl font-bold text-white">100%</span>
              <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-fog-400 uppercase">
                সময়মতো ডেলিভারি
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 flex flex-col gap-4">
        <Row items={testimonials} />
        <Row items={[...testimonials].reverse()} reverse />
      </div>

      {/* Client wordmarks */}
      <div className="container-lux mt-14">
        <Reveal>
          <p className="text-center font-mono text-[10px] tracking-[0.24em] text-fog-400 uppercase">
            যেসব টুল ও প্ল্যাটফর্মে কাজ করি
          </p>
          <div className="mt-6 grid grid-cols-2 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
            {clients.map((c) => (
              <span
                key={c}
                className="text-center font-display text-[15px] font-bold tracking-[0.16em] text-fog-400 transition-colors duration-500 hover:text-white"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
