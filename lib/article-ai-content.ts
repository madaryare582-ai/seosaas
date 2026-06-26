export type SearchIntent = "informational" | "commercial" | "transactional" | "navigational"
export type ArticleTone = "professional" | "authoritative" | "casual" | "friendly" | "witty" | "empathetic"
export type ContentGoal = "rank-on-google" | "drive-conversions" | "build-authority" | "educate-audience"
export type AudienceType = "beginners" | "professionals" | "general-consumers" | "b2b-decision-makers"
export type ArticleLength = "short" | "medium" | "long" | "pillar"
export type ExpertiseLevel = "beginner" | "intermediate" | "expert"
export type ContentFreshness = "evergreen" | "current-year" | "trending"
export type BrandVoice = "default" | "confident" | "friendly-expert" | "witty" | "formal"

export type ArticleConfig = {
  primaryKeyword: string
  secondaryKeywords: string
  searchIntent: SearchIntent
  targetCountry: string
  language: string
  tone: ArticleTone
  contentGoal: ContentGoal
  audienceType: AudienceType
  articleLength: ArticleLength
  includeFaq: boolean
  includeKeyTakeaways: boolean
  includeComparisonTable: boolean
  includeStatistics: boolean
  includeInternalLinking: boolean
  includeExternalReferences: boolean
  expertiseLevel: ExpertiseLevel
  contentFreshness: ContentFreshness
  brandVoice: BrandVoice
  creativity: number
  seoAggressiveness: number
}

export const DEFAULT_ARTICLE_CONFIG: ArticleConfig = {
  primaryKeyword: "topical authority",
  secondaryKeywords: "topic clusters, entity seo, content silos",
  searchIntent: "informational",
  targetCountry: "United States",
  language: "English",
  tone: "authoritative",
  contentGoal: "rank-on-google",
  audienceType: "professionals",
  articleLength: "medium",
  includeFaq: true,
  includeKeyTakeaways: true,
  includeComparisonTable: false,
  includeStatistics: true,
  includeInternalLinking: true,
  includeExternalReferences: true,
  expertiseLevel: "intermediate",
  contentFreshness: "current-year",
  brandVoice: "confident",
  creativity: 50,
  seoAggressiveness: 50,
}

export type SectionKind =
  | "seo-title"
  | "meta"
  | "key-takeaways"
  | "intro"
  | "toc"
  | "body"
  | "comparison-table"
  | "statistics"
  | "faq"
  | "conclusion"
  | "internal-links"
  | "external-references"

export type ArticleSection = {
  id: string
  kind: SectionKind
  label: string
  html: string
}

