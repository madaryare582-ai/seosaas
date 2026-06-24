"use client"

import { Loader2, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useNicheFinder } from "@/components/dashboard/niche-finder/use-niche-finder"

const MEDALS = ["🥇", "🥈", "🥉"]

export function BestOpportunities() {
  const { serpRows, buildMap, pendingAction, topicalMap } = useNicheFinder()
  if (serpRows.length === 0) return null
  const isBuilding = pendingAction === "map"
  const top3 = [...serpRows].sort((a, b) => b.affiliateScore - a.affiliateScore).slice(0, 3)

  return (
    <div
      id="nf-opportunities"
      className="animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl duration-500 sm:p-6"
    >
      <p className="text-sm font-medium text-foreground">Best Opportunities</p>
      <p className="text-xs text-muted-foreground">Top-performing keywords ranked by affiliate potential</p>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {top3.map((row, index) => (
          <div
            key={row.keyword}
            className="flex flex-col gap-1.5 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:border-indigo-400/30 hover:bg-white/8"
          >
            <span className="text-2xl">{MEDALS[index]}</span>
            <p className="line-clamp-2 text-sm font-medium text-foreground capitalize">{row.keyword}</p>
            <p className="text-xs text-muted-foreground">Affiliate Score: {row.affiliateScore}</p>
          </div>
        ))}
      </div>

      {!topicalMap && (
        <div className="mt-5">
          <Button
            onClick={buildMap}
            disabled={isBuilding}
            className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
          >
            {isBuilding ? <Loader2 className="animate-spin" /> : <Sparkles />}
            {isBuilding ? "Building..." : "Create Content Strategy"}
          </Button>
        </div>
      )}
    </div>
  )
}
