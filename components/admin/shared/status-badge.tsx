import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  approved: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  published: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  resolved: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  live: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  scheduled: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  open: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  draft: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
  archived: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
  suspended: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  rejected: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  expired: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  urgent: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  high: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  normal: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  low: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "border-0 px-1.5 capitalize sm:px-2",
        STATUS_STYLES[status] ?? "bg-muted text-muted-foreground"
      )}
    >
      {status}
    </Badge>
  )
}
