"use client"

import { useState } from "react"
import { Bitcoin, Check, Copy, QrCode, Smartphone, Wallet, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type PaymentMethodId = "binance" | "zaad" | "edahab"

export type PaymentMethod = {
  id: PaymentMethodId
  label: string
  tagline: string
  icon: LucideIcon
  accountName: string
  idLabel: string
  idValue: string
  instructions: string
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: "binance",
    label: "Binance Pay",
    tagline:
      "Instant crypto payments with fast and secure transactions worldwide.",
    icon: Bitcoin,
    accountName: "HiigsiSEO Ltd",
    idLabel: "Binance Pay ID",
    idValue: "700 123 456",
    instructions:
      "Open Binance, go to Pay, and send the exact plan amount to the Binance Pay ID above. Take a screenshot of the completed transfer for verification.",
  },
  {
    id: "zaad",
    label: "Zaad",
    tagline:
      "Pay directly from your Zaad wallet and activate your subscription quickly.",
    icon: Smartphone,
    accountName: "Hiigsi SEO Services",
    idLabel: "Zaad Number",
    idValue: "+252 63 401 2233",
    instructions:
      "Dial *712# or open the Zaad app, send the exact plan amount to the number above, and keep the confirmation SMS for your records.",
  },
  {
    id: "edahab",
    label: "E-Dahab",
    tagline: "Secure local payments for Somaliland and Somalia users.",
    icon: Wallet,
    accountName: "Hiigsi SEO Services",
    idLabel: "E-Dahab Number",
    idValue: "+252 65 778 9012",
    instructions:
      "Open your E-Dahab app or dial the USSD code, send the exact plan amount to the number above, and save the transaction receipt for verification.",
  },
]

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

export function PaymentMethods({
  selected,
  onSelect,
}: {
  selected: PaymentMethodId | null
  onSelect: (id: PaymentMethodId) => void
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 sm:p-8">
      <h2 className="text-lg font-semibold text-foreground">
        Select Payment Method
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Choose how you&apos;d like to pay, then follow the instructions below.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {paymentMethods.map((method) => {
          const isSelected = selected === method.id

          return (
            <div
              key={method.id}
              className={cn(
                "overflow-hidden rounded-xl border transition-all duration-300",
                isSelected
                  ? "border-indigo-400/40 bg-gradient-to-b from-indigo-500/10 via-violet-500/5 to-transparent shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_15px_30px_-10px_rgba(99,102,241,0.35)]"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8"
              )}
            >
              <button
                type="button"
                onClick={() => onSelect(method.id)}
                aria-pressed={isSelected}
                className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
              >
                <span
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-xl shadow-lg",
                    isSelected
                      ? "bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-indigo-950/40"
                      : "bg-white/10 shadow-black/20"
                  )}
                >
                  <method.icon
                    className={cn(
                      "size-5",
                      isSelected ? "text-white" : "text-muted-foreground"
                    )}
                  />
                </span>

                <span className="flex flex-1 flex-col gap-0.5">
                  <span className="text-sm font-semibold text-foreground">
                    {method.label}
                  </span>
                  <span className="text-xs leading-relaxed text-muted-foreground">
                    {method.tagline}
                  </span>
                </span>

                <span
                  aria-hidden
                  className={cn(
                    "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                    isSelected
                      ? "border-indigo-400 bg-indigo-500"
                      : "border-white/20 bg-transparent"
                  )}
                >
                  {isSelected && <Check className="size-3 text-white" />}
                </span>
              </button>

              {isSelected && (
                <div className="grid grid-cols-1 gap-5 border-t border-white/10 px-4 py-5 sm:grid-cols-[1fr_auto] sm:px-5">
                  <div className="flex flex-col gap-4">
                    <CopyableField label="Account Name" value={method.accountName} />
                    <CopyableField label={method.idLabel} value={method.idValue} />
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {method.instructions}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-2 sm:items-end">
                    <div className="flex size-28 items-center justify-center rounded-xl border border-white/10 bg-white/90 shadow-lg">
                      <QrCode className="size-16 text-background" />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Scan to pay
                    </span>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
