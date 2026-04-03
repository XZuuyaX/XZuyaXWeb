// proxy.ts
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = (request.headers.get("user-agent") || "").toLowerCase();
  const accept = (request.headers.get("accept") || "").toLowerCase();

  // Lewati static files & assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icon") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/scripts") ||   // halaman website kamu
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // Browser biasa yang minta HTML → tampilkan website
  if (accept.includes("text/html") || ua.includes("mozilla")) {
    return NextResponse.next();
  }

  // Semua request lain (executor, curl, dll) → redirect ke loader
  const url = request.nextUrl.clone();
  url.pathname = "/api/loader";

  if (pathname === "/" || pathname === "") {
    url.searchParams.set("script", "UniversalLoader.lua");
  } else {
    // hapus leading slash
    const scriptName = pathname.startsWith("/") ? pathname.slice(1) : pathname;
    url.searchParams.set("script", scriptName);
  }

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/:path*"],
};
