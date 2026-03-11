import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl
  const acceptHeader = request.headers.get("accept") || ""

  // browser request → tampil website normal
  if (acceptHeader.includes("text/html")) {
    return NextResponse.next()
  }

  // executor root → UniversalLoader
  if (pathname === "/") {
    const url = request.nextUrl.clone()
    url.pathname = "/api/loader"
    url.searchParams.set("script", "UniversalLoader.lua")
    return NextResponse.rewrite(url)
  }

  // executor path script
  if (pathname !== "/") {
    const url = request.nextUrl.clone()
    url.pathname = "/api/loader"
    url.searchParams.set("script", pathname.replace("/", ""))
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/:path*"],
}
