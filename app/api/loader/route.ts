import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const scriptName = searchParams.get("script") || "UniversalLoader.lua";

  // Deteksi apakah request berasal dari browser
  const userAgent = req.headers.get("user-agent") || "";
  const accept = req.headers.get("accept") || "";
  const isBrowser = accept.includes("text/html") || 
    /Mozilla|Chrome|Safari|Firefox|Edge/i.test(userAgent);

  const githubURL = `https://api.github.com/repos/XZuuyaX/XZuyaXsHUBPrivate/contents/${scriptName}`;

  const response = await fetch(githubURL, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json"
    }
  });

  if (!response.ok) {
    // Jika script tidak ditemukan di GitHub
    if (isBrowser) {
      // Redirect pengguna browser ke halaman daftar script
      return NextResponse.redirect(new URL("/scripts", req.url));
    } else {
      // Untuk executor (misal Roblox), tetap kirim pesan error teks
      return new NextResponse("-- Script not found", { status: 404 });
    }
  }

  const data = await response.json();
  const script = Buffer.from(data.content, "base64").toString("utf8");

  return new NextResponse(script, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
