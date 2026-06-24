"use client"

import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { useNicheFinder } from "@/components/dashboard/niche-finder/use-niche-finder"

const STEPS = [
  { label: "Niche", id: "nf-hero" },
  { label: "Keywords", id: "nf-keywords" },
  { label: "SERP", id: "nf-serp" },
  { label: "Opportunities", id: "nf-opportunities" },
  { label: "Topical Map", id: "nf-topical-map" },
  { label: "Calendar", id: "nf-calendar" },
  { label: "Queue", id: "nf-queue" },
]

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function WorkflowStepper() {
  const { furthestStep } = useNicheFinder()

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:p-5">
      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-0">
        {STEPS.map((step, index) => {
          const isCompleted = index < furthestStep
          const isCurrent = index === furthestStep
          const isClickable = isCompleted || isCurrent

          return (
            <div key={step.label} className="flex flex-1 items-center">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => scrollToSection(step.id)}
                className={cn(
                  "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all disabled:cursor-not-allowed",
                  isCurrent &&
                    "bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30",
                  isCompleted && !isCurrent && "bg-white/10 text-foreground hover:bg-white/15",
                  !isCompleted && !isCurrent && "text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "flex size-4.5 items-center justify-center rounded-full border text-[10px]",
                    isCurrent && "border-white/60",
                    isCompleted && !isCurrent && "border-emerald-400/40 bg-emerald-400/10 text-emerald-400",
                    !isCompleted && !isCurrent && "border-white/15"
                  )}
                >
                  {isCompleted && !isCurrent ? <Check className="size-2.5" /> : index + 1}
                </span>
                {step.label}
              </button>
              {index < STEPS.length - 1 && (
                <span
                  className={cn(
                    "mx-1 hidden h-px flex-1 sm:block",
                    index < furthestStep ? "bg-emerald-400/30" : "bg-white/10"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
