"use client"

import * as React from "react"
import { Upload } from "lucide-react"

import { IconPicker } from "@/components/admin/announcements/icon-picker"
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
import { categoryList, type Announcement, type AnnouncementCategory } from "@/lib/announcements-data"

export function BasicInfoFields({
  form,
  onTitleChange,
  onCategoryChange,
  onChange,
}: {
  form: Announcement
  onTitleChange: (title: string) => void
  onCategoryChange: (category: AnnouncementCategory) => void
  onChange: (patch: Partial<Announcement>) => void
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    onChange({ coverImage: url })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ann-title">Title</Label>
        <Input
          id="ann-title"
          value={form.title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="e.g. Topical Authority Entity Maps Are Here"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ann-category">Category</Label>
          <Select value={form.category} onValueChange={(value) => onCategoryChange(value as AnnouncementCategory)}>
            <SelectTrigger id="ann-category" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categoryList.map((meta) => (
                <SelectItem key={meta.value} value={meta.value}>
                  <span aria-hidden>{meta.emoji}</span>
                  {meta.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ann-badge">Badge Text</Label>
          <Input
            id="ann-badge"
            value={form.badgeText}
            onChange={(event) => onChange({ badgeText: event.target.value })}
            placeholder="e.g. New"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label>Icon</Label>
        <div className="flex items-center gap-3">
          <IconPicker
            value={form.icon}
            onChange={(icon) => onChange({ icon })}
            gradient={categoryList.find((c) => c.value === form.category)?.gradient}
          />
          <p className="text-xs text-muted-foreground">Click the icon to choose from the icon library.</p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ann-summary">Short Summary</Label>
        <Textarea
          id="ann-summary"
          value={form.summary}
          onChange={(event) => onChange({ summary: event.target.value })}
          placeholder="A one sentence summary shown in the banner."
          className="min-h-20"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ann-cover">Cover Image</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            id="ann-cover"
            value={form.coverImage}
            onChange={(event) => onChange({ coverImage: event.target.value })}
            placeholder="https://..."
            className="flex-1"
          />
          <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload />
            Upload
          </Button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        </div>
        {form.coverImage && (
          <img src={form.coverImage} alt="Cover preview" className="mt-2 h-40 w-full rounded-xl border border-border object-cover" />
        )}
        <p className="text-xs text-muted-foreground">Used for internal reference and content previews. Banners themselves don&apos;t display a cover image.</p>
      </div>
    </div>
  )
}
