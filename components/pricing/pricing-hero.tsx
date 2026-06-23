import { Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export function PricingHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 size-96 animate-pulse rounded-full bg-indigo-600/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -right-32 size-96 animate-pulse rounded-full bg-purple-600/30 blur-3xl [animation-delay:1s]"
      />

      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:py-24 lg:px-8">
        <Badge className="border-0 bg-white/10 text-foreground">
          <Sparkles className="size-3" />
          Pricing
        </Badge>

        <h1 className="font-heading mx-auto mt-6 max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Simple, Transparent{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Pricing
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Start free, upgrade as you scale. No hidden fees, cancel anytime.
        </p>
      </div>
    </section>
  )
}
