// app/api/loader/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const scriptName = searchParams.get("script") || "UniversalLoader.lua";
  const userAgent = req.headers.get("user-agent") || "";

  // Kalau browser → redirect ke halaman scripts
  if (
    userAgent.includes("Mozilla") ||
    userAgent.includes("Chrome") ||
    userAgent.includes("Safari") ||
    userAgent.includes("Firefox") ||
    userAgent.includes("Edge")
  ) {
    return NextResponse.redirect(new URL("/scripts", req.url));
  }

  // Executor → ambil dari GitHub private
  const githubURL = `https://api.github.com/repos/XZuuyaX/XZuyaXsHUBPrivate/contents/${scriptName}`;

  const response = await fetch(githubURL, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // ← tambahin ini nanti
      Accept: "application/vnd.github.v3.raw",
    },
  });

  if (!response.ok) {
    return new NextResponse("-- Script not found", { status: 404 });
  }

  const script = await response.text();

  return new NextResponse(script, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
