import { NextRequest, NextResponse } from "next/server";
import { SCRIPTS } from "@/lib/scripts-data";

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || "";
  const accept = request.headers.get("accept") || "";
  const { searchParams } = new URL(request.url);
  const scriptId = searchParams.get("id");

  // Deteksi browser: jika Accept meminta HTML atau user-agent mengandung identifier browser umum
  const isBrowser = accept.includes("text/html") || 
    /Mozilla|Chrome|Safari|Firefox|Edge/i.test(userAgent);

  if (isBrowser) {
    // Redirect ke halaman scripts (atau halaman utama sesuai kebutuhan)
    return NextResponse.redirect(new URL("/scripts", request.url));
  }

  // Jika ada parameter id, cari script yang sesuai
  if (scriptId) {
    const script = SCRIPTS.find((s) => s.id === scriptId);
    if (script) {
      return new NextResponse(script.content, {
        headers: { "Content-Type": "text/plain" },
      });
    }
  }

  // Default: kirim main loader (dari workers.dev)
  const defaultScript = `-- XZuyaX's HUB Universal Loader
-- Secure & Encrypted Script Delivery

loadstring(game:HttpGet("https://loaders.xzuyaxhub.workers.dev"))()
`;

  return new NextResponse(defaultScript, {
    headers: { "Content-Type": "text/plain" },
  });
}
