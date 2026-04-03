// proxy.ts
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = request.headers.get("user-agent") || "";
  const acceptHeader = request.headers.get("accept") || "";

  // Static files & assets dilewatin
  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/scripts")
  ) {
    return NextResponse.next();
  }

  // Browser biasa → tampilkan website normal
  if (acceptHeader.includes("text/html") || ua.includes("Mozilla")) {
    return NextResponse.next();
  }

  // Root path → UniversalLoader
  if (pathname === "/" || pathname === "") {
    const url = request.nextUrl.clone();
    url.pathname = "/api/loader";
    url.searchParams.set("script", "UniversalLoader.lua");
    return NextResponse.rewrite(url);
  }

  // Path lain → load script sesuai nama path
  const url = request.nextUrl.clone();
  url.pathname = "/api/loader";
  url.searchParams.set("script", pathname.replace("/", ""));
  return NextResponse.rewrite(url);
}

// Jalankan di semua path
export const config = {
  matcher: ["/:path*"],
};
