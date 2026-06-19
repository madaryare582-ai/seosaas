import Link from "next/link"
import { ShieldCheck, Sparkles } from "lucide-react"

import { PlanSummary } from "@/components/checkout/plan-summary"
import { PaymentPanel } from "@/components/checkout/payment-panel"

export default function CheckoutPage() {
  return (
    <div className="dark relative flex min-h-screen flex-col overflow-x-hidden bg-background font-sans text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 size-96 animate-pulse rounded-full bg-indigo-600/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -right-32 size-96 animate-pulse rounded-full bg-purple-600/30 blur-3xl [animation-delay:1s]"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
            <Sparkles className="size-4 text-white" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            HiigsiSEO
          </span>
        </Link>
        <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <ShieldCheck className="size-4 text-emerald-400" />
          Secure Checkout
        </span>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl">
          <div className="text-center">
            <span className="text-sm font-semibold tracking-wide text-indigo-400 uppercase">
              Checkout
            </span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Complete Your Purchase
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              You&apos;re one step away from scaling your content workflow.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <PlanSummary />
            <PaymentPanel />
          </div>
        </div>
      </main>

      <footer className="relative z-10 px-4 py-6 text-center text-xs text-muted-foreground">
        © 2026 HiigsiSEO. All rights reserved.
      </footer>
    </div>
  )
}
