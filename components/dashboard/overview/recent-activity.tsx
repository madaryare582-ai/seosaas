import { CheckCircle2, FileText, ListChecks, Network, Search } from "lucide-react"

import { cn } from "@/lib/utils"

const activity = [
  {
    icon: FileText,
    title: "Article generated",
    description: "“How to Build Topical Authority in 2026”",
    time: "12 minutes ago",
    accent: "from-indigo-500 to-violet-500",
  },
  {
    icon: ListChecks,
    title: "Content plan created",
    description: "30-day plan for “AI SEO Tools” niche",
    time: "1 hour ago",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Network,
    title: "Topic cluster mapped",
    description: "12 entities linked under “Content Marketing”",
    time: "3 hours ago",
    accent: "from-fuchsia-500 to-pink-500",
  },
  {
    icon: Search,
    title: "Search intent analyzed",
    description: "48 keywords classified for “Local SEO” cluster",
    time: "Yesterday",
    accent: "from-indigo-500 to-blue-500",
  },
  {
    icon: CheckCircle2,
    title: "Project marked active",
    description: "“Acme Corp Blog” moved to active projects",
    time: "2 days ago",
    accent: "from-emerald-500 to-teal-500",
  },
]

export function RecentActivity() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <p className="text-sm font-medium text-foreground">Recent Activity</p>
      <p className="text-xs text-muted-foreground">Your latest actions across HiigsiSEO</p>

      <ul className="mt-5 flex flex-col gap-5">
        {activity.map((item, index) => (
          <li key={item.title} className="relative flex gap-3.5">
            {index !== activity.length - 1 && (
              <span className="absolute top-9 left-[15px] h-[calc(100%-4px)] w-px bg-white/10" />
            )}
            <span
              className={cn(
                "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br shadow-lg",
                item.accent
              )}
            >
              <item.icon className="size-4 text-white" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <p className="mt-0.5 text-xs text-muted-foreground/70">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
