import Link from "next/link"
import { PlayCircle, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function PageHero() {
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

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-28 lg:px-8">
        <Badge className="border-0 bg-white/10 text-foreground">
          <Sparkles className="size-3" />
          How It Works
        </Badge>

        <h1 className="mx-auto mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          From Idea To{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Published Content
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          See how HiigsiSEO helps bloggers, niche site owners, and SEO teams
          organize their content workflow from topic discovery to
          publishing.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            asChild
            className="h-12 border-0 bg-gradient-to-r from-indigo-500 to-purple-600 px-8 text-base text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-400 hover:to-purple-500 hover:shadow-indigo-500/40"
          >
            <Link href="/signup">Get Started Free</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="h-12 border-white/15 bg-white/5 px-8 text-base text-foreground hover:bg-white/10"
          >
            <Link href="#product-showcase" className="flex items-center gap-2">
              <PlayCircle className="size-4" />
              View Demo
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
