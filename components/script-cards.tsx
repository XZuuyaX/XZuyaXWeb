"use client"

import { useState } from "react"
import { Key, Copy, Check, Search } from "lucide-react"
import { SCRIPTS } from "@/lib/scripts-data"

export function ScriptCards() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "free" | "key">("all")

  const filtered = SCRIPTS.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.game.toLowerCase().includes(search.toLowerCase())
    const matchesFilter =
      filter === "all" ? true :
      filter === "key" ? s.hasKeySystem :
      !s.hasKeySystem
    return matchesSearch && matchesFilter
  })

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div>
      {/* Search & Filter */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search scripts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-secondary/30 py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-2">
          {(["all", "free", "key"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                filter === f
                  ? "bg-primary/20 text-primary"
                  : "border border-border bg-secondary/30 text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "All" : f === "free" ? "Free" : "Key System"}
            </button>
          ))}
        </div>
      </div>

      {/* Script Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((script) => (
          <div
            key={script.id}
            className="glass-card group relative overflow-hidden rounded-2xl p-6"
          >
            {/* Status indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${
                  script.status === "active" ? "bg-green-500" :
                  script.status === "updating" ? "bg-yellow-500" :
                  "bg-red-500"
                }`}
              />
              <span className={`text-xs font-medium ${
                script.status === "active" ? "text-green-400/80" :
                script.status === "updating" ? "text-yellow-400/80" :
                "text-red-400/80"
              }`}>
                {script.status === "active" ? "Active" : script.status === "updating" ? "Updating" : "Broken"}
              </span>
            </div>

            {/* Header */}
            <h3 className="mb-1 pr-20 text-lg font-bold text-foreground">{script.name}</h3>
            <p className="mb-4 text-sm text-muted-foreground">{script.description}</p>

            {/* Features */}
            <div className="mb-4 flex flex-wrap gap-1.5">
              {script.features.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                >
                  {f}
                </span>
              ))}
              {script.features.length > 3 && (
                <span className="rounded-lg bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground">
                  +{script.features.length - 3} more
                </span>
              )}
            </div>

            {/* Key System badge */}
            {script.hasKeySystem && (
              <div className="mb-4 flex items-center gap-1.5 text-xs text-accent">
                <Key className="h-3.5 w-3.5" />
                <span className="font-medium">Key System Required</span>
              </div>
            )}

            {/* Code Snippet */}
            <div className="rounded-xl border border-border bg-background/80 p-3">
              <code className="block overflow-x-auto whitespace-nowrap font-mono text-xs text-secondary-foreground scrollbar-none">
                {script.content}
              </code>
            </div>

            {/* Copy Button */}
            <button
              onClick={() => handleCopy(script.id, script.content)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-primary/30 bg-primary/10 py-2.5 text-sm font-medium text-primary transition-all hover:bg-primary/20"
            >
              {copiedId === script.id ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy Script
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No scripts found matching your search.</p>
        </div>
      )}
    </div>
  )
}
