"use client"

import { Check, Circle, Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

export const GENERATION_STEPS = [
  { label: "Keyword Analysis", message: "Analyzing keyword..." },
  { label: "Search Intent Detection", message: "Understanding search intent..." },
  { label: "Entity Extraction", message: "Extracting entities..." },
  { label: "Building Outline", message: "Building SEO outline..." },
  { label: "Writing Article", message: "Writing article..." },
  { label: "SEO Optimization", message: "Optimizing for SEO..." },
] as const

export type GenerationPhase = "generating" | "done"

export function GenerationProgress({
  phase,
  stepIndex,
  progress,
}: {
  phase: GenerationPhase
  stepIndex: number
  progress: number
}) {
  const isDone = phase === "done"

  return (
    <div className="mt-5 animate-in fade-in slide-in-from-top-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 duration-300 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-foreground">
          {isDone ? "Article generated" : "Generating your article"}
        </p>
        <span className="text-xs font-semibold tabular-nums text-muted-foreground">
          {progress}%
        </span>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-[width] duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ul className="mt-4 flex flex-col gap-1.5 sm:gap-2">
        {GENERATION_STEPS.map((step, index) => {
          const isComplete = isDone || index < stepIndex
          const isActive = !isDone && index === stepIndex

          return (
            <li
              key={step.label}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors duration-300",
                isActive && "bg-white/5"
              )}
            >
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  isComplete && "border-emerald-400/40 bg-emerald-400/15",
                  isActive && "border-indigo-400/50 bg-indigo-400/10",
                  !isComplete && !isActive && "border-white/10 bg-white/5"
                )}
              >
                {isComplete ? (
                  <Check className="size-3 text-emerald-400" />
                ) : isActive ? (
                  <Loader2 className="size-3 animate-spin text-indigo-300" />
                ) : (
                  <Circle className="size-2 text-white/25" />
                )}
              </span>
              <span
                className={cn(
                  "text-sm transition-colors duration-300",
                  isComplete && "text-foreground/90",
                  isActive && "font-medium text-foreground",
                  !isComplete && !isActive && "text-muted-foreground/60"
                )}
              >
                {step.label}
                {isActive ? "..." : ""}
              </span>
            </li>
          )
        })}
      </ul>

      <p
        key={isDone ? "done" : stepIndex}
        className="mt-4 animate-in fade-in text-center text-xs text-muted-foreground duration-300"
      >
        {isDone ? "Your article is ready to review below." : GENERATION_STEPS[stepIndex]?.message}
      </p>
    </div>
  )
}
