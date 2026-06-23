import Link from "next/link"
import { Briefcase, CreditCard, FileText, ListChecks, Plus, Sparkles } from "lucide-react"

import { CreditUsage } from "@/components/dashboard/overview/credit-usage"
import { RecentActivity } from "@/components/dashboard/overview/recent-activity"
import { TrafficChart } from "@/components/dashboard/overview/traffic-chart"
import { StatCard } from "@/components/dashboard/stat-card"
import { Button } from "@/components/ui/button"

const stats = [
  {
    label: "Credits Remaining",
    value: "2,450",
    icon: CreditCard,
    trend: { value: "61% used", direction: "down" as const },
    accent: "from-indigo-500 via-violet-500 to-fuchsia-500",
  },
  {
    label: "Articles Generated",
    value: "312",
    icon: FileText,
    trend: { value: "+18 this week", direction: "up" as const },
    accent: "from-violet-500 to-indigo-500",
  },
  {
    label: "Content Plans Created",
    value: "24",
    icon: ListChecks,
    trend: { value: "+3 this week", direction: "up" as const },
    accent: "from-fuchsia-500 to-violet-500",
  },
  {
    label: "Active Projects",
    value: "7",
    icon: Briefcase,
    trend: { value: "+1 this month", direction: "up" as const },
    accent: "from-indigo-500 to-fuchsia-500",
  },
]

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Welcome back, Jordan
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s what&apos;s happening across your SEO workspace today.
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button variant="outline" asChild>
            <Link href="/dashboard/content-planner">
              <Plus />
              New Plan
            </Link>
          </Button>
          <Button
            asChild
            className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
          >
            <Link href="/dashboard/article-generator">
              <Sparkles />
              Generate Article
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrafficChart />
        </div>
        <CreditUsage />
      </div>

      <RecentActivity />
    </div>
  )
}
