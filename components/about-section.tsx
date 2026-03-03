import Image from "next/image"

export function AboutSection() {
  return (
    <section className="relative px-4 py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl">
        <div className="glass-card overflow-hidden rounded-3xl">
          <div className="flex flex-col items-center gap-8 p-8 md:flex-row md:p-12">
            {/* Logo */}
            <div className="shrink-0">
              <div className="relative">
                <div className="absolute inset-0 scale-125 rounded-full bg-primary/20 blur-2xl" />
                <Image
                  src="/images/logo.png"
                  alt="XZuyaX's HUB Logo"
                  width={120}
                  height={120}
                  className="relative rounded-2xl"
                />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                About <span className="text-primary">{"XZuyaX's HUB"}</span>
              </h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                {"XZuyaX's HUB"} is a premium Roblox script hub dedicated to give high-quality,
                secure, undetected, and optimized scripts for various popular games. We prioritize user safety with
                our encrypted system and key-based authentication.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Our team continuously updates and maintains scripts to ensure compatibility and
                performance. Join our community to get the latest updates, support, and exclusive
                scripts.
              </p>

              {/* Stats */}
              <div className="mt-6 flex flex-wrap justify-center gap-6 md:justify-start">
                <div>
                  <div className="text-2xl font-bold text-primary">2</div>
                  <div className="text-xs text-muted-foreground">Scripts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">2</div>
                  <div className="text-xs text-muted-foreground">Supported Games</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">20k+</div>
                  <div className="text-xs text-muted-foreground">Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
