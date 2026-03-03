import { NextResponse } from "next/server"

export async function GET() {
  // This is the Lua script served to Roblox executors when they HttpGet the root URL
  const luaScript = 'loadstring(game:HttpGet("https://loader.xzuyaxhub.workers.dev/?repo=Universal"))()'

  return new NextResponse(luaScript, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  })
}
