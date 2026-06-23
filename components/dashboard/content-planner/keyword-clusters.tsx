import { Badge } from "@/components/ui/badge"

const clusters = [
  {
    name: "AI Content Generation",
    primary: "ai content generator",
    volume: "14,800",
    keywords: ["ai writing tool", "ai blog writer", "automated content creation", "ai copywriting software"],
  },
  {
    name: "Topical Authority",
    primary: "topical authority seo",
    volume: "6,200",
    keywords: ["topic clusters", "content silos", "entity seo", "pillar content strategy"],
  },
  {
    name: "Keyword Research",
    primary: "keyword research tool",
    volume: "22,400",
    keywords: ["long tail keywords", "search volume checker", "keyword difficulty", "keyword clustering"],
  },
  {
    name: "Content Planning",
    primary: "content calendar template",
    volume: "9,100",
    keywords: ["editorial calendar", "content strategy plan", "blog content schedule", "content roadmap"],
  },
]

export function KeywordClusters() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {clusters.map((cluster) => (
        <div
          key={cluster.name}
          className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-colors hover:border-indigo-400/30"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">{cluster.name}</p>
            <Badge variant="outline" className="border-white/10 text-muted-foreground">
              {cluster.volume}/mo
            </Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Primary keyword:{" "}
            <span className="font-medium text-indigo-400">{cluster.primary}</span>
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {cluster.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
