import { FileText, ListChecks, Network, Search } from "lucide-react"

import { Progress } from "@/components/ui/progress"

const usage = [
  { label: "Article Generator", icon: FileText, used: 1240, percent: 49 },
  { label: "Content Planner", icon: ListChecks, used: 680, percent: 27 },
  { label: "Topical Authority", icon: Network, used: 410, percent: 16 },
  { label: "Keyword Research", icon: Search, used: 220, percent: 8 },
]

export function CreditUsage() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <p className="text-sm font-medium text-foreground">Credit Usage Breakdown</p>
      <p className="text-xs text-muted-foreground">How your credits were spent this month</p>

      <div className="mt-5 flex flex-col gap-4">
        {usage.map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-foreground">
                <item.icon className="size-4 text-indigo-400" />
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
