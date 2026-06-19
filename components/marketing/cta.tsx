import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"

type CTAProps = {
  headline?: string
  description?: string
  trustSignals?: string[]
}

export function CTA({
  headline = "Built For Bloggers, Niche Site Owners, And SEO Teams",
  description = "Discover keywords, build content clusters, and generate SEO-optimized articles from a single workflow.",
  trustSignals = [
    "Discover Keywords",
    "Build Content Clusters",
    "Generate SEO Articles",
  ],
}: CTAProps = {}) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="animate-gradient-pan relative isolate overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 px-6 py-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2),0_30px_70px_-20px_rgba(99,21,255,0.4)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -right-20 size-72 animate-pulse rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 size-72 animate-pulse rounded-full bg-white/10 blur-3xl [animation-delay:1s]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_white_0%,_transparent_60%)] opacity-[0.08]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/15"
        />

        <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
              {headline}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/90 sm:text-lg">
              {description}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              {trustSignals.map((signal) => (
                <div
                  key={signal}
                  className="flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2.5 text-sm font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)] backdrop-blur-sm"
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-white/25">
                    <Check className="size-3 text-white" />
                  </span>
                  {signal}
                </div>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center">
            <Button
              size="lg"
              asChild
              className="group/cta h-16 border-0 bg-white px-12 text-lg font-semibold text-indigo-700 shadow-[0_8px_40px_-8px_rgba(255,255,255,0.7)] transition-all duration-300 hover:scale-105 hover:bg-white/95 hover:shadow-[0_16px_60px_-8px_rgba(255,255,255,0.9)]"
            >
              <Link href="/signup" className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="size-5 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
