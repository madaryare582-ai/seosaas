"use client"

import { ListPlus, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useNicheFinder } from "@/components/dashboard/niche-finder/use-niche-finder"

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function StickyBottomBar() {
  const { calendarWeeks, keywords, topicalMap, addToQueue, queue, dailyUsage } = useNicheFinder()
  const allItems = calendarWeeks.flatMap((week) => week.items)
  const queuedIds = new Set(queue.map((item) => item.id))
  const hasUnqueuedItems = allItems.some((item) => !queuedIds.has(item.id))
  const atLimit = dailyUsage.used >= dailyUsage.limit

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 lg:left-64">
      <div className="border-t border-white/10 bg-background/80 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-sm font-medium text-foreground">Your SEO Strategy Is Ready</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>{allItems.length} Topics</span>
              <span>{keywords.length} Keywords</span>
              <span>{topicalMap?.nodes.length ?? 0} Clusters</span>
            </div>
          </div>
          <div className="flex gap-2.5">
            <Button
              variant="outline"
              size="sm"
              disabled={!hasUnqueuedItems}
              onClick={() => addToQueue(allItems)}
            >
              <ListPlus />
              Add To Queue
            </Button>
            <Button
              size="sm"
              disabled={queue.length === 0 || atLimit}
              onClick={() => scrollToSection("nf-queue")}
              className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
            >
              <Sparkles />
              Generate Next Article
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
