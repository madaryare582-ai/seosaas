"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  Smartphone,
  Wallet,
  type LucideIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PaymentMethodId = "binance" | "zaad" | "evc"

const paymentMethods: { id: PaymentMethodId; label: string; icon: LucideIcon }[] = [
  { id: "binance", label: "Binance Pay", icon: Wallet },
  { id: "zaad", label: "Zaad", icon: Smartphone },
  { id: "evc", label: "EVC Plus", icon: Smartphone },
]

const paymentDetails: Record<
  PaymentMethodId,
  { idLabel: string; idValue: string; referenceCode: string }
> = {
  binance: {
    idLabel: "Binance ID",
    idValue: "700 123 456",
    referenceCode: "HSEO-7K2P9X",
  },
  zaad: {
    idLabel: "Zaad Number",
    idValue: "+252 61 234 5678",
    referenceCode: "HSEO-7K2P9X",
  },
  evc: {
    idLabel: "EVC Number",
    idValue: "+252 61 987 6543",
    referenceCode: "HSEO-7K2P9X",
  },
}

function CopyableField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard?.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className="group flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left transition-colors hover:border-indigo-400/30 hover:bg-white/10"
      >
        <span className="font-mono text-sm text-foreground">{value}</span>
        {copied ? (
          <Check className="size-4 shrink-0 text-emerald-400" />
        ) : (
          <Copy className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
        )}
      </button>
    </div>
  )
}

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
          Your payment has been submitted and is awaiting approval.
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

  const details = selectedMethod ? paymentDetails[selectedMethod] : null

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150">
      <h2 className="text-lg font-semibold text-foreground">
        Select Payment Method
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => setSelectedMethod(method.id)}
            aria-pressed={selectedMethod === method.id}
            className={cn(
              "flex flex-col items-center gap-2.5 rounded-xl border px-4 py-5 text-center transition-all duration-300",
              selectedMethod === method.id
                ? "border-indigo-400/50 bg-gradient-to-b from-indigo-500/15 to-purple-600/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_15px_30px_-10px_rgba(99,102,241,0.5)]"
                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
            )}
          >
            <span
              className={cn(
                "flex size-11 items-center justify-center rounded-xl shadow-lg",
                selectedMethod === method.id
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-950/40"
                  : "bg-white/10 shadow-black/20"
              )}
            >
              <method.icon
                className={cn(
                  "size-5",
                  selectedMethod === method.id
                    ? "text-white"
                    : "text-muted-foreground"
                )}
              />
            </span>
            <span className="text-sm font-medium text-foreground">
              {method.label}
            </span>
          </button>
        ))}
      </div>

      {details && (
        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-5">
          <CopyableField label={details.idLabel} value={details.idValue} />
          <CopyableField
            label="Payment Reference Code"
            value={details.referenceCode}
          />
          <p className="text-xs leading-relaxed text-muted-foreground">
            Send the exact plan amount to the {details.idLabel.toLowerCase()}{" "}
            above and include your payment reference code, then confirm below
            once complete.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          size="lg"
          disabled={!selectedMethod}
          onClick={() => setSubmitted(true)}
          className="h-12 w-full border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-base text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-400 hover:to-purple-500 hover:shadow-indigo-500/40"
        >
          I Have Paid
        </Button>
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
    </div>
  )
}
