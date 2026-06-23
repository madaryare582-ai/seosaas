"use client"

import * as React from "react"

import { TicketDetailPanel } from "@/components/admin/support/ticket-detail-panel"
import { TicketsList } from "@/components/admin/support/tickets-list"
import { adminTickets } from "@/lib/admin-data"

export default function AdminSupportPage() {
  const [selectedId, setSelectedId] = React.useState(adminTickets[0].id)
  const selectedTicket = adminTickets.find((ticket) => ticket.id === selectedId) ?? adminTickets[0]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Support Tickets
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Respond to user issues with priority labels and attachments.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
        <TicketsList tickets={adminTickets} selectedId={selectedId} onSelect={setSelectedId} />
        <TicketDetailPanel ticket={selectedTicket} />
      </div>
    </div>
  )
}
