"use client"

import * as React from "react"
import { Clock, DollarSign, ImageUp, ShieldCheck, X } from "lucide-react"

import { paymentMethods, type PaymentMethodId } from "@/components/checkout/payment-methods"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function PaymentVerificationForm({
  selectedMethod,
  onSubmit,
}: {
  selectedMethod: PaymentMethodId | null
  onSubmit: () => void
}) {
  const [transactionId, setTransactionId] = React.useState("")
  const [amountPaid, setAmountPaid] = React.useState("")
  const [preview, setPreview] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  function handleFile(file: File | undefined) {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  const canSubmit = Boolean(
    selectedMethod && transactionId && amountPaid && preview
  )

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 sm:p-8">
      <h2 className="text-lg font-semibold text-foreground">
        Verify Your Payment
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Submit your payment details and we&apos;ll confirm your subscription shortly.
      </p>

      <form
        className="mt-6 flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault()
          if (canSubmit) onSubmit()
        }}
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="payment-method">Payment Method</Label>
          <Select key={selectedMethod ?? "none"} defaultValue={selectedMethod ?? undefined}>
            <SelectTrigger id="payment-method" className="w-full">
              <SelectValue placeholder="Select a payment method above" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => (
                <SelectItem key={method.id} value={method.id}>
                  {method.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="transaction-id">Transaction ID</Label>
            <Input
              id="transaction-id"
              placeholder="e.g. TXN8839201"
              value={transactionId}
              onChange={(event) => setTransactionId(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="amount-paid">Amount Paid</Label>
            <div className="relative">
              <DollarSign className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="amount-paid"
                placeholder="12.00"
                inputMode="decimal"
                className="pl-8"
                value={amountPaid}
                onChange={(event) => setAmountPaid(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Upload Payment Screenshot</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />

          {preview ? (
            <div className="relative w-fit overflow-hidden rounded-xl border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Payment screenshot preview" className="max-h-40 max-w-full object-cover" />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute top-1.5 right-1.5 bg-background/70"
                onClick={() => setPreview(null)}
              >
                <X />
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/5 px-6 py-8 text-center transition-colors hover:border-indigo-400/40 hover:bg-white/8"
            >
              <ImageUp className="size-6 text-indigo-400" />
              <span className="text-sm font-medium text-foreground">
                Click to upload a screenshot
              </span>
              <span className="text-xs text-muted-foreground">PNG, JPG up to 10MB</span>
            </button>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="payment-notes">Optional Notes</Label>
          <Textarea
            id="payment-notes"
            placeholder="Anything else we should know about this payment?"
            className="min-h-20"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={!canSubmit}
          className="mt-2 h-12 w-full border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-base text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400 hover:shadow-indigo-500/40"
        >
          <ShieldCheck />
          Submit Payment Proof
        </Button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="size-3.5 text-fuchsia-400" />
          Most payments are reviewed and approved within 5–15 minutes.
        </p>
      </form>
    </div>
  )
}
