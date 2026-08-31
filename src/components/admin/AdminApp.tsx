"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ColorInput,
  Field,
  NumberInput,
  Select,
  StringList,
  TextArea,
  TextInput,
  Toggle,
} from "./ui";

/* ============================================================
   Types & helpers
   ============================================================ */

type Dict = Record<string, unknown>;

type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "bool"
  | "color"
  | "select"
  | "tags"
  | "lines"
  | "object-list";

interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  itemFields?: FieldDef[];
  itemTitleKey?: string;
  full?: boolean;
  rows?: number;
}

interface SectionDef {
  id: string;
  title: string;
  emoji: string;
  kind: "object" | "list";
  bindKey?: string; // key in root data ("site", "about", "" = root)
  fields?: FieldDef[]; // kind: object
  itemFields?: FieldDef[]; // kind: list
  itemTitleKey?: string;
  addLabel?: string;
}

export interface AdminMeta {
  githubPersistence: boolean;
  onVercel: boolean;
  defaultPassword: boolean;
}

const asDict = (v: unknown): Dict => (typeof v === "object" && v !== null ? (v as Dict) : {});
const asArr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const asStr = (v: unknown): string => (typeof v === "string" ? v : "");
const asNum = (v: unknown): number => (typeof v === "number" ? v : 0);
const asBool = (v: unknown): boolean => v === true;
const asStrArr = (v: unknown): string[] => (Array.isArray(v) ? v.map(asStr) : []);

/* ============================================================
   Content schema — mirrors src/content/site.json
   ============================================================ */

