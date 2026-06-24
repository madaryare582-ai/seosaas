"use client"

import { Loader2, ListChecks } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useNicheFinder } from "@/components/dashboard/niche-finder/use-niche-finder"

export function TopicalMap() {
  const { topicalMap, generateCalendar, pendingAction, calendarWeeks } = useNicheFinder()
  if (!topicalMap) return null
  const isGenerating = pendingAction === "calendar"

  return (
    <div
      id="nf-topical-map"
      className="animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl duration-500 sm:p-6"
    >
      <p className="text-sm font-medium text-foreground">Topical Authority Map</p>
      <p className="text-xs text-muted-foreground">
        Topic clusters radiating from your core niche, “{topicalMap.center}”
      </p>

      <div className="relative mx-auto mt-6 aspect-square w-full max-w-md">
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full">
          <defs>
            <linearGradient id="topical-map-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgb(129 140 248)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="rgb(232 121 249)" stopOpacity="0.15" />
            </linearGradient>
          </defs>
          {topicalMap.nodes.map((node) => (
            <line
              key={node.label}
              x1="50"
              y1="50"
              x2={node.x}
              y2={node.y}
              stroke="url(#topical-map-line)"
              strokeWidth="0.6"
            />
          ))}
        </svg>

        <div className="absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 p-5 text-center shadow-xl shadow-indigo-500/30 sm:p-6">
          <span className="text-xs font-semibold text-white capitalize">{topicalMap.center}</span>
        </div>

        {topicalMap.nodes.map((node) => (
          <div
            key={node.label}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
          >
            <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[11px] font-medium whitespace-nowrap text-foreground backdrop-blur-xl">
              {node.label}
            </span>
            <span className="rounded-full bg-background/80 px-1.5 py-0.5 text-[10px] text-emerald-400 ring-1 ring-emerald-400/30">
              {node.relevance}%
            </span>
          </div>
        ))}
      </div>

      {calendarWeeks.length === 0 && (
        <div className="mt-6 flex justify-center">
          <Button
            onClick={generateCalendar}
            disabled={isGenerating}
            className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
          >
            {isGenerating ? <Loader2 className="animate-spin" /> : <ListChecks />}
            {isGenerating ? "Generating..." : "Generate 30-Day Content Calendar"}
          </Button>
        </div>
      )}
    </div>
  )
}
