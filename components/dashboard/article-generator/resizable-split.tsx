"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const MIN_LEFT_WIDTH = 300
const MAX_LEFT_WIDTH = 560
const DEFAULT_LEFT_WIDTH = 380

export function ResizableSplit({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [leftWidth, setLeftWidth] = React.useState(DEFAULT_LEFT_WIDTH)

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!containerRef.current || event.buttons === 0) return
    const rect = containerRef.current.getBoundingClientRect()
    const next = event.clientX - rect.left
    setLeftWidth(Math.min(MAX_LEFT_WIDTH, Math.max(MIN_LEFT_WIDTH, next)))
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-6 lg:flex-row lg:items-start" style={{ "--left-w": `${leftWidth}px` } as React.CSSProperties}>
      <div className="w-full lg:sticky lg:top-6 lg:w-[var(--left-w)] lg:shrink-0">{left}</div>

      <div
        role="separator"
        aria-orientation="vertical"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className={cn(
          "hidden w-1.5 shrink-0 cursor-col-resize self-stretch rounded-full bg-white/5 transition-colors hover:bg-indigo-400/40 lg:block"
        )}
      />

      <div className="min-w-0 flex-1">{right}</div>
    </div>
  )
}
