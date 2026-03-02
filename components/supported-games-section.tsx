import { ExternalLink } from "lucide-react"

const supportedGames = [
  {
    name: "Blue Lock: Rivals",
    description: "Free Cosmetics, Auto Goal, Auto GK, and more.",
    url: "https://www.roblox.com/games/18668065416/Blue-Lock-Rivals",
    color: "from-[#1e40af] to-[#3b82f6]",
  },
  {
    name: "Deadly Delivery",
    description: "Auto Farm & Utility Script with full automation.",
    url: "https://www.roblox.com/games/125810438250765/Deadly-Delivery",
    color: "from-[#991b1b] to-[#ef4444]",
  },
]

export function SupportedGamesSection() {
  return (
    <section className="relative px-4 py-24">
      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
            Supported Games
          </span>
          <h2 className="text-glow text-3xl font-bold text-foreground md:text-4xl">
            Games We <span className="text-primary">Support</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Our scripts are optimized for these popular Roblox games. Click to visit the game.
          </p>
        </div>

        {/* Game Cards Grid */}
        <div className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2">
          {supportedGames.map((game) => (
            <a
              key={game.name}
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group relative overflow-hidden rounded-2xl p-6"
            >
              {/* Top gradient accent */}
              <div className={`absolute top-0 left-0 h-1 w-full bg-gradient-to-r ${game.color}`} />

              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-bold text-foreground">
                    {game.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {game.description}
                  </p>
                </div>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:text-primary group-hover:opacity-100" />
              </div>

              {/* Status */}
              <div className="mt-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs font-medium text-green-400/80">Active</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
