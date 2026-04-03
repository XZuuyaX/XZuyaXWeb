// proxy.ts
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = (request.headers.get("user-agent") || "").toLowerCase();
  const accept = (request.headers.get("accept") || "").toLowerCase();

  // Lewati static files & API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icon") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Jika request minta HTML (browser biasa) → tampilkan website normal
  if (accept.includes("text/html")) {
    return NextResponse.next();
  }

  // Executor / HttpGet → ke loader
  const url = request.nextUrl.clone();
  url.pathname = "/api/loader";

  if (pathname === "/" || pathname === "") {
    url.searchParams.set("script", "UniversalLoader.lua");
  } else {
    const scriptName = pathname.startsWith("/") ? pathname.slice(1) : pathname;
    url.searchParams.set("script", scriptName);
  }

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/:path*"],
};
