"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Sparkles, X } from "lucide-react"

import { AnnouncementBanners } from "@/components/banners/banner-stack"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <AnnouncementBanners scope="public" />
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-backdrop-filter:bg-background/40">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
            <Sparkles className="size-4 text-white" />
          </span>
          <span className="font-heading text-lg font-semibold tracking-tight text-foreground">
            HiigsiSEO
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button
            asChild
            className="border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-400 hover:to-purple-500 hover:shadow-indigo-500/30"
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setIsOpen((open) => !open)}
          className="flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-white/10 md:hidden"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/10 bg-background/95 backdrop-blur-xl transition-[max-height] duration-300 md:hidden",
          isOpen ? "max-h-96" : "max-h-0 border-t-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-2 text-[15px] font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2">
            <Button variant="outline" asChild>
              <Link href="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </Button>
            <Button
              asChild
              className="border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
            >
              <Link href="/signup" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        </nav>
      </div>
      </header>
    </>
  )
}
