"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function PaginationFooter({
  total,
  page = 1,
  pageSize = 5,
}: {
  total: number
  page?: number
  pageSize?: number
}) {
  const start = (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-border px-1 pt-4 sm:flex-row">
      <p className="text-xs text-muted-foreground">
        Showing <span className="font-medium text-foreground">{start}-{end}</span> of{" "}
        <span className="font-medium text-foreground">{total}</span>
      </p>
      <div className="flex items-center gap-1.5">
        <Button variant="outline" size="icon-sm" disabled={page <= 1} aria-label="Previous page">
          <ChevronLeft />
        </Button>
        <span className="px-2 text-xs font-medium text-foreground">
          Page {page} of {Math.max(1, Math.ceil(total / pageSize))}
        </span>
        <Button variant="outline" size="icon-sm" disabled={end >= total} aria-label="Next page">
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
