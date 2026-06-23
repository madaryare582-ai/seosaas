"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, LogOut, Menu, Search, Settings, Sparkles, User } from "lucide-react"

import { navItems } from "@/components/dashboard/nav-config"
import { SidebarNav } from "@/components/dashboard/sidebar-nav"
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
  const match = [...navItems]
    .sort((a, b) => b.href.length - a.href.length)
    .find((item) => pathname === item.href || pathname?.startsWith(`${item.href}/`))
  return match?.label ?? "Dashboard"
}

export function Topbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const title = usePageTitle()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-white/10 bg-background/60 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
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
        <SheetContent side="left" className="w-72 border-white/10 bg-background/95 p-0 backdrop-blur-xl">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Link
            href="/dashboard"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 px-5 py-6"
          >
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
              <Sparkles className="size-4 text-white" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              HiigsiSEO
            </span>
          </Link>
          <SidebarNav onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <h1 className="truncate text-base font-semibold tracking-tight text-foreground sm:text-lg">
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <div className="relative hidden sm:block">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-48 bg-white/5 pl-8 lg:w-64"
          />
        </div>

        <Badge
          variant="outline"
          className="hidden h-8 items-center gap-1.5 rounded-lg border-white/10 bg-white/5 px-3 text-xs font-medium text-foreground sm:flex"
        >
          <Sparkles className="size-3.5 text-fuchsia-400" />
          2,450 credits
        </Badge>

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
              <span className="text-sm text-foreground">Article generated</span>
              <span className="text-xs text-muted-foreground">
                &quot;10 SEO Tips for 2026&quot; is ready to review.
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <span className="text-sm text-foreground">Content plan exported</span>
              <span className="text-xs text-muted-foreground">
                Your 30-day plan was exported as CSV.
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <span className="text-sm text-foreground">Low credits</span>
              <span className="text-xs text-muted-foreground">
                You&apos;ve used 61% of this month&apos;s credits.
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 rounded-full px-1.5">
              <Avatar size="sm">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">Jordan Diaz</span>
              <span className="text-xs text-muted-foreground">jordan@hiigsiseo.com</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <User />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <Settings />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" asChild>
              <Link href="/login">
                <LogOut />
                Log out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
