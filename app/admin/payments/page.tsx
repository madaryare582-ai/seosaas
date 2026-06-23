"use client"

import * as React from "react"

import { PaymentsTable } from "@/components/admin/payments/payments-table"
import { ExportMenu } from "@/components/admin/shared/export-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { adminPayments, type AdminPayment, type PaymentStatus } from "@/lib/admin-data"

export default function AdminPaymentsPage() {
  const [payments, setPayments] = React.useState<AdminPayment[]>(adminPayments)

  function setStatus(id: string, status: PaymentStatus) {
    setPayments((prev) => prev.map((payment) => (payment.id === id ? { ...payment, status } : payment)))
  }

  const pending = payments.filter((p) => p.status === "pending")
  const approved = payments.filter((p) => p.status === "approved")
  const rejected = payments.filter((p) => p.status === "rejected")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Payments
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Review and approve manual payments from Binance Pay, Zaad, and E-Dahab.
          </p>
        </div>
        <ExportMenu label="Export Transactions" />
      </div>

      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            Pending
            {pending.length > 0 && <Badge className="ml-1">{pending.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-5">
          <PaymentsTable
            payments={pending}
            onApprove={(id) => setStatus(id, "approved")}
            onReject={(id) => setStatus(id, "rejected")}
          />
        </TabsContent>
        <TabsContent value="approved" className="mt-5">
          <PaymentsTable
            payments={approved}
            onApprove={(id) => setStatus(id, "approved")}
            onReject={(id) => setStatus(id, "rejected")}
          />
        </TabsContent>
        <TabsContent value="rejected" className="mt-5">
          <PaymentsTable
            payments={rejected}
            onApprove={(id) => setStatus(id, "approved")}
            onReject={(id) => setStatus(id, "rejected")}
          />
        </TabsContent>
        <TabsContent value="history" className="mt-5">
          <PaymentsTable
            payments={payments}
            onApprove={(id) => setStatus(id, "approved")}
            onReject={(id) => setStatus(id, "rejected")}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
