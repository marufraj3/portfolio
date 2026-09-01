import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { MediaFile } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");
const MAX_BYTES = 8 * 1024 * 1024; // 8MB
const ALLOWED = new Map<string, string>([
  ["image/jpeg", ".jpg"],
  ["image/webp", ".webp"],
  ["image/png", ".png"],
  ["image/gif", ".gif"],
  ["image/svg+xml", ".svg"],
  ["image/avif", ".avif"],
]);

const GITHUB_REPO_OWNER = process.env.ADMIN_GITHUB_OWNER || "marufraj3";
const GITHUB_REPO_NAME = process.env.ADMIN_GITHUB_REPO || "portfolio";
const GITHUB_BRANCH = process.env.ADMIN_GITHUB_BRANCH || "main";

function githubToken(): string | undefined {
  return process.env.ADMIN_GITHUB_TOKEN || undefined;
}

function safeName(input: string): string {
  const base = input
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return base || "image";
}

function githubUrl(filePath: string): string {
  return `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${filePath}`;
}

async function githubHeaders() {
  return {
    Authorization: `Bearer ${githubToken()}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function getGhSha(api: string, headers: Record<string, string>): Promise<string | undefined> {
  try {
    const cur = await fetch(`${api}?ref=${GITHUB_BRANCH}`, { headers });
    if (cur.ok) return (await cur.json()).sha;
  } catch {
    // File may not exist yet.
  }
  return undefined;
}

async function pushToGitHub(
  filePath: string,
  content: Buffer,
  message: string,
): Promise<{ ok: boolean; sha?: string; error?: string }> {
  const token = githubToken();
  if (!token) return { ok: false, error: "no token" };

  const api = githubUrl(filePath);
  const headers = await githubHeaders();
  const sha = await getGhSha(api, headers);

  const put = await fetch(api, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: content.toString("base64"),
      branch: GITHUB_BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!put.ok) {
    const detail = await put.text().catch(() => "");
    return { ok: false, error: `GitHub ${put.status}: ${detail.slice(0, 240)}` };
  }
  const json = (await put.json().catch(() => ({}))) as { content?: { sha?: string } };
  return { ok: true, sha: json.content?.sha };
}

async function listFromGitHub(): Promise<MediaFile[]> {
  const token = githubToken();
  if (!token) return [];

  const headers = await githubHeaders();
  const url = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/git/trees/${GITHUB_BRANCH}?recursive=1`;
  const res = await fetch(url, { headers });
  if (!res.ok) return [];

  const json = (await res.json()) as { tree?: { path: string; size?: number; type?: string }[] };
  const prefix = "public/uploads/";
  const files = (json.tree ?? []).filter(
    (f) => f.type === "blob" && f.path.startsWith(prefix) && f.path !== prefix,
  );

  return files.map((f) => {
    const name = f.path.slice(prefix.length);
    return {
      name,
      url: `/uploads/${encodeURIComponent(name)}`,
      size: f.size ?? 0,
      type: path.extname(name).slice(1) || "image",
    };
  });
}

async function listLocal(): Promise<MediaFile[]> {
  try {
    await fs.mkdir(UPLOAD_ROOT, { recursive: true });
  } catch {
    return [];
  }
  const names = await fs
    .readdir(UPLOAD_ROOT)
    .catch(() => [])
    .then((items) => items.filter((n) => !n.startsWith(".")));

  const files: MediaFile[] = [];
  for (const name of names) {
    const full = path.join(UPLOAD_ROOT, name);
    try {
      const stat = await fs.stat(full);
      if (!stat.isFile()) continue;
      files.push({
        name,
        url: `/uploads/${encodeURIComponent(name)}`,
        size: stat.size,
        type: path.extname(name).slice(1) || "image",
      });
    } catch {
      continue;
    }
  }
  return files.sort((a, b) => a.name.localeCompare(b.name));
}

function extFor(type: string, original: string): string {
  const fromMime = ALLOWED.get(type);
  if (fromMime) return fromMime;
  const ext = path.extname(original).toLowerCase();
  return ext && ALLOWED.has(`image/${ext.slice(1)}`) ? ext : ".png";
}

export async function GET() {
  try {
    const files = githubToken() ? await listFromGitHub() : await listLocal();
    return NextResponse.json({ ok: true, files });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Failed to list media." },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "কোনো ফাইল পাওয়া যায়নি।" }, { status: 400 });
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json({ ok: false, error: "সর্বোচ্চ 8MB সাইজ রিকোয়ারমেন্ট।" }, { status: 413 });
    }

    const type = (file.type || "").toLowerCase();
    if (!type || !ALLOWED.has(type)) {
      return NextResponse.json(
        { ok: false, error: "শুধু JPG, PNG, WebP, GIF, SVG বা AVIF ছবি আপলোড করতে পারবেন।" },
        { status: 415 },
      );
    }

    const stamp = Date.now().toString(36);
    const ext = extFor(type, file.name);
    const name = `${safeName(path.parse(file.name).name)}-${stamp}${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const onVercel = !!process.env.VERCEL;
    if (onVercel) {
      const gh = await pushToGitHub(`public/uploads/${name}`, buffer, `media: upload ${name}`);
      if (!gh.ok) {
        return NextResponse.json(
          {
            ok: false,
            error: `Vercel-এ ছবি সেভ করতে ADMIN_GITHUB_TOKEN লাগবে (${gh.error}).`,
          },
          { status: 500 },
        );
      }
      return NextResponse.json({
        ok: true,
        media: { name, url: `/uploads/${encodeURIComponent(name)}`, size: file.size, type },
      });
    }

    await fs.mkdir(UPLOAD_ROOT, { recursive: true });
    await fs.writeFile(path.join(UPLOAD_ROOT, name), buffer);
    return NextResponse.json({
      ok: true,
      media: { name, url: `/uploads/${encodeURIComponent(name)}`, size: file.size, type },
    });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Upload failed." },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { name?: string };
    const name = (body.name ?? "").replace(/\.\./g, "").replace(/[\\/]/g, "");
    if (!name) return NextResponse.json({ ok: false, error: "ফাইলের নাম দরকার।" }, { status: 400 });

    const onVercel = !!process.env.VERCEL;
    if (onVercel) {
      const token = githubToken();
      if (!token) {
        return NextResponse.json({ ok: false, error: "Vercel-এ মুছতে ADMIN_GITHUB_TOKEN দরকার।" }, { status: 400 });
      }
      const api = githubUrl(`public/uploads/${name}`);
      const headers = await githubHeaders();
      const sha = await getGhSha(api, headers);
      if (!sha) return NextResponse.json({ ok: true }); // already gone
      const del = await fetch(api, {
        method: "DELETE",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ sha, branch: GITHUB_BRANCH, message: `media: delete ${name}` }),
      });
      if (!del.ok) {
        const detail = await del.text().catch(() => "");
        return NextResponse.json({ ok: false, error: `GitHub ${del.status}: ${detail.slice(0, 240)}` }, { status: 500 });
      }
      return NextResponse.json({ ok: true });
    }

    await fs.unlink(path.join(UPLOAD_ROOT, name)).catch(() => undefined);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Delete failed." },
      { status: 500 },
    );
  }
}
