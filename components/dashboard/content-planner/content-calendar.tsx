import { cn } from "@/lib/utils"

const contentTypes = ["Blog Post", "Listicle", "Guide", "Comparison", "Case Study"]

const statusStyles = {
  published: "bg-emerald-400/10 text-emerald-400 ring-emerald-400/20",
  "in-progress": "bg-amber-400/10 text-amber-400 ring-amber-400/20",
  planned: "bg-indigo-400/10 text-indigo-300 ring-indigo-400/20",
} as const

const titles = [
  "Why AI SEO Tools Are Changing Content Strategy",
  "The Ultimate Guide to Topical Authority",
  "10 Keyword Clustering Techniques That Work",
  "How to Write SEO Articles That Rank in 2026",
  "Search Intent 101: A Practical Framework",
  "Internal Linking Strategies for Higher Rankings",
  "AI Content Generation vs Human Writers",
  "Building a 90-Day SEO Content Calendar",
  "Entity SEO: What It Is and Why It Matters",
  "Content Gap Analysis for Competitive Niches",
]

const days = Array.from({ length: 30 }, (_, index) => {
  const statusPool: Array<keyof typeof statusStyles> = [
    "published",
    "published",
    "in-progress",
    "planned",
    "planned",
  ]
  return {
    day: index + 1,
    title: titles[index % titles.length],
    type: contentTypes[index % contentTypes.length],
    status: statusPool[index % statusPool.length],
  }
})

export function ContentCalendar() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">30-Day Content Calendar</p>
          <p className="text-xs text-muted-foreground">Auto-scheduled topics across your plan</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-400" /> Published
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-amber-400" /> In Progress
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-indigo-400" /> Planned
          </span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6">
        {days.map((item) => (
          <div
            key={item.day}
            className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-indigo-400/30 hover:bg-white/8"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">Day {item.day}</span>
              <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-medium ring-1", statusStyles[item.status])}>
                {item.status === "in-progress" ? "In Progress" : item.status === "published" ? "Published" : "Planned"}
              </span>
            </div>
            <p className="line-clamp-2 text-xs font-medium text-foreground">{item.title}</p>
            <span className="text-[11px] text-muted-foreground">{item.type}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
