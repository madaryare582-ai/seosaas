import { Sparkles, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function CreditsSummary() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:col-span-2">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/20 blur-3xl"
        />
        <div className="relative flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg">
            <Zap className="size-5 text-white" />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Available Credits</p>
            <p className="text-3xl font-semibold tracking-tight text-foreground">2,450</p>
          </div>
        </div>

        <div className="relative mt-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>1,550 used this cycle</span>
            <span>4,000 total / month</span>
          </div>
          <Progress value={61} className="mt-2 h-2" />
          <p className="mt-2 text-xs text-muted-foreground">
            Credits renew on <span className="text-foreground">July 1, 2026</span>
          </p>
        </div>

        <div className="relative mt-6 flex flex-wrap gap-2.5">
          <Button className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400">
            <Sparkles />
            Buy More Credits
          </Button>
          <Button variant="outline">Upgrade Plan</Button>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <p className="text-sm text-muted-foreground">Current Plan</p>
        <p className="mt-1 text-2xl font-semibold text-foreground">Pro</p>
        <p className="mt-1 text-sm text-muted-foreground">$79 / month</p>
        <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
          <li>4,000 credits / month</li>
          <li>Unlimited content plans</li>
          <li>Priority article generation</li>
        </ul>
        <Button variant="outline" className="mt-5 w-full">
          Manage Subscription
        </Button>
      </div>
    </div>
  )
}
