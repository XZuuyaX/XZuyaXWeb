import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GameCards } from "@/components/game-cards"

export const metadata: Metadata = {
  title: "Games - XZuyaX's HUB",
  description: "Browse all Roblox games supported by XZuyaX's HUB script hub.",
}

export default function GamePage() {
  return (
    <main className="relative min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.15_0.08_285)_0%,transparent_60%)]" />
      <Navbar />

      <section className="relative px-4 pt-28 pb-16">
        <div className="relative mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12">
            <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
              Game Library
            </span>
            <h1 className="text-glow text-3xl font-bold text-foreground md:text-5xl">
              Supported <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Games</span>
            </h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              Explore all the Roblox games we support. Click on a game to visit its Roblox page.
            </p>
          </div>

          <GameCards />
        </div>
      </section>

      <Footer />
    </main>
  )
}
