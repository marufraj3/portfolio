import { faqs, site } from "@/lib/site";
import { Section, SectionHeading } from "@/components/ui/Section";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import ContactForm from "./ContactForm";

function ContactMethod({
  href,
  label,
  value,
  accent,
  icon,
}: {
  href: string;
  label: string;
  value: string;
  accent: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.05]"
    >
      <span
        className="grid size-10 shrink-0 place-items-center rounded-xl border transition-shadow duration-500"
        style={{ borderColor: `${accent}30`, background: `${accent}14`, color: accent }}
      >
        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" aria-hidden>
          {icon}
        </svg>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] tracking-[0.16em] text-fog-400 uppercase">
          {label}
        </span>
        <span className="block truncate text-[13.5px] text-fog-100">{value}</span>
      </span>
      <svg
        viewBox="0 0 20 20"
        className="size-4 shrink-0 text-fog-400 transition-all duration-500 group-hover:translate-x-1 group-hover:text-white"
        fill="none"
        aria-hidden
      >
        <path
          d="M4 10h11m0 0-4.2-4.2M15 10l-4.2 4.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}

export default function Contact() {
  return (
    <Section id="contact">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[90vw] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(79,215,255,0.16) 0%, rgba(79,215,255,0.05) 42%, transparent 70%)",
        }}
      />

      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Let's start"
            highlight="your project."
            description="কয়েকটা তথ্য দিন — ১২ ঘণ্টার মধ্যে রিপ্লাই পাবেন, সাধারণত আপনার প্রজেক্ট নিয়ে দুই-তিনটা আইডিয়াসহ। আমরা একসাথে কাজ করি বা না করি।"
          />

          <Reveal delay={0.1} className="mt-8 grid gap-3">
            <ContactMethod
              href={`mailto:${site.email}`}
              label="Email"
              value={site.email}
              accent="#4fd7ff"
              icon={
                <path
                  d="M3 7.5A2.5 2.5 0 0 1 5.5 5h13A2.5 2.5 0 0 1 21 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 16.5v-9Zm1.8-.2 6.5 5a1.2 1.2 0 0 0 1.4 0l6.5-5"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              }
            />
            <ContactMethod
              href={site.whatsapp}
              label="WhatsApp"
              value={site.phone}
              accent="#5ff2c0"
              icon={
                <path
                  d="M12 3.8a8.2 8.2 0 0 0-7 12.4L4 20.2l4.1-1a8.2 8.2 0 1 0 3.9-15.4Zm4.2 11.4c-.2.5-1 1-1.5 1.1-.4 0-.9.2-2.8-.6-2.4-1-3.9-3.4-4-3.6-.1-.2-1-1.3-1-2.4s.6-1.7.8-1.9c.2-.2.4-.3.6-.3h.4c.2 0 .4 0 .5.4l.7 1.7c0 .2 0 .3-.1.5l-.3.4-.3.3c-.1.1-.2.2 0 .5.2.3.7 1.2 1.5 1.9 1 .9 1.8 1.1 2 1.2.3.1.4.1.6-.1l.7-.8c.2-.2.3-.2.5-.1l1.6.8c.2.1.4.2.4.3v.7Z"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              }
            />
            <ContactMethod
              href={site.facebook}
              label="Facebook"
              value="মেসেজ দিন"
              accent="#8b7cff"
              icon={
                <path
                  d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v9a1.5 1.5 0 0 1-1.5 1.5H9l-4 3.5V16H5.5A1.5 1.5 0 0 1 4 14.5v-9Z"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              }
            />
          </Reveal>

          <Reveal delay={0.15} className="mt-6">
            <Accordion items={[...faqs]} />
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.05}>
          <GlassCard strong className="p-6 sm:p-8 lg:sticky lg:top-28">
            <div className="mb-7 flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-semibold text-white">প্রজেক্ট ডিটেইলস</h3>
                <p className="mt-1 text-[13px] text-fog-400">দুই মিনিট এখন, এক সপ্তাহ বাঁচবে পরে।</p>
              </div>
              <span className="flex items-center gap-2 rounded-full border border-mint-neon/25 bg-mint-neon/[0.08] px-3 py-1.5">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint-neon opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-mint-neon" />
                </span>
                <span className="font-mono text-[9.5px] tracking-[0.16em] text-mint-neon uppercase">
                  দ্রুত রিপ্লাই
                </span>
              </span>
            </div>

            <ContactForm />
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}
