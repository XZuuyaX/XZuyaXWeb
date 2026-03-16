import { NextRequest, NextResponse } from "next/server";
import { SCRIPTS } from "@/lib/scripts-data";

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const { searchParams } = new URL(request.url);

  const scriptName = searchParams.get("script") || "UniversalLoader.lua";
  const scriptId = searchParams.get("id");

  // ===== Detect browser =====
  const isBrowser =
    userAgent.includes("Mozilla") ||
    userAgent.includes("Chrome") ||
    userAgent.includes("Safari") ||
    userAgent.includes("Firefox") ||
    userAgent.includes("Edge");

  // Browser → redirect ke halaman scripts
  if (isBrowser) {
    return NextResponse.redirect(new URL("/scripts", request.url));
  }

  // ===== PRIORITY: GitHub private repo =====
  const githubURL = `https://api.github.com/repos/XZuuyaX/XZuyaXsHUBPrivate/contents/${scriptName}`;

  try {
    const response = await fetch(githubURL, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      const script = Buffer.from(data.content, "base64").toString("utf8");

      return new NextResponse(script, {
        headers: {
          "Content-Type": "text/plain",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  } catch (error) {
    // lanjut ke fallback berikutnya
  }

  // ===== Backup: Local scripts =====
  if (scriptId) {
    const script = SCRIPTS.find((s) => s.id === scriptId);

    if (script) {
      return new NextResponse(script.content, {
        headers: {
          "Content-Type": "text/plain",
          "Cache-Control": "no-cache",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }

  // ===== Final fallback =====
  const fallbackScript = `-- XZuyaX's HUB Loader (fallback)
-- Visit https://xzuyax-hub.vercel.app for scripts

loadstring(game:HttpGet("https://loaders.xzuyaxhub.workers.dev"))()`;

  return new NextResponse(fallbackScript, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
