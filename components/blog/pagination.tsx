import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

const pages = [1, 2, 3, 4, 5]

export function Pagination() {
  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        disabled
        className="flex h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground disabled:pointer-events-none disabled:opacity-40 sm:px-4"
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-1.5">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            aria-current={page === 1 ? "page" : undefined}
            className={cn(
              "flex size-10 items-center justify-center rounded-full text-sm font-medium transition-all duration-200",
              page === 1
                ? "border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                : "border border-white/10 bg-white/5 text-muted-foreground hover:border-indigo-400/30 hover:bg-white/10 hover:text-foreground"
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="flex h-10 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-indigo-400/30 hover:bg-white/10 hover:text-foreground sm:px-4"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
