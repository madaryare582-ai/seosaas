"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { EditorContent, useEditor } from "@tiptap/react"
import CharacterCount from "@tiptap/extension-character-count"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import Table from "@tiptap/extension-table"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import Underline from "@tiptap/extension-underline"
import StarterKit from "@tiptap/starter-kit"

import "@/components/dashboard/article-generator/editor/editor.css"
import { Callout } from "@/components/dashboard/article-generator/editor/callout-extension"
import { EditorStatsBar } from "@/components/dashboard/article-generator/editor/editor-stats-bar"
import { EditorToolbar } from "@/components/dashboard/article-generator/editor/editor-toolbar"
import { SlashCommand } from "@/components/dashboard/article-generator/editor/slash-command-extension"
import type { HeadingInfo } from "@/lib/seo-analysis"

export type ArticleEditorHandle = {
  insertSection: (html: string) => void
  setContent: (html: string) => void
  getText: () => string
  getHtml: () => string
}

const AUTOSAVE_KEY = "hiigsiseo-article-draft"
const AUTOSAVE_DELAY_MS = 800

export const ArticleEditor = React.forwardRef<
  ArticleEditorHandle,
  {
    onUpdate?: (payload: { text: string; html: string; headings: HeadingInfo[] }) => void
    fullscreen: boolean
    onToggleFullscreen: () => void
  }
>(function ArticleEditor({ onUpdate, fullscreen, onToggleFullscreen }, ref) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const saveTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const [saveState, setSaveState] = React.useState<"saved" | "saving" | "idle">("idle")

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4, 5, 6] } }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({ placeholder: 'Start typing, or press "/" for commands...' }),
      CharacterCount,
      Callout,
      SlashCommand,
    ],
    editorProps: {
      attributes: { class: "article-editor-prose" },
      handleDrop: (view, event) => {
        const files = Array.from(event.dataTransfer?.files ?? []).filter((f) => f.type.startsWith("image/"))
        if (files.length === 0) return false
        event.preventDefault()
        const pos = view.posAtCoords({ left: event.clientX, top: event.clientY })?.pos ?? view.state.selection.from
        files.forEach((file) => insertImageFile(file, pos))
        return true
      },
      handlePaste: (_view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []).filter((f) => f.type.startsWith("image/"))
        if (files.length === 0) return false
        files.forEach((file) => insertImageFile(file))
        return true
      },
    },
    onUpdate: ({ editor: instance }) => {
      setSaveState("saving")
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
      saveTimeoutRef.current = setTimeout(() => {
        const html = instance.getHTML()
        window.localStorage.setItem(AUTOSAVE_KEY, html)
        setSaveState("saved")
      }, AUTOSAVE_DELAY_MS)

      const headings: HeadingInfo[] = []
      instance.state.doc.descendants((node) => {
        if (node.type.name === "heading") {
          headings.push({ level: node.attrs.level as number, text: node.textContent })
        }
      })
      onUpdate?.({ text: instance.getText(), html: instance.getHTML(), headings })
    },
  })

  function insertImageFile(file: File, pos?: number) {
    const reader = new FileReader()
    reader.onload = () => {
      const src = reader.result as string
      if (!editor) return
      if (typeof pos === "number") editor.chain().focus().insertContentAt(pos, { type: "image", attrs: { src } }).run()
      else editor.chain().focus().setImage({ src }).run()
    }
    reader.readAsDataURL(file)
  }

  React.useEffect(() => {
    function handleRequestImage() {
      fileInputRef.current?.click()
    }
    document.addEventListener("article-editor:request-image-upload", handleRequestImage)
    return () => document.removeEventListener("article-editor:request-image-upload", handleRequestImage)
  }, [])

  React.useImperativeHandle(ref, () => ({
    insertSection: (html: string) => {
      editor?.chain().focus("end").insertContent(html).run()
    },
    setContent: (html: string) => {
      editor?.commands.setContent(html)
    },
    getText: () => editor?.getText() ?? "",
    getHtml: () => editor?.getHTML() ?? "",
  }))

  const content = (
    <div
      className={
        fullscreen
          ? "fixed inset-0 z-[100] flex flex-col bg-background p-4 sm:p-6"
          : "flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
      }
    >
      <EditorToolbar
        editor={editor}
        fullscreen={fullscreen}
        onToggleFullscreen={onToggleFullscreen}
        onRequestImage={() => fileInputRef.current?.click()}
      />
      <div className={fullscreen ? "mt-2 flex-1 overflow-y-auto px-2" : "max-h-[560px] overflow-y-auto px-4 py-4 sm:px-5"}>
        <EditorContent editor={editor} />
      </div>
      <EditorStatsBar editor={editor} saveState={saveState} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) insertImageFile(file)
          event.target.value = ""
        }}
      />
    </div>
  )

  if (fullscreen && typeof document !== "undefined") {
    return createPortal(content, document.body)
  }
  return content
})
