import type { ArticleConfig } from "@/lib/article-ai-content"

export type MetricStatus = "pass" | "warn" | "fail"

export type SeoMetric = {
  key: string
  label: string
  score: number
  status: MetricStatus
  detail: string
}

export type SeoAnalysis = {
  overall: number
  metrics: SeoMetric[]
  suggestions: string[]
  warnings: string[]
}

export type HeadingInfo = { level: number; text: string }

const LENGTH_TARGET: Record<ArticleConfig["articleLength"], number> = {
  short: 800,
  medium: 1500,
  long: 2500,
  pillar: 4000,
}

const INTENT_SIGNALS: Record<ArticleConfig["searchIntent"], string[]> = {
  informational: ["what is", "how to", "guide", "learn", "understand"],
  commercial: ["best", "compare", "vs", "top", "review"],
  transactional: ["buy", "price", "cost", "discount", "get started"],
  navigational: ["login", "official", "website", "sign up"],
}

function statusFor(score: number): MetricStatus {
  if (score >= 80) return "pass"
  if (score >= 50) return "warn"
  return "fail"
}

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value))
}

function countOccurrences(text: string, term: string) {
  if (!term) return 0
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return (text.match(new RegExp(escaped, "gi")) ?? []).length
}

export function analyzeSeo(
  plainText: string,
  html: string,
  headings: HeadingInfo[],
  config: ArticleConfig
): SeoAnalysis {
  const words = plainText.trim().split(/\s+/).filter(Boolean)
  const wordCount = words.length
  const keyword = config.primaryKeyword.trim().toLowerCase()
  const secondaryKeywords = config.secondaryKeywords
    .split(",")
    .map((k) => k.trim().toLowerCase())
    .filter(Boolean)

  const metrics: SeoMetric[] = []

  // 1. Keyword coverage
  const keywordHits = countOccurrences(plainText, keyword)
  const density = wordCount > 0 ? (keywordHits / wordCount) * 100 : 0
  const keywordScore = keyword
    ? clamp(100 - Math.abs(density - 1.2) * 35)
    : 0
  metrics.push({
    key: "keyword-coverage",
    label: "Keyword Coverage",
    score: Math.round(keywordScore),
    status: statusFor(keywordScore),
    detail: keyword
      ? `"${config.primaryKeyword}" appears ${keywordHits} times (${density.toFixed(1)}% density).`
      : "Set a primary keyword to measure coverage.",
  })

  // 2. Heading structure
  const h1Count = headings.filter((h) => h.level === 1).length
  const h2Count = headings.filter((h) => h.level === 2).length
  const headingScore = clamp((h1Count >= 1 ? 35 : 0) + Math.min(50, h2Count * 12) + (h2Count >= 1 ? 15 : 0))
  metrics.push({
    key: "heading-structure",
    label: "Heading Structure",
    score: Math.round(headingScore),
    status: statusFor(headingScore),
    detail: `${h1Count} H1, ${h2Count} H2 heading${h2Count === 1 ? "" : "s"} detected.`,
  })

  // 3. Content length
  const target = LENGTH_TARGET[config.articleLength]
  const lengthRatio = target > 0 ? wordCount / target : 0
  const lengthScore = clamp(100 - Math.abs(1 - lengthRatio) * 100)
  metrics.push({
    key: "content-length",
    label: "Content Length",
    score: Math.round(lengthScore),
    status: statusFor(lengthScore),
    detail: `${wordCount.toLocaleString()} words vs. a ${target.toLocaleString()}-word target for "${config.articleLength}" length.`,
  })

  // 4. Readability
  const sentences = plainText.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean)
  const avgWordsPerSentence = sentences.length > 0 ? wordCount / sentences.length : 0
  const readabilityScore = clamp(100 - Math.abs(avgWordsPerSentence - 16) * 4)
  metrics.push({
    key: "readability",
    label: "Readability",
    score: Math.round(readabilityScore),
    status: statusFor(readabilityScore),
    detail: `Average ${avgWordsPerSentence.toFixed(1)} words per sentence across ${sentences.length} sentences.`,
  })

  // 5. Semantic coverage
  const coveredSecondary = secondaryKeywords.filter((k) => countOccurrences(plainText, k) > 0)
  const semanticScore = secondaryKeywords.length > 0
    ? clamp((coveredSecondary.length / secondaryKeywords.length) * 100)
    : 0
  metrics.push({
    key: "semantic-coverage",
    label: "Semantic Coverage",
    score: Math.round(semanticScore),
    status: statusFor(semanticScore),
    detail: secondaryKeywords.length > 0
      ? `${coveredSecondary.length}/${secondaryKeywords.length} secondary keywords found in the article.`
      : "Add secondary keywords to measure semantic coverage.",
  })

  // 6. FAQ coverage
  const hasFaqHeading = /frequently asked questions/i.test(html)
  const questionCount = countOccurrences(plainText, "?")
  const faqScore = !config.includeFaq
    ? 100
    : hasFaqHeading && questionCount >= 3
      ? 100
      : hasFaqHeading
        ? 60
        : 20
  metrics.push({
    key: "faq-coverage",
    label: "FAQ Coverage",
    score: faqScore,
    status: statusFor(faqScore),
    detail: config.includeFaq
      ? hasFaqHeading
        ? `FAQ section detected with ${questionCount} question${questionCount === 1 ? "" : "s"}.`
        : "FAQ was requested but no FAQ section was found yet."
      : "FAQ section not requested for this article.",
  })

  // 7. Internal linking opportunities
  const internalLinkMentions = countOccurrences(html, "/blog/")
  const internalScore = !config.includeInternalLinking
    ? 100
    : clamp(internalLinkMentions * 35)
  metrics.push({
    key: "internal-linking",
    label: "Internal Linking Opportunities",
    score: Math.round(internalScore),
    status: statusFor(internalScore),
    detail: config.includeInternalLinking
      ? `${internalLinkMentions} internal link opportunity${internalLinkMentions === 1 ? "" : "ies"} suggested.`
      : "Internal linking suggestions not requested for this article.",
  })

  // 8. Search intent match
  const signals = INTENT_SIGNALS[config.searchIntent]
  const matchedSignals = signals.filter((s) => plainText.toLowerCase().includes(s))
  const intentScore = clamp((matchedSignals.length / signals.length) * 100)
  metrics.push({
    key: "search-intent-match",
    label: "Search Intent Match",
    score: Math.round(intentScore),
    status: statusFor(intentScore),
    detail: `Matches ${matchedSignals.length}/${signals.length} "${config.searchIntent}" intent signals.`,
  })

  const overall = Math.round(metrics.reduce((sum, m) => sum + m.score, 0) / metrics.length)
  const suggestions = metrics.filter((m) => m.status === "warn").map((m) => m.detail)
  const warnings = metrics.filter((m) => m.status === "fail").map((m) => m.detail)

  return { overall, metrics, suggestions, warnings }
}
