import { NextRequest, NextResponse } from "next/server"
import { SCRIPTS } from "@/lib/scripts-data"

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || ""
  const { searchParams } = new URL(request.url)
  const scriptId = searchParams.get("id")

  // If accessed from a browser, redirect to the website
  if (
    userAgent.includes("Mozilla") ||
    userAgent.includes("Chrome") ||
    userAgent.includes("Safari") ||
    userAgent.includes("Firefox") ||
    userAgent.includes("Edge")
  ) {
    return NextResponse.redirect(new URL("/scripts", request.url))
  }

  // Accessed from an executor
  if (scriptId) {
    const script = SCRIPTS.find((s) => s.id === scriptId)
    if (script) {
      return new NextResponse(script.content, {
        headers: { "Content-Type": "text/plain" },
      })
    }
  }

  // Default: execute main loader
  const defaultScript = `-- XZuyaX's HUB Loader
-- Visit https://xzuyax-hub.vercel.app for scripts

loadstring(game:HttpGet("https://loader.xzuyaxhub.workers.dev/?repo=Universal"))()`

  return new NextResponse(defaultScript, {
    headers: { "Content-Type": "text/plain" },
  })
}
