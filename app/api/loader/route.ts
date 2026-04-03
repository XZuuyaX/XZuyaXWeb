// app/api/loader/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const scriptName = searchParams.get("script") || "UniversalLoader.lua";
  const userAgent = (req.headers.get("user-agent") || "").toLowerCase();

  // Logging untuk debug (bisa dilihat di Vercel Logs)
  console.log(`[LOADER] Script requested: ${scriptName} | User-Agent: ${userAgent}`);

  // Jika yang akses adalah Browser → redirect ke halaman website
  if (userAgent.includes("mozilla") || 
      userAgent.includes("chrome") || 
      userAgent.includes("safari") || 
      userAgent.includes("firefox") || 
      userAgent.includes("edge")) {
    
    console.log(`[LOADER] Browser detected, redirecting to /scripts`);
    return NextResponse.redirect(new URL("/scripts", req.url));
  }

  // Executor / Script Executor → ambil dari GitHub
  const githubURL = `https://api.github.com/repos/XZuuyaX/XZuyaXsHUBPrivate/contents/${scriptName}`;

  console.log(`[LOADER] Fetching from GitHub: ${githubURL}`);

  const response = await fetch(githubURL, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3.raw",
      "User-Agent": "XZuyaX-Hub-Loader", // GitHub kadang butuh ini
    },
    cache: "no-store",        // pastikan selalu ambil versi terbaru
  });

  if (!response.ok) {
    console.error(`[LOADER] GitHub Error: ${response.status} ${response.statusText}`);
    return new NextResponse(`-- Script not found: ${scriptName}`, { 
      status: 404,
      headers: { "Content-Type": "text/plain" }
    });
  }

  const script = await response.text();

  console.log(`[LOADER] Successfully loaded \( {scriptName} ( \){script.length} characters)`);

  return new NextResponse(script, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
    },
  });
}
