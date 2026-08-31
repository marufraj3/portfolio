import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminApp from "@/components/admin/AdminApp";
import { SESSION_COOKIE, isDefaultPassword, verifySessionValue } from "@/lib/admin-auth";
import content from "@/content/site.json";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const jar = await cookies();
  const session = jar.get(SESSION_COOKIE)?.value;
  // Middleware already guards this route; this is a second check.
  if (!(await verifySessionValue(session))) redirect("/admin/login");

  return (
    <AdminApp
      initial={content}
      meta={{
        githubPersistence: !!process.env.ADMIN_GITHUB_TOKEN,
        onVercel: !!process.env.VERCEL,
        defaultPassword: isDefaultPassword(),
      }}
    />
  );
}
