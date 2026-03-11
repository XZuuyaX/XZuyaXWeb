import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {

  const ua = req.headers.get("user-agent") || ""
  const path = req.nextUrl.pathname

  // browser buka website
  if (ua.includes("Mozilla") && path === "/") {
    return NextResponse.next()
  }

  // browser coba buka script langsung
  if (ua.includes("Mozilla") && path !== "/") {
    return new NextResponse("403 Forbidden", { status: 403 })
  }

  // executor root → UniversalLoader
  if (path === "/") {
    const url = req.nextUrl.clone()
    url.pathname = "/api/loader"
    url.searchParams.set("script", "UniversalLoader.lua")
    return NextResponse.rewrite(url)
  }

  // executor script lain
  if (path !== "/") {
    const url = req.nextUrl.clone()
    url.pathname = "/api/loader"
    url.searchParams.set("script", path.replace("/", ""))
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}
