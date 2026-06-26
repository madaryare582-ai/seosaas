"use client"

import { AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react"

import { cn } from "@/lib/utils"
import type { SeoAnalysis } from "@/lib/seo-analysis"

const STATUS_STYLES = {
  pass: "bg-emerald-400/10 text-emerald-400",
  warn: "bg-amber-400/10 text-amber-400",
  fail: "bg-rose-400/10 text-rose-400",
} as const

export function SeoScoringPanel({ analysis }: { analysis: SeoAnalysis | null }) {
  const score = analysis?.overall ?? 0

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <p className="text-sm font-medium text-foreground">SEO Score</p>

      <div
        className="relative mx-auto flex items-center justify-center rounded-full"
        style={{
          height: 112,
          width: 112,
          background: `conic-gradient(rgb(129 140 248) ${score * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
        }}
      >
        <div
          className="absolute flex items-center justify-center rounded-full bg-background"
          style={{ height: 88, width: 88 }}
        >
          <span className="text-2xl font-semibold text-foreground">{score}</span>
        </div>
      </div>

      {!analysis ? (
        <p className="text-center text-xs text-muted-foreground">Generate an article to see its live SEO score.</p>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {analysis.metrics.map((metric) => (
              <div key={metric.key} className="flex items-center justify-between gap-2 text-sm">
                <span className="text-foreground/90">{metric.label}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium", STATUS_STYLES[metric.status])}>
                  {metric.score}
                </span>
              </div>
            ))}
          </div>

          {analysis.suggestions.length > 0 && (
            <div className="flex flex-col gap-1.5 rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
              <p className="flex items-center gap-1.5 text-xs font-medium text-amber-400">
                <Lightbulb className="size-3.5" />
                Suggestions
              </p>
              {analysis.suggestions.map((s) => (
                <p key={s} className="text-xs text-muted-foreground">{s}</p>
              ))}
            </div>
          )}

          {analysis.warnings.length > 0 && (
            <div className="flex flex-col gap-1.5 rounded-lg border border-rose-400/20 bg-rose-400/5 p-3">
              <p className="flex items-center gap-1.5 text-xs font-medium text-rose-400">
                <AlertTriangle className="size-3.5" />
                Warnings
              </p>
              {analysis.warnings.map((w) => (
                <p key={w} className="text-xs text-muted-foreground">{w}</p>
              ))}
            </div>
          )}

          {analysis.suggestions.length === 0 && analysis.warnings.length === 0 && (
            <div className="flex items-center gap-1.5 rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-3 text-xs text-emerald-400">
              <CheckCircle2 className="size-3.5" />
              All checks look good.
            </div>
          )}
        </>
      )}
    </div>
  )
}
