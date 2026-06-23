import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function KpiCard({
  label,
  value,
  trend,
  direction = "up",
  icon: Icon,
  accent = "from-indigo-500 via-violet-500 to-blue-500",
}: {
  label: string
  value: string
  trend?: string
  direction?: "up" | "down"
  icon: LucideIcon
  accent?: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/5">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-8 -right-8 size-24 rounded-full bg-gradient-to-br opacity-15 blur-2xl transition-opacity group-hover:opacity-25",
          accent
        )}
      />
      <div className="relative flex items-center justify-between">
        <span className={cn("flex size-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg", accent)}>
          <Icon className="size-5 text-white" />
        </span>
        {trend && (
          <span
            className={cn(
              "flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
              direction === "up"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
            )}
          >
            {direction === "up" ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {trend}
          </span>
        )}
      </div>
      <p className="relative mt-4 text-2xl font-semibold tracking-tight text-foreground">
        {value}
      </p>
      <p className="relative mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
