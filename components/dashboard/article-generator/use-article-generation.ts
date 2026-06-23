"use client"

import * as React from "react"

import { ARTICLE_TOKENS, MOCK_SEO_SCORE } from "@/components/dashboard/article-generator/article-content"
import { GENERATION_STEPS } from "@/components/dashboard/article-generator/generation-progress"

const STEP_DURATION_MS = 900
const STREAM_START_PCT = 34
const STREAM_END_PCT = 82

export type GenerationPhase = "idle" | "generating" | "done"
export type ArticleStatus = "drafting" | "optimizing" | "completed"

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function useArticleGeneration() {
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
    if (phase === "generating") return false // prevent duplicate generation requests

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

  const streamFraction = clamp(
    (progress - STREAM_START_PCT) / (STREAM_END_PCT - STREAM_START_PCT),
    0,
    1
  )

  const revealCount =
    phase === "done" ? ARTICLE_TOKENS.length : Math.round(streamFraction * ARTICLE_TOKENS.length)

  const wordCount = React.useMemo(() => {
    let count = 0
    for (let i = 0; i < revealCount && i < ARTICLE_TOKENS.length; i++) {
      if (ARTICLE_TOKENS[i].kind === "word") count++
    }
    return count
  }, [revealCount])

  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  const status: ArticleStatus =
    phase === "done" ? "completed" : stepIndex >= GENERATION_STEPS.length - 1 ? "optimizing" : "drafting"

  return {
    phase,
    stepIndex,
    progress,
    revealCount,
    wordCount,
    readingTime,
    status,
    seoScore: MOCK_SEO_SCORE,
    start,
  }
}
