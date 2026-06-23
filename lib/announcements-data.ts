import {
  Rocket,
  Sparkles,
  ShieldCheck,
  Megaphone,
  Wrench,
  Gift,
  Bell,
  Star,
  Zap,
  Heart,
  Flame,
  Trophy,
  PartyPopper,
  Wand2,
  Layers,
  Bug,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  CalendarClock,
  Tag,
  ThumbsUp,
  Lightbulb,
  Crown,
  Gem,
  Rss,
  TrendingUp,
  Award,
  type LucideIcon,
} from "lucide-react"

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export type AnnouncementCategory =
  | "new-feature"
  | "improvement"
  | "bug-fix"
  | "product-update"
  | "maintenance"
  | "special-offer"

export type AnnouncementStatus = "draft" | "published" | "scheduled" | "archived"

export type BannerVariant = "gradient" | "info" | "success" | "announcement" | "warning" | "promotional"

export type CategoryMeta = {
  value: AnnouncementCategory
  label: string
  emoji: string
  icon: LucideIcon
  iconName: string
  gradient: string
  badgeClass: string
  bannerVariant: BannerVariant
}

export const CATEGORY_META: Record<AnnouncementCategory, CategoryMeta> = {
  "new-feature": {
    value: "new-feature",
    label: "New Feature",
    emoji: "🚀",
    icon: Rocket,
    iconName: "Rocket",
    gradient: "from-violet-500 to-indigo-500",
    badgeClass: "border-violet-400/30 bg-violet-500/10 text-violet-300",
    bannerVariant: "gradient",
  },
  improvement: {
    value: "improvement",
    label: "Improvement",
    emoji: "🛠",
    icon: Sparkles,
    iconName: "Sparkles",
    gradient: "from-blue-500 to-sky-500",
    badgeClass: "border-blue-400/30 bg-blue-500/10 text-blue-300",
    bannerVariant: "info",
  },
  "bug-fix": {
    value: "bug-fix",
    label: "Bug Fix",
    emoji: "🐛",
    icon: ShieldCheck,
    iconName: "ShieldCheck",
    gradient: "from-emerald-500 to-teal-500",
    badgeClass: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
    bannerVariant: "success",
  },
  "product-update": {
    value: "product-update",
    label: "Product Update",
    emoji: "📢",
    icon: Megaphone,
    iconName: "Megaphone",
    gradient: "from-cyan-500 to-blue-500",
    badgeClass: "border-cyan-400/30 bg-cyan-500/10 text-cyan-300",
    bannerVariant: "announcement",
  },
  maintenance: {
    value: "maintenance",
    label: "Maintenance",
    emoji: "⚠️",
    icon: Wrench,
    iconName: "Wrench",
    gradient: "from-amber-500 to-orange-500",
    badgeClass: "border-amber-400/30 bg-amber-500/10 text-amber-300",
    bannerVariant: "warning",
  },
  "special-offer": {
    value: "special-offer",
    label: "Special Offer",
    emoji: "🎉",
    icon: Gift,
    iconName: "Gift",
    gradient: "from-fuchsia-500 to-purple-500",
    badgeClass: "border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-300",
    bannerVariant: "promotional",
  },
}

export const categoryList = Object.values(CATEGORY_META)

export function getCategoryMeta(category: AnnouncementCategory): CategoryMeta {
  return CATEGORY_META[category]
}

// ---------------------------------------------------------------------------
// Icon picker options
// ---------------------------------------------------------------------------

export const ICON_OPTIONS: Record<string, LucideIcon> = {
  Rocket,
  Sparkles,
  ShieldCheck,
  Megaphone,
  Wrench,
  Gift,
  Bell,
  Star,
  Zap,
  Heart,
  Flame,
  Trophy,
  PartyPopper,
  Wand2,
  Layers,
  Bug,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  CalendarClock,
  Tag,
  ThumbsUp,
  Lightbulb,
  Crown,
  Gem,
  Rss,
  TrendingUp,
  Award,
}

