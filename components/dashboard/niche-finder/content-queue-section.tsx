"use client"

import * as React from "react"
import { Loader2, Pencil, Sparkles, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GenerationProgress } from "@/components/dashboard/article-generator/generation-progress"
import { useGenerationTimer } from "@/components/dashboard/article-generator/use-generation-timer"
import { useNicheFinder } from "@/components/dashboard/niche-finder/use-niche-finder"

export function ContentQueueSection() {
  const { queue, removeFromQueue, completeNextArticle, dailyUsage } = useNicheFinder()
  const { phase, stepIndex, progress, start } = useGenerationTimer()
  const [isActive, setIsActive] = React.useState(false)
  const [editMode, setEditMode] = React.useState(false)

  React.useEffect(() => {
    if (isActive && phase === "done") {
      const timeout = window.setTimeout(() => {
        completeNextArticle()
        setIsActive(false)
      }, 900)
      return () => window.clearTimeout(timeout)
    }
  }, [isActive, phase, completeNextArticle])

  if (queue.length === 0 && !isActive) return null

  const remainingToday = Math.max(0, dailyUsage.limit - dailyUsage.used)
  const atLimit = remainingToday === 0
  const estimatedDays = Math.max(1, Math.ceil(queue.length / Math.max(1, remainingToday || dailyUsage.limit)))
  const showProgress = isActive && phase !== "idle"

  const handleStart = () => {
    if (atLimit || queue.length === 0 || isActive) return
    start()
    setIsActive(true)
  }

  return (
    <div
      id="nf-queue"
      className="animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl duration-500 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">Content Queue</p>
          <p className="text-xs text-muted-foreground">
            {queue.length > 0
              ? `Estimated Completion: ${estimatedDays} ${estimatedDays === 1 ? "Day" : "Days"}`
              : "Your queue is empty — add topics from the calendar above."}
          </p>
        </div>
        {queue.length > 0 && (
          <Button variant="outline" size="sm" onClick={() => setEditMode((prev) => !prev)}>
            <Pencil />
            {editMode ? "Done Editing" : "Edit Queue"}
          </Button>
        )}
      </div>

      {queue.length > 0 && (
        <ol className="mt-4 flex flex-col gap-1.5">
          {queue.map((item, index) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
            >
              <span className="flex items-center gap-2.5">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-white/15 text-[10px] text-muted-foreground">
                  {index + 1}
                </span>
                <span className="line-clamp-1 text-foreground">{item.title}</span>
              </span>
              {editMode && (
                <Button variant="ghost" size="icon-sm" onClick={() => removeFromQueue(item.id)}>
                  <Trash2 />
                </Button>
              )}
            </li>
          ))}
        </ol>
      )}

      {showProgress && (
        <GenerationProgress phase={phase as "generating" | "done"} stepIndex={stepIndex} progress={progress} />
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2.5">
        <Button
          onClick={handleStart}
          disabled={atLimit || queue.length === 0 || isActive}
          className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
        >
          {isActive ? <Loader2 className="animate-spin" /> : <Sparkles />}
          {isActive ? "Generating..." : "Start Generating Articles"}
        </Button>
        {atLimit && (
          <span className="text-xs text-amber-400">
            Daily limit reached — upgrade your plan to generate more today.
          </span>
        )}
      </div>
    </div>
  )
}
