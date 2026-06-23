import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { StatusBadge } from "@/components/admin/shared/status-badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { adminPayments } from "@/lib/admin-data"

export function RecentPaymentsTable() {
  const rows = adminPayments.slice(0, 5)

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Recent Payments</p>
          <p className="text-xs text-muted-foreground">Latest submissions across all methods</p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/payments">
            View all
            <ArrowUpRight />
          </Link>
        </Button>
      </div>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="hidden sm:table-cell">Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="max-w-[100px] truncate font-medium text-foreground sm:max-w-none">{payment.user}</TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">{payment.method}</TableCell>
                <TableCell className="text-muted-foreground">{payment.amount}</TableCell>
                <TableCell>
                  <StatusBadge status={payment.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
