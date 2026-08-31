import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionValue } from "@/lib/admin-auth";

/**
 * Guards the admin panel and its API. The login page and the auth
 * endpoint stay public; everything else under /admin needs a valid
 * session cookie.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLogin = pathname === "/admin/login";
  const isAuthApi = pathname === "/api/admin/auth";
  if (isLogin || isAuthApi) return NextResponse.next();

  const authed = await verifySessionValue(req.cookies.get(SESSION_COOKIE)?.value);

  if (!authed) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
