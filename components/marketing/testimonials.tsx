import { Building2, Globe, Star, Users } from "lucide-react"

type Testimonial = {
  name: string
  role: string
  quote: string
  initials: string
  gradient: string
}

const trustBadges = [
  { icon: Users, label: "Trusted by 500+ content creators" },
  { icon: Building2, label: "Trusted by SEO agencies" },
  { icon: Globe, label: "Trusted by niche site builders" },
]

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Content Lead, Bright Path Media",
    quote:
      "We went from publishing 4 articles a month to over 40 — without hiring a single extra writer. The keyword research alone paid for the subscription.",
    initials: "SC",
    gradient: "from-indigo-500 to-purple-600",
  },
  {
    name: "Marcus Webb",
    role: "Founder, NicheSite Co.",
    quote:
      "I run six niche sites and this is the only tool that actually keeps topical authority in mind. My organic traffic doubled in under three months.",
    initials: "MW",
    gradient: "from-purple-500 to-fuchsia-600",
  },
  {
    name: "Elena Rodriguez",
    role: "SEO Agency Owner",
    quote:
      "Our clients expect E-E-A-T-grade content at scale. This is the first AI writer that consistently passes our editorial review with minimal edits.",
    initials: "ER",
    gradient: "from-indigo-500 to-sky-500",
  },
]

export function Testimonials() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 size-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold tracking-wide text-indigo-400 uppercase">
          Social Proof
        </span>
        <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Loved By Creators And Agencies Alike
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Join hundreds of teams already publishing ranked content on
          autopilot.
        </p>
      </div>

      <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {trustBadges.map((badge) => (
          <div
            key={badge.label}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-xl"
          >
            <badge.icon className="size-4 text-indigo-400" />
            {badge.label}
          </div>
        ))}
      </div>

      <div className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-400/30 hover:bg-white/8 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_25px_50px_-12px_rgba(49,46,129,0.5)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-gradient-to-br from-indigo-500/0 to-purple-600/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:from-indigo-500/20 group-hover:to-purple-600/20 group-hover:opacity-100"
            />

            <div className="relative flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="size-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>

            <p className="relative mt-5 flex-1 text-[15px] leading-relaxed text-foreground/90">
              &ldquo;{testimonial.quote}&rdquo;
            </p>

            <div className="relative mt-6 flex items-center gap-3">
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.gradient} text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 ring-1 ring-white/15`}
              >
                {testimonial.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
