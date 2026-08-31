import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import content from "@/content/site.json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONTENT_PATH = path.join(process.cwd(), "src", "content", "site.json");
const GITHUB_REPO_OWNER = process.env.ADMIN_GITHUB_OWNER || "marufraj3";
const GITHUB_REPO_NAME = process.env.ADMIN_GITHUB_REPO || "portfolio";
const GITHUB_BRANCH = process.env.ADMIN_GITHUB_BRANCH || "main";

function githubToken(): string | undefined {
  return process.env.ADMIN_GITHUB_TOKEN || undefined;
}

/** Light validation so a bad save can't take the whole site down. */
function validate(data: unknown): string | null {
  if (typeof data !== "object" || data === null) return "Content must be an object.";
  const d = data as Record<string, unknown>;
  if (!d.site || typeof d.site !== "object") return "`site` section is missing.";
  const s = d.site as Record<string, unknown>;
  if (typeof s.name !== "string" || s.name.trim().length < 2) return "Site name is required.";
  if (typeof s.email !== "string" || !s.email.includes("@")) return "A valid email is required.";
  for (const key of [
    "nav",
    "stats",
    "about",
    "skillGroups",
    "projects",
    "services",
    "testimonials",
    "processSteps",
    "faqs",
  ]) {
    if (!Array.isArray(d[key]) && key !== "about") return `\`${key}\` must be a list.`;
  }
  return null;
}

/**
 * Persist to GitHub (used on Vercel, where the filesystem is
 * read-only): commit the JSON to the repo, Vercel redeploys, the
 * new content goes live ~a minute later.
 */
async function commitToGitHub(json: string): Promise<{ ok: boolean; detail: string }> {
  const token = githubToken();
  if (!token) return { ok: false, detail: "no token" };

  const api = `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/src/content/site.json`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  let sha: string | undefined;
  try {
    const cur = await fetch(`${api}?ref=${GITHUB_BRANCH}`, { headers });
    if (cur.ok) sha = (await cur.json()).sha;
  } catch {
    // File may not exist yet — create it without a sha.
  }

  const put = await fetch(api, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "content: update from admin panel",
      content: Buffer.from(json, "utf8").toString("base64"),
      branch: GITHUB_BRANCH,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!put.ok) {
    const detail = await put.text().catch(() => "");
    return { ok: false, detail: `GitHub ${put.status}: ${detail.slice(0, 200)}` };
  }
  return { ok: true, detail: "committed" };
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    content,
    meta: {
      githubPersistence: !!githubToken(),
      onVercel: !!process.env.VERCEL,
    },
  });
}

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const problem = validate(data);
  if (problem) {
    return NextResponse.json({ ok: false, error: `Content invalid: ${problem}` }, { status: 422 });
  }

  const json = `${JSON.stringify(data, null, 2)}\n`;
  const onVercel = !!process.env.VERCEL;
  const token = githubToken();

  // On Vercel the filesystem is ephemeral — the only real persistence
  // is committing back to GitHub (which also triggers the redeploy).
  if (onVercel && !token) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Vercel-এ সেভ করতে ADMIN_GITHUB_TOKEN environment variable দরকার। Vercel → Settings → Environment Variables-এ ADMIN_GITHUB_TOKEN যোগ করুন (GitHub fine-grained token, Contents: Read & Write permission)।",
      },
      { status: 400 },
    );
  }

  const results: string[] = [];
  let githubOk = false;

  if (token) {
    const gh = await commitToGitHub(json);
    githubOk = gh.ok;
    results.push(gh.ok ? "GitHub-এ commit হয়েছে — Vercel ~1 মিনিটে নিজে থেকেই redeploy হবে।" : `GitHub commit ব্যর্থ (${gh.detail})।`);
  }

  // Local/dev write (instant effect via hot reload).
  let localOk = false;
  try {
    await fs.mkdir(path.dirname(CONTENT_PATH), { recursive: true });
    await fs.writeFile(CONTENT_PATH, json, "utf8");
    localOk = true;
    if (!onVercel) results.unshift("লোকাল ফাইলে সেভ হয়েছে — সাইট সাথে সাথেই আপডেট হয়ে গেছে।");
  } catch (e) {
    if (!token) {
      return NextResponse.json(
        { ok: false, error: `ফাইলে লিখতে সমস্যা: ${e instanceof Error ? e.message : "unknown"}` },
        { status: 500 },
      );
    }
  }

  const ok = githubOk || localOk;
  return NextResponse.json({
    ok,
    persisted: githubOk && localOk ? "github+local" : githubOk ? "github" : "local",
    message: results.join(" "),
  });
}
