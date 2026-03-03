import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only intercept the root path for executor detection
  if (pathname === "/") {
    const acceptHeader = request.headers.get("accept") || ""

    // Match the Cloudflare Worker pattern from query.sql:
    // If Accept header contains text/html -> browser, show the website
    // Otherwise -> executor (Roblox), serve Lua script
    if (!acceptHeader.includes("text/html")) {
      return NextResponse.rewrite(new URL("/api/lua-loader", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
}
