import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {

  const userAgent = request.headers.get("user-agent") || ""
  const { searchParams } = new URL(request.url)

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
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json"
    }
  })

  if (!response.ok) {
    return new NextResponse("Script not found", { status: 404 })
  }

  const data = await response.json()

  const script = Buffer
    .from(data.content, "base64")
    .toString("utf8")

  return new NextResponse(script, {
    headers: { "Content-Type": "text/plain" }
  })
}
