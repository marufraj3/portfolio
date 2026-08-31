"use client";

import { useState, type ReactNode } from "react";

/* ============================================================
   Small form primitives for the admin panel
   ============================================================ */

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] tracking-[0.16em] text-fog-400 uppercase">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-fog-400/70">{hint}</span>}
    </label>
  );
}

const inputCls =
  "w-full rounded-lg border border-white/12 bg-ink-900/80 px-3 py-2 text-sm text-fog-100 outline-none transition-colors placeholder:text-fog-400/40 focus:border-cyan-neon/60";

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value ?? ""}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={inputCls}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value ?? ""}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputCls} resize-y leading-relaxed`}
    />
  );
}

export function NumberInput({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <input
      type="number"
      value={value ?? 0}
      min={min}
      max={max}
      onChange={(e) => onChange(Number(e.target.value))}
      className={inputCls}
    />
  );
}

export function ColorInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={/^#[0-9a-fA-F]{6}$/.test(value ?? "") ? value : "#4fd7ff"}
        onChange={(e) => onChange(e.target.value)}
        className="size-9 shrink-0 cursor-pointer rounded-lg border border-white/12 bg-transparent p-1"
      />
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </div>
  );
}

export function Toggle({
  value,
  onChange,
  label,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
        value
          ? "border-cyan-neon/50 bg-cyan-neon/10 text-cyan-neon"
          : "border-white/12 bg-ink-900/80 text-fog-400"
      }`}
    >
      <span
        className={`grid size-4 place-items-center rounded-full border ${
          value ? "border-cyan-neon bg-cyan-neon/20" : "border-white/25"
        }`}
      >
        {value && <span className="size-1.5 rounded-full bg-cyan-neon" />}
      </span>
      {label}
    </button>
  );
}

export function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value ?? options[0]}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputCls} appearance-none`}
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-ink-900">
          {o}
        </option>
      ))}
    </select>
  );
}

/* ============================================================
   String list editor (tags / lines)
   ============================================================ */

export function StringList({
  value,
  onChange,
  multiline = false,
  addLabel = "যোগ করুন",
  placeholder,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  multiline?: boolean;
  addLabel?: string;
  placeholder?: string;
}) {
  const items = Array.isArray(value) ? value : [];
  const [draft, setDraft] = useState("");

  function update(i: number, v: string) {
    onChange(items.map((it, idx) => (idx === i ? v : it)));
  }
  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    const next = [...items];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-1.5">
          {multiline ? (
            <textarea
              value={item}
              rows={2}
              onChange={(e) => update(i, e.target.value)}
              className={`${inputCls} resize-y leading-relaxed`}
            />
          ) : (
            <input
              value={item}
              onChange={(e) => update(i, e.target.value)}
              placeholder={placeholder}
              className={inputCls}
            />
          )}
          <div className="flex shrink-0 flex-col gap-1 pt-0.5">
            <button type="button" onClick={() => move(i, -1)} className="rounded border border-white/12 px-1.5 text-[10px] text-fog-400 hover:text-white" aria-label="Up">
              ▲
            </button>
            <button type="button" onClick={() => move(i, 1)} className="rounded border border-white/12 px-1.5 text-[10px] text-fog-400 hover:text-white" aria-label="Down">
              ▼
            </button>
          </div>
          <button
            type="button"
            onClick={() => remove(i)}
            className="mt-1 shrink-0 rounded-lg border border-red-400/30 px-2.5 py-1.5 text-xs text-red-300 transition-colors hover:bg-red-400/10"
          >
            ✕
          </button>
        </div>
      ))}
      <div className="flex gap-1.5">
        {!multiline && (
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && draft.trim()) {
                e.preventDefault();
                onChange([...items, draft.trim()]);
                setDraft("");
              }
            }}
            placeholder={placeholder || "নতুন আইটেম লিখে Enter দিন"}
            className={inputCls}
          />
        )}
        <button
          type="button"
          onClick={() => {
            if (multiline) {
              onChange([...items, ""]);
            } else if (draft.trim()) {
              onChange([...items, draft.trim()]);
              setDraft("");
            }
          }}
          className="shrink-0 rounded-lg border border-cyan-neon/40 bg-cyan-neon/10 px-3 py-2 text-xs font-semibold text-cyan-neon transition-colors hover:bg-cyan-neon/20"
        >
          + {addLabel}
        </button>
      </div>
    </div>
  );
}
