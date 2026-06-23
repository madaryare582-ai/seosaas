"use client"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { announcementAuthors, type Announcement, type AnnouncementStatus } from "@/lib/announcements-data"

export function PublishingFields({
  form,
  onChange,
}: {
  form: Announcement
  onChange: (patch: Partial<Announcement>) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ann-status">Status</Label>
          <Select value={form.status} onValueChange={(value) => onChange({ status: value as AnnouncementStatus })}>
            <SelectTrigger id="ann-status" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ann-date">Publish Date</Label>
          <Input
            id="ann-date"
            type="date"
            value={form.publishDate}
            onChange={(event) => onChange({ publishDate: event.target.value })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ann-author">Author</Label>
        <Select value={form.author} onValueChange={(value) => onChange({ author: value })}>
          <SelectTrigger id="ann-author" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {announcementAuthors.map((author) => (
              <SelectItem key={author} value={author}>
                {author}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-border p-3.5">
        <div>
          <p className="text-sm font-medium text-foreground">Featured Banner</p>
          <p className="text-xs text-muted-foreground">Show this banner first, above other active banners.</p>
        </div>
        <Switch checked={form.featured} onCheckedChange={(checked) => onChange({ featured: checked === true })} />
      </div>
    </div>
  )
}
