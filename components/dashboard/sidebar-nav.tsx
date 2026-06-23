"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { navItems } from "@/components/dashboard/nav-config"
import { cn } from "@/lib/utils"

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 px-3">
      {navItems.map((item) => {
        const isActive =
          item.href === "/dashboard"
            ? pathname === item.href
            : pathname === item.href || pathname?.startsWith(`${item.href}/`)

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              isActive
                ? "bg-gradient-to-r from-indigo-500/20 via-violet-500/15 to-fuchsia-500/10 text-foreground ring-1 ring-indigo-400/30"
                : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
            )}
          >
            {isActive && (
              <span className="absolute left-0 h-5 w-0.5 rounded-full bg-gradient-to-b from-indigo-400 to-fuchsia-400" />
            )}
            <item.icon
              className={cn(
                "size-4.5 shrink-0",
                isActive ? "text-indigo-400" : "text-muted-foreground group-hover:text-foreground"
              )}
            />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
