import { CheckCircle2, CircleDashed } from "lucide-react"

import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const pillars = [
  {
    name: "AI SEO Tools",
    coverage: 82,
    subtopics: [
      { title: "Best AI SEO Software in 2026", covered: true },
      { title: "AI vs Traditional SEO Tools", covered: true },
      { title: "How AI Content Tools Score on E-E-A-T", covered: true },
      { title: "AI SEO Tool Pricing Comparison", covered: false },
    ],
  },
  {
    name: "Topical Authority",
    coverage: 64,
    subtopics: [
      { title: "What Is Topical Authority?", covered: true },
      { title: "Building Topic Clusters Step-by-Step", covered: true },
      { title: "Topical Maps vs Content Silos", covered: false },
      { title: "Measuring Topical Authority Growth", covered: false },
    ],
  },
  {
    name: "Content Planning",
    coverage: 91,
    subtopics: [
      { title: "30-Day Content Calendar Template", covered: true },
      { title: "Editorial Workflow for Content Teams", covered: true },
      { title: "Repurposing Content Across Channels", covered: true },
      { title: "Seasonal Content Planning Guide", covered: true },
    ],
  },
]

export function TopicClusters() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {pillars.map((pillar) => (
        <div
          key={pillar.name}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">{pillar.name}</p>
            <span className="text-xs font-medium text-indigo-400">{pillar.coverage}%</span>
          </div>
          <Progress value={pillar.coverage} className="mt-2 h-1.5" />

          <ul className="mt-4 flex flex-col gap-2.5">
            {pillar.subtopics.map((topic) => (
              <li key={topic.title} className="flex items-start gap-2 text-sm">
                {topic.covered ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                ) : (
                  <CircleDashed className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                )}
                <span
                  className={cn(
                    "leading-snug",
                    topic.covered ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {topic.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
