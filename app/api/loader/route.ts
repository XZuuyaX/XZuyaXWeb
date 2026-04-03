// app/api/loader/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const scriptName = searchParams.get("script") || "UniversalLoader.lua";
  const userAgent = (req.headers.get("user-agent") || "").toLowerCase();
  const accept = (req.headers.get("accept") || "").toLowerCase();

  console.log(`[LOADER] Script: ${scriptName} | UA: ${userAgent} | Accept: ${accept}`);

  // Hanya redirect ke /scripts kalau benar-benar browser yang minta HTML
  if (accept.includes("text/html")) {
    console.log("[LOADER] Browser detected → redirect to /scripts");
    return NextResponse.redirect(new URL("/scripts", req.url));
  }

  // Executor / HttpGet → load script
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
    console.error(`[LOADER] GitHub Error ${response.status} for ${scriptName}`);
    return new NextResponse(`-- Script not found: ${scriptName}`, { 
      status: 404,
      headers: { "Content-Type": "text/plain" }
    });
  }

  const script = await response.text();

  return new NextResponse(script, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
