"use client"

import { useState } from "react"
import { ExternalLink, Search, Gamepad2 } from "lucide-react"
import { GAMES, SCRIPTS } from "@/lib/scripts-data"

export function GameCards() {
  const [search, setSearch] = useState("")

  const filtered = GAMES.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.genre.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Search */}
      <div className="relative mb-8 max-w-md">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search games..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-border bg-secondary/30 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
        />
      </div>

      {/* Game Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((game) => {
          const gameScripts = SCRIPTS.filter((s) => s.game === game.name)

          return (
            <a
              key={game.id}
              href={game.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card group relative overflow-hidden rounded-2xl"
            >
              {/* Top gradient bar */}
              <div className={`h-2 w-full bg-gradient-to-r ${game.color}`} />

              <div className="p-6">
                {/* Genre Badge */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {game.genre}
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:text-primary group-hover:opacity-100" />
                </div>

                {/* Game Info */}
                <div className="mb-3 flex items-start gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${game.color}`}>
                    <Gamepad2 className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{game.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {game.description}
                    </p>
                  </div>
                </div>

                {/* Script count */}
                <div className="mt-4 flex items-center gap-4 border-t border-border pt-4">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-xs text-muted-foreground">
                      {gameScripts.length} {gameScripts.length === 1 ? "Script" : "Scripts"} Available
                    </span>
                  </div>
                  {gameScripts.some((s) => s.hasKeySystem) && (
                    <span className="text-xs text-accent">Key Required</span>
                  )}
                </div>
              </div>
            </a>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No games found matching your search.</p>
        </div>
      )}
    </div>
  )
}
