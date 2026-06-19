import Link from "next/link"
import { ArrowRight, Check, Crown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Plan = {
  name: string
  tagline: string
  price: string
  features: string[]
  featured?: boolean
}

const plans: Plan[] = [
  {
    name: "Starter",
    tagline: "For solo creators getting started",
    price: "$5",
    features: [
      "2 Articles Per Day",
      "Up To 2,000 Words Per Article",
      "SEO Optimized Content",
      "Keyword Research Tool",
      "Basic Content Planner",
      "Email Support",
    ],
  },
  {
    name: "Growth",
    tagline: "For teams scaling content output",
    price: "$12",
    features: [
      "5 Articles Per Day",
      "Up To 4,000 Words Per Article",
      "E-E-A-T Optimization",
      "Topical Authority Optimization",
      "Advanced Keyword Research",
      "Content Calendar & Clusters",
      "Priority Support",
    ],
    featured: true,
  },
  {
    name: "Pro",
    tagline: "For agencies and high-volume sites",
    price: "$20",
    features: [
      "10 Articles Per Day",
      "Unlimited Word Count",
      "GEO Optimization",
      "AEO Optimization",
      "Full Topical Authority Suite",
      "API Access",
      "Dedicated Support",
    ],
  },
]

export function PricingPreview() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold tracking-wide text-indigo-400 uppercase">
          Pricing
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Start free, upgrade as you scale. No hidden fees, cancel anytime.
        </p>
      </div>

      <div className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "group relative flex flex-col overflow-hidden border bg-white/5 [--card-spacing:--spacing(8)] ring-0 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500",
              plan.featured
                ? "z-10 border-2 border-indigo-400/50 bg-gradient-to-b from-indigo-500/15 via-purple-600/10 to-transparent shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_25px_60px_-15px_rgba(99,102,241,0.5)] sm:-translate-y-4 sm:scale-105 lg:scale-110 hover:-translate-y-5 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_30px_70px_-15px_rgba(99,102,241,0.7)]"
                : "border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:-translate-y-2 hover:border-white/20 hover:bg-white/8 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_20px_40px_-15px_rgba(0,0,0,0.5)]"
            )}
          >
            {plan.featured && (
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 left-1/2 size-56 -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-600/30 blur-3xl"
              />
            )}

            {plan.featured && (
              <Badge className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1 border-0 bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 text-white shadow-lg shadow-indigo-950/50">
                <Crown className="size-3" />
                Most Popular
              </Badge>
            )}

            <CardHeader className="relative gap-0">
              <CardTitle
                className={cn(
                  "font-semibold text-foreground",
                  plan.featured ? "text-xl" : "text-lg"
                )}
              >
                {plan.name}
              </CardTitle>
              <CardDescription className="mt-1 text-sm text-muted-foreground">
                {plan.tagline}
              </CardDescription>
              <div className="mt-6 flex items-baseline gap-1">
                <span
                  className={cn(
                    "font-semibold tracking-tight text-foreground",
                    plan.featured ? "text-6xl" : "text-5xl"
                  )}
                >
                  {plan.price}
                </span>
                <span className="text-base text-muted-foreground">
                  /month
                </span>
              </div>
            </CardHeader>

            <CardContent className="relative flex flex-1 flex-col">
              <ul className="flex flex-1 flex-col gap-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={cn(
                      "flex items-start gap-2.5 text-[15px] leading-snug",
                      plan.featured
                        ? "text-foreground/90"
                        : "text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                        plan.featured ? "bg-emerald-400/20" : "bg-white/10"
                      )}
                    >
                      <Check className="size-3 text-emerald-400" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                asChild
                className={cn(
                  "group/btn mt-8 h-12 w-full text-base",
                  plan.featured
                    ? "h-14 border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-base font-semibold text-white shadow-lg shadow-indigo-500/40 hover:from-indigo-400 hover:to-purple-500 hover:shadow-indigo-500/60"
                    : "border border-white/15 bg-white/5 text-foreground hover:bg-white/10"
                )}
              >
                <Link href="/signup" className="flex items-center justify-center gap-2">
                  Get Started
                  {plan.featured && (
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  )}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative mt-12 flex justify-center">
        <Button
          size="lg"
          variant="outline"
          asChild
          className="h-12 border-white/15 bg-white/5 px-8 text-base text-foreground hover:bg-white/10"
        >
          <Link href="/pricing">View Full Pricing</Link>
        </Button>
      </div>
    </section>
  )
}
