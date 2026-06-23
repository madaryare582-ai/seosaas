import Link from "next/link"
import { Sparkles, Zap } from "lucide-react"

import { SidebarNav } from "@/components/dashboard/sidebar-nav"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-background/60 backdrop-blur-xl lg:flex">
      <Link href="/dashboard" className="flex items-center gap-2 px-5 py-6">
        <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
          <Sparkles className="size-4 text-white" />
        </span>
        <span className="text-lg font-semibold tracking-tight text-foreground">
          HiigsiSEO
        </span>
      </Link>

      <div className="flex-1 overflow-y-auto py-2">
        <SidebarNav />
      </div>

      <div className="m-3 rounded-xl border border-white/10 bg-white/5 p-4">
        <div className="flex items-center gap-2">
          <Zap className="size-4 text-fuchsia-400" />
          <span className="text-xs font-medium text-foreground">2,450 credits left</span>
        </div>
        <Progress value={61} className="mt-3 h-1.5" />
        <p className="mt-2 text-xs text-muted-foreground">
          61% of your monthly plan used
        </p>
        <Button
          asChild
          size="sm"
          className="mt-3 w-full border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
        >
          <Link href="/dashboard/credits">Upgrade Plan</Link>
        </Button>
      </div>
    </aside>
  )
}
