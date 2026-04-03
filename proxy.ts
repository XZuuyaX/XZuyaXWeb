// proxy.ts
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Lewati static files, API, dan halaman website
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/icon") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/scripts") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // SEMUA request lain (termasuk executor) → paksa ke loader
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
