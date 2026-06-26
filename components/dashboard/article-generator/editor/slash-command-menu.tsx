"use client"

import * as React from "react"
import type { Editor, Range } from "@tiptap/core"
import {
  Code2,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Info,
  List,
  ListOrdered,
  Minus,
  Quote,
  Table2,
} from "lucide-react"

import { cn } from "@/lib/utils"

export type SlashCommandItem = {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  run: (editor: Editor, range: Range) => void
}

export const SLASH_COMMANDS: SlashCommandItem[] = [
  {
    title: "Heading 1",
    description: "Big section heading",
    icon: Heading1,
    run: (editor, range) => editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run(),
  },
  {
    title: "Heading 2",
    description: "Medium section heading",
    icon: Heading2,
    run: (editor, range) => editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run(),
  },
  {
    title: "Heading 3",
    description: "Small section heading",
    icon: Heading3,
    run: (editor, range) => editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run(),
  },
  {
    title: "Bulleted List",
    description: "Simple bulleted list",
    icon: List,
    run: (editor, range) => editor.chain().focus().deleteRange(range).toggleBulletList().run(),
  },
  {
    title: "Numbered List",
    description: "List with numbering",
    icon: ListOrdered,
    run: (editor, range) => editor.chain().focus().deleteRange(range).toggleOrderedList().run(),
  },
  {
    title: "Table",
    description: "Insert a 3x3 table",
    icon: Table2,
    run: (editor, range) =>
      editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
  },
  {
    title: "Quote",
    description: "Blockquote callout",
    icon: Quote,
    run: (editor, range) => editor.chain().focus().deleteRange(range).toggleBlockquote().run(),
  },
  {
    title: "Callout",
    description: "Highlighted info block",
    icon: Info,
    run: (editor, range) => editor.chain().focus().deleteRange(range).setCallout("info").run(),
  },
  {
    title: "Code Block",
    description: "Monospaced code block",
    icon: Code2,
    run: (editor, range) => editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    title: "Divider",
    description: "Horizontal divider line",
    icon: Minus,
    run: (editor, range) => editor.chain().focus().deleteRange(range).setHorizontalRule().run(),
  },
  {
    title: "Image",
    description: "Upload an image",
    icon: ImageIcon,
    run: (editor, range) => {
      editor.chain().focus().deleteRange(range).run()
      document.dispatchEvent(new CustomEvent("article-editor:request-image-upload"))
    },
  },
]

export const SlashCommandMenu = React.forwardRef<
  { onKeyDown: (props: { event: KeyboardEvent }) => boolean },
  { items: SlashCommandItem[]; command: (item: SlashCommandItem) => void }
>(function SlashCommandMenu({ items, command }, ref) {
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => setSelectedIndex(0), [items])

  React.useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % Math.max(items.length, 1))
        return true
      }
      if (event.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev - 1 + items.length) % Math.max(items.length, 1))
        return true
      }
      if (event.key === "Enter") {
        if (items[selectedIndex]) command(items[selectedIndex])
        return true
      }
      return false
    },
  }))

  if (items.length === 0) {
    return (
      <div className="w-64 rounded-xl bg-popover p-2 text-sm text-muted-foreground ring-1 ring-foreground/10">
        No matching blocks
      </div>
    )
  }

  return (
    <div className="w-64 rounded-xl bg-popover p-1 shadow-md ring-1 ring-foreground/10">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <button
            key={item.title}
            type="button"
            onClick={() => command(item)}
            onMouseEnter={() => setSelectedIndex(index)}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition-colors",
              index === selectedIndex ? "bg-accent text-accent-foreground" : "text-foreground"
            )}
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
              <Icon className="size-3.5 text-white" />
            </span>
            <span className="flex flex-col">
              <span className="font-medium">{item.title}</span>
              <span className="text-xs text-muted-foreground">{item.description}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
})
