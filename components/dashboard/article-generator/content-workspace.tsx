"use client"

import * as React from "react"
import { Copy, Loader2, RefreshCw, Sparkles } from "lucide-react"

import { GenerationProgress } from "@/components/dashboard/article-generator/generation-progress"
import type { useArticleWorkspace } from "@/components/dashboard/article-generator/use-article-workspace"
import {
  ArticleEditor,
  type ArticleEditorHandle,
} from "@/components/dashboard/article-generator/editor/article-editor"
import { Button } from "@/components/ui/button"
import type { HeadingInfo } from "@/lib/seo-analysis"

export function ContentWorkspace({
  workspace,
  editorRef,
  onEditorUpdate,
}: {
  workspace: ReturnType<typeof useArticleWorkspace>
  editorRef: React.RefObject<ArticleEditorHandle | null>
  onEditorUpdate: (payload: { text: string; html: string; headings: HeadingInfo[] }) => void
}) {
  const { phase, stepIndex, progress, runId, lastRevealed, pendingSection, generate, regenerate } = workspace
  const [fullscreen, setFullscreen] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  React.useEffect(() => {
    editorRef.current?.setContent("")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runId])

  React.useEffect(() => {
    if (lastRevealed) editorRef.current?.insertSection(lastRevealed.html)
  }, [lastRevealed, editorRef])

  async function handleCopy() {
    const text = editorRef.current?.getText() ?? ""
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard permission denied or unavailable; ignore silently
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-background/80 px-4 py-3 backdrop-blur-xl">
        <p className="text-sm font-medium text-foreground">Live AI Content Workspace</p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" type="button" onClick={generate} disabled={phase === "generating"}>
            {phase === "generating" ? <Loader2 className="animate-spin" /> : <Sparkles />}
            Generate Article
          </Button>
          <Button variant="outline" size="sm" type="button" onClick={regenerate} disabled={phase !== "done"}>
            <RefreshCw />
            Regenerate
          </Button>
          <Button variant="outline" size="sm" type="button" onClick={handleCopy} disabled={phase !== "done"}>
            <Copy />
            {copied ? "Copied!" : "Copy Article"}
          </Button>
        </div>
      </div>

      {phase === "generating" && <GenerationProgress phase="generating" stepIndex={stepIndex} progress={progress} />}

      <ArticleEditor
        ref={editorRef}
        onUpdate={onEditorUpdate}
        fullscreen={fullscreen}
        onToggleFullscreen={() => setFullscreen((v) => !v)}
      />

      {phase === "generating" && pendingSection && (
        <div className="animate-pulse rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="h-3 w-1/3 rounded bg-white/10" />
          <div className="mt-2 h-3 w-full rounded bg-white/5" />
          <div className="mt-1.5 h-3 w-5/6 rounded bg-white/5" />
          <p className="mt-2 text-xs text-muted-foreground">Writing: {pendingSection.label}...</p>
        </div>
      )}
    </div>
  )
}