function titleCase(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return "Your Topic"
  return trimmed
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function pick<T>(pool: T[], seed: number, offset = 0) {
  return pool[(seed + offset) % pool.length]
}

const VOICE_OPENERS: Record<BrandVoice, string[]> = {
  default: ["Let's break down", "Here's what you need to know about", "This guide covers"],
  confident: ["Here's the definitive guide to", "Make no mistake —", "The clearest way to think about"],
  "friendly-expert": ["Let's walk through", "Think of it this way:", "Here's a friendly breakdown of"],
  witty: ["Buckle up — here's", "Let's demystify", "No fluff, just the facts on"],
  formal: ["This article examines", "The following analysis addresses", "We present an overview of"],
}

const SENTENCE_TEMPLATES = [
  "{keyword} is one of the most important factors for {audience} who want measurable results in {year}.",
  "When done correctly, {keyword} can directly improve how {audience} experience your content.",
  "Most {audience} underestimate how much {keyword} affects long-term outcomes.",
  "A strong approach to {keyword} starts with understanding what {audience} actually need.",
  "Getting {keyword} right means balancing strategy, consistency, and the right tools.",
]

const BODY_HEADING_TEMPLATES = [
  "What Is {keyword}?",
  "Why {keyword} Matters in {year}",
  "How to Get Started with {keyword}",
  "Best Practices for {keyword}",
  "Common {keyword} Mistakes to Avoid",
  "Tools and Resources for {keyword}",
  "{keyword} Strategy: Step-by-Step",
  "Measuring Success with {keyword}",
  "Advanced {keyword} Techniques",
  "{keyword} Case Studies and Examples",
  "Future Trends in {keyword}",
  "Frequently Overlooked Aspects of {keyword}",
]

const LENGTH_SECTION_COUNT: Record<ArticleLength, number> = {
  short: 3,
  medium: 5,
  long: 7,
  pillar: 10,
}

const TONE_FLAVOR: Record<ArticleTone, string> = {
  professional: "a clear, professional approach",
  authoritative: "an authoritative, well-researched approach",
  casual: "a relaxed, conversational approach",
  friendly: "a warm, approachable approach",
  witty: "a sharp, engaging approach",
  empathetic: "an understanding, supportive approach",
}

const FAQ_QUESTIONS = [
  "What is {keyword}?",
  "How long does it take to see results with {keyword}?",
  "Is {keyword} worth the investment?",
  "What's the biggest mistake people make with {keyword}?",
  "How do I get started with {keyword} today?",
]

function buildParagraph(keyword: string, secondary: string[], audience: string, year: number, seed: number, aggressiveness: number, sentenceCount = 3) {
  const repeats = 1 + Math.round(aggressiveness / 40)
  const sentences: string[] = []
  for (let i = 0; i < sentenceCount; i++) {
    const template = pick(SENTENCE_TEMPLATES, seed, i)
    sentences.push(
      template.replace("{keyword}", keyword).replace("{audience}", audience).replace("{year}", String(year))
    )
  }
  for (let i = 1; i < repeats && secondary.length > 0; i++) {
    const sk = pick(secondary, seed, i)
    sentences.push(`This is closely connected to ${sk}, which reinforces the same core ${keyword} fundamentals.`)
  }
  return sentences.join(" ")
}

const AUDIENCE_LABEL: Record<AudienceType, string> = {
  beginners: "beginners",
  professionals: "professionals",
  "general-consumers": "everyday readers",
  "b2b-decision-makers": "business decision-makers",
}

export function generateArticleSections(config: ArticleConfig, seed: number): ArticleSection[] {
  const keyword = titleCase(config.primaryKeyword).toLowerCase()
  const keywordTitle = titleCase(config.primaryKeyword)
  const secondary = config.secondaryKeywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean)
  const audience = AUDIENCE_LABEL[config.audienceType]
  const year = config.contentFreshness === "evergreen" ? 2026 : 2026
  const sectionCount = LENGTH_SECTION_COUNT[config.articleLength]
  const opener = pick(VOICE_OPENERS[config.brandVoice], seed)
  const sections: ArticleSection[] = []

  const headings = Array.from({ length: sectionCount }, (_, i) =>
    pick(BODY_HEADING_TEMPLATES, seed + i, i)
      .replace("{keyword}", keywordTitle)
      .replace("{year}", String(year))
  )

  sections.push({
    id: "seo-title",
    kind: "seo-title",
    label: "SEO Title",
    html: `<h1>${keywordTitle}: The Complete ${year} Guide</h1>`,
  })

  sections.push({
    id: "meta",
    kind: "meta",
    label: "Meta Description",
    html: `<p><em>Meta Description: Discover everything ${audience} need to know about ${keyword} in ${year} — strategy, tools, and common mistakes to avoid.</em></p>`,
  })

  if (config.includeKeyTakeaways) {
    const items = headings
      .slice(0, 4)
      .map((h) => `<li>${h.replace(/\?$/, "")} — a core part of any ${keyword} strategy.</li>`)
      .join("")
    sections.push({
      id: "key-takeaways",
      kind: "key-takeaways",
      label: "Key Takeaways",
      html: `<h3>Key Takeaways</h3><ul>${items}</ul>`,
    })
  }

  sections.push({
    id: "intro",
    kind: "intro",
    label: "Introduction",
    html: `<p>${opener} ${keyword}. ${buildParagraph(keyword, secondary, audience, year, seed, config.seoAggressiveness, 2)} This guide takes ${TONE_FLAVOR[config.tone]}, written for ${audience} at ${config.expertiseLevel} level.</p>`,
  })

  sections.push({
    id: "toc",
    kind: "toc",
    label: "Table of Contents",
    html: `<h3>Table of Contents</h3><ul>${headings.map((h) => `<li>${h}</li>`).join("")}</ul>`,
  })

  headings.forEach((heading, index) => {
    sections.push({
      id: `body-${index}`,
      kind: "body",
      label: heading,
      html: `<h2>${heading}</h2><p>${buildParagraph(keyword, secondary, audience, year, seed + index + 1, config.seoAggressiveness, 3)}</p>`,
    })
  })

  if (config.includeComparisonTable) {
    sections.push({
      id: "comparison-table",
      kind: "comparison-table",
      label: "Comparison Table",
      html: `<h2>Comparing Your ${keywordTitle} Options</h2><table><tbody>
        <tr><th>Option</th><th>Best For</th><th>Ease of Use</th><th>Rating</th></tr>
        <tr><td>Option A</td><td>${audience}</td><td>High</td><td>4.6/5</td></tr>
        <tr><td>Option B</td><td>Budget-conscious teams</td><td>Medium</td><td>4.2/5</td></tr>
        <tr><td>Option C</td><td>Advanced ${config.expertiseLevel} users</td><td>Medium</td><td>4.4/5</td></tr>
      </tbody></table>`,
    })
  }

  if (config.includeStatistics) {
    sections.push({
      id: "statistics",
      kind: "statistics",
      label: "Statistics",
      html: `<h2>${keywordTitle} by the Numbers</h2><ul>
        <li>[Add a verified adoption or growth statistic about ${keyword}]</li>
        <li>[Add a verified survey or market-size figure related to ${keyword}]</li>
        <li>[Add a verified before/after or ROI statistic for ${keyword}]</li>
      </ul><p><em>Replace the placeholders above with current, sourced statistics before publishing.</em></p>`,
    })
  }

  if (config.includeFaq) {
    const items = FAQ_QUESTIONS.map((q, i) => {
      const question = q.replace("{keyword}", keyword)
      return `<h3>${question}</h3><p>${buildParagraph(keyword, secondary, audience, year, seed + i + 10, config.seoAggressiveness, 1)}</p>`
    }).join("")
    sections.push({
      id: "faq",
      kind: "faq",
      label: "FAQ",
      html: `<h2>Frequently Asked Questions</h2>${items}`,
    })
  }

  sections.push({
    id: "conclusion",
    kind: "conclusion",
    label: "Conclusion",
    html: `<h2>Conclusion</h2><p>${keywordTitle} is not a one-time task — it's an ongoing practice. ${buildParagraph(keyword, secondary, audience, year, seed + 99, config.seoAggressiveness, 2)} Start with the fundamentals above and build from there.</p>`,
  })

  if (config.includeInternalLinking) {
    const items = secondary
      .slice(0, 3)
      .map((sk) => `<li>Link "${sk}" to <code>/blog/${slugify(sk)}</code></li>`)
      .join("")
    sections.push({
      id: "internal-links",
      kind: "internal-links",
      label: "Internal Link Opportunities",
      html: `<h3>Internal Link Opportunities</h3><ul>${items || `<li>Link relevant anchor text to a related post on ${keyword}</li>`}</ul>`,
    })
  }

  if (config.includeExternalReferences) {
    sections.push({
      id: "external-references",
      kind: "external-references",
      label: "External Authority References",
      html: `<h3>External Authority References</h3><ul>
        <li><em>Find and link a reputable, up-to-date source (e.g. an industry body, government resource, or peer-reviewed study) about ${keyword} fundamentals.</em></li>
        <li><em>Find and link a recognized publication covering recent ${keyword} trends in ${year}.</em></li>
      </ul>`,
    })
  }

  return sections
}
