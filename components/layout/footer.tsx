import Link from "next/link"
import { Sparkles } from "lucide-react"

import { Separator } from "@/components/ui/separator"

const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Features", href: "/#features" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 size-[500px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between lg:gap-8">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-950/40">
                <Sparkles className="size-4 text-white" />
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                HiigsiSEO
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              AI-powered keyword research, content planning, and article
              generation for SEO teams that want to scale without the
              overhead.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {column.title}
                </h3>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="inline-block text-sm text-foreground/70 transition-all duration-200 hover:translate-x-0.5 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-14 bg-white/10" />

        <p className="text-center text-sm text-muted-foreground">
          © 2026 HiigsiSEO. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
