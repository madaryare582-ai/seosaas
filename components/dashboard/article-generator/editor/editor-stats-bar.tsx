"use client"

import type { Editor } from "@tiptap/core"
import { CheckCircle2, Clock, Hash, Loader2, Type } from "lucide-react"

import { cn } from "@/lib/utils"

export function EditorStatsBar({
  editor,
  saveState,
}: {
  editor: Editor | null
  saveState: "saved" | "saving" | "idle"
}) {
  if (!editor) return null
  const words = editor.storage.characterCount?.words() ?? 0
  const characters = editor.storage.characterCount?.characters() ?? 0
  const readingTime = Math.max(1, Math.ceil(words / 200))

  return (
    <div className="flex flex-wrap items-center gap-4 border-t border-white/10 px-4 py-2.5 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <Type className="size-3.5" />
        {words.toLocaleString()} words
      </span>
      <span className="flex items-center gap-1.5">
        <Hash className="size-3.5" />
        {characters.toLocaleString()} characters
      </span>
      <span className="flex items-center gap-1.5">
        <Clock className="size-3.5" />
        {readingTime} min read
      </span>
      <span className={cn("ml-auto flex items-center gap-1.5", saveState === "saved" && "text-emerald-400")}>
        {saveState === "saving" ? (
          <>
            <Loader2 className="size-3.5 animate-spin" />
            Saving...
          </>
        ) : saveState === "saved" ? (
          <>
            <CheckCircle2 className="size-3.5" />
            Saved
          </>
        ) : null}
      </span>
    </div>
  )
}
