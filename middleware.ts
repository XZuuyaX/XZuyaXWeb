import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accept = request.headers.get("accept") || "";

  // ===== STATIC FILES =====
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // ===== WEBSITE PAGES (browser) =====
  if (accept.includes("text/html")) {
    return NextResponse.next();
  }

  // ===== EXECUTOR ROOT =====
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/api/loader";
    url.searchParams.set("script", "UniversalLoader.lua");
    return NextResponse.rewrite(url);
  }

  // ===== EXECUTOR SCRIPT PATH =====
  const url = request.nextUrl.clone();
  url.pathname = "/api/loader";
  url.searchParams.set("script", pathname.replace("/", ""));
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/:path*"],
};
