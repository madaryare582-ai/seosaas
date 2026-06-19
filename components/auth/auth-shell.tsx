import type { ReactNode } from "react"
import Link from "next/link"
import { Sparkles } from "lucide-react"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

type AuthShellProps = {
  eyebrow: string
  headline: ReactNode
  description: string
  children: ReactNode
  footer?: ReactNode
  chrome?: "minimal" | "full"
}

export function AuthShell({
  eyebrow,
  headline,
  description,
  children,
  footer,
  chrome = "minimal",
}: AuthShellProps) {
  return (
    <div className="dark relative flex min-h-screen flex-col overflow-x-hidden bg-background font-sans text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 size-96 animate-pulse rounded-full bg-indigo-600/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -right-32 size-96 animate-pulse rounded-full bg-purple-600/30 blur-3xl [animation-delay:1s]"
      />

      {chrome === "full" ? (
        <Navbar />
      ) : (
        <header className="relative z-10 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
              <Sparkles className="size-4 text-white" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              HiigsiSEO
            </span>
          </Link>
        </header>
      )}

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center">
            <span className="text-sm font-semibold tracking-wide text-indigo-400 uppercase">
              {eyebrow}
            </span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {headline}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_40px_100px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150 sm:p-8">
            {children}
          </div>

          {footer && <div className="mt-6 text-center">{footer}</div>}
        </div>
      </main>

      {chrome === "full" ? (
        <Footer />
      ) : (
        <footer className="relative z-10 px-4 py-6 text-center text-xs text-muted-foreground">
          © 2026 HiigsiSEO. All rights reserved.
        </footer>
      )}
    </div>
  )
}