export function getIcon(name: string): LucideIcon {
  return ICON_OPTIONS[name] ?? Bell
}

// ---------------------------------------------------------------------------
// Content blocks (rich content editor)
// ---------------------------------------------------------------------------

export type ContentBlock =
  | { id: string; type: "heading"; level: 1 | 2 | 3 | 4 | 5 | 6; text: string }
  | { id: string; type: "paragraph"; text: string }
  | { id: string; type: "bulletList"; items: string[] }
  | { id: string; type: "numberedList"; items: string[] }
  | { id: string; type: "quote"; text: string; attribution?: string }
  | {
      id: string
      type: "callout"
      tone: "info" | "success" | "warning" | "danger"
      title?: string
      text: string
    }
  | { id: string; type: "table"; headers: string[]; rows: string[][] }
  | { id: string; type: "image"; src: string; alt: string; caption?: string }
  | { id: string; type: "video"; url: string; caption?: string }
  | { id: string; type: "button"; label: string; href: string; style: "primary" | "secondary" }
  | { id: string; type: "divider" }
  | { id: string; type: "code"; language: string; code: string }
  | { id: string; type: "faq"; items: { question: string; answer: string }[] }

export type ContentBlockType = ContentBlock["type"]

export const BLOCK_TYPE_LABELS: Record<ContentBlockType, string> = {
  heading: "Heading",
  paragraph: "Paragraph",
  bulletList: "Bullet List",
  numberedList: "Numbered List",
  quote: "Quote",
  callout: "Callout",
  table: "Table",
  image: "Image",
  video: "Video",
  button: "Button",
  divider: "Divider",
  code: "Code Block",
  faq: "FAQ Accordion",
}

export type AnnouncementSection = {
  id: string
  title: string
  icon: string
  color: string
  blocks: ContentBlock[]
}

// ---------------------------------------------------------------------------
// Banner placement / display options
// ---------------------------------------------------------------------------

export type BannerPlacement =
  | "sitewide"
  | "dashboard"
  | "article-generator"
  | "content-planner"
  | "pricing"
  | "specific"

export type BannerPriority = "low" | "medium" | "high"

export const PLACEMENT_OPTIONS: { value: BannerPlacement; label: string; description: string }[] = [
  { value: "sitewide", label: "Show Site Wide", description: "Appears across the marketing site and the dashboard." },
  { value: "dashboard", label: "Show Only Dashboard", description: "Appears on every page inside the user dashboard." },
  { value: "article-generator", label: "Show Only Article Generator", description: "Appears only on the Article Generator page." },
  { value: "content-planner", label: "Show Only Content Planner", description: "Appears only on the Content Planner page." },
  { value: "pricing", label: "Show Only Pricing Page", description: "Appears only on the public Pricing page." },
  { value: "specific", label: "Show Only Specific Features", description: "Pick exactly which pages this banner appears on." },
]

export const FEATURE_ROUTE_OPTIONS: { value: string; label: string }[] = [
  { value: "/", label: "Homepage" },
  { value: "/pricing", label: "Pricing Page" },
  { value: "/blog", label: "Blog" },
  { value: "/dashboard", label: "Dashboard Overview" },
  { value: "/dashboard/article-generator", label: "Article Generator" },
  { value: "/dashboard/content-planner", label: "Content Planner" },
  { value: "/dashboard/topical-authority", label: "Topical Authority" },
  { value: "/dashboard/credits", label: "Credits & Billing" },
  { value: "/dashboard/support", label: "Support" },
  { value: "/dashboard/settings", label: "Settings" },
]

