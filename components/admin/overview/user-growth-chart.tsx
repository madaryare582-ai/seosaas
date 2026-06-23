import { Users } from "lucide-react"

import { userGrowthSeries } from "@/lib/admin-data"

const max = Math.max(...userGrowthSeries.map((d) => d.users))

export function UserGrowthChart() {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">User Growth</p>
          <p className="text-xs text-muted-foreground">Total registered users, last 6 months</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-400">
          <Users className="size-3.5" />
          951 total
        </span>
      </div>

      <div className="mt-6 flex h-44 items-end gap-1.5">
        {userGrowthSeries.map((point) => (
          <div key={point.month} className="group relative flex flex-1 flex-col items-center gap-2">
            <div className="absolute -top-7 hidden rounded-md bg-popover px-2 py-1 text-xs text-popover-foreground shadow-md ring-1 ring-foreground/10 group-hover:flex">
              {point.users}
            </div>
            <div className="flex h-36 w-full items-end overflow-hidden rounded-t-md bg-muted">
              <div
                style={{ height: `${(point.users / max) * 100}%` }}
                className="w-full rounded-t-md bg-gradient-to-t from-violet-500 to-blue-400 opacity-90 transition-all group-hover:opacity-100"
              />
            </div>
            <span className="text-xs text-muted-foreground">{point.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
