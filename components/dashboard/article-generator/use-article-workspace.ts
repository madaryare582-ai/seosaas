"use client"

import * as React from "react"

import { GENERATION_STEPS } from "@/components/dashboard/article-generator/generation-progress"
import {
  DEFAULT_ARTICLE_CONFIG,
  generateArticleSections,
  type ArticleConfig,
  type ArticleSection,
} from "@/lib/article-ai-content"

export type WorkspacePhase = "idle" | "generating" | "done"

const SECTION_REVEAL_DELAY_MS = 420

export function useArticleWorkspace() {
  const [config, setConfig] = React.useState<ArticleConfig>(DEFAULT_ARTICLE_CONFIG)
  const [phase, setPhase] = React.useState<WorkspacePhase>("idle")
  const [stepIndex, setStepIndex] = React.useState(0)
  const [sections, setSections] = React.useState<ArticleSection[]>([])
  const [revealedCount, setRevealedCount] = React.useState(0)
  const [lastRevealed, setLastRevealed] = React.useState<ArticleSection | null>(null)
  const [runId, setRunId] = React.useState(0)

  const seedRef = React.useRef(0)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const updateConfig = React.useCallback((patch: Partial<ArticleConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }))
  }, [])

  const runGeneration = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    const planned = generateArticleSections(config, seedRef.current)
    setRunId((id) => id + 1)
    setSections(planned)
    setRevealedCount(0)
    setLastRevealed(null)
    setPhase("generating")
    setStepIndex(0)

    let index = 0
    const total = planned.length

    function revealNext() {
      if (index >= total) {
        setPhase("done")
        setStepIndex(GENERATION_STEPS.length - 1)
        return
      }
      const section = planned[index]
      index += 1
      setRevealedCount(index)
      setLastRevealed(section)
      setStepIndex(Math.min(GENERATION_STEPS.length - 1, Math.floor((index / total) * GENERATION_STEPS.length)))
      timerRef.current = setTimeout(revealNext, SECTION_REVEAL_DELAY_MS)
    }

    revealNext()
  }, [config])

  const generate = React.useCallback(() => {
    if (phase === "generating") return
    runGeneration()
  }, [phase, runGeneration])

  const regenerate = React.useCallback(() => {
    if (phase === "generating") return
    seedRef.current += 1
    runGeneration()
  }, [phase, runGeneration])

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const progress = sections.length > 0 ? Math.round((revealedCount / sections.length) * 100) : 0
  const pendingSection = phase === "generating" ? sections[revealedCount] ?? null : null

  return {
    config,
    updateConfig,
    phase,
    stepIndex,
    progress,
    sections,
    revealedCount,
    lastRevealed,
    pendingSection,
    runId,
    generate,
    regenerate,
  }
}
