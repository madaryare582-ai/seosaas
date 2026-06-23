import { BillingHistory } from "@/components/dashboard/credits/billing-history"
import { CreditsSummary } from "@/components/dashboard/credits/credits-summary"
import { UsageTrend } from "@/components/dashboard/credits/usage-trend"
import { CreditUsage } from "@/components/dashboard/overview/credit-usage"

export default function CreditsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Credits
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your credit balance, usage, and billing history.
        </p>
      </div>

      <CreditsSummary />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <UsageTrend />
        <CreditUsage />
      </div>

      <BillingHistory />
    </div>
  )
}
