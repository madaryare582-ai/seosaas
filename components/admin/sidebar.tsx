"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut, Sparkles } from "lucide-react"

import { adminNavItems } from "@/components/admin/nav-config"
import { cn } from "@/lib/utils"

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-2">
      {adminNavItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/admin" && pathname?.startsWith(`${item.href}/`))

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-gradient-to-r from-indigo-500/20 via-violet-500/15 to-blue-500/10 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            )}
          >
            <item.icon className={cn("size-4.5 shrink-0", isActive && "text-violet-300")} />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export function AdminSidebar() {
  return (
    <aside className="dark fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-[#0b0b14] lg:flex">
      <Link href="/admin" className="flex items-center gap-2 px-5 py-6">
        <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500">
          <Sparkles className="size-4 text-white" />
        </span>
        <span className="text-lg font-semibold tracking-tight text-white">
          HiigsiSEO <span className="text-slate-500">Admin</span>
        </span>
      </Link>

      <NavLinks />

      <div className="m-3 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 text-sm font-semibold text-white">
          JD
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-white">Jordan Diaz</span>
          <span className="truncate text-xs text-slate-500">Owner</span>
        </div>
        <Link
          href="/login"
          aria-label="Log out"
          className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut className="size-4" />
        </Link>
      </div>
    </aside>
  )
}

export function AdminMobileNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="dark flex h-full flex-col bg-[#0b0b14]">
      <Link href="/admin" onClick={onNavigate} className="flex items-center gap-2 px-5 py-6">
        <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500">
          <Sparkles className="size-4 text-white" />
        </span>
        <span className="text-lg font-semibold tracking-tight text-white">
          HiigsiSEO <span className="text-slate-500">Admin</span>
        </span>
      </Link>
      <NavLinks onNavigate={onNavigate} />
    </div>
  )
}
