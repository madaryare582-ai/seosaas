import { Check } from "lucide-react"

import { Badge } from "@/components/ui/badge"

const planFeatures = [
  "5 Articles Per Day",
  "EEAT Optimization",
  "Topical Authority Optimization",
  "Advanced Semantic SEO",
]

export function PlanSummary() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-400/30 bg-gradient-to-b from-indigo-500/15 via-violet-500/10 to-transparent p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_25px_60px_-15px_rgba(99,102,241,0.4)] backdrop-blur-2xl backdrop-saturate-150 lg:sticky lg:top-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-1/2 size-56 -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/30 via-violet-500/20 to-fuchsia-500/20 blur-3xl"
      />

      <Badge className="relative border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-950/50">
        Selected Plan
      </Badge>

      <h2 className="relative mt-5 text-2xl font-semibold tracking-tight text-foreground">
        Growth Plan
      </h2>
      <div className="relative mt-2 flex items-baseline gap-1">
        <span className="text-4xl font-semibold tracking-tight text-foreground">
          $12
        </span>
        <span className="text-base text-muted-foreground">/month</span>
      </div>

      <ul className="relative mt-8 flex flex-col gap-4">
        {planFeatures.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-[15px] text-foreground/90"
          >
            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/20">
              <Check className="size-3 text-emerald-400" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="relative mt-8 border-t border-white/10 pt-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span className="text-foreground">$12.00</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-base font-semibold">
          <span className="text-foreground">Total Due Today</span>
          <span className="text-foreground">$12.00</span>
        </div>
      </div>
    </div>
  )
}
