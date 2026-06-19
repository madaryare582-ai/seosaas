import {
  FileText,
  ListChecks,
  Network,
  Rocket,
  Search,
  Target,
  type LucideIcon,
} from "lucide-react"

type Step = {
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: Target,
    title: "Choose Your Topic",
    description:
      "Start with a niche, industry, website, or content focus. HiigsiSEO helps you organize your content around the topics that matter most.",
  },
  {
    icon: Search,
    title: "Discover Opportunities",
    description:
      "Explore content opportunities and uncover valuable topics your audience is actively searching for.",
  },
  {
    icon: ListChecks,
    title: "Organize Your Content",
    description:
      "Transform ideas into structured content plans designed to support long-term publishing consistency.",
  },
  {
    icon: FileText,
    title: "Create Content Faster",
    description:
      "Generate content drafts and outlines that help streamline your content creation workflow.",
  },
  {
    icon: Network,
    title: "Build Topic Coverage",
    description:
      "Expand your content library with connected articles that strengthen your overall content strategy.",
  },
  {
    icon: Rocket,
    title: "Publish And Grow",
    description:
      "Maintain a consistent publishing workflow and continue building your online presence over time.",
  },
]

export function StepProcess() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold tracking-wide text-indigo-400 uppercase">
          Step By Step
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Your Content Workflow, Simplified
        </h2>
      </div>

      <div className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="group relative flex min-h-[20rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-400/30 hover:bg-white/8 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_25px_50px_-12px_rgba(49,46,129,0.5)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-gradient-to-br from-indigo-500/0 to-purple-600/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:from-indigo-500/20 group-hover:to-purple-600/20 group-hover:opacity-100"
            />

            <span className="relative flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-950/40 ring-1 ring-white/15 transition-transform duration-500 group-hover:scale-110">
              <step.icon className="size-6 text-white" />
            </span>

            <span className="relative mt-6 font-mono text-xs font-semibold tracking-widest text-indigo-300">
              STEP 0{index + 1}
            </span>
            <h3 className="relative mt-2 text-lg font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="relative mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
