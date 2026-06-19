import { Globe, PenLine, Users, type LucideIcon } from "lucide-react"

type Audience = {
  icon: LucideIcon
  title: string
  description: string
}

const audiences: Audience[] = [
  {
    icon: PenLine,
    title: "Bloggers",
    description: "Create content more consistently.",
  },
  {
    icon: Globe,
    title: "Niche Site Owners",
    description: "Organize and scale content production.",
  },
  {
    icon: Users,
    title: "SEO Teams",
    description: "Manage content workflows more efficiently.",
  },
]

export function Audience() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold tracking-wide text-indigo-400 uppercase">
          Built For
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Built For Modern Content Teams
        </h2>
      </div>

      <div className="relative mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {audiences.map((audience) => (
          <div
            key={audience.title}
            className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-400/30 hover:bg-white/8 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_25px_50px_-12px_rgba(49,46,129,0.5)]"
          >
            <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-950/40 ring-1 ring-white/15 transition-transform duration-500 group-hover:scale-110">
              <audience.icon className="size-7 text-white" />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-foreground">
              {audience.title}
            </h3>
            <p className="mt-2 text-base text-muted-foreground">
              {audience.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
