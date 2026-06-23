"use client"

import Link from "next/link"
import { Archive, Copy, MoreHorizontal, Pencil, Star, Trash2 } from "lucide-react"

import { CategoryBadge, CategoryIcon } from "@/components/announcements/category-badge"
import { StatusBadge } from "@/components/admin/shared/status-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { formatViews, PLACEMENT_OPTIONS, type Announcement } from "@/lib/announcements-data"

function placementLabel(announcement: Announcement) {
  return PLACEMENT_OPTIONS.find((option) => option.value === announcement.placement)?.label ?? announcement.placement
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
}

export function AnnouncementsTableSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-14 animate-pulse rounded-xl bg-muted/40" />
      ))}
    </div>
  )
}

export function AnnouncementsEmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20">
        <Star className="size-6 text-violet-300" />
      </span>
      <p className="text-base font-semibold text-foreground">No announcements found</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Try adjusting your search or filters, or create a new announcement to get started.
      </p>
      <Button variant="outline" size="sm" onClick={onClearFilters}>
        Clear Filters
      </Button>
    </div>
  )
}

export function AnnouncementsTable({
  items,
  selectedIds,
  onToggle,
  onToggleAll,
  onDuplicate,
  onArchive,
  onDelete,
}: {
  items: Announcement[]
  selectedIds: Set<string>
  onToggle: (id: string) => void
  onToggleAll: () => void
  onDuplicate: (id: string) => void
  onArchive: (id: string) => void
  onDelete: (announcement: Announcement) => void
}) {
  const allSelected = items.length > 0 && items.every((item) => selectedIds.has(item.id))

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox checked={allSelected} onCheckedChange={onToggleAll} aria-label="Select all" />
          </TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden sm:table-cell">Author</TableHead>
          <TableHead className="hidden lg:table-cell">Views</TableHead>
          <TableHead className="hidden lg:table-cell">Publish Date</TableHead>
          <TableHead className="hidden xl:table-cell">Last Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((announcement) => (
          <TableRow key={announcement.id} data-state={selectedIds.has(announcement.id) ? "selected" : undefined}>
            <TableCell>
              <Checkbox
                checked={selectedIds.has(announcement.id)}
                onCheckedChange={() => onToggle(announcement.id)}
                aria-label={`Select ${announcement.title}`}
              />
            </TableCell>
            <TableCell className="max-w-[220px]">
              <div className="flex items-center gap-2.5">
                <CategoryIcon category={announcement.category} icon={announcement.icon} size="sm" />
                <div className="flex min-w-0 flex-col">
                  <Link
                    href={`/admin/announcements/${announcement.id}`}
                    className="truncate text-sm font-medium text-foreground hover:underline"
                  >
                    {announcement.title}
                  </Link>
                  <span className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                    {announcement.featured && <Star className="size-3 fill-amber-300 text-amber-300" />}
                    {placementLabel(announcement)}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <CategoryBadge category={announcement.category} />
            </TableCell>
            <TableCell>
              <StatusBadge status={announcement.status} />
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <div className="flex items-center gap-2">
                <Avatar size="sm">
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 via-indigo-500 to-fuchsia-500 text-white">
                    {initials(announcement.author)}
                  </AvatarFallback>
                </Avatar>
                <span className="truncate text-sm text-muted-foreground">{announcement.author}</span>
              </div>
            </TableCell>
            <TableCell className="hidden text-muted-foreground lg:table-cell">{formatViews(announcement.views)}</TableCell>
            <TableCell className="hidden text-muted-foreground lg:table-cell">{announcement.publishDate}</TableCell>
            <TableCell className="hidden text-muted-foreground xl:table-cell">{announcement.updatedAt}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon-sm" aria-label="Announcement actions">
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/announcements/${announcement.id}`}>
                      <Pencil />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => onDuplicate(announcement.id)}>
                    <Copy />
                    Duplicate
                  </DropdownMenuItem>
                  {announcement.status !== "archived" && (
                    <DropdownMenuItem onSelect={() => onArchive(announcement.id)}>
                      <Archive />
                      Archive
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onSelect={() => onDelete(announcement)}>
                    <Trash2 />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export function AnnouncementsBulkBar({
  count,
  onPublish,
  onUnpublish,
  onFeature,
  onUnfeature,
  onArchive,
  onDelete,
  onClear,
}: {
  count: number
  onPublish: () => void
  onUnpublish: () => void
  onFeature: () => void
  onUnfeature: () => void
  onArchive: () => void
  onDelete: () => void
  onClear: () => void
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-violet-400/30 bg-violet-500/10 p-3 sm:flex-row sm:items-center sm:justify-between"
      )}
    >
      <p className="text-sm font-medium text-foreground">
        {count} announcement{count === 1 ? "" : "s"} selected
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={onPublish}>
          Publish
        </Button>
        <Button variant="outline" size="sm" onClick={onUnpublish}>
          Move to Draft
        </Button>
        <Button variant="outline" size="sm" onClick={onFeature}>
          <Star />
          Feature
        </Button>
        <Button variant="outline" size="sm" onClick={onUnfeature}>
          Unfeature
        </Button>
        <Button variant="outline" size="sm" onClick={onArchive}>
          <Archive />
          Archive
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          <Trash2 />
          Delete
        </Button>
        <Button variant="ghost" size="sm" onClick={onClear}>
          Clear
        </Button>
      </div>
    </div>
  )
}
