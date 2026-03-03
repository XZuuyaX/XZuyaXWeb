import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || ""

  // If accessed from a browser, redirect to the home page
  if (
    userAgent.includes("Mozilla") ||
    userAgent.includes("Chrome") ||
    userAgent.includes("Safari") ||
    userAgent.includes("Firefox") ||
    userAgent.includes("Edge")
  ) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Accessed from an executor - execute the main loader from workers.dev
  const loaderScript = `-- XZuyaX's HUB Universal Loader
-- Secure & Encrypted Script Delivery

loadstring(game:HttpGet("https://loaders.xzuyaxhub.workers.dev"))()
`

  return new NextResponse(loaderScript, {
    headers: { "Content-Type": "text/plain" },
  })
}
