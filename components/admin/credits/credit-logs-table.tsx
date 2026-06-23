import { ArrowDownLeft, ArrowUpRight, Minus } from "lucide-react"

import { PaginationFooter } from "@/components/admin/shared/pagination-footer"
import { ExportMenu } from "@/components/admin/shared/export-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { creditLogs } from "@/lib/admin-data"

export function CreditLogsTable() {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Credit Logs</p>
          <p className="text-xs text-muted-foreground">Every manual adjustment and usage event</p>
        </div>
        <ExportMenu />
      </div>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>By</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {creditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium text-foreground">{log.user}</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1.5 text-sm capitalize">
                    {log.type === "add" ? (
                      <ArrowUpRight className="size-3.5 text-emerald-500" />
                    ) : log.type === "remove" ? (
                      <ArrowDownLeft className="size-3.5 text-rose-500" />
                    ) : (
                      <Minus className="size-3.5 text-muted-foreground" />
                    )}
                    {log.type}
                  </span>
                </TableCell>
                <TableCell className={log.amount > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                  {log.amount > 0 ? "+" : ""}{log.amount.toLocaleString()}
                </TableCell>
                <TableCell className="text-muted-foreground">{log.reason}</TableCell>
                <TableCell className="text-muted-foreground">{log.by}</TableCell>
                <TableCell className="text-muted-foreground">{log.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationFooter total={creditLogs.length} />
    </div>
  )
}
