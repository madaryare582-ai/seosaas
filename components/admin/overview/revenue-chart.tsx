import { TrendingUp } from "lucide-react"

import { revenueSeries } from "@/lib/admin-data"

const max = Math.max(...revenueSeries.map((d) => d.revenue))

export function RevenueChart() {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Revenue Analytics</p>
          <p className="text-xs text-muted-foreground">Monthly recurring revenue, last 6 months</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <TrendingUp className="size-3.5" />
          +16.4%
        </span>
      </div>

      <div className="mt-6 flex h-44 items-end gap-3 sm:gap-4">
        {revenueSeries.map((point) => (
          <div key={point.month} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-36 w-full items-end overflow-hidden rounded-t-md bg-muted">
              <div
                style={{ height: `${(point.revenue / max) * 100}%` }}
                className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 via-violet-500 to-blue-400 transition-all"
              />
            </div>
            <span className="text-xs text-muted-foreground">{point.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
