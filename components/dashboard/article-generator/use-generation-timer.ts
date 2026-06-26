"use client"

import * as React from "react"

import { GENERATION_STEPS } from "@/components/dashboard/article-generator/generation-progress"

const STEP_DURATION_MS = 900

export type GenerationPhase = "idle" | "generating" | "done"

export function useGenerationTimer() {
  const [phase, setPhase] = React.useState<GenerationPhase>("idle")
  const [stepIndex, setStepIndex] = React.useState(0)
  const [progress, setProgress] = React.useState(0)
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null)

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const start = React.useCallback(() => {
    if (phase === "generating") return false

    setPhase("generating")
    setStepIndex(0)
    setProgress(0)

    const totalMs = STEP_DURATION_MS * GENERATION_STEPS.length
    const startedAt = Date.now()

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAt
      const pct = Math.min(100, Math.round((elapsed / totalMs) * 100))
      const idx = Math.min(GENERATION_STEPS.length - 1, Math.floor(elapsed / STEP_DURATION_MS))

      setProgress(pct)
      setStepIndex(idx)

      if (elapsed >= totalMs) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setProgress(100)
        setPhase("done")
      }
    }, 60)

    return true
  }, [phase])

  return { phase, stepIndex, progress, start }
}
