import { AlertTriangle, CheckCircle2 } from "lucide-react"

const checklist = [
  { label: "Title tag optimized (58 characters)", passed: true },
  { label: "Meta description within 155 characters", passed: true },
  { label: "Primary keyword in first 100 words", passed: true },
  { label: "Keyword density at 1.8%", passed: true },
  { label: "Header structure (H1 → H2 → H3)", passed: true },
  { label: "Image alt text missing on 2 images", passed: false },
  { label: "Internal links: 4 added", passed: true },
  { label: "Readability: Grade 8 (target Grade 7-9)", passed: true },
]

const score = 94

export function SeoScore() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <p className="text-sm font-medium text-foreground">SEO Optimization</p>
      <p className="text-xs text-muted-foreground">On-page checklist for your generated article</p>

      <div className="mt-5 flex items-center gap-5">
        <div
          className="relative flex size-24 shrink-0 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(rgb(129 140 248) 0%, rgb(217 70 239) ${score}%, rgb(255 255 255 / 0.08) ${score}%)`,
          }}
        >
          <div className="flex size-[78px] flex-col items-center justify-center rounded-full bg-background">
            <span className="text-xl font-semibold text-foreground">{score}</span>
            <span className="text-[10px] text-muted-foreground">/ 100</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-emerald-400">Excellent SEO Score</p>
          <p className="mt-1 text-xs text-muted-foreground">
            This article is well-optimized and ready to publish, with one minor fix recommended.
          </p>
        </div>
      </div>

      <ul className="mt-5 flex flex-col gap-2.5">
        {checklist.map((item) => (
          <li key={item.label} className="flex items-start gap-2 text-sm">
            {item.passed ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-400" />
            )}
            <span className={item.passed ? "text-foreground" : "text-amber-300"}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
