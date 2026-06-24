"use client"

import * as React from "react"
import { Loader2, Search, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNicheFinder } from "@/components/dashboard/niche-finder/use-niche-finder"

export function HeroSection() {
  const { analyzeNiche, pendingAction, niche } = useNicheFinder()
  const [value, setValue] = React.useState(niche)
  const isAnalyzing = pendingAction === "analyze"

  return (
    <div
      id="nf-hero"
      className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-xl sm:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 left-1/2 size-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/25 via-violet-500/20 to-fuchsia-500/20 blur-3xl"
      />
      <div className="relative">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="size-3 text-fuchsia-300" />
          Niche Finder
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Discover Profitable Niches in Seconds
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Analyze niche potential, validate keyword opportunities, build topical authority, and
          create a content strategy.
        </p>

        <form
          className="mt-6 flex flex-col gap-2.5 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault()
            analyzeNiche(value)
          }}
        >
          <Input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Weight Loss"
            aria-label="Enter your niche"
            className="h-10 flex-1 text-center sm:text-left"
          />
          <Button
            type="submit"
            disabled={isAnalyzing || !value.trim()}
            className="h-10 border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
          >
            {isAnalyzing ? <Loader2 className="animate-spin" /> : <Search />}
            {isAnalyzing ? "Analyzing..." : "Analyze Niche"}
          </Button>
        </form>
        <p className="mt-3 text-xs text-muted-foreground">Powered by AI + SERP Validation</p>
      </div>
    </div>
  )
}
