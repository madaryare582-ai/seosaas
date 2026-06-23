"use client"

import { CreditCard, FileText, ListChecks, Network } from "lucide-react"

import { StatusBadge } from "@/components/admin/shared/status-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import type { AdminUser } from "@/lib/admin-data"

const usageBreakdown = [
  { label: "Article Generator", icon: FileText, percent: 49 },
  { label: "Content Planner", icon: ListChecks, percent: 27 },
  { label: "Topical Authority", icon: Network, percent: 16 },
]

export function UserDetailSheet({
  user,
  open,
  onOpenChange,
}: {
  user: AdminUser | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!user) return null
  const creditPercent = Math.round((user.credits.used / user.credits.total) * 100)

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 text-white">
                {user.name.split(" ").map((part) => part[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle>{user.name}</SheetTitle>
              <SheetDescription>{user.email}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex flex-col gap-6 px-4">
          <div>
            <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
              Subscription
            </p>
            <div className="mt-2 flex items-center justify-between rounded-xl border border-border bg-muted/40 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{user.plan} Plan</p>
                <p className="text-xs text-muted-foreground">Member since {user.joined}</p>
              </div>
              <StatusBadge status={user.status} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Credit Usage
              </p>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <CreditCard className="size-3.5" />
                {user.credits.used.toLocaleString()} / {user.credits.total.toLocaleString()}
              </span>
            </div>
            <Progress value={creditPercent} className="mt-2 h-1.5" />

            <div className="mt-4 flex flex-col gap-3">
              {usageBreakdown.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-foreground">
                      <item.icon className="size-4 text-indigo-500" />
                      {item.label}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.percent}%</span>
                  </div>
                  <Progress value={item.percent} className="mt-1.5 h-1.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