export type Announcement = {
  id: string
  title: string
  category: AnnouncementCategory
  badgeText: string
  icon: string
  summary: string
  coverImage: string
  sections: AnnouncementSection[]
  status: AnnouncementStatus
  featured: boolean
  publishDate: string
  author: string
  views: number
  createdAt: string
  updatedAt: string
  ctaLabel: string
  ctaUrl: string
  placement: BannerPlacement
  specificRoutes: string[]
  startDate: string
  endDate: string
  priority: BannerPriority
  dismissible: boolean
  sticky: boolean
}

let blockCounter = 0
export function makeBlockId() {
  blockCounter += 1
  return `blk-${Date.now()}-${blockCounter}`
}

let sectionCounter = 0
export function makeSectionId() {
  sectionCounter += 1
  return `sec-${Date.now()}-${sectionCounter}`
}

function paragraph(text: string): ContentBlock {
  return { id: makeBlockId(), type: "paragraph", text }
}

// ---------------------------------------------------------------------------
// Dynamic category section templates
// ---------------------------------------------------------------------------

type SectionTemplate = { title: string; icon: string; placeholder: string }

export const CATEGORY_TEMPLATES: Record<AnnouncementCategory, SectionTemplate[]> = {
  "new-feature": [
    { title: "What's New", icon: "Rocket", placeholder: "Describe the new capability you're shipping and why it matters." },
    { title: "Key Features", icon: "Sparkles", placeholder: "List the standout capabilities of this feature." },
    { title: "Benefits", icon: "ThumbsUp", placeholder: "Explain the outcomes users can expect." },
    { title: "Availability", icon: "Layers", placeholder: "Note which plans, regions, or accounts have access." },
    { title: "Call To Action", icon: "Zap", placeholder: "Tell users exactly what to do next." },
  ],
  improvement: [
    { title: "Improvements Made", icon: "Sparkles", placeholder: "Summarize what was improved." },
    { title: "Performance Gains", icon: "TrendingUp", placeholder: "Quantify the speed, accuracy, or efficiency gains." },
    { title: "User Impact", icon: "ThumbsUp", placeholder: "Explain how this changes the day-to-day experience." },
    { title: "Availability", icon: "Layers", placeholder: "Note rollout timing and affected plans." },
  ],
  "bug-fix": [
    { title: "Issue Fixed", icon: "Bug", placeholder: "Describe the bug that was resolved." },
    { title: "Root Cause", icon: "AlertTriangle", placeholder: "Explain what caused the issue." },
    { title: "Resolution", icon: "ShieldCheck", placeholder: "Explain how it was fixed." },
    { title: "Status", icon: "CheckCircle2", placeholder: "Confirm the current status and any follow-up." },
  ],
  "product-update": [
    { title: "Update Summary", icon: "Megaphone", placeholder: "Give a high-level summary of this update." },
    { title: "Changes", icon: "Layers", placeholder: "List what changed in detail." },
    { title: "User Impact", icon: "ThumbsUp", placeholder: "Explain how this affects existing users." },
    { title: "Additional Notes", icon: "Bell", placeholder: "Add any extra context or links." },
  ],
  maintenance: [
    { title: "Maintenance Window", icon: "CalendarClock", placeholder: "State the date and time window." },
    { title: "Expected Downtime", icon: "Clock3", placeholder: "Estimate how long systems will be affected." },
    { title: "Services Affected", icon: "Wrench", placeholder: "List the affected services or features." },
    { title: "Status", icon: "AlertTriangle", placeholder: "Note the current status of the maintenance." },
    { title: "Notes", icon: "Bell", placeholder: "Add any extra guidance for users." },
  ],
  "special-offer": [
    { title: "Offer Title", icon: "Gift", placeholder: "Name the promotion." },
    { title: "Offer Description", icon: "PartyPopper", placeholder: "Describe what's included in the offer." },
    { title: "Discount", icon: "Tag", placeholder: "State the discount amount or code." },
    { title: "Expiration Date", icon: "Clock3", placeholder: "State when the offer ends." },
    { title: "Terms", icon: "ShieldCheck", placeholder: "Add terms and conditions." },
    { title: "Call To Action", icon: "Zap", placeholder: "Tell users how to redeem the offer." },
  ],
}

