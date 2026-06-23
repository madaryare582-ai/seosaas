import { BadgeDollarSign, Rocket, ShieldCheck, Zap, type LucideIcon } from "lucide-react"

const indicators: { label: string; icon: LucideIcon }[] = [
  { label: "Secure Payment Verification", icon: ShieldCheck },
  { label: "Fast Manual Approval", icon: Zap },
  { label: "No Hidden Fees", icon: BadgeDollarSign },
  { label: "Instant Plan Activation After Approval", icon: Rocket },
]

export function TrustIndicators() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {indicators.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-4 text-center backdrop-blur-xl sm:flex-row sm:text-left"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-indigo-950/30">
            <item.icon className="size-4.5 text-white" />
          </span>
          <span className="text-xs leading-snug font-medium text-foreground">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  )
}
