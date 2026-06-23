"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Bell,
  FilePlus2,
  Megaphone,
  Menu,
  Moon,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  UserPlus,
  Wallet,
} from "lucide-react"

import { AdminMobileNav } from "@/components/admin/sidebar"
import { adminNavItems } from "@/components/admin/nav-config"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"

function usePageTitle() {
  const pathname = usePathname()
  const match = [...adminNavItems]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => pathname === item.href || pathname?.startsWith(`${item.href}/`))
  return match?.label ?? "Admin"
}

export function AdminTopbar({
  isDark,
  onToggleDark,
}: {
  isDark: boolean
  onToggleDark: () => void
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const title = usePageTitle()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        aria-label="Open navigation"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="size-5" />
      </Button>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 border-white/10 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <AdminMobileNav onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <h1 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search users, payments, tickets..." className="w-56 pl-8 lg:w-72" />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="hidden border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-blue-400 sm:flex"
            >
              <Plus />
              Quick Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/admin/users">
                <UserPlus />
                Add User
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/plans">
                <ShieldCheck />
                Create Plan
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/payments">
                <Wallet />
                Review Payments
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/blog">
                <FilePlus2 />
                New Blog Post
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/announcements">
                <Megaphone />
                New Announcement
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle dark mode"
          onClick={onToggleDark}
        >
          {isDark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="size-4.5" />
              <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-fuchsia-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <span className="text-sm text-foreground">2 payments pending review</span>
              <span className="text-xs text-muted-foreground">Binance Pay and Zaad submissions awaiting approval.</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <span className="text-sm text-foreground">Urgent support ticket</span>
              <span className="text-xs text-muted-foreground">Amina Yusuf — article export failed mid-run.</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <span className="text-sm text-foreground">2 blog drafts ready for review</span>
              <span className="text-xs text-muted-foreground">Internal linking and Semantic SEO drafts pending.</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 rounded-full px-1.5">
              <Avatar size="sm">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
              <Badge variant="outline" className="hidden text-[10px] sm:flex">
                <Sparkles className="size-3" />
                Owner
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">Jordan Diaz</span>
              <span className="text-xs text-muted-foreground">jordan@hiigsiseo.com</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin/settings">Account Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard">Customer Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" asChild>
              <Link href="/login">Log out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
