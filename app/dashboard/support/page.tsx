import { CreateTicketForm } from "@/components/dashboard/support/create-ticket-form"
import { TicketHistory } from "@/components/dashboard/support/ticket-history"

export default function SupportPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Support
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Get help from our team or browse your previous tickets.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
        <CreateTicketForm />
        <TicketHistory />
      </div>
    </div>
  )
}
