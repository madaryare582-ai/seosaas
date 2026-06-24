"use client"

import Link from "next/link"
import { Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useNicheFinder } from "@/components/dashboard/niche-finder/use-niche-finder"

export function DailyUsageWidget() {
  const { dailyUsage } = useNicheFinder()
  const remaining = Math.max(0, dailyUsage.limit - dailyUsage.used)
  const percent = Math.round((dailyUsage.used / dailyUsage.limit) * 100)

  return (
    <div className="lg:sticky lg:top-6">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/20 blur-3xl"
        />
        <div className="relative flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg">
            <Zap className="size-5 text-white" />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Today&apos;s Article Usage</p>
            <p className="text-2xl font-semibold tracking-tight text-foreground">
              {dailyUsage.used} / {dailyUsage.limit} Articles Used
            </p>
          </div>
        </div>

        <div className="relative mt-6">
          <Progress value={percent} className="h-2" />
          <p className="mt-2 text-xs text-muted-foreground">
            Remaining: <span className="text-foreground">{remaining} Articles</span>
          </p>
        </div>

        <Button variant="outline" className="relative mt-5 w-full" asChild>
          <Link href="/dashboard/credits">Upgrade Plan</Link>
        </Button>
      </div>
    </div>
  )
}
