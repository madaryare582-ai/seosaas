import { ExportMenu } from "@/components/admin/shared/export-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { auditLog } from "@/lib/admin-data"

export function AuditLogTable() {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Audit Log</p>
          <p className="text-xs text-muted-foreground">Every administrative action, in order</p>
        </div>
        <ExportMenu />
      </div>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Actor</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLog.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium text-foreground">{entry.actor}</TableCell>
                <TableCell className="text-muted-foreground">{entry.action}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{entry.target}</TableCell>
                <TableCell className="text-muted-foreground">{entry.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
