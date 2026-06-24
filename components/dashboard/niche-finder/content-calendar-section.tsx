"use client"

import { CalendarPlus, CalendarRange } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useNicheFinder } from "@/components/dashboard/niche-finder/use-niche-finder"

export function ContentCalendarSection() {
  const { calendarWeeks, addToQueue, queue } = useNicheFinder()
  if (calendarWeeks.length === 0) return null

  const queuedIds = new Set(queue.map((item) => item.id))
  const allItems = calendarWeeks.flatMap((week) => week.items)

  return (
    <div
      id="nf-calendar"
      className="animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl duration-500 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">Content Calendar</p>
          <p className="text-xs text-muted-foreground">A 30-day content plan generated from your topical map</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addToQueue(allItems)}
          disabled={allItems.every((item) => queuedIds.has(item.id))}
        >
          <CalendarRange />
          Add Entire Calendar
        </Button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {calendarWeeks.map((week) => {
          const allQueued = week.items.every((item) => queuedIds.has(item.id))
          return (
            <div key={week.week} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">Week {week.week}</p>
                <Button variant="ghost" size="sm" onClick={() => addToQueue(week.items)} disabled={allQueued}>
                  <CalendarPlus />
                  Add Week To Queue
                </Button>
              </div>
              <ul className="mt-2 flex flex-col gap-1.5">
                {week.items.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-2 text-sm">
                    <span className="line-clamp-1 text-foreground">{item.title}</span>
                    {queuedIds.has(item.id) && (
                      <span className="rounded-full bg-emerald-400/10 px-1.5 py-0.5 text-[10px] text-emerald-400 ring-1 ring-emerald-400/20">
                        Queued
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