const SECTIONS: SectionDef[] = [
  {
    id: "site",
    title: "General / Profile",
    emoji: "👤",
    kind: "object",
    bindKey: "site",
    fields: [
      { key: "name", label: "পুরো নাম", type: "text" },
      { key: "shortName", label: "ছোট নাম", type: "text" },
      { key: "initials", label: "Initials (লোগো)", type: "text" },
      { key: "role", label: "Role / পেশা", type: "text" },
      { key: "tagline", label: "Tagline", type: "textarea", full: true, rows: 2 },
      { key: "availability", label: "Availability (হিরো ব্যাজ)", type: "text" },
      { key: "location", label: "লোকেশন", type: "text" },
      { key: "timezone", label: "টাইমজোন", type: "text" },
      { key: "url", label: "ওয়েবসাইট URL", type: "text" },
      { key: "email", label: "ইমেইল", type: "text" },
      { key: "phone", label: "ফোন", type: "text" },
      { key: "whatsapp", label: "WhatsApp লিংক", type: "text" },
      { key: "facebook", label: "Facebook লিংক", type: "text" },
      { key: "resume", label: "Resume ফাইল পাথ", type: "text" },
      {
        key: "socials",
        label: "সোশ্যাল লিংক",
        type: "object-list",
        full: true,
        itemTitleKey: "label",
        itemFields: [
          { key: "label", label: "নাম (Facebook)", type: "text" },
          { key: "handle", label: "Handle (@…)", type: "text" },
          { key: "href", label: "লিংক", type: "text", full: true },
        ],
      },
    ],
  },
  {
    id: "nav",
    title: "Navigation",
    emoji: "🧭",
    kind: "list",
    bindKey: "nav",
    itemTitleKey: "label",
    addLabel: "নতুন লিংক",
    itemFields: [
      { key: "label", label: "Label", type: "text" },
      { key: "href", label: "Href (#section)", type: "text" },
    ],
  },
  {
    id: "about",
    title: "About",
    emoji: "📖",
    kind: "object",
    bindKey: "about",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text" },
      { key: "heading", label: "Heading", type: "text", full: true },
      { key: "body", label: "প্যারাগ্রাফ সমূহ", type: "lines", full: true },
      {
        key: "highlights",
        label: "Highlights",
        type: "object-list",
        full: true,
        itemTitleKey: "k",
        itemFields: [
          { key: "k", label: "Label (Currently)", type: "text" },
          { key: "v", label: "Value", type: "text" },
        ],
      },
      {
        key: "principles",
        label: "Principles",
        type: "object-list",
        full: true,
        itemTitleKey: "title",
        itemFields: [
          { key: "title", label: "Title", type: "text" },
          { key: "body", label: "Body", type: "textarea", full: true, rows: 2 },
        ],
      },
    ],
  },
  {
    id: "stats",
    title: "Stats",
    emoji: "📊",
    kind: "list",
    bindKey: "stats",
    itemTitleKey: "label",
    addLabel: "নতুন stat",
    itemFields: [
      { key: "value", label: "সংখ্যা", type: "number" },
      { key: "suffix", label: "Suffix (+, %…)", type: "text" },
      { key: "label", label: "Label (EN)", type: "text" },
      { key: "sub", label: "Sub-label (BN)", type: "text" },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    emoji: "⚡",
    kind: "list",
    bindKey: "skillGroups",
    itemTitleKey: "title",
    addLabel: "নতুন গ্রুপ",
    itemFields: [
      { key: "title", label: "গ্রুপের নাম", type: "text" },
      { key: "accent", label: "Accent রঙ", type: "color" },
      { key: "blurb", label: "Blurb", type: "textarea", full: true, rows: 2 },
      {
        key: "items",
        label: "স্কিল আইটেম",
        type: "object-list",
        full: true,
        itemTitleKey: "name",
        itemFields: [
          { key: "name", label: "স্কিল", type: "text" },
          { key: "level", label: "Level (0–100)", type: "number" },
        ],
      },
    ],
  },
  {
    id: "services",
    title: "Services",
    emoji: "🛠️",
    kind: "list",
    bindKey: "services",
    itemTitleKey: "title",
    addLabel: "নতুন সার্ভিস",
    itemFields: [
      { key: "title", label: "সার্ভিসের নাম", type: "text" },
      {
        key: "icon",
        label: "Icon",
        type: "select",
        options: ["code", "cart", "megaphone", "bot", "palette", "gauge", "clipboard", "panel"],
      },
      { key: "price", label: "দাম", type: "text" },
      { key: "timeline", label: "টাইমলাইন", type: "text" },
      { key: "description", label: "বিবরণ", type: "textarea", full: true, rows: 3 },
      { key: "includes", label: "Include সমূহ", type: "tags", full: true },
      { key: "popular", label: "Popular ব্যাজ", type: "bool" },
    ],
  },
  {
    id: "projects",
    title: "Projects",
    emoji: "💼",
    kind: "list",
    bindKey: "projects",
    itemTitleKey: "title",
    addLabel: "নতুন প্রজেক্ট",
    itemFields: [
      { key: "title", label: "প্রজেক্টের নাম", type: "text" },
      { key: "slug", label: "Slug (url-id)", type: "text" },
      { key: "category", label: "ক্যাটাগরি", type: "text" },
      { key: "year", label: "সাল", type: "text" },
      { key: "summary", label: "সারসংক্ষেপ", type: "textarea", full: true, rows: 2 },
      { key: "challenge", label: "Challenge", type: "textarea", full: true, rows: 2 },
      { key: "solution", label: "Solution", type: "textarea", full: true, rows: 2 },
      { key: "stack", label: "টেক স্ট্যাক", type: "tags", full: true },
      { key: "accent", label: "Accent রঙ", type: "color" },
      { key: "featured", label: "Featured", type: "bool" },
      {
        key: "metrics",
        label: "Metrics",
        type: "object-list",
        full: true,
        itemTitleKey: "label",
        itemFields: [
          { key: "label", label: "Label", type: "text" },
          { key: "value", label: "Value", type: "text" },
        ],
      },
    ],
  },
  {
    id: "testimonials",
    title: "Testimonials",
    emoji: "💬",
    kind: "list",
    bindKey: "testimonials",
    itemTitleKey: "name",
    addLabel: "নতুন রিভিউ",
    itemFields: [
      { key: "quote", label: "রিভিউ", type: "textarea", full: true, rows: 3 },
      { key: "name", label: "নাম", type: "text" },
      { key: "title", label: "পদবি", type: "text" },
      { key: "company", label: "কোম্পানি", type: "text" },
      { key: "rating", label: "রেটিং (1–5)", type: "number" },
    ],
  },
  {
    id: "process",
    title: "Process",
    emoji: "🔄",
    kind: "list",
    bindKey: "processSteps",
    itemTitleKey: "title",
    addLabel: "নতুন ধাপ",
    itemFields: [
      { key: "step", label: "Step (01)", type: "text" },
      { key: "title", label: "নাম", type: "text" },
      { key: "duration", label: "সময়", type: "text" },
      { key: "body", label: "বিবরণ", type: "textarea", full: true, rows: 3 },
      { key: "deliverables", label: "Deliverables", type: "tags", full: true },
    ],
  },
  {
    id: "faqs",
    title: "FAQ",
    emoji: "❓",
    kind: "list",
    bindKey: "faqs",
    itemTitleKey: "q",
    addLabel: "নতুন প্রশ্ন",
    itemFields: [
      { key: "q", label: "প্রশ্ন", type: "text", full: true },
      { key: "a", label: "উত্তর", type: "textarea", full: true, rows: 3 },
    ],
  },
  {
    id: "marquee",
    title: "Marquee",
    emoji: "🎞️",
    kind: "object",
    bindKey: "",
    fields: [
      { key: "clients", label: "Clients / প্ল্যাটফর্ম (marquee)", type: "tags", full: true },
      { key: "marqueeWords", label: "Marquee শব্দ", type: "tags", full: true },
    ],
  },
];

