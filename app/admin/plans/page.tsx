import { PlanCard } from "@/components/admin/plans/plan-card"
import { PlanDialog } from "@/components/admin/plans/plan-dialog"
import { adminPlans } from "@/lib/admin-data"

export default function AdminPlansPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Plans
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage pricing tiers, credit allowances, and included features.
          </p>
        </div>
        <PlanDialog />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminPlans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  )
}
