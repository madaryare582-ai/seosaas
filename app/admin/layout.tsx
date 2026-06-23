"use client"

import * as React from "react"

import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminTopbar } from "@/components/admin/topbar"
import { cn } from "@/lib/utils"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = React.useState(false)

  return (
    <div className={cn("min-h-screen bg-background font-sans text-foreground", isDark && "dark")}>
      <AdminSidebar />

      <div className="flex min-h-screen flex-col lg:pl-64">
        <AdminTopbar isDark={isDark} onToggleDark={() => setIsDark((value) => !value)} />
        <main className="flex-1 bg-muted/30 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
