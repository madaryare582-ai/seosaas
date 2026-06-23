"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, Eye, FileEdit, Megaphone } from "lucide-react"

import {
  AnnouncementsBulkBar,
  AnnouncementsEmptyState,
  AnnouncementsTable,
  AnnouncementsTableSkeleton,
} from "@/components/admin/announcements/announcements-table"
import {
  AnnouncementsToolbar,
  type FeaturedFilter,
  type SortOption,
} from "@/components/admin/announcements/announcements-toolbar"
import { DeleteConfirmDialog } from "@/components/admin/announcements/delete-confirm-dialog"
import { KpiCard } from "@/components/admin/shared/kpi-card"
import { Button } from "@/components/ui/button"
import {
  type Announcement,
  type AnnouncementCategory,
  type AnnouncementStatus,
  formatViews,
} from "@/lib/announcements-data"

const PAGE_SIZE = 8

function duplicateAnnouncement(source: Announcement): Announcement {
  const suffix = Date.now().toString().slice(-5)
  return {
    ...source,
    id: `ANN-${suffix}`,
    title: `${source.title} (Copy)`,
    status: "draft",
    featured: false,
    views: 0,
    createdAt: "2026-06-23",
    updatedAt: "2026-06-23",
    sections: source.sections.map((section) => ({ ...section, blocks: [...section.blocks] })),
  }
}

export function AnnouncementsManager({ initialAnnouncements }: { initialAnnouncements: Announcement[] }) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [items, setItems] = React.useState<Announcement[]>(initialAnnouncements)
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState<AnnouncementCategory | "all">("all")
  const [status, setStatus] = React.useState<AnnouncementStatus | "all">("all")
  const [featured, setFeatured] = React.useState<FeaturedFilter>("all")
  const [sort, setSort] = React.useState<SortOption>("newest")
  const [page, setPage] = React.useState(1)
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set())
  const [deleteTarget, setDeleteTarget] = React.useState<Announcement[] | null>(null)

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 400)
    return () => clearTimeout(timeout)
  }, [])

  const filtered = React.useMemo(() => {
    let result = items.filter((item) => {
      const matchesQuery =
        query.trim().length === 0 ||
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.summary.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === "all" || item.category === category
      const matchesStatus = status === "all" || item.status === status
      const matchesFeatured =
        featured === "all" || (featured === "featured" ? item.featured : !item.featured)
      return matchesQuery && matchesCategory && matchesStatus && matchesFeatured
    })

    result = [...result].sort((a, b) => {
      switch (sort) {
        case "oldest":
          return new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime()
        case "most-viewed":
          return b.views - a.views
        case "title-az":
          return a.title.localeCompare(b.title)
        case "newest":
        default:
          return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      }
    })

    return result
  }, [items, query, category, status, featured, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function withPageReset<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value)
      setPage(1)
    }
  }

  const kpis = React.useMemo(() => {
    const published = items.filter((item) => item.status === "published").length
    const scheduled = items.filter((item) => item.status === "scheduled").length
    const drafts = items.filter((item) => item.status === "draft").length
    const totalViews = items.reduce((sum, item) => sum + item.views, 0)
    return { published, scheduled, drafts, totalViews }
  }, [items])

  function clearFilters() {
    setQuery("")
    setCategory("all")
    setStatus("all")
    setFeatured("all")
    setPage(1)
  }

  function toggle(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAll() {
    setSelectedIds((prev) => {
      const allSelected = paginated.length > 0 && paginated.every((item) => prev.has(item.id))
      if (allSelected) return new Set()
      return new Set(paginated.map((item) => item.id))
    })
  }

  function handleDuplicate(id: string) {
    const source = items.find((item) => item.id === id)
    if (!source) return
    setItems((prev) => [duplicateAnnouncement(source), ...prev])
  }

  function handleArchive(id: string) {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: "archived", updatedAt: "2026-06-23" } : item)))
  }

  function performDelete(targets: Announcement[]) {
    const ids = new Set(targets.map((target) => target.id))
    setItems((prev) => prev.filter((item) => !ids.has(item.id)))
    setSelectedIds((prev) => {
      const next = new Set(prev)
      ids.forEach((id) => next.delete(id))
      return next
    })
  }

  function bulkUpdate(patch: Partial<Announcement>) {
    setItems((prev) => prev.map((item) => (selectedIds.has(item.id) ? { ...item, ...patch, updatedAt: "2026-06-23" } : item)))
  }

  const selectedAnnouncements = items.filter((item) => selectedIds.has(item.id))

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Published" value={String(kpis.published)} icon={Megaphone} accent="from-violet-500 to-indigo-500" />
        <KpiCard label="Scheduled" value={String(kpis.scheduled)} icon={FileEdit} accent="from-amber-500 to-orange-500" />
        <KpiCard label="Drafts" value={String(kpis.drafts)} icon={FileEdit} accent="from-slate-500 to-slate-600" />
        <KpiCard label="Total Views" value={formatViews(kpis.totalViews)} icon={Eye} accent="from-fuchsia-500 to-purple-500" />
      </div>

      <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
        <AnnouncementsToolbar
          query={query}
          onQueryChange={withPageReset(setQuery)}
          category={category}
          onCategoryChange={withPageReset(setCategory)}
          status={status}
          onStatusChange={withPageReset(setStatus)}
          featured={featured}
          onFeaturedChange={withPageReset(setFeatured)}
          sort={sort}
          onSortChange={withPageReset(setSort)}
        />

        {selectedIds.size > 0 && (
          <div className="mt-4">
            <AnnouncementsBulkBar
              count={selectedIds.size}
              onPublish={() => bulkUpdate({ status: "published" })}
              onUnpublish={() => bulkUpdate({ status: "draft" })}
              onFeature={() => bulkUpdate({ featured: true })}
              onUnfeature={() => bulkUpdate({ featured: false })}
              onArchive={() => bulkUpdate({ status: "archived" })}
              onDelete={() => setDeleteTarget(selectedAnnouncements)}
              onClear={() => setSelectedIds(new Set())}
            />
          </div>
        )}

        <div className="mt-4">
          {isLoading ? (
            <AnnouncementsTableSkeleton />
          ) : filtered.length === 0 ? (
            <AnnouncementsEmptyState onClearFilters={clearFilters} />
          ) : (
            <AnnouncementsTable
              items={paginated}
              selectedIds={selectedIds}
              onToggle={toggle}
              onToggleAll={toggleAll}
              onDuplicate={handleDuplicate}
              onArchive={handleArchive}
              onDelete={(announcement) => setDeleteTarget([announcement])}
            />
          )}
        </div>

        {!isLoading && filtered.length > 0 && (
          <div className="flex flex-col items-center justify-between gap-3 border-t border-border px-1 pt-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              Showing{" "}
              <span className="font-medium text-foreground">
                {(currentPage - 1) * PAGE_SIZE + 1}-{Math.min(currentPage * PAGE_SIZE, filtered.length)}
              </span>{" "}
              of <span className="font-medium text-foreground">{filtered.length}</span>
            </p>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="icon-sm"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
              >
                <ChevronLeft />
              </Button>
              <span className="px-2 text-xs font-medium text-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon-sm"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                aria-label="Next page"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        )}
      </div>

      <DeleteConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
        count={deleteTarget?.length ?? 0}
        onConfirm={() => {
          if (deleteTarget) performDelete(deleteTarget)
        }}
      />
    </div>
  )
}
