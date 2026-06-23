import Link from "next/link"
import {
  ArrowRight,
  FileText,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  SquareCheckBig,
  type LucideIcon,
} from "lucide-react"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Search,
    title: "Keyword Research",
    description: "Find keywords competitors miss.",
  },
  {
    icon: SquareCheckBig,
    title: "Content Planner",
    description: "Plan content clusters in minutes.",
  },
  {
    icon: Network,
    title: "Topical Authority Builder",
    description: "Build topical authority that ranks.",
  },
  {
    icon: FileText,
    title: "AI Article Generator",
    description: "Generate ready-to-rank articles fast.",
  },
  {
    icon: ShieldCheck,
    title: "EEAT Optimization",
    description: "Boost trust and expertise signals.",
  },
  {
    icon: Sparkles,
    title: "Semantic SEO",
    description: "Optimize for context, not just keywords.",
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold tracking-wide text-indigo-400 uppercase">
          Platform
        </span>
        <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Everything You Need To Scale SEO Content
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          A complete toolkit that takes you from a single niche to a fully
          ranked content library.
        </p>
      </div>

      <div className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="group relative flex min-h-[20rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-400/30 hover:bg-white/8 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_25px_50px_-12px_rgba(49,46,129,0.5)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-gradient-to-br from-indigo-500/0 to-purple-600/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:from-indigo-500/20 group-hover:to-purple-600/20 group-hover:opacity-100"
            />

            <span className="relative flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-950/40 ring-1 ring-white/15 transition-transform duration-500 group-hover:scale-110">
              <feature.icon className="size-6 text-white" />
            </span>

            <h3 className="font-heading relative mt-6 text-lg font-semibold text-foreground">
              {feature.title}
            </h3>

            <p className="relative mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">
              {feature.description}
            </p>

            <Link
              href="#"
              className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-300 transition-all duration-200 hover:gap-2.5 hover:text-indigo-200"
            >
              Learn More
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}
