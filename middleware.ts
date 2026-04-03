import { NextRequest, NextResponse } from "next/server"
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") || "";
  const acceptHeader = request.headers.get("accept") || "";

  const { pathname } = request.nextUrl
  const acceptHeader = request.headers.get("accept") || ""

  // browser request → tampil website normal
  if (acceptHeader.includes("text/html")) {
    return NextResponse.next()
  // --- WHITELIST STATIC FILES supaya favicon & _next tetap bisa di-load ---
  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/images")
  ) {
    return NextResponse.next();
  }

  // executor root → UniversalLoader
  // --- ROOT PATH ---
  if (pathname === "/") {
    const url = request.nextUrl.clone()
    url.pathname = "/api/loader"
    url.searchParams.set("script", "UniversalLoader.lua")
    return NextResponse.rewrite(url)
  }
    // Browser normal
    if (ua.includes("Mozilla") && acceptHeader.includes("text/html")) {
      return NextResponse.next();
    }

  // executor path script
  if (pathname !== "/") {
    const url = request.nextUrl.clone()
    url.pathname = "/api/loader"
    url.searchParams.set("script", pathname.replace("/", ""))
    return NextResponse.rewrite(url)
    // Executor request → loader
    const url = request.nextUrl.clone();
    url.pathname = "/api/loader";
    url.searchParams.set("script", "UniversalLoader.lua");
    return NextResponse.rewrite(url);
  }

  return NextResponse.next()
  // --- PATH SCRIPT LAIN (executor) ---
  const url = request.nextUrl.clone();
  url.pathname = "/api/loader";
  url.searchParams.set("script", pathname.replace("/", ""));
  return NextResponse.rewrite(url);
}

// Matcher → semua path
export const config = {
  matcher: ["/:path*"],
}
};
