"use client"

import type { LucideIcon } from "lucide-react"
import { Activity, DollarSign, Loader2, Sparkles, Swords, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useNicheFinder } from "@/components/dashboard/niche-finder/use-niche-finder"

function ScoreCard({
  label,
  value,
  icon: Icon,
  accent,
  description,
}: {
  label: string
  value: number
  icon: LucideIcon
  accent: string
  description: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/30 hover:bg-white/8">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-8 -right-8 size-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity group-hover:opacity-30",
          accent
        )}
      />
      <div className="relative flex items-center justify-between">
        <span className={cn("flex size-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg", accent)}>
          <Icon className="size-5 text-white" />
        </span>
        <span className="text-2xl font-semibold tracking-tight text-foreground">{value}</span>
      </div>
      <p className="relative mt-3 text-sm font-medium text-foreground">{label}</p>
      <Progress value={value} className="relative mt-3 h-1.5" />
      <p className="relative mt-3 text-xs text-muted-foreground">{description}</p>
    </div>
  )
}

export function NicheOverview() {
  const { scores, generateKeywordOpportunities, pendingAction, keywords } = useNicheFinder()
  if (!scores) return null
  const isGenerating = pendingAction === "keywords"

  const cards = [
    {
      label: "Demand Score",
      value: scores.demand,
      icon: TrendingUp,
      accent: "from-indigo-500 via-violet-500 to-fuchsia-500",
      description: "Search interest for this niche over the past 12 months.",
    },
    {
      label: "Competition Score",
      value: scores.competition,
      icon: Swords,
      accent: "from-violet-500 to-indigo-500",
      description: "How saturated this niche is across top SERPs.",
    },
    {
      label: "Monetization Score",
      value: scores.monetization,
      icon: DollarSign,
      accent: "from-fuchsia-500 to-violet-500",
      description: "Affiliate and ad revenue potential for content here.",
    },
    {
      label: "Trend Score",
      value: scores.trend,
      icon: Activity,
      accent: "from-indigo-500 to-fuchsia-500",
      description: "Momentum based on rising or falling search trends.",
    },
  ]

  return (
    <div id="nf-overview" className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <ScoreCard key={card.label} {...card} />
        ))}
      </div>
      {keywords.length === 0 && (
        <div className="flex justify-center">
          <Button
            onClick={generateKeywordOpportunities}
            disabled={isGenerating}
            className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {isGenerating ? "Generating..." : "Generate Keyword Opportunities"}
          </Button>
        </div>
      )}
    </div>
  )
}