export function createSectionsFromTemplate(category: AnnouncementCategory): AnnouncementSection[] {
  const meta = CATEGORY_META[category]
  return CATEGORY_TEMPLATES[category].map((section) => ({
    id: makeSectionId(),
    title: section.title,
    icon: section.icon,
    color: meta.gradient,
    blocks: [paragraph(section.placeholder)],
  }))
}

export function createEmptySection(category?: AnnouncementCategory): AnnouncementSection {
  return {
    id: makeSectionId(),
    title: "New Section",
    icon: "Layers",
    color: category ? CATEGORY_META[category].gradient : "from-violet-500 to-indigo-500",
    blocks: [paragraph("Write your content here...")],
  }
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

export function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}k`
  return String(views)
}

// ---------------------------------------------------------------------------
// Seed data
// ---------------------------------------------------------------------------

export const announcementAuthors = ["Jordan Diaz", "Hana Ismail", "Liban Ahmed", "Sarah Chen", "Marcus Webb"]

export const announcements: Announcement[] = [
  {
    id: "ANN-1001",
    title: "Topical Authority Entity Maps Are Here",
    category: "new-feature",
    badgeText: "New",
    icon: "Rocket",
    summary: "Visualize how your content clusters connect with a brand new entity mapping engine.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    status: "published",
    featured: true,
    publishDate: "2026-06-19",
    author: "Hana Ismail",
    views: 12480,
    createdAt: "2026-06-15",
    updatedAt: "2026-06-19",
    ctaLabel: "Open Topical Authority",
    ctaUrl: "/dashboard/topical-authority",
    placement: "dashboard",
    specificRoutes: [],
    startDate: "2026-06-19",
    endDate: "",
    priority: "high",
    dismissible: true,
    sticky: false,
    sections: [
      {
        id: "sec-1001-1",
        title: "What's New",
        icon: "Rocket",
        color: "from-violet-500 to-indigo-500",
        blocks: [
          paragraph(
            "Entity Maps give you a live, visual graph of how every topic, sub-topic, and supporting page in your content cluster connects to one another."
          ),
        ],
      },
      {
        id: "sec-1001-2",
        title: "Key Features",
        icon: "Sparkles",
        color: "from-violet-500 to-indigo-500",
        blocks: [
          {
            id: makeBlockId(),
            type: "bulletList",
            items: [
              "Auto-generated entity graphs from your existing content plan",
              "Gap detection for missing supporting entities",
              "One-click export to your content calendar",
              "Color-coded clusters by topical depth",
            ],
          },
        ],
      },
      {
        id: "sec-1001-3",
        title: "Benefits",
        icon: "ThumbsUp",
        color: "from-violet-500 to-indigo-500",
        blocks: [
          paragraph("Teams using early access reported closing topical gaps 3x faster and improving cluster-wide rankings within 6 weeks."),
          {
            id: makeBlockId(),
            type: "callout",
            tone: "success",
            title: "Early access results",
            text: "Beta users saw an average 41% increase in cluster impressions within the first month.",
          },
        ],
      },
      {
        id: "sec-1001-4",
        title: "Availability",
        icon: "Layers",
        color: "from-violet-500 to-indigo-500",
        blocks: [paragraph("Available now for Growth and Professional plans. Starter plans can preview a single entity map per month.")],
      },
      {
        id: "sec-1001-5",
        title: "Call To Action",
        icon: "Zap",
        color: "from-violet-500 to-indigo-500",
        blocks: [
          { id: makeBlockId(), type: "button", label: "Open Topical Authority", href: "/dashboard/topical-authority", style: "primary" },
        ],
      },
    ],
  },
  {
    id: "ANN-1002",
    title: "Faster Article Generation Engine",
    category: "improvement",
    badgeText: "Improved",
    icon: "Sparkles",
    summary: "Article Generator now produces full-length drafts up to 2x faster with improved outline accuracy.",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop",
    status: "published",
    featured: false,
    publishDate: "2026-06-14",
    author: "Marcus Webb",
    views: 8210,
    createdAt: "2026-06-10",
    updatedAt: "2026-06-14",
    ctaLabel: "Try Article Generator",
    ctaUrl: "/dashboard/article-generator",
    placement: "article-generator",
    specificRoutes: [],
    startDate: "2026-06-14",
    endDate: "",
    priority: "medium",
    dismissible: true,
    sticky: false,
    sections: [
      {
        id: "sec-1002-1",
        title: "Improvements Made",
        icon: "Sparkles",
        color: "from-blue-500 to-sky-500",
        blocks: [paragraph("We rebuilt the generation pipeline to parallelize outline drafting, section writing, and SEO scoring.")],
      },
      {
        id: "sec-1002-2",
        title: "Performance Gains",
        icon: "TrendingUp",
        color: "from-blue-500 to-sky-500",
        blocks: [
          {
            id: makeBlockId(),
            type: "table",
            headers: ["Metric", "Before", "After"],
            rows: [
              ["Avg. generation time", "94s", "41s"],
              ["Outline revisions needed", "2.3", "0.6"],
              ["SEO score on first draft", "78", "91"],
            ],
          },
        ],
      },
      {
        id: "sec-1002-3",
        title: "User Impact",
        icon: "ThumbsUp",
        color: "from-blue-500 to-sky-500",
        blocks: [paragraph("Less waiting, fewer regenerations, and higher quality first drafts across every plan tier.")],
      },
      {
        id: "sec-1002-4",
        title: "Availability",
        icon: "Layers",
        color: "from-blue-500 to-sky-500",
        blocks: [paragraph("Rolled out automatically to all accounts. No action needed.")],
      },
    ],
  },
  {
    id: "ANN-1003",
    title: "Fixed: Content Planner Export Stalling",
    category: "bug-fix",
    badgeText: "Resolved",
    icon: "ShieldCheck",
    summary: "Exports from Content Planner that stalled at 80% for large clusters have been fixed.",
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1600&auto=format&fit=crop",
    status: "published",
    featured: false,
    publishDate: "2026-06-11",
    author: "Liban Ahmed",
    views: 3190,
    createdAt: "2026-06-09",
    updatedAt: "2026-06-11",
    ctaLabel: "",
    ctaUrl: "",
    placement: "content-planner",
    specificRoutes: [],
    startDate: "2026-06-11",
    endDate: "2026-06-25",
    priority: "low",
    dismissible: true,
    sticky: false,
    sections: [
      {
        id: "sec-1003-1",
        title: "Issue Fixed",
        icon: "Bug",
        color: "from-emerald-500 to-teal-500",
        blocks: [paragraph("Exports for clusters with more than 200 keywords would stall at 80% and time out.")],
      },
      {
        id: "sec-1003-2",
        title: "Root Cause",
        icon: "AlertTriangle",
        color: "from-emerald-500 to-teal-500",
        blocks: [paragraph("A memory limit in the export worker was being hit before large CSV files finished serializing.")],
      },
      {
        id: "sec-1003-3",
        title: "Resolution",
        icon: "ShieldCheck",
        color: "from-emerald-500 to-teal-500",
        blocks: [paragraph("Exports now stream in batches, removing the memory ceiling entirely.")],
      },
      {
        id: "sec-1003-4",
        title: "Status",
        icon: "CheckCircle2",
        color: "from-emerald-500 to-teal-500",
        blocks: [
          {
            id: makeBlockId(),
            type: "callout",
            tone: "success",
            title: "Fully resolved",
            text: "This fix is live for all accounts. If you still see stalled exports, contact support.",
          },
        ],
      },
    ],
  },
  {
    id: "ANN-1004",
    title: "June Product Update: What Shipped This Month",
    category: "product-update",
    badgeText: "Update",
    icon: "Megaphone",
    summary: "A roundup of every feature, fix, and improvement that shipped across HiigsiSEO in June.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    status: "published",
    featured: true,
    publishDate: "2026-06-21",
    author: "Jordan Diaz",
    views: 5430,
    createdAt: "2026-06-20",
    updatedAt: "2026-06-21",
    ctaLabel: "See Full Changelog",
    ctaUrl: "/dashboard",
    placement: "sitewide",
    specificRoutes: [],
    startDate: "2026-06-21",
    endDate: "",
    priority: "medium",
    dismissible: true,
    sticky: false,
    sections: [
      {
        id: "sec-1004-1",
        title: "Update Summary",
        icon: "Megaphone",
        color: "from-cyan-500 to-blue-500",
        blocks: [paragraph("June was a big month — Topical Authority entity maps, a faster generation engine, and a handful of quality-of-life fixes.")],
      },
      {
        id: "sec-1004-2",
        title: "Changes",
        icon: "Layers",
        color: "from-cyan-500 to-blue-500",
        blocks: [
          {
            id: makeBlockId(),
            type: "numberedList",
            items: [
              "Launched Topical Authority entity maps",
              "Cut Article Generator drafting time in half",
              "Fixed Content Planner export stalls on large clusters",
              "Added bulk credit adjustments to the admin dashboard",
            ],
          },
        ],
      },
      {
        id: "sec-1004-3",
        title: "User Impact",
        icon: "ThumbsUp",
        color: "from-cyan-500 to-blue-500",
        blocks: [paragraph("Faster workflows across the board, with fewer manual workarounds for large content clusters.")],
      },
      {
        id: "sec-1004-4",
        title: "Additional Notes",
        icon: "Bell",
        color: "from-cyan-500 to-blue-500",
        blocks: [paragraph("Have feedback on any of these changes? Reach out through the support center — we read every ticket.")],
      },
    ],
  },
  {
    id: "ANN-1005",
    title: "Scheduled Maintenance — June 25, 02:00 UTC",
    category: "maintenance",
    badgeText: "Scheduled",
    icon: "Wrench",
    summary: "Brief platform-wide maintenance to upgrade database infrastructure. Expect intermittent slowdowns.",
    coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop",
    status: "scheduled",
    featured: false,
    publishDate: "2026-06-25",
    author: "Jordan Diaz",
    views: 940,
    createdAt: "2026-06-18",
    updatedAt: "2026-06-22",
    ctaLabel: "",
    ctaUrl: "",
    placement: "sitewide",
    specificRoutes: [],
    startDate: "2026-06-25",
    endDate: "2026-06-25",
    priority: "high",
    dismissible: false,
    sticky: true,
    sections: [
      {
        id: "sec-1005-1",
        title: "Maintenance Window",
        icon: "CalendarClock",
        color: "from-amber-500 to-orange-500",
        blocks: [paragraph("June 25, 2026 — 02:00 to 03:00 UTC.")],
      },
      {
        id: "sec-1005-2",
        title: "Expected Downtime",
        icon: "Clock3",
        color: "from-amber-500 to-orange-500",
        blocks: [paragraph("Up to 15 minutes of read-only access. No data will be lost.")],
      },
      {
        id: "sec-1005-3",
        title: "Services Affected",
        icon: "Wrench",
        color: "from-amber-500 to-orange-500",
        blocks: [
          {
            id: makeBlockId(),
            type: "bulletList",
            items: ["Article Generator", "Content Planner", "Dashboard analytics"],
          },
        ],
      },
      {
        id: "sec-1005-4",
        title: "Status",
        icon: "AlertTriangle",
        color: "from-amber-500 to-orange-500",
        blocks: [
          {
            id: makeBlockId(),
            type: "callout",
            tone: "warning",
            title: "Upcoming",
            text: "This maintenance has not started yet. We'll post an update here once it's complete.",
          },
        ],
      },
      {
        id: "sec-1005-5",
        title: "Notes",
        icon: "Bell",
        color: "from-amber-500 to-orange-500",
        blocks: [paragraph("We recommend saving in-progress drafts before the maintenance window begins.")],
      },
    ],
  },
  {
    id: "ANN-1006",
    title: "Summer Sale: 30% Off Growth & Professional",
    category: "special-offer",
    badgeText: "Limited Time",
    icon: "Gift",
    summary: "For one week only, save 30% on Growth and Professional plans when you switch to annual billing.",
    coverImage: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=1600&auto=format&fit=crop",
    status: "published",
    featured: true,
    publishDate: "2026-06-20",
    author: "Sarah Chen",
    views: 15820,
    createdAt: "2026-06-17",
    updatedAt: "2026-06-20",
    ctaLabel: "Claim 30% Off",
    ctaUrl: "/pricing",
    placement: "pricing",
    specificRoutes: [],
    startDate: "2026-06-20",
    endDate: "2026-06-27",
    priority: "high",
    dismissible: true,
    sticky: false,
    sections: [
      {
        id: "sec-1006-1",
        title: "Offer Title",
        icon: "Gift",
        color: "from-fuchsia-500 to-purple-500",
        blocks: [paragraph("Summer Sale — 30% off Growth and Professional plans.")],
      },
      {
        id: "sec-1006-2",
        title: "Offer Description",
        icon: "PartyPopper",
        color: "from-fuchsia-500 to-purple-500",
        blocks: [paragraph("Switch to annual billing on Growth or Professional and lock in 30% savings for your first year.")],
      },
      {
        id: "sec-1006-3",
        title: "Discount",
        icon: "Tag",
        color: "from-fuchsia-500 to-purple-500",
        blocks: [
          {
            id: makeBlockId(),
            type: "callout",
            tone: "success",
            title: "Use code",
            text: "SUMMER30 at checkout to apply your discount automatically.",
          },
        ],
      },
      {
        id: "sec-1006-4",
        title: "Expiration Date",
        icon: "Clock3",
        color: "from-fuchsia-500 to-purple-500",
        blocks: [paragraph("Offer ends June 27, 2026 at 23:59 UTC.")],
      },
      {
        id: "sec-1006-5",
        title: "Terms",
        icon: "ShieldCheck",
        color: "from-fuchsia-500 to-purple-500",
        blocks: [paragraph("Valid for new annual subscriptions and upgrades only. Cannot be combined with other offers.")],
      },
      {
        id: "sec-1006-6",
        title: "Call To Action",
        icon: "Zap",
        color: "from-fuchsia-500 to-purple-500",
        blocks: [{ id: makeBlockId(), type: "button", label: "Claim 30% Off", href: "/pricing", style: "primary" }],
      },
    ],
  },
  {
    id: "ANN-1007",
    title: "Bulk Credit Adjustments in Admin Dashboard",
    category: "new-feature",
    badgeText: "New",
    icon: "Rocket",
    summary: "Admins can now adjust credits for multiple users at once instead of editing accounts one by one.",
    coverImage: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop",
    status: "draft",
    featured: false,
    publishDate: "2026-06-23",
    author: "Liban Ahmed",
    views: 0,
    createdAt: "2026-06-22",
    updatedAt: "2026-06-23",
    ctaLabel: "",
    ctaUrl: "",
    placement: "specific",
    specificRoutes: ["/dashboard/credits"],
    startDate: "2026-06-23",
    endDate: "",
    priority: "low",
    dismissible: true,
    sticky: false,
    sections: createSectionsFromTemplate("new-feature"),
  },
  {
    id: "ANN-1008",
    title: "Fixed: Payment Screenshot Upload Failing on Mobile",
    category: "bug-fix",
    badgeText: "Resolved",
    icon: "ShieldCheck",
    summary: "Mobile uploads of payment confirmation screenshots no longer fail silently.",
    coverImage: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1600&auto=format&fit=crop",
    status: "archived",
    featured: false,
    publishDate: "2026-06-05",
    author: "Hana Ismail",
    views: 2210,
    createdAt: "2026-06-04",
    updatedAt: "2026-06-05",
    ctaLabel: "",
    ctaUrl: "",
    placement: "dashboard",
    specificRoutes: [],
    startDate: "2026-06-05",
    endDate: "2026-06-12",
    priority: "low",
    dismissible: true,
    sticky: false,
    sections: [
      {
        id: "sec-1008-1",
        title: "Issue Fixed",
        icon: "Bug",
        color: "from-emerald-500 to-teal-500",
        blocks: [paragraph("Uploading a Zaad or E-Dahab payment screenshot from a mobile browser would fail without an error message.")],
      },
      {
        id: "sec-1008-2",
        title: "Root Cause",
        icon: "AlertTriangle",
        color: "from-emerald-500 to-teal-500",
        blocks: [paragraph("Image uploads above 5MB from mobile cameras were silently rejected by the upload handler.")],
      },
      {
        id: "sec-1008-3",
        title: "Resolution",
        icon: "ShieldCheck",
        color: "from-emerald-500 to-teal-500",
        blocks: [paragraph("Uploads are now automatically compressed client-side before submission, and failures show a clear retry prompt.")],
      },
      {
        id: "sec-1008-4",
        title: "Status",
        icon: "CheckCircle2",
        color: "from-emerald-500 to-teal-500",
        blocks: [paragraph("Live for all users on web and mobile.")],
      },
    ],
  },
  {
    id: "ANN-1009",
    title: "Dark Mode Refinements Across the Dashboard",
    category: "improvement",
    badgeText: "Improved",
    icon: "Sparkles",
    summary: "Improved contrast, refined glassmorphism surfaces, and smoother transitions across every dashboard view.",
    coverImage: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop",
    status: "scheduled",
    featured: false,
    publishDate: "2026-06-28",
    author: "Marcus Webb",
    views: 0,
    createdAt: "2026-06-21",
    updatedAt: "2026-06-22",
    ctaLabel: "",
    ctaUrl: "",
    placement: "dashboard",
    specificRoutes: [],
    startDate: "2026-06-28",
    endDate: "",
    priority: "low",
    dismissible: true,
    sticky: false,
    sections: createSectionsFromTemplate("improvement"),
  },
]

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

export function getAnnouncementById(id: string): Announcement | undefined {
  return announcements.find((item) => item.id === id)
}

const TODAY = "2026-06-23"

export function isBannerActive(announcement: Announcement, today = TODAY): boolean {
  if (announcement.status !== "published") return false
  if (announcement.startDate && announcement.startDate > today) return false
  if (announcement.endDate && announcement.endDate < today) return false
  return true
}

const PRIORITY_WEIGHT: Record<BannerPriority, number> = { high: 2, medium: 1, low: 0 }

export function getActiveBanners(): Announcement[] {
  return announcements
    .filter((item) => isBannerActive(item))
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1
      const priorityDiff = PRIORITY_WEIGHT[b.priority] - PRIORITY_WEIGHT[a.priority]
      if (priorityDiff !== 0) return priorityDiff
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    })
}

export function bannerMatchesPath(announcement: Announcement, pathname: string, scope: "public" | "dashboard"): boolean {
  if (announcement.placement === "sitewide") return true
  if (announcement.placement === "specific") return announcement.specificRoutes.includes(pathname)
  if (scope === "dashboard" && announcement.placement === "dashboard") return true
  if (announcement.placement === "article-generator") return pathname.startsWith("/dashboard/article-generator")
  if (announcement.placement === "content-planner") return pathname.startsWith("/dashboard/content-planner")
  if (announcement.placement === "pricing") return pathname === "/pricing"
  return false
}
