import {
  ChevronRight,
  FileText,
  Search,
  SquareCheckBig,
  Target,
  type LucideIcon,
} from "lucide-react"

type Step = {
  number: string
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: "01",
    icon: Target,
    title: "Enter Your Niche",
    description: "Tell us your industry and target audience.",
  },
  {
    number: "02",
    icon: Search,
    title: "Discover Keywords",
    description: "AI finds high-value, low-competition keywords.",
  },
  {
    number: "03",
    icon: SquareCheckBig,
    title: "Build Content Plan",
    description: "Get a structured content calendar and clusters.",
  },
  {
    number: "04",
    icon: FileText,
    title: "Generate Articles",
    description: "Publish SEO-optimized, ready-to-rank content.",
  },
]

const stepGlow = [
  "shadow-indigo-500/25",
  "shadow-indigo-500/35",
  "shadow-purple-500/45",
  "shadow-purple-500/60",
]

const chevronOpacity = ["opacity-40", "opacity-65", "opacity-90"]

export function HowItWorks() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold tracking-wide text-purple-400 uppercase">
          Process
        </span>
        <h2 className="font-heading mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          From Keyword To Published Content
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          A guided, four-step workflow that turns a niche into a fully ranked
          content library.
        </p>
      </div>

      {/* Desktop / tablet timeline */}
      <div className="relative mt-20 hidden lg:block">
        <div
          aria-hidden
          className="absolute top-9 right-[12.5%] left-[12.5%] h-[3px] -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500/50 via-purple-500 to-purple-400 shadow-[0_0_16px_2px_rgba(168,85,247,0.45)]"
        />
        <div
          aria-hidden
          className="absolute top-9 right-[12.5%] left-[12.5%] h-0"
        >
          <span className="animate-flow-x absolute top-0 -translate-x-1/2 -translate-y-1/2 size-3 rounded-full bg-white shadow-[0_0_14px_4px_rgba(216,180,254,0.9)]" />
        </div>

        {[25, 50, 75].map((left, i) => (
          <ChevronRight
            key={left}
            aria-hidden
            className={`absolute top-9 z-10 size-5 -translate-x-1/2 -translate-y-1/2 text-purple-300 ${chevronOpacity[i]}`}
            style={{ left: `${left}%` }}
          />
        ))}

        <div className="grid grid-cols-4 gap-x-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group relative flex flex-col items-center text-center"
            >
              <span className="relative flex size-[4.5rem] items-center justify-center">
                {index === 0 && (
                  <span
                    aria-hidden
                    className="absolute inset-0 animate-ping rounded-full bg-indigo-400/40"
                  />
                )}
                <span
                  className={`relative z-10 flex size-[4.5rem] items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg ring-[6px] ring-background transition-transform duration-500 group-hover:scale-110 ${stepGlow[index]}`}
                >
                  <step.icon className="size-7 text-white" />
                </span>
              </span>
              <span className="mt-4 font-mono text-xs font-semibold tracking-widest text-indigo-300">
                STEP {step.number}
              </span>
              <h3 className="mt-3 font-heading text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 px-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile timeline */}
      <div className="relative mt-16 lg:hidden">
        <div
          aria-hidden
          className="absolute top-2 bottom-2 left-9 w-[3px] rounded-full bg-gradient-to-b from-indigo-500/70 via-purple-500/50 to-purple-400/20 shadow-[0_0_12px_1px_rgba(168,85,247,0.35)]"
        />
        <div aria-hidden className="absolute top-2 bottom-2 left-9 w-0">
          <span className="animate-flow-y absolute left-0 -translate-x-1/2 -translate-y-1/2 size-3 rounded-full bg-white shadow-[0_0_14px_4px_rgba(216,180,254,0.9)]" />
        </div>
        <div className="flex flex-col gap-10">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex gap-6">
              <span className="relative flex size-[4.5rem] shrink-0 items-center justify-center">
                {index === 0 && (
                  <span
                    aria-hidden
                    className="absolute inset-0 animate-ping rounded-full bg-indigo-400/40"
                  />
                )}
                <span
                  className={`relative z-10 flex size-[4.5rem] items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg ring-[6px] ring-background ${stepGlow[index]}`}
                >
                  <step.icon className="size-7 text-white" />
                </span>
              </span>
              <div className="pt-2">
                <span className="font-mono text-xs font-semibold tracking-widest text-indigo-300">
                  STEP {step.number}
                </span>
                <h3 className="mt-1 font-heading text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
