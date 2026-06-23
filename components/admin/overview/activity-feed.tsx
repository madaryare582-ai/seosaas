import { Activity } from "lucide-react"

import { activityFeed } from "@/lib/admin-data"

export function ActivityFeed() {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex items-center gap-2">
        <Activity className="size-4 text-violet-500" />
        <p className="text-sm font-medium text-foreground">Recent Activity</p>
      </div>

      <ol className="mt-4 flex flex-col gap-4 border-l border-border pl-4">
        {activityFeed.map((item, index) => (
          <li key={index} className="relative">
            <span className="absolute top-1 -left-[21px] size-2.5 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500" />
            <p className="text-sm text-foreground">
              <span className="font-medium">{item.actor}</span>{" "}
              <span className="text-muted-foreground">{item.action}</span>
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{item.date}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}
