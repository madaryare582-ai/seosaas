"use client"

import { Check, Pencil, Trash2, Users } from "lucide-react"

import { PlanDialog } from "@/components/admin/plans/plan-dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { AdminPlan } from "@/lib/admin-data"

export function PlanCard({ plan }: { plan: AdminPlan }) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-xl">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-16 -right-10 size-40 rounded-full bg-gradient-to-br opacity-15 blur-3xl",
          plan.accent
        )}
      />

      <div className="relative flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
        <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          <Users className="size-3.5" />
          {plan.subscribers} subscribers
        </span>
      </div>

      <div className="relative mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-semibold tracking-tight text-foreground">{plan.price}</span>
        <span className="text-sm text-muted-foreground">{plan.period}</span>
      </div>
      <p className="relative mt-1 text-xs text-muted-foreground">
        {plan.credits.toLocaleString()} credits / month
      </p>

      <ul className="relative mt-5 flex flex-col gap-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-foreground/90">
            <span className={cn("mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br", plan.accent)}>
              <Check className="size-2.5 text-white" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="relative mt-6 flex gap-2">
        <PlanDialog
          plan={plan}
          trigger={
            <Button variant="outline" size="sm" className="flex-1">
              <Pencil />
              Edit Plan
            </Button>
          }
        />
        <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">
          <Trash2 />
          Delete
        </Button>
      </div>
    </div>
  )
}
