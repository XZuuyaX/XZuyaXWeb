"use client"

import Image from "next/image"
import { useState } from "react"
import { Check, Copy } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-16">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent/8 blur-[100px]" />

      {/* Floating Particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-primary/60"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `particle-float ${4 + i * 0.8}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 text-center">
        {/* Logo with Outline Glow */}
        <div className="animate-float relative flex items-center justify-center" style={{ width: 200, height: 200 }}>
          {/* Outer glow layer - large soft glow tracing the logo outline */}
          <div className="logo-glow-outer pointer-events-none absolute inset-0" aria-hidden="true">
            <Image
              src="/images/logo.png"
              alt=""
              width={200}
              height={200}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          {/* Inner glow layer - tighter glow for sharper outline */}
          <div className="logo-glow-inner pointer-events-none absolute inset-0" aria-hidden="true">
            <Image
              src="/images/logo.png"
              alt=""
              width={200}
              height={200}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          {/* Main logo */}
          <Image
            src="/images/logo.png"
            alt="XZuyaX's HUB Logo"
            width={200}
            height={200}
            className="animate-pulse-glow relative h-full w-full object-contain"
            priority
          />
        </div>

        {/* Title */}
        <div className="animate-fade-in-up space-y-4">
          <h1 className="text-glow text-5xl font-bold tracking-tight text-foreground md:text-7xl">
            {"XZuyaX's"}{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              HUB
            </span>
          </h1>
          <p className="mx-auto max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
            Secure & Undetected script for Roblox. Premium scripts, fast service, maximum performance.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: "0.3s" }}>
          <a
            href="/scripts"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_30px_oklch(0.55_0.25_285/0.4)]"
          >
            <span className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <ScriptIcon />
            <span className="relative">Get Scripts</span>
          </a>
          <a
            href="https://discord.gg/X4H7phPu8P"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-8 py-3.5 text-sm font-semibold text-secondary-foreground transition-all hover:border-primary/40 hover:bg-secondary"
          >
            <DiscordIcon />
            Join Discord
          </a>
        </div>

        {/* Loadstring */}
        <div className="animate-fade-in-up w-full max-w-2xl" style={{ animationDelay: "0.5s" }}>
          <div className="glass-card rounded-2xl p-4">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary/60" />
              <span className="text-xs font-medium text-muted-foreground">Universal Loader</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-background/80 p-3 font-mono text-sm text-secondary-foreground">
              <code className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-none">
                {'loadstring(game:HttpGet("https://xzuyax-hub.vercel.app"))()'}
              </code>
              <CopyButton text={'loadstring(game:HttpGet("https://xzuyax-hub.vercel.app"))()'} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="shrink-0 rounded-lg bg-primary/20 p-2 text-primary transition-all hover:bg-primary/30"
      aria-label="Copy loadstring to clipboard"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  )
}

function ScriptIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  )
}

function DiscordIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.947 2.418-2.157 2.418z" />
    </svg>
  )
}