/* ============================================================
   Field renderer
   ============================================================ */

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  switch (field.type) {
    case "text":
      return <TextInput value={asStr(value)} onChange={onChange} />;
    case "textarea":
      return <TextArea value={asStr(value)} onChange={onChange} rows={field.rows ?? 3} />;
    case "number":
      return <NumberInput value={asNum(value)} onChange={onChange} />;
    case "color":
      return <ColorInput value={asStr(value)} onChange={onChange} />;
    case "bool":
      return <Toggle value={asBool(value)} onChange={onChange} label={asBool(value) ? "চালু" : "বন্ধ"} />;
    case "select":
      return <Select value={asStr(value)} onChange={onChange} options={field.options ?? []} />;
    case "tags":
      return <StringList value={asStrArr(value)} onChange={onChange} addLabel="যোগ" />;
    case "lines":
      return <StringList value={asStrArr(value)} onChange={onChange} multiline addLabel="প্যারাগ্রাফ" />;
    case "object-list":
      return (
        <ObjectListEditor
          fields={field.itemFields ?? []}
          titleKey={field.itemTitleKey ?? ""}
          items={asArr(value)}
          onChange={onChange}
          addLabel="নতুন আইটেম"
        />
      );
    default:
      return null;
  }
}

function defaultFor(field: FieldDef): unknown {
  switch (field.type) {
    case "number":
      return 0;
    case "bool":
      return false;
    case "color":
      return "#4fd7ff";
    case "tags":
    case "lines":
    case "object-list":
      return [];
    case "select":
      return field.options?.[0] ?? "";
    default:
      return "";
  }
}

function FieldGrid({
  fields,
  dict,
  onChange,
}: {
  fields: FieldDef[];
  dict: Dict;
  onChange: (key: string, value: unknown) => void;
}) {
  return (
    <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.key} className={f.full || f.type === "object-list" ? "sm:col-span-2" : ""}>
          <Field label={f.label}>
            <FieldControl field={f} value={dict[f.key]} onChange={(v) => onChange(f.key, v)} />
          </Field>
        </div>
      ))}
    </div>
  );
}

