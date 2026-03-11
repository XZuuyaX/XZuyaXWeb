import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") || "";
  const acceptHeader = request.headers.get("accept") || "";

  // --- WHITELIST STATIC FILES supaya favicon & _next tetap bisa di-load ---
  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // --- ROOT PATH ---
  if (pathname === "/") {
    // Browser normal
    if (ua.includes("Mozilla") && acceptHeader.includes("text/html")) {
      return NextResponse.next();
    }

    // Executor request → loader
    const url = request.nextUrl.clone();
    url.pathname = "/api/loader";
    url.searchParams.set("script", "UniversalLoader.lua");
    return NextResponse.rewrite(url);
  }

  // --- PATH SCRIPT LAIN (executor) ---
  const url = request.nextUrl.clone();
  url.pathname = "/api/loader";
  url.searchParams.set("script", pathname.replace("/", ""));
  return NextResponse.rewrite(url);
}

// Matcher → semua path
export const config = {
  matcher: ["/:path*"],
};
