import { Paperclip } from "lucide-react"

import { StatusBadge } from "@/components/admin/shared/status-badge"
import { cn } from "@/lib/utils"
import type { AdminTicket } from "@/lib/admin-data"

export function TicketsList({
  tickets,
  selectedId,
  onSelect,
}: {
  tickets: AdminTicket[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-border bg-card/60 p-3 backdrop-blur-xl">
      {tickets.map((ticket) => (
        <button
          key={ticket.id}
          type="button"
          onClick={() => onSelect(ticket.id)}
          className={cn(
            "flex flex-col gap-1.5 rounded-xl border px-3.5 py-3 text-left transition-colors",
            selectedId === ticket.id
              ? "border-indigo-400/40 bg-gradient-to-b from-indigo-500/10 via-violet-500/5 to-transparent"
              : "border-transparent hover:bg-accent"
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-medium text-foreground">{ticket.subject}</span>
            {ticket.hasAttachment && <Paperclip className="size-3.5 shrink-0 text-muted-foreground" />}
          </div>
          <span className="text-xs text-muted-foreground">{ticket.user} · {ticket.date}</span>
          <div className="flex items-center gap-1.5">
            <StatusBadge status={ticket.priority} />
            <StatusBadge status={ticket.status} />
          </div>
        </button>
      ))}
    </div>
  )
}
