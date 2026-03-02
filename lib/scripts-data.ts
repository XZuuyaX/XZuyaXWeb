export interface Script {
  id: string
  name: string
  game: string
  description: string
  features: string[]
  content: string
  hasKeySystem: boolean
  status: "active" | "updating" | "broken"
}

export interface Game {
  id: string
  name: string
  description: string
  url: string
  scriptCount: number
  color: string
  genre: string
}

export const SCRIPTS: Script[] = [
  {
    id: "blr",
    name: "Blue Lock: Rivals",
    game: "Blue Lock: Rivals",
    description: "Free Cosmetics, Auto Goal, Auto GK, and more.",
    features: ["Free Cosmetics", "Auto Goal", "Auto GK", "ESP", "Speed Boost"],
    content: 'loadstring(game:HttpGet("https://loader.xzuyaxhub.workers.dev/?repo=BLR"))()',
    hasKeySystem: true,
    status: "active",
  },
  {
    id: "deadly",
    name: "Deadly Delivery",
    game: "Deadly Delivery",
    description: "Auto Farm & Utility Script with full automation.",
    features: ["Auto Farm", "Auto Collect", "ESP", "Teleport", "Speed"],
    content: 'loadstring(game:HttpGet("https://loader.xzuyaxhub.workers.dev/?repo=DeadlyDelivery"))()',
    hasKeySystem: true,
    status: "active",
  },
]

export const GAMES: Game[] = [
  {
    id: "blr",
    name: "Blue Lock: Rivals",
    description: "Compete in the ultimate soccer battle royale. Score goals, unlock cosmetics, and dominate the field.",
    url: "https://www.roblox.com/games/18668065416/Blue-Lock-Rivals",
    scriptCount: 1,
    color: "from-[#1e40af] to-[#3b82f6]",
    genre: "Sports",
  },
  {
    id: "deadly",
    name: "Deadly Delivery",
    description: "Survive the dangers and complete deliveries in this thrilling survival game.",
    url: "https://www.roblox.com/games/125810438250765/Deadly-Delivery",
    scriptCount: 1,
    color: "from-[#991b1b] to-[#ef4444]",
    genre: "Horror",
  },
]
