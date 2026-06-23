"use client"

import * as React from "react"
import { CheckCircle2, Clock, Copy, FileCode, FileDown, Type } from "lucide-react"

import {
  ARTICLE_BLOCKS,
  blocksToHtml,
  blocksToMarkdown,
  blocksToPlainText,
  getRevealedGroups,
} from "@/components/dashboard/article-generator/article-content"
import type {
  ArticleStatus,
  GenerationPhase,
} from "@/components/dashboard/article-generator/use-article-generation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const STATUS_LABEL: Record<ArticleStatus, string> = {
  drafting: "Drafting...",
  optimizing: "Optimizing...",
  completed: "Completed",
}

const STATUS_STYLES: Record<ArticleStatus, string> = {
  drafting: "bg-indigo-400/10 text-indigo-300",
  optimizing: "bg-amber-400/10 text-amber-400",
  completed: "bg-emerald-400/10 text-emerald-400",
}

function downloadFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function SkeletonContent() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="h-5 w-3/4 rounded-md bg-white/10" />
      <div className="h-3 w-full rounded-md bg-white/5" />
      <div className="h-3 w-5/6 rounded-md bg-white/5" />
      <div className="mt-3 h-4 w-2/5 rounded-md bg-white/10" />
      <div className="h-3 w-full rounded-md bg-white/5" />
      <div className="h-3 w-full rounded-md bg-white/5" />
      <div className="h-3 w-4/6 rounded-md bg-white/5" />
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-center">
      <p className={cn("text-base font-semibold", accent ? "text-emerald-400" : "text-foreground")}>
        {value}
      </p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}

export function ArticleOutputPanel({
  phase,
  revealCount,
  wordCount,
  readingTime,
  status,
  progress,
  seoScore,
}: {
  phase: GenerationPhase
  revealCount: number
  wordCount: number
  readingTime: number
  status: ArticleStatus
  progress: number
  seoScore: number
}) {
  const [copied, setCopied] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const groups = React.useMemo(() => getRevealedGroups(revealCount), [revealCount])
  const isStreaming = phase === "generating"
  const showSkeleton = isStreaming && groups.length === 0

  React.useEffect(() => {
    if (phase !== "generating") return
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [revealCount, phase])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(blocksToPlainText(ARTICLE_BLOCKS))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard permission denied or unavailable; ignore silently
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-top-2 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl duration-300 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-foreground">Article Preview</p>
          <Badge className={cn("border-0 text-[11px]", STATUS_STYLES[status])}>
            {STATUS_LABEL[status]}
          </Badge>
        </div>
        {phase === "generating" && (
          <span className="text-xs font-semibold tabular-nums text-muted-foreground">{progress}%</span>
        )}
      </div>

      <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <Type className="size-3.5" />
          {wordCount.toLocaleString()} words
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="size-3.5" />
          {readingTime} min read
        </span>
      </div>

      <div
        ref={scrollRef}
        className="mt-4 max-h-[420px] overflow-y-auto scroll-smooth rounded-xl border border-white/10 bg-black/20 p-4 sm:p-5"
      >
        {showSkeleton ? (
          <SkeletonContent />
        ) : (
          <div className="flex flex-col gap-3">
            {groups.map((group, index) => {
              const isLast = index === groups.length - 1
              const showCursor = isStreaming && isLast

              switch (group.block.type) {
                case "title":
                  return (
                    <h1 key={group.blockIndex} className="text-lg font-semibold text-foreground sm:text-xl">
                      {group.block.text}
                    </h1>
                  )
                case "meta":
                  return (
                    <div
                      key={group.blockIndex}
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-muted-foreground"
                    >
                      <span className="font-medium text-foreground/80">Meta Description: </span>
                      {group.block.text}
                    </div>
                  )
                case "h2":
                  return (
                    <h2 key={group.blockIndex} className="mt-2 text-base font-semibold text-foreground sm:text-[17px]">
                      {group.block.text}
                    </h2>
                  )
                case "h3":
                  return (
                    <h3 key={group.blockIndex} className="text-sm font-semibold text-foreground/90">
                      {group.block.text}
                    </h3>
                  )
                default:
                  return (
                    <p key={group.blockIndex} className="text-sm leading-relaxed text-foreground/90">
                      {group.words.join(" ")}
                      {showCursor && (
                        <span className="ml-0.5 inline-block h-3.5 w-[2px] -translate-y-0.5 animate-pulse bg-indigo-400 align-middle" />
                      )}
                    </p>
                  )
              }
            })}
          </div>
        )}
      </div>

      {phase === "done" && (
        <div className="mt-5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-3 py-2.5 text-sm font-medium text-emerald-400">
            <CheckCircle2 className="size-4" />
            Article Generated Successfully
          </div>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <Stat label="Words" value={wordCount.toLocaleString()} />
            <Stat label="Reading Time" value={`${readingTime} min`} />
            <Stat label="SEO Score" value={`${seoScore}/100`} accent />
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" className="flex-1" type="button" onClick={handleCopy}>
              <Copy />
              {copied ? "Copied!" : "Copy Article"}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              type="button"
              onClick={() =>
                downloadFile("article.md", blocksToMarkdown(ARTICLE_BLOCKS), "text/markdown")
              }
            >
              <FileDown />
              Download Markdown
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              type="button"
              onClick={() => downloadFile("article.html", blocksToHtml(ARTICLE_BLOCKS), "text/html")}
            >
              <FileCode />
              Download HTML
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
