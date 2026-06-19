import { Check } from "lucide-react"

const benefits = [
  "Organized Content Planning",
  "Faster Publishing Workflow",
  "Better Topic Coverage",
  "Consistent Content Production",
  "Easy To Use Interface",
  "Built For Growth",
]

export function Benefits() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold tracking-wide text-indigo-400 uppercase">
          Benefits
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Why Content Teams Choose HiigsiSEO
        </h2>
      </div>

      <div className="relative mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit}
            className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-white/8"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-950/40 ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-110">
              <Check className="size-4.5 text-white" />
            </span>
            <span className="text-base font-medium text-foreground">
              {benefit}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
