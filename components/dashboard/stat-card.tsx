import type { LucideIcon } from "lucide-react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"

type StatCardProps = {
  label: string
  value: string
  icon: LucideIcon
  trend?: { value: string; direction: "up" | "down" }
  accent?: string
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  accent = "from-indigo-500 via-violet-500 to-fuchsia-500",
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/30 hover:bg-white/8">
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-8 -right-8 size-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity group-hover:opacity-30",
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
              trend.direction === "up"
                ? "bg-emerald-400/10 text-emerald-400"
                : "bg-rose-400/10 text-rose-400"
            )}
          >
            {trend.direction === "up" ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {trend.value}
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
