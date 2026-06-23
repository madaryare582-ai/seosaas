import { FileText, ListChecks, Network, Search } from "lucide-react"

import { Progress } from "@/components/ui/progress"

const usage = [
  { label: "Article Generator", icon: FileText, used: 142400, percent: 50 },
  { label: "Content Planner", icon: ListChecks, used: 79800, percent: 28 },
  { label: "Topical Authority", icon: Network, used: 42700, percent: 15 },
  { label: "Keyword Research", icon: Search, used: 20010, percent: 7 },
]

export function UsageChart() {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
      <p className="text-sm font-medium text-foreground">Credit Usage Analytics</p>
      <p className="text-xs text-muted-foreground">Platform-wide credit consumption by feature, this month</p>

      <div className="mt-5 flex flex-col gap-4">
        {usage.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-foreground">
                <item.icon className="size-4 text-indigo-500" />
                {item.label}
              </span>
              <span className="text-muted-foreground">{item.used.toLocaleString()} credits</span>
            </div>
            <Progress value={item.percent} className="mt-2 h-1.5" />
          </div>
        ))}
      </div>
    </div>
  )
}
