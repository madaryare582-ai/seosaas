"use client"

import { ChevronDown, ChevronUp, GripVertical, Plus, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BLOCK_TYPE_LABELS, type ContentBlock } from "@/lib/announcements-data"

function EditableStringList({
  items,
  onChange,
  placeholder,
}: {
  items: string[]
  onChange: (items: string[]) => void
  placeholder: string
}) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={item}
            placeholder={placeholder}
            onChange={(event) => {
              const next = [...items]
              next[index] = event.target.value
              onChange(next)
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Remove item"
            onClick={() => onChange(items.filter((_, i) => i !== index))}
          >
            <Trash2 className="text-destructive" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" className="w-fit" onClick={() => onChange([...items, ""])}>
        <Plus />
        Add Item
      </Button>
    </div>
  )
}

export function BlockEditor({
  block,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  block: ContentBlock
  onChange: (block: ContentBlock) => void
  onRemove: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-background/40 p-3.5">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
          <GripVertical className="size-3.5" />
          {BLOCK_TYPE_LABELS[block.type]}
        </span>
        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="icon-xs" onClick={onMoveUp} disabled={!onMoveUp} aria-label="Move up">
            <ChevronUp />
          </Button>
          <Button type="button" variant="ghost" size="icon-xs" onClick={onMoveDown} disabled={!onMoveDown} aria-label="Move down">
            <ChevronDown />
          </Button>
          <Button type="button" variant="ghost" size="icon-xs" onClick={onRemove} aria-label="Remove block">
            <Trash2 className="text-destructive" />
          </Button>
        </div>
      </div>

      {block.type === "heading" && (
        <div className="flex flex-col gap-2 sm:flex-row">
          <Select value={String(block.level)} onValueChange={(value) => onChange({ ...block, level: Number(value) as 1 | 2 | 3 | 4 | 5 | 6 })}>
            <SelectTrigger size="sm" className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <SelectItem key={level} value={String(level)}>
                  H{level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            className="flex-1"
            value={block.text}
            placeholder="Heading text"
            onChange={(event) => onChange({ ...block, text: event.target.value })}
          />
        </div>
      )}

      {block.type === "paragraph" && (
        <Textarea
          className="min-h-20"
          value={block.text}
          placeholder="Write a paragraph..."
          onChange={(event) => onChange({ ...block, text: event.target.value })}
        />
      )}

      {(block.type === "bulletList" || block.type === "numberedList") && (
        <EditableStringList
          items={block.items}
          placeholder="List item"
          onChange={(items) => onChange({ ...block, items })}
        />
      )}

      {block.type === "quote" && (
        <div className="flex flex-col gap-2">
          <Textarea
            className="min-h-16"
            value={block.text}
            placeholder="Quote text"
            onChange={(event) => onChange({ ...block, text: event.target.value })}
          />
          <Input
            value={block.attribution ?? ""}
            placeholder="Attribution (optional)"
            onChange={(event) => onChange({ ...block, attribution: event.target.value })}
          />
        </div>
      )}

      {block.type === "callout" && (
        <div className="flex flex-col gap-2">
          <Select value={block.tone} onValueChange={(value) => onChange({ ...block, tone: value as typeof block.tone })}>
            <SelectTrigger size="sm" className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="danger">Danger</SelectItem>
            </SelectContent>
          </Select>
          <Input
            value={block.title ?? ""}
            placeholder="Callout title (optional)"
            onChange={(event) => onChange({ ...block, title: event.target.value })}
          />
          <Textarea
            className="min-h-16"
            value={block.text}
            placeholder="Callout text"
            onChange={(event) => onChange({ ...block, text: event.target.value })}
          />
        </div>
      )}

      {block.type === "table" && (
        <div className="flex flex-col gap-3">
          <div>
            <Label className="mb-1.5 text-xs text-muted-foreground">Columns</Label>
            <EditableStringList
              items={block.headers}
              placeholder="Column header"
              onChange={(headers) =>
                onChange({
                  ...block,
                  headers,
                  rows: block.rows.map((row) => {
                    const next = [...row]
                    next.length = headers.length
                    return next.map((cell) => cell ?? "")
                  }),
                })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-xs text-muted-foreground">Rows</Label>
            {block.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex items-center gap-2">
                <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3">
                  {block.headers.map((header, cellIndex) => (
                    <Input
                      key={cellIndex}
                      value={row[cellIndex] ?? ""}
                      placeholder={header || `Column ${cellIndex + 1}`}
                      onChange={(event) => {
                        const nextRows = block.rows.map((r) => [...r])
                        nextRows[rowIndex][cellIndex] = event.target.value
                        onChange({ ...block, rows: nextRows })
                      }}
                    />
                  ))}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Remove row"
                  onClick={() => onChange({ ...block, rows: block.rows.filter((_, i) => i !== rowIndex) })}
                >
                  <Trash2 className="text-destructive" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-fit"
              onClick={() => onChange({ ...block, rows: [...block.rows, block.headers.map(() => "")] })}
            >
              <Plus />
              Add Row
            </Button>
          </div>
        </div>
      )}

      {block.type === "image" && (
        <div className="flex flex-col gap-2">
          <Input
            value={block.src}
            placeholder="Image URL"
            onChange={(event) => onChange({ ...block, src: event.target.value })}
          />
          <Input
            value={block.alt}
            placeholder="Alt text"
            onChange={(event) => onChange({ ...block, alt: event.target.value })}
          />
          <Input
            value={block.caption ?? ""}
            placeholder="Caption (optional)"
            onChange={(event) => onChange({ ...block, caption: event.target.value })}
          />
          {block.src && (
            <img src={block.src} alt={block.alt} className="h-28 w-full rounded-lg border border-border object-cover" />
          )}
        </div>
      )}

      {block.type === "video" && (
        <div className="flex flex-col gap-2">
          <Input
            value={block.url}
            placeholder="Video URL"
            onChange={(event) => onChange({ ...block, url: event.target.value })}
          />
          <Input
            value={block.caption ?? ""}
            placeholder="Caption (optional)"
            onChange={(event) => onChange({ ...block, caption: event.target.value })}
          />
        </div>
      )}

      {block.type === "button" && (
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={block.label}
            placeholder="Button label"
            onChange={(event) => onChange({ ...block, label: event.target.value })}
          />
          <Input
            value={block.href}
            placeholder="Link URL"
            onChange={(event) => onChange({ ...block, href: event.target.value })}
          />
          <Select value={block.style} onValueChange={(value) => onChange({ ...block, style: value as typeof block.style })}>
            <SelectTrigger size="sm" className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {block.type === "divider" && <p className="text-xs text-muted-foreground">A horizontal divider will render here.</p>}

      {block.type === "code" && (
        <div className="flex flex-col gap-2">
          <Input
            value={block.language}
            placeholder="Language (e.g. tsx, bash)"
            onChange={(event) => onChange({ ...block, language: event.target.value })}
          />
          <Textarea
            className="min-h-28 font-mono text-sm"
            value={block.code}
            placeholder="// code here"
            onChange={(event) => onChange({ ...block, code: event.target.value })}
          />
        </div>
      )}

      {block.type === "faq" && (
        <div className="flex flex-col gap-3">
          {block.items.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 rounded-lg border border-border p-2.5">
              <div className="flex items-center gap-2">
                <Input
                  value={item.question}
                  placeholder="Question"
                  onChange={(event) => {
                    const next = [...block.items]
                    next[index] = { ...next[index], question: event.target.value }
                    onChange({ ...block, items: next })
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Remove FAQ item"
                  onClick={() => onChange({ ...block, items: block.items.filter((_, i) => i !== index) })}
                >
                  <Trash2 className="text-destructive" />
                </Button>
              </div>
              <Textarea
                className="min-h-14"
                value={item.answer}
                placeholder="Answer"
                onChange={(event) => {
                  const next = [...block.items]
                  next[index] = { ...next[index], answer: event.target.value }
                  onChange({ ...block, items: next })
                }}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-fit"
            onClick={() => onChange({ ...block, items: [...block.items, { question: "", answer: "" }] })}
          >
            <Plus />
            Add FAQ Item
          </Button>
        </div>
      )}
    </div>
  )
}
