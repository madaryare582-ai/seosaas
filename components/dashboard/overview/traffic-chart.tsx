import { TrendingUp } from "lucide-react"

const data = [
  { day: "Mon", articles: 4 },
  { day: "Tue", articles: 7 },
  { day: "Wed", articles: 5 },
  { day: "Thu", articles: 9 },
  { day: "Fri", articles: 12 },
  { day: "Sat", articles: 8 },
  { day: "Sun", articles: 14 },
]

const max = Math.max(...data.map((d) => d.articles))

export function TrafficChart() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Article Output</p>
          <p className="text-xs text-muted-foreground">Articles generated per day, this week</p>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
          <TrendingUp className="size-3.5" />
          +32%
        </span>
      </div>

      <div className="mt-6 flex h-40 items-end gap-2 sm:gap-3">
        {data.map((point) => (
          <div key={point.day} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-32 w-full items-end overflow-hidden rounded-t-md bg-white/5">
              <div
                style={{ height: `${(point.articles / max) * 100}%` }}
                className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 via-violet-500 to-fuchsia-400 transition-all"
              />
            </div>
            <span className="text-xs text-muted-foreground">{point.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
