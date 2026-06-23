import { CreditLogsTable } from "@/components/admin/credits/credit-logs-table"
import { CreditsOverview } from "@/components/admin/credits/credits-overview"
import { UsageChart } from "@/components/admin/credits/usage-chart"

export default function AdminCreditsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Credits
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage credit balances, review logs, and track platform-wide usage.
        </p>
      </div>

      <CreditsOverview />
      <UsageChart />
      <CreditLogsTable />
    </div>
  )
}
