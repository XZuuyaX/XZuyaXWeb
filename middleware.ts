import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accept = request.headers.get("accept") || "";

  // ===== WHITELIST (tidak diproses middleware) =====
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/scripts") ||
    pathname.startsWith("/game") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // ===== Browser → tampilkan website =====
  if (accept.includes("text/html")) {
    return NextResponse.next();
  }

  // ===== Executor root → UniversalLoader =====
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/api/loader";
    url.searchParams.set("script", "UniversalLoader.lua");
    return NextResponse.rewrite(url);
  }

  // ===== Executor script path =====
  const url = request.nextUrl.clone();
  url.pathname = "/api/loader";
  url.searchParams.set("script", pathname.replace("/", ""));
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/:path*"],
};
