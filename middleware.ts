import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") || "";
  const acceptHeader = request.headers.get("accept") || "";

  // --- WHITELIST ---
  if (
  pathname.startsWith("/_next") ||
  pathname.startsWith("/api") ||
  pathname.startsWith("/scripts") ||
  pathname.startsWith("/game") ||
  pathname === "/" ||
  pathname === "/favicon.ico" ||
  pathname.startsWith("/icon") ||
  pathname.startsWith("/images")
) {
  return NextResponse.next();
  }

  // --- ROOT PATH ---
  if (pathname === "/") {
    if (ua.includes("Mozilla") && acceptHeader.includes("text/html")) {
      return NextResponse.next();
    }

    const url = request.nextUrl.clone();
    url.pathname = "/api/loader";
    url.searchParams.set("script", "UniversalLoader.lua");
    return NextResponse.rewrite(url);
  }

  // --- EXECUTOR SCRIPT PATH ---
  const url = request.nextUrl.clone();
  url.pathname = "/api/loader";
  url.searchParams.set("script", pathname.replace("/", ""));
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/:path*"],
};
