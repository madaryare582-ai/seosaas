import { Briefcase, LifeBuoy, MessageCircle, type LucideIcon } from "lucide-react"

type ContactOption = {
  icon: LucideIcon
  title: string
  description: string
}

const options: ContactOption[] = [
  {
    icon: LifeBuoy,
    title: "Support",
    description: "Get help with your account and platform usage.",
  },
  {
    icon: MessageCircle,
    title: "General Questions",
    description: "Ask questions about HiigsiSEO and our services.",
  },
  {
    icon: Briefcase,
    title: "Sales & Partnerships",
    description:
      "Contact us regarding partnerships, collaborations, or business inquiries.",
  },
]

export function ContactOptions() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl"
      />

      <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3">
        {options.map((option) => (
          <div
            key={option.title}
            className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-400/30 hover:bg-white/8 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_25px_50px_-12px_rgba(49,46,129,0.5)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -top-10 -right-10 size-40 rounded-full bg-gradient-to-br from-indigo-500/0 to-purple-600/0 opacity-0 blur-2xl transition-opacity duration-500 group-hover:from-indigo-500/20 group-hover:to-purple-600/20 group-hover:opacity-100"
            />
            <span className="relative flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-950/40 ring-1 ring-white/15 transition-transform duration-500 group-hover:scale-110">
              <option.icon className="size-7 text-white" />
            </span>
            <h3 className="relative mt-5 text-lg font-semibold text-foreground">
              {option.title}
            </h3>
            <p className="relative mt-2 text-base leading-relaxed text-muted-foreground">
              {option.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
