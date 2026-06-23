import { Download } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  { id: "INV-2026-006", date: "Jun 1, 2026", plan: "Pro Plan", amount: "$79.00", status: "Paid" },
  { id: "INV-2026-005", date: "May 1, 2026", plan: "Pro Plan", amount: "$79.00", status: "Paid" },
  { id: "INV-2026-004", date: "Apr 1, 2026", plan: "Pro Plan", amount: "$79.00", status: "Paid" },
  { id: "INV-2026-003", date: "Mar 1, 2026", plan: "Starter Plan", amount: "$29.00", status: "Paid" },
]

export function BillingHistory() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <p className="text-sm font-medium text-foreground">Billing History</p>
      <p className="text-xs text-muted-foreground">Your past invoices and receipts</p>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Invoice</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-muted-foreground">Plan</TableHead>
              <TableHead className="text-muted-foreground">Amount</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">Receipt</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} className="border-white/10">
                <TableCell className="font-medium text-foreground">{invoice.id}</TableCell>
                <TableCell className="text-muted-foreground">{invoice.date}</TableCell>
                <TableCell className="text-muted-foreground">{invoice.plan}</TableCell>
                <TableCell className="text-muted-foreground">{invoice.amount}</TableCell>
                <TableCell>
                  <Badge className="border-0 bg-emerald-400/10 text-emerald-400">
                    {invoice.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm" aria-label="Download receipt">
                    <Download />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
