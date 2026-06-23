import Link from "next/link"
import { ArrowUpRight, Paperclip } from "lucide-react"

import { StatusBadge } from "@/components/admin/shared/status-badge"
import { Button } from "@/components/ui/button"
import { adminTickets } from "@/lib/admin-data"

export function RecentTickets() {
  const rows = adminTickets.slice(0, 4)

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Recent Support Tickets</p>
          <p className="text-xs text-muted-foreground">Newest first</p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/support">
            View all
            <ArrowUpRight />
          </Link>
        </Button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {rows.map((ticket) => (
          <Link
            key={ticket.id}
            href="/admin/support"
            className="flex items-center gap-3 rounded-xl border border-border bg-background/50 px-3 py-2.5 transition-colors hover:border-indigo-400/40 hover:bg-accent"
          >
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-foreground">{ticket.subject}</span>
              <span className="truncate text-xs text-muted-foreground">{ticket.user}</span>
            </div>
            {ticket.hasAttachment && <Paperclip className="size-3.5 shrink-0 text-muted-foreground" />}
            <StatusBadge status={ticket.priority} />
          </Link>
        ))}
      </div>
    </div>
  )
}
