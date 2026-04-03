// app/api/loader/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const scriptName = searchParams.get("script") || "UniversalLoader.lua";
  const userAgent = (req.headers.get("user-agent") || "").toLowerCase();

  console.log(`[LOADER] Requested: ${scriptName} | UA: ${userAgent.substring(0, 100)}...`);

  // Browser detection
  if (userAgent.includes("mozilla")) {
    return NextResponse.redirect(new URL("/scripts", req.url));
  }

  // Fetch dari GitHub
  const githubURL = `https://api.github.com/repos/XZuuyaX/XZuyaXsHUBPrivate/contents/${scriptName}`;

  const response = await fetch(githubURL, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3.raw",
      "User-Agent": "XZuyaX-Loader",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    console.error(`GitHub Error ${response.status}: ${scriptName}`);
    return new NextResponse(`-- Script not found: ${scriptName}\n`, { 
      status: 404,
      headers: { "Content-Type": "text/plain" }
    });
  }

  const script = await response.text();

  return new NextResponse(script, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache, no-store",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
