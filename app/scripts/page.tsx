import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ScriptCards } from "@/components/script-cards"

export const metadata: Metadata = {
  title: "Scripts - XZuyaX's HUB",
  description: "Browse and copy premium Roblox scripts from XZuyaX's HUB.",
}

export default function ScriptsPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.15_0.08_285)_0%,transparent_60%)]" />
      <Navbar />

      <section className="relative px-4 pt-28 pb-16">
        <div className="relative mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
              Script Library
            </span>
            <h1 className="text-glow text-3xl font-bold text-foreground md:text-5xl">
              Available <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Scripts</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Copy the script and paste it into your executor. All scripts are encrypted and secure.
            </p>
          </div>

          <ScriptCards />
        </div>
      </section>

      <Footer />
    </main>
  )
}
