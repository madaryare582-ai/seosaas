import { Badge } from "@/components/ui/badge"

const outline = [
  {
    heading: "Introduction: Why Topical Authority Matters in 2026",
    children: [],
  },
  {
    heading: "What Is Topical Authority?",
    children: ["Topical Authority vs Domain Authority", "How Search Engines Measure Topic Expertise"],
  },
  {
    heading: "Building a Topic Cluster Strategy",
    children: ["Choosing Pillar Topics", "Mapping Subtopics and Entities", "Internal Linking Between Clusters"],
  },
  {
    heading: "Tools to Automate Topical Authority",
    children: ["AI Content Planners", "Entity Mapping Software"],
  },
  {
    heading: "Measuring Results",
    children: ["Tracking Organic Visibility Growth", "Topical Coverage Score"],
  },
  {
    heading: "Conclusion",
    children: [],
  },
]

export function OutlinePanel() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">Outline Generator</p>
        <Badge variant="outline" className="border-white/10 text-muted-foreground">
          {outline.length} sections
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground">AI-suggested structure based on top-ranking content</p>

      <ol className="mt-4 flex flex-col gap-3">
        {outline.map((section, index) => (
          <li key={section.heading}>
            <div className="flex items-start gap-2.5">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-[10px] font-semibold text-white">
                {index + 1}
              </span>
              <span className="text-sm font-medium text-foreground">{section.heading}</span>
            </div>
            {section.children.length > 0 && (
              <ul className="mt-1.5 ml-7 flex flex-col gap-1 border-l border-white/10 pl-3">
                {section.children.map((child) => (
                  <li key={child} className="text-xs text-muted-foreground">
                    {child}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}