function ObjectListEditor({
  fields,
  titleKey,
  items,
  onChange,
  addLabel,
}: {
  fields: FieldDef[];
  titleKey: string;
  items: unknown[];
  onChange: (v: unknown[]) => void;
  addLabel: string;
}) {
  function update(i: number, key: string, value: unknown) {
    const next = items.map((it, idx) =>
      idx === i ? { ...asDict(it), [key]: value } : it,
    );
    onChange(next);
  }
  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }
  function add() {
    const item: Dict = {};
    for (const f of fields) item[f.key] = defaultFor(f);
    onChange([...items, item]);
  }

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const d = asDict(item);
        const title = asStr(d[titleKey]) || `আইটেম ${i + 1}`;
        return (
          <div key={i} className="rounded-xl border border-white/10 bg-ink-900/40 p-4">
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="truncate font-display text-sm font-semibold text-cyan-neon">
                {title}
              </span>
              <div className="flex shrink-0 gap-1.5">
                <button type="button" onClick={() => move(i, -1)} className="rounded border border-white/12 px-2 py-1 text-[10px] text-fog-400 hover:text-white">▲</button>
                <button type="button" onClick={() => move(i, 1)} className="rounded border border-white/12 px-2 py-1 text-[10px] text-fog-400 hover:text-white">▼</button>
                <button type="button" onClick={() => remove(i)} className="rounded border border-red-400/30 px-2 py-1 text-[10px] text-red-300 hover:bg-red-400/10">✕ মুছুন</button>
              </div>
            </div>
            <FieldGrid fields={fields} dict={d} onChange={(key, value) => update(i, key, value)} />
          </div>
        );
      })}
      <button
        type="button"
        onClick={add}
        className="w-full rounded-xl border border-dashed border-cyan-neon/40 bg-cyan-neon/5 px-4 py-2.5 text-xs font-semibold text-cyan-neon transition-colors hover:bg-cyan-neon/15"
      >
        + {addLabel}
      </button>
    </div>
  );
}

/* ============================================================
   Admin app shell
   ============================================================ */

