import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { SupportedGamesSection } from "@/components/supported-games-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      {/* Background gradient overlay */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.15_0.08_285)_0%,transparent_60%)]" />

      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SupportedGamesSection />
      <AboutSection />
      <Footer />
    </main>
  )
}
