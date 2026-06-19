import {
  BarChart3,
  Bot,
  Layers,
  LineChart,
  ListChecks,
  Search,
  type LucideIcon,
} from "lucide-react"

export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  icon: LucideIcon
  author: string
  date: string
  readingTime: string
  featured?: boolean
}

export const categories = [
  "SEO",
  "Keyword Research",
  "Content Planning",
  "Topical Authority",
  "AI Content",
  "Case Studies",
]

export const blogPosts: BlogPost[] = [
  {
    slug: "low-competition-keywords-2026",
    title: "How To Find Low-Competition Keywords In 2026",
    excerpt:
      "A practical framework for uncovering keywords your competitors haven't found yet — without expensive tools or guesswork.",
    category: "Keyword Research",
    icon: Search,
    author: "Sarah Chen",
    date: "Jun 12, 2026",
    readingTime: "8 min read",
    featured: true,
  },
  {
    slug: "build-topical-authority",
    title: "Building Topical Authority From Scratch",
    excerpt:
      "Why search engines reward sites that go deep on a topic — and how to structure your content to prove it.",
    category: "Topical Authority",
    icon: Layers,
    author: "Marcus Webb",
    date: "Jun 8, 2026",
    readingTime: "6 min read",
  },
  {
    slug: "content-calendar-that-works",
    title: "The Content Calendar Framework That Actually Works",
    excerpt:
      "Stop planning content in isolation. Here's how to map clusters into a publishing schedule you can sustain.",
    category: "Content Planning",
    icon: ListChecks,
    author: "Elena Rodriguez",
    date: "Jun 3, 2026",
    readingTime: "5 min read",
  },
  {
    slug: "ai-content-without-losing-voice",
    title: "Using AI Content Without Losing Your Brand Voice",
    excerpt:
      "AI drafts are a starting point, not a finish line. Here's how to keep your editorial voice intact at scale.",
    category: "AI Content",
    icon: Bot,
    author: "Sarah Chen",
    date: "May 28, 2026",
    readingTime: "7 min read",
  },
  {
    slug: "eeat-signals-that-matter",
    title: "The EEAT Signals That Actually Move Rankings",
    excerpt:
      "Experience, expertise, authority, and trust aren't just buzzwords — here's what to focus on first.",
    category: "SEO",
    icon: BarChart3,
    author: "Marcus Webb",
    date: "May 22, 2026",
    readingTime: "9 min read",
  },
  {
    slug: "niche-site-doubled-traffic",
    title: "Case Study: How One Niche Site Doubled Organic Traffic",
    excerpt:
      "A behind-the-scenes look at the content strategy that took a six-month-old site from zero to consistent rankings.",
    category: "Case Studies",
    icon: LineChart,
    author: "Elena Rodriguez",
    date: "May 15, 2026",
    readingTime: "10 min read",
  },
  {
    slug: "internal-linking-for-clusters",
    title: "Internal Linking Strategies For Content Clusters",
    excerpt:
      "A simple linking structure that helps search engines — and readers — understand how your content fits together.",
    category: "SEO",
    icon: Search,
    author: "Sarah Chen",
    date: "May 9, 2026",
    readingTime: "6 min read",
  },
]
