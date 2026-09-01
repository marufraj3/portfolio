import { seeded } from "@/lib/utils";

/**
 * Project visual: uses the editable cover/screenshot from the admin
 * when available, otherwise falls back to the abstract interface mock.
 */
export default function ProjectVisual({
  accent,
  variant,
  label,
  image,
  screenshot,
}: {
  accent: string;
  variant: number;
  label: string;
  image?: string;
  screenshot?: string;
}) {
  const src = image || screenshot || "";
  if (src) {
    return (
      <div className="relative size-full overflow-hidden rounded-[22px] bg-ink-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${label} — project preview`}
          loading="lazy"
          className="size-full object-cover"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(4,5,10,0.55)_100%)]"
        />
        <span className="absolute bottom-3 left-3 rounded-md border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] text-fog-200 uppercase backdrop-blur">
          {label}
        </span>
      </div>
    );
  }

  const rand = seeded(variant * 977 + 13);
  const bars = Array.from({ length: 12 }, () => 0.22 + rand() * 0.78);
  const line = Array.from({ length: 14 }, (_, i) => ({
    x: (i / 13) * 100,
    y: 68 - Math.sin(i * 0.85 + variant) * 16 - i * 1.6,
  }));
  const path = line.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  return (
    <div className="relative size-full overflow-hidden rounded-[22px] bg-[linear-gradient(160deg,#0b0e18,#070810_60%)]">
      {/* Ambient accent wash */}
      <div
        aria-hidden
        className="absolute -left-1/4 -top-1/3 size-[70%] rounded-full opacity-50 blur-[70px]"
        style={{ background: `radial-gradient(circle, ${accent}66, transparent 65%)` }}
      />
      <div
        aria-hidden
        className="absolute -bottom-1/4 -right-1/4 size-[60%] rounded-full opacity-40 blur-[80px]"
        style={{ background: `radial-gradient(circle, #8b7cff55, transparent 65%)` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.045) 1px,transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* Window chrome */}
      <div className="relative flex h-full flex-col p-4 sm:p-6">
        <div className="flex items-center gap-2 rounded-t-xl border border-white/[0.07] border-b-0 bg-white/[0.03] px-3 py-2 backdrop-blur-md">
          <span className="flex gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <span key={c} className="size-2 rounded-full opacity-70" style={{ background: c }} />
            ))}
          </span>
          <span className="ml-2 truncate rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[9px] tracking-wider text-fog-400">
            {label.toLowerCase().replace(/\s+/g, "")}.app
          </span>
        </div>

        <div className="relative flex flex-1 gap-3 rounded-b-xl border border-white/[0.07] bg-ink-900/40 p-3 backdrop-blur-md">
          {/* Sidebar */}
          <div className="hidden w-[18%] flex-col gap-2 sm:flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-2 rounded-full"
                style={{
                  width: `${55 + rand() * 45}%`,
                  background: i === 1 ? accent : "rgba(255,255,255,0.10)",
                  opacity: i === 1 ? 0.9 : 1,
                }}
              />
            ))}
            <div className="mt-auto h-8 rounded-lg border border-white/[0.06] bg-white/[0.03]" />
          </div>

          {/* Main panel */}
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="flex-1 rounded-lg border border-white/[0.07] bg-white/[0.025] p-2"
                >
                  <div className="h-1.5 w-8 rounded-full bg-white/15" />
                  <div
                    className="mt-2 h-2.5 w-12 rounded-full"
                    style={{ background: i === 0 ? accent : "rgba(255,255,255,0.28)" }}
                  />
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="relative flex-1 overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.02] p-3">
              <svg viewBox="0 0 100 70" preserveAspectRatio="none" className="size-full">
                <defs>
                  <linearGradient id={`lg-${variant}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={accent} stopOpacity="0.42" />
                    <stop offset="100%" stopColor={accent} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path data-fade d={`${path} L100,70 L0,70 Z`} fill={`url(#lg-${variant})`} />
                <path
                  data-draw
                  d={path}
                  pathLength={1}
                  fill="none"
                  stroke={accent}
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            {/* Bars */}
            <div className="flex h-[22%] items-end gap-1.5">
              {bars.map((b, i) => (
                <div
                  key={i}
                  data-bar
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${b * 100}%`,
                    transitionDelay: `${0.3 + i * 0.035}s`,
                    background:
                      i % 4 === 1
                        ? `linear-gradient(180deg, ${accent}, ${accent}33)`
                        : "rgba(255,255,255,0.10)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sheen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.055)_48%,transparent_62%)]"
      />
    </div>
  );
}
