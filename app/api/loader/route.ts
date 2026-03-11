import { NextResponse } from "next/server"

export async function GET(req: Request) {

  const ua = req.headers.get("user-agent") || ""

  // kalau request dari browser → tampilkan website normal
  if (ua.includes("Mozilla")) {
    return NextResponse.redirect("https://xzuyax-hub.vercel.app/home")
  }

  // loader logic (tetap support ?script=)
  const { searchParams } = new URL(req.url)
  const scriptName = searchParams.get("script") || "UniversalLoader.lua"

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
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache"
    }
  })
}
