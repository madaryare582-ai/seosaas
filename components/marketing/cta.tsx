import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"

const trustSignals = [
  "No Credit Card Required",
  "Setup in Under 2 Minutes",
  "Cancel Anytime",
]

export function CTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="animate-gradient-pan relative isolate overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 px-6 py-16 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_30px_80px_-20px_rgba(99,21,255,0.5)] sm:px-12 sm:py-20 lg:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 size-80 animate-pulse rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 size-80 animate-pulse rounded-full bg-white/10 blur-3xl [animation-delay:1s]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_white_0%,_transparent_60%)] opacity-[0.08]"
        />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Start Growing Your Organic Traffic Today
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/85">
            Generate SEO content faster and scale your rankings with AI.
          </p>

          <div className="mt-10 flex justify-center">
            <Button
              size="lg"
              asChild
              className="group/cta h-16 border-0 bg-white px-12 text-lg font-semibold text-indigo-700 shadow-[0_8px_40px_-8px_rgba(255,255,255,0.6)] transition-all duration-300 hover:scale-105 hover:bg-white/95 hover:shadow-[0_12px_50px_-8px_rgba(255,255,255,0.8)]"
            >
              <Link href="/signup" className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="size-5 transition-transform duration-300 group-hover/cta:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {trustSignals.map((signal) => (
              <div
                key={signal}
                className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)] backdrop-blur-sm"
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-white/20">
                  <Check className="size-3 text-white" />
                </span>
                {signal}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
