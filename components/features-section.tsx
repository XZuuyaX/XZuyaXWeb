import { Zap, Key, Shield } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Fast Service",
    description: "Lightning-fast script execution with optimized performance. No lag, no delays.",
    accent: "from-primary to-accent",
  },
  {
    icon: Key,
    title: "Key System",
    description: "Secure key-based authentication to protect premium scripts and ensure authorized access.",
    accent: "from-accent to-primary",
  },
  {
    icon: Shield,
    title: "Secure & Encrypted",
    description: "All scripts are encrypted and delivered through secure channels. Anti-detection built-in.",
    accent: "from-primary via-accent to-primary",
  },
]

export function FeaturesSection() {
  return (
    <section className="relative px-4 py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
            Features
          </span>
          <h2 className="text-glow text-3xl font-bold text-foreground md:text-4xl">
            Why Choose <span className="text-primary">XZuyaX{"'"}s HUB</span>
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="glass-card group relative overflow-hidden rounded-2xl p-8"
            >
              {/* Glow effect on hover */}
              <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${feature.accent} opacity-0 transition-opacity group-hover:opacity-100`} />
              
              <div className="mb-6 inline-flex rounded-xl bg-primary/10 p-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">{feature.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
