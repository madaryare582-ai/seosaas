"use client"

import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react"

import { BlockEditor } from "@/components/admin/announcements/block-editor"
import { IconPicker } from "@/components/admin/announcements/icon-picker"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  BLOCK_TYPE_LABELS,
  makeBlockId,
  type AnnouncementSection,
  type ContentBlock,
  type ContentBlockType,
} from "@/lib/announcements-data"

const COLOR_OPTIONS = [
  "from-violet-500 to-indigo-500",
  "from-blue-500 to-sky-500",
  "from-emerald-500 to-teal-500",
  "from-cyan-500 to-blue-500",
  "from-amber-500 to-orange-500",
  "from-fuchsia-500 to-purple-500",
  "from-rose-500 to-pink-500",
  "from-indigo-500 via-violet-500 to-fuchsia-500",
]

function createBlock(type: ContentBlockType): ContentBlock {
  switch (type) {
    case "heading":
      return { id: makeBlockId(), type, level: 2, text: "" }
    case "paragraph":
      return { id: makeBlockId(), type, text: "" }
    case "bulletList":
    case "numberedList":
      return { id: makeBlockId(), type, items: [""] }
    case "quote":
      return { id: makeBlockId(), type, text: "", attribution: "" }
    case "callout":
      return { id: makeBlockId(), type, tone: "info", title: "", text: "" }
    case "table":
      return { id: makeBlockId(), type, headers: ["Column 1", "Column 2"], rows: [["", ""]] }
    case "image":
      return { id: makeBlockId(), type, src: "", alt: "", caption: "" }
    case "video":
      return { id: makeBlockId(), type, url: "", caption: "" }
    case "button":
      return { id: makeBlockId(), type, label: "Learn More", href: "", style: "primary" }
    case "divider":
      return { id: makeBlockId(), type }
    case "code":
      return { id: makeBlockId(), type, language: "tsx", code: "" }
    case "faq":
      return { id: makeBlockId(), type, items: [{ question: "", answer: "" }] }
  }
}

function SectionCard({
  section,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  section: AnnouncementSection
  onChange: (section: AnnouncementSection) => void
  onRemove: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
}) {
  function updateBlock(id: string, block: ContentBlock) {
    onChange({ ...section, blocks: section.blocks.map((b) => (b.id === id ? block : b)) })
  }

  function removeBlock(id: string) {
    onChange({ ...section, blocks: section.blocks.filter((b) => b.id !== id) })
  }

  function moveBlock(index: number, direction: -1 | 1) {
    const next = [...section.blocks]
    const target = index + direction
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange({ ...section, blocks: next })
  }

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-xl sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <IconPicker value={section.icon} onChange={(icon) => onChange({ ...section, icon })} gradient={section.color} />
        <Input
          value={section.title}
          onChange={(event) => onChange({ ...section, title: event.target.value })}
          className="flex-1 font-medium"
          placeholder="Section title"
        />
        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="icon-sm" onClick={onMoveUp} disabled={!onMoveUp} aria-label="Move section up">
            <ChevronUp />
          </Button>
          <Button type="button" variant="ghost" size="icon-sm" onClick={onMoveDown} disabled={!onMoveDown} aria-label="Move section down">
            <ChevronDown />
          </Button>
          <Button type="button" variant="ghost" size="icon-sm" onClick={onRemove} aria-label="Remove section">
            <Trash2 className="text-destructive" />
          </Button>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        {COLOR_OPTIONS.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`Use ${color} gradient`}
            onClick={() => onChange({ ...section, color })}
            className={cn(
              "size-5 rounded-full bg-gradient-to-br transition-transform hover:scale-110",
              color,
              section.color === color && "ring-2 ring-foreground ring-offset-2 ring-offset-background"
            )}
          />
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {section.blocks.map((block, index) => (
          <BlockEditor
            key={block.id}
            block={block}
            onChange={(updated) => updateBlock(block.id, updated)}
            onRemove={() => removeBlock(block.id)}
            onMoveUp={index > 0 ? () => moveBlock(index, -1) : undefined}
            onMoveDown={index < section.blocks.length - 1 ? () => moveBlock(index, 1) : undefined}
          />
        ))}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline" size="sm" className="mt-3">
            <Plus />
            Add Content Block
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {(Object.keys(BLOCK_TYPE_LABELS) as ContentBlockType[]).map((type) => (
            <DropdownMenuItem
              key={type}
              onSelect={() => onChange({ ...section, blocks: [...section.blocks, createBlock(type)] })}
            >
              {BLOCK_TYPE_LABELS[type]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function SectionEditor({
  sections,
  onChange,
}: {
  sections: AnnouncementSection[]
  onChange: (sections: AnnouncementSection[]) => void
}) {
  function updateSection(id: string, section: AnnouncementSection) {
    onChange(sections.map((s) => (s.id === id ? section : s)))
  }

  function removeSection(id: string) {
    onChange(sections.filter((s) => s.id !== id))
  }

  function moveSection(index: number, direction: -1 | 1) {
    const next = [...sections]
    const target = index + direction
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  function addSection() {
    onChange([
      ...sections,
      {
        id: `sec-${Date.now()}`,
        title: "New Section",
        icon: "Layers",
        color: "from-violet-500 to-indigo-500",
        blocks: [{ id: makeBlockId(), type: "paragraph", text: "" }],
      },
    ])
  }

  return (
    <div className="flex flex-col gap-4">
      {sections.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-12 text-center">
          <p className="text-sm text-muted-foreground">No sections yet. Add a section to start building this announcement.</p>
        </div>
      ) : (
        sections.map((section, index) => (
          <SectionCard
            key={section.id}
            section={section}
            onChange={(updated) => updateSection(section.id, updated)}
            onRemove={() => removeSection(section.id)}
            onMoveUp={index > 0 ? () => moveSection(index, -1) : undefined}
            onMoveDown={index < sections.length - 1 ? () => moveSection(index, 1) : undefined}
          />
        ))
      )}

      <Button type="button" variant="outline" onClick={addSection} className="w-fit">
        <Plus />
        Add Section
      </Button>
    </div>
  )
}
