import { Fragment } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"

const flowSteps = [
  "Choose Topic",
  "Discover Opportunities",
  "Build Content Plan",
  "Create Content",
  "Publish & Grow",
]

export function WorkflowOverview() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          A Simple Workflow Designed For SEO Growth
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          HiigsiSEO helps you move from content ideas to a structured
          publishing workflow without unnecessary complexity.
        </p>
      </div>

      <div className="relative mt-12 flex flex-col items-center gap-4 lg:flex-row lg:items-center lg:justify-between">
        {flowSteps.map((step, index) => (
          <Fragment key={step}>
            <div className="flex min-w-[11rem] items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-white/8 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_20px_40px_-15px_rgba(99,102,241,0.4)]">
              <span className="text-sm font-semibold text-foreground">
                {step}
              </span>
            </div>
            {index < flowSteps.length - 1 && (
              <>
                <ChevronDown
                  aria-hidden
                  className="size-5 shrink-0 text-purple-300/70 lg:hidden"
                />
                <ChevronRight
                  aria-hidden
                  className="hidden size-5 shrink-0 text-purple-300/70 lg:block"
                />
              </>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  )
}
