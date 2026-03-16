import { NextRequest, NextResponse } from "next/server";
import { SCRIPTS } from "@/lib/scripts-data";

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const { searchParams } = new URL(request.url);
  const scriptParam = searchParams.get("script") || "";

  // Deteksi browser: jika user-agent mengandung identifier browser umum
  const isBrowser = /Mozilla|Chrome|Safari|Firefox|Edge/i.test(userAgent);
  if (isBrowser) {
    // Redirect ke halaman scripts
    return NextResponse.redirect(new URL("/scripts", request.url));
  }

  // Coba cari script di data statis berdasarkan id (param "script" dianggap sebagai id)
  const staticScript = SCRIPTS.find(s => s.id === scriptParam);
  if (staticScript) {
    // Kembalikan konten dari data statis (sudah berupa loadstring)
    return new NextResponse(staticScript.content, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // Jika tidak ditemukan di statis, fallback ke GitHub (sesuai kode lama)
  // Gunakan scriptParam sebagai nama file, atau default "UniversalLoader.lua"
  const scriptName = scriptParam || "UniversalLoader.lua";
  const githubURL = `https://api.github.com/repos/XZuuyaX/XZuyaXsHUBPrivate/contents/${scriptName}`;

  try {
    const response = await fetch(githubURL, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      // Jika GitHub juga tidak menemukan, kembalikan pesan error
      return new NextResponse("-- Script not found", { status: 404 });
    }

    const data = await response.json();
    const script = Buffer.from(data.content, "base64").toString("utf8");

    return new NextResponse(script, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    // Error saat fetch GitHub
    return new NextResponse("-- Internal server error", { status: 500 });
  }
}
