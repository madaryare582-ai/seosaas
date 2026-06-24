"use client"

import { Download, Loader2, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useNicheFinder } from "@/components/dashboard/niche-finder/use-niche-finder"

function exportKeywordsCsv(keywords: { keyword: string; volume: number }[]) {
  const header = "Keyword,Search Volume"
  const rows = keywords.map((entry) => `"${entry.keyword.replace(/"/g, '""')}",${entry.volume}`)
  const csv = [header, ...rows].join("\n")
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = "niche-finder-keywords.csv"
  link.click()
  URL.revokeObjectURL(url)
}

export function KeywordDiscovery() {
  const { keywords, validateKeywords, pendingAction, serpRows } = useNicheFinder()
  if (keywords.length === 0) return null
  const isValidating = pendingAction === "validate"
  const preview = keywords.slice(0, 8)

  return (
    <div
      id="nf-keywords"
      className="animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl duration-500 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">Keyword Opportunities</p>
          <p className="text-xs text-muted-foreground">Generated from your niche and seed patterns</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground">
          {keywords.length} Keywords Generated
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {preview.map((entry) => (
          <div
            key={entry.keyword}
            className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-indigo-400/30 hover:bg-white/8"
          >
            <p className="line-clamp-2 text-sm font-medium text-foreground capitalize">{entry.keyword}</p>
            <span className="text-[11px] text-muted-foreground">{entry.volume.toLocaleString()} searches / mo</span>
          </div>
        ))}
      </div>

      {serpRows.length === 0 && (
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Button
            onClick={validateKeywords}
            disabled={isValidating}
            className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
          >
            {isValidating ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
            {isValidating ? "Validating..." : "Validate Top Keywords"}
          </Button>
          <Button variant="outline" onClick={() => exportKeywordsCsv(keywords)}>
            <Download />
            Export CSV
          </Button>
        </div>
      )}
    </div>
  )
}
