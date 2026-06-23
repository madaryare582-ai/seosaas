import { Bitcoin, Check, Smartphone, Wallet, X, type LucideIcon } from "lucide-react"

import { PaginationFooter } from "@/components/admin/shared/pagination-footer"
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
import type { AdminPayment } from "@/lib/admin-data"

const methodIcons: Record<AdminPayment["method"], LucideIcon> = {
  "Binance Pay": Bitcoin,
  Zaad: Smartphone,
  "E-Dahab": Wallet,
}

export function PaymentsTable({
  payments,
  onApprove,
  onReject,
}: {
  payments: AdminPayment[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead className="hidden sm:table-cell">Plan</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead className="hidden sm:table-cell">Method</TableHead>
            <TableHead className="hidden lg:table-cell">Transaction ID</TableHead>
            <TableHead className="hidden lg:table-cell">Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => {
            const MethodIcon = methodIcons[payment.method]

            return (
              <TableRow key={payment.id}>
                <TableCell>
                  <div className="flex max-w-[100px] min-w-0 flex-col sm:max-w-none">
                    <span className="truncate text-sm font-medium text-foreground">{payment.user}</span>
                    <span className="truncate text-xs text-muted-foreground">{payment.email}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">{payment.plan}</TableCell>
                <TableCell className="font-medium text-foreground">{payment.amount}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="flex items-center gap-1.5 text-sm text-foreground">
                    <MethodIcon className="size-3.5 text-violet-500" />
                    {payment.method}
                  </span>
                </TableCell>
                <TableCell className="hidden font-mono text-xs text-muted-foreground lg:table-cell">
                  {payment.txnId}
                </TableCell>
                <TableCell className="hidden text-muted-foreground lg:table-cell">{payment.date}</TableCell>
                <TableCell>
                  <StatusBadge status={payment.status} />
                </TableCell>
                <TableCell className="text-right">
                  {payment.status === "pending" ? (
                    <div className="flex justify-end gap-1.5">
                      <Button
                        size="sm"
                        aria-label="Approve payment"
                        className="border-0 bg-emerald-500/10 px-2 text-emerald-600 hover:bg-emerald-500/20 sm:px-3 dark:text-emerald-400"
                        onClick={() => onApprove(payment.id)}
                      >
                        <Check />
                        <span className="hidden sm:inline">Approve</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        aria-label="Reject payment"
                        className="px-2 text-destructive hover:bg-destructive/10 sm:px-3"
                        onClick={() => onReject(payment.id)}
                      >
                        <X />
                        <span className="hidden sm:inline">Reject</span>
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      <span className="sm:hidden">—</span>
                      <span className="hidden sm:inline">No action needed</span>
                    </span>
                  )}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>

      <PaginationFooter total={payments.length} />
    </div>
  )
}
