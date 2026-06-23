"use client"

import Link from "next/link"
import { Plus, Search, Star } from "lucide-react"

import { ExportMenu } from "@/components/admin/shared/export-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { categoryList, type AnnouncementCategory, type AnnouncementStatus } from "@/lib/announcements-data"

export type FeaturedFilter = "all" | "featured" | "not-featured"
export type SortOption = "newest" | "oldest" | "most-viewed" | "title-az"

export function AnnouncementsToolbar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  status,
  onStatusChange,
  featured,
  onFeaturedChange,
  sort,
  onSortChange,
}: {
  query: string
  onQueryChange: (value: string) => void
  category: AnnouncementCategory | "all"
  onCategoryChange: (value: AnnouncementCategory | "all") => void
  status: AnnouncementStatus | "all"
  onStatusChange: (value: AnnouncementStatus | "all") => void
  featured: FeaturedFilter
  onFeaturedChange: (value: FeaturedFilter) => void
  sort: SortOption
  onSortChange: (value: SortOption) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search announcements..."
            className="pl-8"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <ExportMenu label="Export" />
          <Button
            asChild
            className="border-0 bg-gradient-to-r from-violet-500 via-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 hover:opacity-90"
          >
            <Link href="/admin/announcements/new">
              <Plus />
              Create Announcement
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={category} onValueChange={(value) => onCategoryChange(value as AnnouncementCategory | "all")}>
          <SelectTrigger size="sm" className="w-auto min-w-36">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categoryList.map((meta) => (
              <SelectItem key={meta.value} value={meta.value}>
                <span aria-hidden>{meta.emoji}</span>
                {meta.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={(value) => onStatusChange(value as AnnouncementStatus | "all")}>
          <SelectTrigger size="sm" className="w-auto min-w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select value={featured} onValueChange={(value) => onFeaturedChange(value as FeaturedFilter)}>
          <SelectTrigger size="sm" className="w-auto min-w-32">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Announcements</SelectItem>
            <SelectItem value="featured">Featured Only</SelectItem>
            <SelectItem value="not-featured">Not Featured</SelectItem>
          </SelectContent>
        </Select>

        <button
          type="button"
          onClick={() => onFeaturedChange(featured === "featured" ? "all" : "featured")}
          className={cn(
            "ml-auto flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors",
            featured === "featured"
              ? "border-amber-400/40 bg-amber-500/10 text-amber-300"
              : "border-border text-muted-foreground hover:text-foreground"
          )}
        >
          <Star className={cn("size-3.5", featured === "featured" && "fill-amber-300")} />
          Featured
        </button>

        <Select value={sort} onValueChange={(value) => onSortChange(value as SortOption)}>
          <SelectTrigger size="sm" className="w-auto min-w-36">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="most-viewed">Most Viewed</SelectItem>
            <SelectItem value="title-az">Title A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
