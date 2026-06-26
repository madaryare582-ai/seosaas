"use client"

import type { Editor } from "@tiptap/core"
import {
  Bold,
  Code2,
  ImageIcon,
  Info,
  Italic,
  Link2,
  List,
  ListOrdered,
  Maximize2,
  Minimize2,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Table2,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { CalloutVariant } from "@/components/dashboard/article-generator/editor/callout-extension"

function ToolbarButton({
  active,
  onClick,
  disabled,
  title,
  children,
}: {
  active?: boolean
  onClick: () => void
  disabled?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={cn(active && "bg-white/10 text-foreground")}
    >
      {children}
    </Button>
  )
}

export function EditorToolbar({
  editor,
  fullscreen,
  onToggleFullscreen,
  onRequestImage,
}: {
  editor: Editor | null
  fullscreen: boolean
  onToggleFullscreen: () => void
  onRequestImage: () => void
}) {
  if (!editor) return null

  const headingValue = [1, 2, 3, 4, 5, 6].find((level) => editor.isActive("heading", { level }))
    ? String([1, 2, 3, 4, 5, 6].find((level) => editor.isActive("heading", { level })))
    : "paragraph"

  const setCallout = (variant: CalloutVariant) => {
    editor.chain().focus().setCallout(variant).run()
  }

  return (
    <div className="sticky top-0 z-20 flex flex-wrap items-center gap-1 rounded-t-2xl border-b border-white/10 bg-white/5 px-2 py-2 backdrop-blur-xl">
      <ToolbarButton title="Undo" onClick={() => editor.chain().focus().undo().run()}>
        <Undo2 />
      </ToolbarButton>
      <ToolbarButton title="Redo" onClick={() => editor.chain().focus().redo().run()}>
        <Redo2 />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-1 h-5" />

      <Select
        value={headingValue}
        onValueChange={(value) => {
          if (value === "paragraph") editor.chain().focus().setParagraph().run()
          else editor.chain().focus().setNode("heading", { level: Number(value) }).run()
        }}
      >
        <SelectTrigger size="sm" className="w-28">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paragraph">Paragraph</SelectItem>
          <SelectItem value="1">Heading 1</SelectItem>
          <SelectItem value="2">Heading 2</SelectItem>
          <SelectItem value="3">Heading 3</SelectItem>
          <SelectItem value="4">Heading 4</SelectItem>
          <SelectItem value="5">Heading 5</SelectItem>
          <SelectItem value="6">Heading 6</SelectItem>
        </SelectContent>
      </Select>

      <Separator orientation="vertical" className="mx-1 h-5" />

      <ToolbarButton title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
        <Bold />
      </ToolbarButton>
      <ToolbarButton title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
        <Italic />
      </ToolbarButton>
      <ToolbarButton title="Underline" active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
        <UnderlineIcon />
      </ToolbarButton>
      <ToolbarButton title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
        <Strikethrough />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-1 h-5" />

      <ToolbarButton title="Bulleted list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
        <List />
      </ToolbarButton>
      <ToolbarButton title="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        <ListOrdered />
      </ToolbarButton>
      <ToolbarButton title="Quote" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
        <Quote />
      </ToolbarButton>
      <ToolbarButton title="Code block" active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        <Code2 />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-1 h-5" />

      <ToolbarButton
        title="Insert table"
        onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
      >
        <Table2 />
      </ToolbarButton>
      <ToolbarButton
        title="Insert link"
        active={editor.isActive("link")}
        onClick={() => {
          const url = window.prompt("Link URL")
          if (url) editor.chain().focus().setLink({ href: url }).run()
          else if (url === "") editor.chain().focus().unsetLink().run()
        }}
      >
        <Link2 />
      </ToolbarButton>
      <ToolbarButton title="Insert image" onClick={onRequestImage}>
        <ImageIcon />
      </ToolbarButton>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="ghost" size="icon-sm" title="Callout">
            <Info />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setCallout("info")}>Info callout</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setCallout("warning")}>Warning callout</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setCallout("success")}>Success callout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ToolbarButton title="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus />
      </ToolbarButton>

      <div className="ml-auto">
        <ToolbarButton title={fullscreen ? "Exit fullscreen" : "Fullscreen"} onClick={onToggleFullscreen}>
          {fullscreen ? <Minimize2 /> : <Maximize2 />}
        </ToolbarButton>
      </div>
    </div>
  )
}
