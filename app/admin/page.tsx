import {
  CreditCard,
  LifeBuoy,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react"

import { ActivityFeed } from "@/components/admin/overview/activity-feed"
import { LatestPosts } from "@/components/admin/overview/latest-posts"
import { RecentPaymentsTable } from "@/components/admin/overview/recent-payments-table"
import { RecentTickets } from "@/components/admin/overview/recent-tickets"
import { RevenueChart } from "@/components/admin/overview/revenue-chart"
import { SystemStatus } from "@/components/admin/overview/system-status"
import { UserGrowthChart } from "@/components/admin/overview/user-growth-chart"
import { ExportMenu } from "@/components/admin/shared/export-menu"
import { KpiCard } from "@/components/admin/shared/kpi-card"
import { overviewKpis } from "@/lib/admin-data"

const kpiIcons = [Users, Zap, TrendingUp, CreditCard, Wallet, LifeBuoy]
const kpiAccents = [
  "from-indigo-500 to-blue-500",
  "from-violet-500 to-indigo-500",
  "from-blue-500 via-indigo-500 to-violet-500",
  "from-indigo-500 via-violet-500 to-blue-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
]

export default function AdminOverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Welcome back, Jordan
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s how HiigsiSEO is performing today.
          </p>
        </div>
        <ExportMenu label="Export Report" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {overviewKpis.map((kpi, index) => (
          <KpiCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            trend={kpi.trend}
            direction={kpi.direction}
            icon={kpiIcons[index]}
            accent={kpiAccents[index]}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RevenueChart />
        <UserGrowthChart />
      </div>

      <SystemStatus />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecentPaymentsTable />
        <ActivityFeed />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecentTickets />
        <LatestPosts />
      </div>
    </div>
  )
}
