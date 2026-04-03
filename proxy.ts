// proxy.ts
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const ua = (request.headers.get("user-agent") || "").toLowerCase();

  // Lewati semua static & API
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

  // Semua request selain browser → ke loader
  const url = request.nextUrl.clone();
  url.pathname = "/api/loader";

  const cleanPath = pathname === "/" ? "UniversalLoader.lua" : pathname.replace("/", "");
  url.searchParams.set("script", cleanPath);

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/:path*"],
};
