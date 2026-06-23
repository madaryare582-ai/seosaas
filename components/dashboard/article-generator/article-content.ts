export type ArticleBlock =
  | { type: "title"; text: string }
  | { type: "meta"; text: string }
  | { type: "intro"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "conclusion"; text: string }

export const ARTICLE_BLOCKS: ArticleBlock[] = [
  { type: "title", text: "How to Build Topical Authority in 2026" },
  {
    type: "meta",
    text: "A practical framework for building topical authority in 2026 using topic clusters, entity SEO, and content silos that search engines reward.",
  },
  {
    type: "intro",
    text: "Topical authority has quietly become the strongest ranking lever in modern SEO. Instead of chasing isolated keywords, search engines now reward sites that demonstrate deep, structured expertise across an entire subject area. This guide breaks down exactly how to build that authority in 2026.",
  },
  { type: "h2", text: "What Is Topical Authority?" },
  {
    type: "p",
    text: "Topical authority is the degree to which search engines trust a website as a comprehensive, reliable source on a given subject. It is earned through consistent topical coverage, internal linking, and demonstrated expertise rather than any single piece of content.",
  },
  { type: "h3", text: "Topical Authority vs Domain Authority" },
  {
    type: "p",
    text: "Domain authority measures overall site strength, while topical authority is scoped to a specific subject. A smaller site can outrank a much larger one on a topic if its coverage is deeper and more interconnected.",
  },
  { type: "h3", text: "How Search Engines Measure Topic Expertise" },
  {
    type: "p",
    text: "Search engines infer topic expertise from entity coverage, internal link structure, content depth, and how comprehensively a site answers the related questions across a cluster of pages.",
  },
  { type: "h2", text: "Building a Topic Cluster Strategy" },
  {
    type: "p",
    text: "A topic cluster groups a pillar page with supporting subtopic pages, all interlinked to signal relevance and depth to search engines.",
  },
  { type: "h3", text: "Choosing Pillar Topics" },
  {
    type: "p",
    text: "Start with broad, high-intent topics that have room for multiple supporting articles, and validate demand with search volume and competitor content gaps.",
  },
  { type: "h3", text: "Mapping Subtopics and Entities" },
  {
    type: "p",
    text: "Break each pillar into the entities, questions, and subtopics your audience expects covered, then assign one clear subtopic to each supporting article.",
  },
  { type: "h3", text: "Internal Linking Between Clusters" },
  {
    type: "p",
    text: "Link supporting pages back to the pillar and across related subtopics. Consistent internal linking is what turns isolated articles into a recognizable cluster.",
  },
  { type: "h2", text: "Tools to Automate Topical Authority" },
  {
    type: "p",
    text: "AI content planners and entity mapping tools can surface coverage gaps automatically, saving hours of manual keyword and competitor research.",
  },
  { type: "h2", text: "Measuring Results" },
  {
    type: "p",
    text: "Track topical coverage score, organic visibility growth, and ranking movement across the whole cluster rather than any single keyword.",
  },
  {
    type: "conclusion",
    text: "Topical authority is no longer optional for competitive SEO. By structuring content into clusters, mapping entities deliberately, and linking everything together, you give search engines every reason to trust your site as the definitive source on your subject.",
  },
]

export type Token =
  | { kind: "atomic"; blockIndex: number }
  | { kind: "word"; blockIndex: number; value: string }

function buildTokens(blocks: ArticleBlock[]): Token[] {
  const tokens: Token[] = []
  blocks.forEach((block, blockIndex) => {
    if (block.type === "p" || block.type === "intro" || block.type === "conclusion") {
      block.text.split(" ").forEach((value) => tokens.push({ kind: "word", blockIndex, value }))
    } else {
      tokens.push({ kind: "atomic", blockIndex })
    }
  })
  return tokens
}

export const ARTICLE_TOKENS = buildTokens(ARTICLE_BLOCKS)
export const ARTICLE_TOTAL_WORDS = ARTICLE_TOKENS.filter((token) => token.kind === "word").length

export type RevealedGroup = {
  blockIndex: number
  block: ArticleBlock
  words: string[]
}

export function getRevealedGroups(revealCount: number): RevealedGroup[] {
  const groups: RevealedGroup[] = []
  let current: RevealedGroup | null = null

  for (let i = 0; i < revealCount && i < ARTICLE_TOKENS.length; i++) {
    const token = ARTICLE_TOKENS[i]
    if (!current || current.blockIndex !== token.blockIndex) {
      current = { blockIndex: token.blockIndex, block: ARTICLE_BLOCKS[token.blockIndex], words: [] }
      groups.push(current)
    }
    if (token.kind === "word") current.words.push(token.value)
  }

  return groups
}

export const MOCK_SEO_SCORE = 94

export function blocksToMarkdown(blocks: ArticleBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "title":
          return `# ${block.text}`
        case "meta":
          return `> ${block.text}`
        case "h2":
          return `## ${block.text}`
        case "h3":
          return `### ${block.text}`
        default:
          return block.text
      }
    })
    .join("\n\n")
}

export function blocksToPlainText(blocks: ArticleBlock[]): string {
  return blocks.map((block) => block.text).join("\n\n")
}

export function blocksToHtml(blocks: ArticleBlock[]): string {
  const body = blocks
    .map((block) => {
      switch (block.type) {
        case "title":
          return `  <h1>${block.text}</h1>`
        case "meta":
          return `  <p><em>${block.text}</em></p>`
        case "h2":
          return `  <h2>${block.text}</h2>`
        case "h3":
          return `  <h3>${block.text}</h3>`
        default:
          return `  <p>${block.text}</p>`
      }
    })
    .join("\n")

  return `<!doctype html>\n<html lang="en">\n<head>\n  <meta charset="utf-8" />\n  <title>${blocks[0].text}</title>\n</head>\n<body>\n${body}\n</body>\n</html>\n`
}
