import { NextRequest, NextResponse } from "next/server"
import { NextResponse } from "next/server"

export async function GET(request: NextRequest) {

  const userAgent = request.headers.get("user-agent") || ""
  const { searchParams } = new URL(request.url)
export async function GET(req: Request) {

  const { searchParams } = new URL(req.url)
  const scriptName = searchParams.get("script") || "UniversalLoader.lua"

  // Browser → buka website
  if (
    userAgent.includes("Mozilla") ||
    userAgent.includes("Chrome") ||
    userAgent.includes("Safari") ||
    userAgent.includes("Firefox") ||
    userAgent.includes("Edge")
  ) {
    return NextResponse.redirect(new URL("/scripts", request.url))
  }

  // Executor → ambil script dari GitHub private repo
  const githubURL = `https://api.github.com/repos/XZuuyaX/XZuyaXsHUBPrivate/contents/${scriptName}`

  const response = await fetch(githubURL, {
@@ -29,7 +15,7 @@ export async function GET(request: NextRequest) {
  })

  if (!response.ok) {
    return new NextResponse("Script not found", { status: 404 })
    return new NextResponse("-- Script not found", { status: 404 })
  }

  const data = await response.json()
@@ -39,6 +25,10 @@ export async function GET(request: NextRequest) {
    .toString("utf8")

  return new NextResponse(script, {
    headers: { "Content-Type": "text/plain" }
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*"
    }
  })
}
