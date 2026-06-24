export type NicheScores = {
  demand: number
  competition: number
  monetization: number
  trend: number
}

export type KeywordOpportunity = {
  keyword: string
  volume: number
}

export type SerpRow = {
  keyword: string
  kd: number
  affiliateScore: number
  adsenseScore: number
  opportunityScore: number
}

export type TopicNode = {
  label: string
  relevance: number
  x: number
  y: number
}

export type TopicalMap = {
  center: string
  nodes: TopicNode[]
}

export type CalendarItem = {
  id: string
  title: string
  type: string
}

export type CalendarWeek = {
  week: number
  items: CalendarItem[]
}

const CONTENT_TYPES = ["Blog Post", "Listicle", "Guide", "Comparison", "Case Study"]

function hashString(value: string) {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function toTitleCase(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return "Your Niche"
  return trimmed
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function generateNicheScores(niche: string): NicheScores {
  const seed = hashString(niche || "niche")
  return {
    demand: 55 + (seed % 40),
    competition: 30 + ((seed >> 3) % 50),
    monetization: 50 + ((seed >> 5) % 45),
    trend: 40 + ((seed >> 7) % 55),
  }
}

const KEYWORD_PATTERNS = [
  "best {niche}",
  "{niche} for beginners",
  "{niche} guide",
  "how to start {niche}",
  "{niche} tips",
  "{niche} mistakes to avoid",
  "{niche} checklist",
  "{niche} tools",
  "{niche} cost",
  "{niche} reviews",
  "{niche} vs alternatives",
  "{niche} success stories",
  "{niche} statistics",
  "{niche} trends 2026",
  "free {niche} resources",
]

const KEYWORD_MODIFIERS = [
  "",
  "best",
  "top",
  "ultimate",
  "complete",
  "easy",
  "free",
  "advanced",
  "simple",
  "2026",
  "quick",
  "proven",
]

const TOTAL_KEYWORDS = 178

export function generateKeywords(niche: string): KeywordOpportunity[] {
  const lowerNiche = niche.trim().toLowerCase() || "your niche"
  const seed = hashString(lowerNiche)
  const out: KeywordOpportunity[] = []
  const seen = new Set<string>()

  for (const modifier of KEYWORD_MODIFIERS) {
    for (const pattern of KEYWORD_PATTERNS) {
      if (out.length >= TOTAL_KEYWORDS) break
      const base = pattern.replace("{niche}", lowerNiche)
      const phrase = modifier ? `${modifier} ${base}` : base
      if (seen.has(phrase)) continue
      seen.add(phrase)
      const volumeSeed = hashString(`${phrase}-${seed}`)
      out.push({ keyword: phrase, volume: 200 + (volumeSeed % 5800) })
    }
    if (out.length >= TOTAL_KEYWORDS) break
  }

  return out.slice(0, TOTAL_KEYWORDS)
}

export function generateSerpRows(keywords: KeywordOpportunity[], niche: string): SerpRow[] {
  const top = [...keywords].sort((a, b) => b.volume - a.volume).slice(0, 8)
  return top.map((entry) => {
    const seed = hashString(`${entry.keyword}-${niche}-serp`)
    const kd = 15 + (seed % 65)
    const affiliateScore = 55 + ((seed >> 2) % 45)
    const adsenseScore = 45 + ((seed >> 4) % 50)
    const opportunityScore = Math.round((affiliateScore + adsenseScore + (100 - kd)) / 3)
    return {
      keyword: entry.keyword,
      kd,
      affiliateScore,
      adsenseScore,
      opportunityScore,
    }
  })
}

const CLUSTER_LABELS = [
  "Getting Started",
  "Strategies & Tactics",
  "Tools & Resources",
  "Common Mistakes",
  "Success Stories",
]

const CLUSTER_POSITIONS = [
  { x: 50, y: 10 },
  { x: 85, y: 38 },
  { x: 70, y: 84 },
  { x: 30, y: 84 },
  { x: 15, y: 38 },
]

export function buildTopicalMap(niche: string): TopicalMap {
  const seed = hashString(niche || "niche")
  return {
    center: toTitleCase(niche),
    nodes: CLUSTER_LABELS.map((label, index) => ({
      label,
      relevance: 70 + ((seed >> index) % 28),
      x: CLUSTER_POSITIONS[index].x,
      y: CLUSTER_POSITIONS[index].y,
    })),
  }
}

const CALENDAR_TITLE_TEMPLATES = [
  "The Ultimate {niche} Guide for Beginners",
  "10 {niche} Mistakes to Avoid",
  "Best {niche} Tools Compared",
  "How to Get Started with {niche}",
  "{niche} Checklist: Step by Step",
  "Common {niche} Myths Debunked",
  "{niche} on a Budget: What Works",
  "Advanced {niche} Strategies for 2026",
  "{niche} Case Study: Real Results",
  "{niche} vs Alternatives: Which Is Better?",
  "Is {niche} Worth It? An Honest Review",
  "{niche} Success Stories You Should Know",
  "The Psychology Behind {niche}",
  "{niche} Trends to Watch in 2026",
  "{niche} FAQ: Everything You Need to Know",
  "How Long Does {niche} Really Take?",
  "{niche} for Busy People: A Quick-Start Plan",
  "Top {niche} Resources and Tools",
  "{niche} Pitfalls That Cost You Time and Money",
  "A Data-Driven Look at {niche}",
  "{niche} Tips From Industry Experts",
  "{niche} Glossary: Key Terms Explained",
  "Building a Long-Term {niche} Plan",
  "{niche} Automation: What to Delegate",
  "{niche} Metrics That Actually Matter",
  "{niche} Comparison: Free vs Paid Options",
  "{niche} Roadmap for the Next 90 Days",
  "{niche} Red Flags to Watch Out For",
  "{niche} Community Insights and Lessons",
  "Recap: Everything We Covered on {niche}",
]

export function buildCalendarWeeks(niche: string): CalendarWeek[] {
  const label = toTitleCase(niche)
  const items: CalendarItem[] = CALENDAR_TITLE_TEMPLATES.map((template, index) => ({
    id: `${index}`,
    title: template.replace("{niche}", label),
    type: CONTENT_TYPES[index % CONTENT_TYPES.length],
  }))

  const weeks: CalendarWeek[] = []
  for (let i = 0; i < items.length; i += 7) {
    weeks.push({ week: weeks.length + 1, items: items.slice(i, i + 7) })
  }
  return weeks
}
