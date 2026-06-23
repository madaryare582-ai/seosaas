"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"

import { PaymentMethods, type PaymentMethodId } from "@/components/checkout/payment-methods"
import { PaymentVerificationForm } from "@/components/checkout/payment-verification-form"
import { Button } from "@/components/ui/button"

export function PaymentPanel() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId | null>(
    null
  )
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-10 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150">
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl"
        />
        <span className="relative flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-950/40">
          <CheckCircle2 className="size-8 text-white" />
        </span>
        <h2 className="relative mt-6 text-2xl font-semibold tracking-tight text-foreground">
          Payment Pending Review
        </h2>
        <p className="relative mt-3 max-w-sm text-base leading-relaxed text-muted-foreground">
          Your payment proof has been submitted and is awaiting approval.
          Most payments are reviewed within 5–15 minutes.
        </p>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="relative mt-8 h-12 border-white/15 bg-white/5 px-8 text-base text-foreground hover:bg-white/10"
        >
          <Link href="/pricing" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Back To Pricing
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <PaymentMethods selected={selectedMethod} onSelect={setSelectedMethod} />
      <PaymentVerificationForm
        selectedMethod={selectedMethod}
        onSubmit={() => setSubmitted(true)}
      />

      <Button
        asChild
        type="button"
        variant="outline"
        size="lg"
        className="h-12 w-full border-white/15 bg-white/5 text-base text-foreground hover:bg-white/10 sm:w-auto"
      >
        <Link href="/pricing" className="flex items-center gap-2">
          <ArrowLeft className="size-4" />
          Back To Pricing
        </Link>
      </Button>
    </div>
  )
}
