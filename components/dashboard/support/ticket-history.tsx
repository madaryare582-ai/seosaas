import { MessageCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const statusStyles = {
  Open: "bg-indigo-400/10 text-indigo-300",
  "In Progress": "bg-amber-400/10 text-amber-400",
  Resolved: "bg-emerald-400/10 text-emerald-400",
} as const

const tickets = [
  {
    subject: "Article generation stuck at 90%",
    id: "#TCK-1042",
    date: "Jun 20, 2026",
    status: "In Progress",
  },
  {
    subject: "Unable to export content plan as CSV",
    id: "#TCK-1038",
    date: "Jun 17, 2026",
    status: "Resolved",
  },
  {
    subject: "Question about credit rollover policy",
    id: "#TCK-1031",
    date: "Jun 12, 2026",
    status: "Resolved",
  },
  {
    subject: "Billing charged twice this month",
    id: "#TCK-1027",
    date: "Jun 9, 2026",
    status: "Open",
  },
] satisfies Array<{
  subject: string
  id: string
  date: string
  status: keyof typeof statusStyles
}>

export function TicketHistory() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <p className="text-sm font-medium text-foreground">Ticket History</p>
      <p className="text-xs text-muted-foreground">Your previous support requests</p>

      <ul className="mt-4 flex flex-col gap-3">
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3.5 transition-colors hover:border-indigo-400/30"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5">
                <MessageCircle className="size-4 text-indigo-400" />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">{ticket.subject}</p>
                <p className="text-xs text-muted-foreground">
                  {ticket.id} &middot; {ticket.date}
                </p>
              </div>
            </div>
            <Badge className={cn("border-0 shrink-0", statusStyles[ticket.status])}>
              {ticket.status}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  )
}
