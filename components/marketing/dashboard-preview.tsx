import {
  Check,
  FileText,
  Gauge,
  ListChecks,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

const calloutFeatures = [
  "Keyword Research",
  "Content Planner",
  "Topical Authority Builder",
  "AI Article Generator",
  "EEAT Optimization",
]

const navItems: { icon: LucideIcon; label: string; active?: boolean }[] = [
  { icon: Gauge, label: "Dashboard" },
  { icon: Search, label: "Keyword Research", active: true },
  { icon: ListChecks, label: "Content Planner" },
  { icon: Network, label: "Topical Authority" },
  { icon: FileText, label: "Article Generator" },
]

const metrics: {
  icon: LucideIcon
  label: string
  value: string
  accent: string
}[] = [
  { icon: Search, label: "Keywords Found", value: "1,204", accent: "text-indigo-400" },
  { icon: ListChecks, label: "Articles Planned", value: "12", accent: "text-purple-400" },
  { icon: FileText, label: "Articles Generated", value: "312", accent: "text-indigo-400" },
  { icon: Gauge, label: "SEO Score", value: "94/100", accent: "text-emerald-400" },
]

const trafficBars = [30, 45, 38, 58, 50, 72, 64, 88, 78, 95]

type DashboardPreviewProps = {
  eyebrow?: string
  heading?: string
  description?: string
}

export function DashboardPreview({
  eyebrow = "Product Showcase",
  heading = "See HiigsiSEO In Action",
  description = "Explore the tools that help you discover keywords, build content plans, and generate SEO articles.",
}: DashboardPreviewProps = {}) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 size-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold tracking-wide text-indigo-400 uppercase">
          {eyebrow}
        </span>
        <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {heading}
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {calloutFeatures.map((label) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-xl"
          >
            <span className="flex size-4 items-center justify-center rounded-full bg-emerald-400/20">
              <Check className="size-2.5 text-emerald-400" />
            </span>
            {label}
          </div>
        ))}
      </div>

      <div className="relative mx-auto mt-16 max-w-5xl">
        {/* Floating metric card — top left */}
        <div className="absolute -top-8 -left-6 z-20 hidden -rotate-3 lg:block">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl bg-emerald-500/20 blur-2xl"
          />
          <div className="relative flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_20px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-950/40">
              <TrendingUp className="size-4.5 text-white" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">+128%</p>
              <p className="text-xs text-muted-foreground">Organic Traffic</p>
            </div>
          </div>
        </div>

        {/* Floating metric card — bottom right */}
        <div className="absolute -right-6 -bottom-8 z-20 hidden rotate-3 lg:block">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl bg-indigo-500/20 blur-2xl"
          />
          <div className="relative flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_20px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-950/40">
              <ShieldCheck className="size-4.5 text-white" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">96/100</p>
              <p className="text-xs text-muted-foreground">EEAT Score</p>
            </div>
          </div>
        </div>

        {/* Browser frame */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_40px_100px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150">
          <div className="flex items-center gap-3 border-b border-white/10 bg-white/5 px-5 py-3.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-red-400/70" />
              <span className="size-2.5 rounded-full bg-amber-400/70" />
              <span className="size-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="mx-auto flex w-full max-w-xs items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="size-3 text-indigo-400" />
              app.hiigsiseo.com/dashboard
            </div>
          </div>

          <div className="grid gap-px lg:grid-cols-[14rem_1fr]">
            <div className="hidden flex-col gap-1 border-r border-white/10 p-4 lg:flex">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-gradient-to-r from-indigo-500/20 to-purple-600/20 text-foreground ring-1 ring-indigo-400/30"
                      : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4 p-5 sm:p-6 lg:p-8">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="group rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-white/8"
                  >
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <metric.icon className={`size-4 ${metric.accent}`} />
                      <span className="text-xs font-medium tracking-wide">{metric.label}</span>
                    </div>
                    <p className="mt-2 text-xl font-bold text-foreground">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="size-4 text-emerald-400" />
                  <span className="text-xs font-medium tracking-wide">
                    Organic Traffic Growth
                  </span>
                </div>
                <div className="mt-4 flex h-24 items-end gap-1.5 sm:h-28">
                  {trafficBars.map((height, index) => (
                    <div
                      key={index}
                      style={{ height: `${height}%` }}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-indigo-500/60 to-purple-400"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