export default function AdminApp({ initial, meta }: { initial: unknown; meta: AdminMeta }) {
  const router = useRouter();
  const [data, setData] = useState<Dict>(asDict(initial));
  const [section, setSection] = useState("site");
  const [saving, setSaving] = useState(false);
  const [banner, setBanner] = useState<{ ok: boolean; text: string } | null>(null);

  const snapshot = useMemo(() => JSON.stringify(asDict(initial)), [initial]);
  const dirty = JSON.stringify(data) !== snapshot;

  const current = SECTIONS.find((s) => s.id === section) ?? SECTIONS[0];

  const updateRoot = useCallback((key: string, value: unknown) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);

  async function save() {
    setSaving(true);
    setBanner(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok?: boolean; message?: string; error?: string };
      if (!res.ok || !json.ok) {
        setBanner({ ok: false, text: json.error || "সেভ করা যায়নি।" });
      } else {
        setBanner({
          ok: true,
          text: json.message || "সেভ হয়েছে।",
        });
      }
    } catch {
      setBanner({ ok: false, text: "নেটওয়ার্ক সমস্যা — আবার চেষ্টা করুন।" });
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/auth", { method: "DELETE" }).catch(() => {});
    router.replace("/admin/login");
    router.refresh();
  }

  function renderSection() {
    if (current.kind === "object") {
      const bind = current.bindKey ?? "";
      const dict = bind ? asDict(data[bind]) : data;
      const setKey = (key: string, value: unknown) => {
        if (bind) {
          setData((prev) => ({ ...prev, [bind]: { ...asDict(prev[bind]), [key]: value } }));
        } else {
          updateRoot(key, value);
        }
      };
      return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          <FieldGrid fields={current.fields ?? []} dict={dict} onChange={setKey} />
        </div>
      );
    }

    return (
      <ObjectListEditor
        fields={current.itemFields ?? []}
        titleKey={current.itemTitleKey ?? ""}
        items={asArr(data[current.bindKey ?? ""])}
        onChange={(v) => updateRoot(current.bindKey ?? "", v)}
        addLabel={current.addLabel ?? "নতুন আইটেম"}
      />
    );
  }

  return (
    <div className="min-h-svh pb-28">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-ink-950/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3.5 sm:px-6">
          <div className="grid size-9 shrink-0 place-items-center rounded-xl border border-cyan-neon/30 bg-cyan-neon/10 font-display text-sm font-bold text-cyan-neon">
            {asStr(asDict(data.site).initials) || "A"}
          </div>
          <div className="min-w-0">
            <h1 className="truncate font-display text-base font-bold text-fog-100">
              Portfolio Admin
            </h1>
            <p className="truncate text-[11px] text-fog-400">
              {dirty ? "● অসেভ পরিবর্তন আছে" : "সব সেভ আছে"}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/12 px-3 py-2 text-xs font-semibold text-fog-300 transition-colors hover:border-white/30 hover:text-white"
            >
              সাইট দেখুন ↗
            </a>
            <button
              type="button"
              onClick={logout}
              className="rounded-lg border border-white/12 px-3 py-2 text-xs font-semibold text-fog-300 transition-colors hover:border-red-400/40 hover:text-red-300"
            >
              লগআউট
            </button>
          </div>
        </div>
      </header>

      {/* Setup hints */}
      {meta.onVercel && !meta.githubPersistence && (
        <div className="border-b border-amber-400/20 bg-amber-400/10 px-4 py-2.5 text-center text-xs text-amber-200">
          Vercel-এ সেভ করতে <code className="font-mono">ADMIN_GITHUB_TOKEN</code> environment
          variable সেট করুন — তাহলে সেভ করলেই সাইট auto-redeploy হবে।
        </div>
      )}
      {meta.defaultPassword && (
        <div className="border-b border-white/10 bg-white/[0.03] px-4 py-2.5 text-center text-xs text-fog-300">
          ডিফল্ট পাসওয়ার্ড চলছে — Vercel-এ{" "}
          <code className="font-mono">ADMIN_PASSWORD</code> সেট করে নিরাপদ করুন।
        </div>
      )}

      {banner && (
        <div
          className={`px-4 py-3 text-center text-xs leading-relaxed ${
            banner.ok
              ? "border-b border-emerald-400/20 bg-emerald-400/10 text-emerald-200"
              : "border-b border-red-400/20 bg-red-400/10 text-red-200"
          }`}
        >
          {banner.text}
        </div>
      )}

      <div className="mx-auto flex max-w-6xl gap-6 px-4 py-6 sm:px-6">
        {/* Sidebar tabs */}
        <nav className="hidden w-52 shrink-0 lg:block">
          <div className="sticky top-24 space-y-1">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSection(s.id)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-left text-[13px] font-semibold transition-colors ${
                  s.id === section
                    ? "bg-cyan-neon/12 text-cyan-neon"
                    : "text-fog-400 hover:bg-white/[0.04] hover:text-fog-100"
                }`}
              >
                <span aria-hidden>{s.emoji}</span>
                {s.title}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile chips */}
        <div className="fixed inset-x-0 top-[57px] z-10 flex gap-1.5 overflow-x-auto border-b border-white/10 bg-ink-950/90 px-4 py-2.5 backdrop-blur lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSection(s.id)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                s.id === section
                  ? "bg-cyan-neon/15 text-cyan-neon"
                  : "bg-white/[0.05] text-fog-400"
              }`}
            >
              {s.emoji} {s.title}
            </button>
          ))}
        </div>

        <main className="min-w-0 flex-1 pt-14 lg:pt-0">
          <h2 className="mb-4 font-display text-lg font-bold text-fog-100">
            {current.emoji} {current.title}
          </h2>
          {renderSection()}
        </main>
      </div>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-ink-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <p className="min-w-0 flex-1 truncate text-xs text-fog-400">
            {dirty ? "পরিবর্তনগুলো এখনো সেভ হয়নি।" : "সব আপডেট টু ডেট।"}
          </p>
          <button
            type="button"
            onClick={() => setData(asDict(initial))}
            disabled={!dirty}
            className="rounded-lg border border-white/12 px-4 py-2.5 text-xs font-semibold text-fog-300 transition-colors hover:text-white disabled:opacity-30"
          >
            রিসেট
          </button>
          <button
            type="button"
            onClick={save}
            disabled={saving || !dirty}
            className="rounded-lg bg-cyan-neon px-6 py-2.5 font-display text-sm font-bold text-ink-950 transition-opacity disabled:opacity-40"
          >
            {saving ? "সেভ হচ্ছে…" : "সেভ করুন"}
          </button>
        </div>
      </div>
    </div>
  );
}
