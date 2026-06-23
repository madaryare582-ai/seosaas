import Link from "next/link"
import {
  FileText,
  Gauge,
  ListChecks,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const trafficBars = [32, 48, 40, 60, 52, 74, 90]

export function Hero() {
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

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:py-28 lg:px-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <Badge className="border-0 bg-white/10 text-foreground">
            <Sparkles className="size-3" />
            AI-Powered SEO Engine
          </Badge>

          <h1 className="font-heading mt-6 max-w-xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            AI SEO Content That{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Actually Ranks
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-9">
            Discover profitable keywords, build topical authority, and
            generate SEO-optimized articles in minutes.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="h-12 border-0 bg-gradient-to-r from-indigo-500 to-purple-600 px-8 text-base text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-400 hover:to-purple-500 hover:shadow-indigo-500/40"
            >
              <Link href="/signup">Get Started</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 border-white/15 bg-white/5 px-8 text-base text-foreground hover:bg-white/10"
            >
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4">
              <span className="text-sm font-medium text-foreground">
                SEO Dashboard
              </span>
              <Badge variant="outline" className="border-emerald-400/30 text-emerald-400">
                Live
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Search className="size-4 text-indigo-400" />
                  <span className="text-xs font-medium tracking-wide">Keyword Research</span>
                </div>
                <p className="mt-2 text-xl font-bold text-foreground">
                  1,204
                </p>
                <p className="text-xs text-muted-foreground">keywords found</p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <ListChecks className="size-4 text-purple-400" />
                  <span className="text-xs font-medium tracking-wide">Content Planner</span>
                </div>
                <p className="mt-2 text-xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground">
                  articles planned
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="size-4 text-indigo-400" />
                  <span className="text-xs font-medium tracking-wide">Article Generator</span>
                </div>
                <p className="mt-2 text-xl font-bold text-foreground">82%</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 transition-transform duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Gauge className="size-4 text-purple-400" />
                  <span className="text-xs font-medium tracking-wide">SEO Score</span>
                </div>
                <p className="mt-2 text-xl font-bold text-emerald-400">
                  94/100
                </p>
                <p className="text-xs text-muted-foreground">excellent</p>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="size-4 text-emerald-400" />
                <span className="text-xs font-medium tracking-wide">Traffic Growth</span>
              </div>
              <div className="mt-3 flex h-16 items-end gap-1.5">
                {trafficBars.map((height, index) => (
                  <div
                    key={index}
                    style={{ height: `${height}%` }}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-indigo-500/60 to-purple-400"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
