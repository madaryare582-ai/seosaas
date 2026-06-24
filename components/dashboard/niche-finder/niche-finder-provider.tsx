"use client"

import * as React from "react"

import {
  buildCalendarWeeks,
  buildTopicalMap,
  generateKeywords,
  generateNicheScores,
  generateSerpRows,
  type CalendarItem,
  type CalendarWeek,
  type KeywordOpportunity,
  type NicheScores,
  type SerpRow,
  type TopicalMap,
} from "@/lib/niche-finder-data"

export type QueueItem = CalendarItem & { status: "queued" | "generating" }

type NicheFinderState = {
  niche: string
  pendingAction: "analyze" | "keywords" | "validate" | "map" | "calendar" | null
  scores: NicheScores | null
  keywords: KeywordOpportunity[]
  serpRows: SerpRow[]
  topicalMap: TopicalMap | null
  calendarWeeks: CalendarWeek[]
  queue: QueueItem[]
  dailyUsage: { used: number; limit: number }
  furthestStep: number
}

type NicheFinderContextValue = NicheFinderState & {
  analyzeNiche: (niche: string) => void
  generateKeywordOpportunities: () => void
  validateKeywords: () => void
  buildMap: () => void
  generateCalendar: () => void
  addToQueue: (items: CalendarItem[]) => void
  removeFromQueue: (id: string) => void
  completeNextArticle: () => void
}

const SIMULATED_DELAY_MS = 700

const NicheFinderContext = React.createContext<NicheFinderContextValue | null>(null)

export function NicheFinderProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<NicheFinderState>({
    niche: "",
    pendingAction: null,
    scores: null,
    keywords: [],
    serpRows: [],
    topicalMap: null,
    calendarWeeks: [],
    queue: [],
    dailyUsage: { used: 2, limit: 5 },
    furthestStep: 0,
  })

  const analyzeNiche = React.useCallback((niche: string) => {
    if (!niche.trim()) return
    setState((prev) => ({ ...prev, pendingAction: "analyze" }))
    window.setTimeout(() => {
      setState((prev) => ({
        ...prev,
        niche,
        scores: generateNicheScores(niche),
        pendingAction: null,
        furthestStep: Math.max(prev.furthestStep, 1),
      }))
    }, SIMULATED_DELAY_MS)
  }, [])

  const generateKeywordOpportunities = React.useCallback(() => {
    setState((prev) => ({ ...prev, pendingAction: "keywords" }))
    window.setTimeout(() => {
      setState((prev) => ({
        ...prev,
        keywords: generateKeywords(prev.niche),
        pendingAction: null,
        furthestStep: Math.max(prev.furthestStep, 2),
      }))
    }, SIMULATED_DELAY_MS)
  }, [])

  const validateKeywords = React.useCallback(() => {
    setState((prev) => ({ ...prev, pendingAction: "validate" }))
    window.setTimeout(() => {
      setState((prev) => ({
        ...prev,
        serpRows: generateSerpRows(prev.keywords, prev.niche),
        pendingAction: null,
        furthestStep: Math.max(prev.furthestStep, 4),
      }))
    }, SIMULATED_DELAY_MS)
  }, [])

  const buildMap = React.useCallback(() => {
    setState((prev) => ({ ...prev, pendingAction: "map" }))
    window.setTimeout(() => {
      setState((prev) => ({
        ...prev,
        topicalMap: buildTopicalMap(prev.niche),
        pendingAction: null,
        furthestStep: Math.max(prev.furthestStep, 5),
      }))
    }, SIMULATED_DELAY_MS)
  }, [])

  const generateCalendar = React.useCallback(() => {
    setState((prev) => ({ ...prev, pendingAction: "calendar" }))
    window.setTimeout(() => {
      setState((prev) => ({
        ...prev,
        calendarWeeks: buildCalendarWeeks(prev.niche),
        pendingAction: null,
        furthestStep: Math.max(prev.furthestStep, 6),
      }))
    }, SIMULATED_DELAY_MS)
  }, [])

  const addToQueue = React.useCallback((items: CalendarItem[]) => {
    setState((prev) => {
      const existingIds = new Set(prev.queue.map((item) => item.id))
      const additions = items
        .filter((item) => !existingIds.has(item.id))
        .map((item) => ({ ...item, status: "queued" as const }))
      if (additions.length === 0) return prev
      return { ...prev, queue: [...prev.queue, ...additions] }
    })
  }, [])

  const removeFromQueue = React.useCallback((id: string) => {
    setState((prev) => ({ ...prev, queue: prev.queue.filter((item) => item.id !== id) }))
  }, [])

  const completeNextArticle = React.useCallback(() => {
    setState((prev) => {
      if (prev.queue.length === 0 || prev.dailyUsage.used >= prev.dailyUsage.limit) return prev
      return {
        ...prev,
        queue: prev.queue.slice(1),
        dailyUsage: { ...prev.dailyUsage, used: prev.dailyUsage.used + 1 },
      }
    })
  }, [])

  const value = React.useMemo<NicheFinderContextValue>(
    () => ({
      ...state,
      analyzeNiche,
      generateKeywordOpportunities,
      validateKeywords,
      buildMap,
      generateCalendar,
      addToQueue,
      removeFromQueue,
      completeNextArticle,
    }),
    [
      state,
      analyzeNiche,
      generateKeywordOpportunities,
      validateKeywords,
      buildMap,
      generateCalendar,
      addToQueue,
      removeFromQueue,
      completeNextArticle,
    ]
  )

  return <NicheFinderContext.Provider value={value}>{children}</NicheFinderContext.Provider>
}

export function useNicheFinderContext() {
  const ctx = React.useContext(NicheFinderContext)
  if (!ctx) throw new Error("useNicheFinderContext must be used within NicheFinderProvider")
  return ctx
}
