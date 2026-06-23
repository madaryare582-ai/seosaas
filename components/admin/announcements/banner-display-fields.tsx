"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  FEATURE_ROUTE_OPTIONS,
  PLACEMENT_OPTIONS,
  type Announcement,
  type BannerPriority,
} from "@/lib/announcements-data"

export function BannerDisplayFields({
  form,
  onChange,
}: {
  form: Announcement
  onChange: (patch: Partial<Announcement>) => void
}) {
  function toggleRoute(route: string) {
    const next = form.specificRoutes.includes(route)
      ? form.specificRoutes.filter((r) => r !== route)
      : [...form.specificRoutes, route]
    onChange({ specificRoutes: next })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label>Display Options</Label>
        <p className="text-xs text-muted-foreground">Choose where this banner appears across the platform.</p>
        <div className="mt-1 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PLACEMENT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange({ placement: option.value })}
              className={
                form.placement === option.value
                  ? "flex flex-col gap-0.5 rounded-xl border border-violet-400/40 bg-violet-500/10 p-3 text-left transition-colors"
                  : "flex flex-col gap-0.5 rounded-xl border border-border p-3 text-left transition-colors hover:bg-muted"
              }
            >
              <span className="text-sm font-medium text-foreground">{option.label}</span>
              <span className="text-xs text-muted-foreground">{option.description}</span>
            </button>
          ))}
        </div>
      </div>

      {form.placement === "specific" && (
        <div className="flex flex-col gap-2 rounded-xl border border-border p-3.5">
          <Label className="text-xs text-muted-foreground">Specific Pages</Label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {FEATURE_ROUTE_OPTIONS.map((route) => (
              <label key={route.value} className="flex items-center gap-2 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={form.specificRoutes.includes(route.value)}
                  onChange={() => toggleRoute(route.value)}
                  className="size-4 rounded border-input accent-violet-500"
                />
                {route.label}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ann-cta-label">CTA Button Label</Label>
          <Input
            id="ann-cta-label"
            value={form.ctaLabel}
            onChange={(event) => onChange({ ctaLabel: event.target.value })}
            placeholder="e.g. Try it now"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ann-cta-url">CTA URL</Label>
          <Input
            id="ann-cta-url"
            value={form.ctaUrl}
            onChange={(event) => onChange({ ctaUrl: event.target.value })}
            placeholder="/dashboard/article-generator"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ann-start-date">Start Date</Label>
          <Input
            id="ann-start-date"
            type="date"
            value={form.startDate}
            onChange={(event) => onChange({ startDate: event.target.value })}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ann-end-date">End Date</Label>
          <Input
            id="ann-end-date"
            type="date"
            value={form.endDate}
            onChange={(event) => onChange({ endDate: event.target.value })}
          />
          <p className="text-xs text-muted-foreground">Leave blank to keep the banner running indefinitely.</p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="ann-priority">Priority Level</Label>
        <Select value={form.priority} onValueChange={(value) => onChange({ priority: value as BannerPriority })}>
          <SelectTrigger id="ann-priority" className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground">Higher priority banners are shown first when several are active.</p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between rounded-xl border border-border p-3.5">
          <div>
            <p className="text-sm font-medium text-foreground">Dismissible</p>
            <p className="text-xs text-muted-foreground">Users can close this banner with an X button.</p>
          </div>
          <Switch checked={form.dismissible} onCheckedChange={(checked) => onChange({ dismissible: checked === true })} />
        </div>
        <div className="flex items-center justify-between rounded-xl border border-border p-3.5">
          <div>
            <p className="text-sm font-medium text-foreground">Sticky</p>
            <p className="text-xs text-muted-foreground">Keep the banner pinned to the top while scrolling.</p>
          </div>
          <Switch checked={form.sticky} onCheckedChange={(checked) => onChange({ sticky: checked === true })} />
        </div>
      </div>
    </div>
  )
}
