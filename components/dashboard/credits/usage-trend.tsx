const data = [
  { label: "Wk 1", used: 420 },
  { label: "Wk 2", used: 610 },
  { label: "Wk 3", used: 380 },
  { label: "Wk 4", used: 140 },
]

const max = Math.max(...data.map((d) => d.used))

export function UsageTrend() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <p className="text-sm font-medium text-foreground">Usage Statistics</p>
      <p className="text-xs text-muted-foreground">Credits consumed per week, this billing cycle</p>

      <div className="mt-6 flex h-36 items-end gap-4 sm:gap-6">
        {data.map((point) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-xs text-muted-foreground">{point.used}</span>
            <div className="flex h-24 w-full items-end overflow-hidden rounded-t-md bg-white/5">
              <div
                style={{ height: `${(point.used / max) * 100}%` }}
                className="w-full rounded-t-md bg-gradient-to-t from-indigo-500 via-violet-500 to-fuchsia-400"
              />
            </div>
            <span className="text-xs text-muted-foreground">{point.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
