export type UserStatus = "active" | "suspended" | "pending"
export type UserRole = "owner" | "manager" | "editor" | "member"

export type AdminUser = {
  id: string
  name: string
  email: string
  plan: string
  role: UserRole
  status: UserStatus
  credits: { used: number; total: number }
  joined: string
}

export const adminUsers: AdminUser[] = [
  { id: "USR-1042", name: "Amina Yusuf", email: "amina@brightloop.co", plan: "Professional", role: "member", status: "active", credits: { used: 3120, total: 5000 }, joined: "2026-01-12" },
  { id: "USR-1041", name: "Jordan Diaz", email: "jordan@hiigsiseo.com", plan: "Growth", role: "owner", status: "active", credits: { used: 2450, total: 4000 }, joined: "2025-11-03" },
  { id: "USR-1040", name: "Sara Mohamed", email: "sara.m@northwind.io", plan: "Starter", role: "member", status: "pending", credits: { used: 120, total: 1000 }, joined: "2026-03-21" },
  { id: "USR-1039", name: "Liban Ahmed", email: "liban@dunia.so", plan: "Growth", role: "manager", status: "active", credits: { used: 1890, total: 4000 }, joined: "2025-09-18" },
  { id: "USR-1038", name: "Fatima Noor", email: "fatima@scalewise.com", plan: "Professional", role: "editor", status: "suspended", credits: { used: 4980, total: 5000 }, joined: "2025-07-02" },
  { id: "USR-1037", name: "Omar Said", email: "omar.said@vertex.dev", plan: "Starter", role: "member", status: "active", credits: { used: 410, total: 1000 }, joined: "2026-04-09" },
  { id: "USR-1036", name: "Hana Ismail", email: "hana@growthbox.ai", plan: "Professional", role: "member", status: "active", credits: { used: 4120, total: 5000 }, joined: "2025-12-30" },
]

export type PaymentStatus = "pending" | "approved" | "rejected"
export type PaymentMethod = "Binance Pay" | "Zaad" | "E-Dahab"

export type AdminPayment = {
  id: string
  user: string
  email: string
  plan: string
  amount: string
  method: PaymentMethod
  status: PaymentStatus
  date: string
  txnId: string
}

export const adminPayments: AdminPayment[] = [
  { id: "PAY-9081", user: "Amina Yusuf", email: "amina@brightloop.co", plan: "Professional", amount: "$39.00", method: "Binance Pay", status: "pending", date: "2026-06-21", txnId: "TXN883920" },
  { id: "PAY-9080", user: "Omar Said", email: "omar.said@vertex.dev", plan: "Starter", amount: "$12.00", method: "Zaad", status: "pending", date: "2026-06-21", txnId: "TXN883901" },
  { id: "PAY-9079", user: "Hana Ismail", email: "hana@growthbox.ai", plan: "Professional", amount: "$39.00", method: "E-Dahab", status: "approved", date: "2026-06-20", txnId: "TXN883844" },
  { id: "PAY-9078", user: "Liban Ahmed", email: "liban@dunia.so", plan: "Growth", amount: "$24.00", method: "Binance Pay", status: "approved", date: "2026-06-19", txnId: "TXN883790" },
  { id: "PAY-9077", user: "Fatima Noor", email: "fatima@scalewise.com", plan: "Professional", amount: "$39.00", method: "Zaad", status: "rejected", date: "2026-06-18", txnId: "TXN883711" },
  { id: "PAY-9076", user: "Sara Mohamed", email: "sara.m@northwind.io", plan: "Starter", amount: "$12.00", method: "E-Dahab", status: "approved", date: "2026-06-17", txnId: "TXN883658" },
  { id: "PAY-9075", user: "Jordan Diaz", email: "jordan@hiigsiseo.com", plan: "Growth", amount: "$24.00", method: "Binance Pay", status: "approved", date: "2026-06-15", txnId: "TXN883502" },
]

export type AdminPlan = {
  id: string
  name: string
  price: string
  period: string
  subscribers: number
  credits: number
  features: string[]
  accent: string
}

export const adminPlans: AdminPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$12",
    period: "/month",
    subscribers: 482,
    credits: 1000,
    features: ["1,000 credits / month", "1 Article Per Day", "Basic SEO Checklist", "Email Support"],
    accent: "from-blue-500 to-indigo-500",
  },
  {
    id: "growth",
    name: "Growth",
    price: "$24",
    period: "/month",
    subscribers: 311,
    credits: 4000,
    features: ["4,000 credits / month", "5 Articles Per Day", "Topical Authority Tools", "Priority Support"],
    accent: "from-indigo-500 via-violet-500 to-blue-500",
  },
  {
    id: "professional",
    name: "Professional",
    price: "$39",
    period: "/month",
    subscribers: 158,
    credits: 5000,
    features: ["5,000 credits / month", "Unlimited Articles", "Advanced Semantic SEO", "Dedicated Manager"],
    accent: "from-violet-500 to-blue-600",
  },
]

export type CreditLog = {
  id: string
  user: string
  type: "add" | "remove" | "usage"
  amount: number
  reason: string
  date: string
  by: string
}

export const creditLogs: CreditLog[] = [
  { id: "CR-5510", user: "Amina Yusuf", type: "usage", amount: -120, reason: "Article Generator", date: "2026-06-21 09:14", by: "System" },
  { id: "CR-5509", user: "Sara Mohamed", type: "add", amount: 500, reason: "Manual top-up — support request", date: "2026-06-20 16:02", by: "Jordan Diaz" },
  { id: "CR-5508", user: "Hana Ismail", type: "usage", amount: -340, reason: "Content Planner export", date: "2026-06-20 11:47", by: "System" },
  { id: "CR-5507", user: "Fatima Noor", type: "remove", amount: -200, reason: "Refund adjustment", date: "2026-06-19 14:23", by: "Liban Ahmed" },
  { id: "CR-5506", user: "Omar Said", type: "usage", amount: -80, reason: "Topical Authority scan", date: "2026-06-19 08:55", by: "System" },
]

export type BlogStatus = "published" | "draft"

export type AdminBlogPost = {
  id: string
  title: string
  status: BlogStatus
  author: string
  category: string
  date: string
  metaTitle: string
  metaDescription: string
  slug: string
}

export const adminBlogPosts: AdminBlogPost[] = [
  { id: "BLG-201", title: "How to Build Topical Authority in 2026", status: "published", author: "Hana Ismail", category: "SEO Strategy", date: "2026-06-18", metaTitle: "Build Topical Authority in 2026 | HiigsiSEO", metaDescription: "A complete guide to mapping entities and closing content gaps.", slug: "build-topical-authority-2026" },
  { id: "BLG-200", title: "EEAT Signals Every SaaS Blog Needs", status: "published", author: "Liban Ahmed", category: "Content", date: "2026-06-10", metaTitle: "EEAT Signals for SaaS Blogs | HiigsiSEO", metaDescription: "Experience, Expertise, Authority, and Trust checklist for content teams.", slug: "eeat-signals-saas-blog" },
  { id: "BLG-199", title: "Internal Linking Strategies That Actually Work", status: "draft", author: "Hana Ismail", category: "Technical SEO", date: "2026-06-22", metaTitle: "", metaDescription: "", slug: "internal-linking-strategies" },
  { id: "BLG-198", title: "Semantic SEO: A Practical Framework", status: "draft", author: "Jordan Diaz", category: "SEO Strategy", date: "2026-06-23", metaTitle: "", metaDescription: "", slug: "semantic-seo-framework" },
]

export type TicketPriority = "low" | "normal" | "high" | "urgent"
export type TicketStatus = "open" | "pending" | "resolved"

export type AdminTicket = {
  id: string
  subject: string
  user: string
  email: string
  priority: TicketPriority
  status: TicketStatus
  date: string
  hasAttachment: boolean
  messages: { from: "user" | "admin"; text: string; date: string }[]
}

export const adminTickets: AdminTicket[] = [
  {
    id: "TKT-3301",
    subject: "Article generation failed mid-export",
    user: "Amina Yusuf",
    email: "amina@brightloop.co",
    priority: "urgent",
    status: "open",
    date: "2026-06-21",
    hasAttachment: true,
    messages: [
      { from: "user", text: "The export got stuck at 80% and I lost my draft.", date: "2026-06-21 09:02" },
    ],
  },
  {
    id: "TKT-3300",
    subject: "Billing question about Growth plan",
    user: "Sara Mohamed",
    email: "sara.m@northwind.io",
    priority: "normal",
    status: "pending",
    date: "2026-06-20",
    hasAttachment: false,
    messages: [
      { from: "user", text: "Does the Growth plan include topical authority tools?", date: "2026-06-20 13:11" },
      { from: "admin", text: "Yes, it's included starting on Growth. Let me know if you'd like to upgrade.", date: "2026-06-20 13:40" },
    ],
  },
  {
    id: "TKT-3299",
    subject: "Payment screenshot not uploading",
    user: "Omar Said",
    email: "omar.said@vertex.dev",
    priority: "high",
    status: "open",
    date: "2026-06-19",
    hasAttachment: true,
    messages: [
      { from: "user", text: "I can't upload my Zaad screenshot, it keeps failing.", date: "2026-06-19 17:25" },
    ],
  },
  {
    id: "TKT-3298",
    subject: "Feature request: bulk article export",
    user: "Liban Ahmed",
    email: "liban@dunia.so",
    priority: "low",
    status: "resolved",
    date: "2026-06-15",
    hasAttachment: false,
    messages: [
      { from: "user", text: "Would love a bulk export option for articles.", date: "2026-06-15 10:00" },
      { from: "admin", text: "Thanks for the suggestion — added to our roadmap!", date: "2026-06-15 12:30" },
    ],
  },
]

export type Announcement = {
  id: string
  title: string
  audience: "all" | "starter" | "growth" | "professional"
  status: "scheduled" | "live" | "expired"
  date: string
}

export const adminAnnouncements: Announcement[] = [
  { id: "ANN-12", title: "New: Topical Authority entity maps are live", audience: "all", status: "live", date: "2026-06-19" },
  { id: "ANN-11", title: "Scheduled maintenance — June 25, 02:00 UTC", audience: "all", status: "scheduled", date: "2026-06-25" },
  { id: "ANN-10", title: "Professional plan: new dedicated manager rollout", audience: "professional", status: "live", date: "2026-06-12" },
  { id: "ANN-09", title: "Starter plan credit reset reminder", audience: "starter", status: "expired", date: "2026-05-30" },
]

export type AuditLogEntry = {
  id: string
  actor: string
  action: string
  target: string
  date: string
}

export const auditLog: AuditLogEntry[] = [
  { id: "AUD-771", actor: "Jordan Diaz", action: "Approved payment", target: "PAY-9079", date: "2026-06-20 18:02" },
  { id: "AUD-770", actor: "Liban Ahmed", action: "Suspended user", target: "USR-1038", date: "2026-06-19 11:15" },
  { id: "AUD-769", actor: "Hana Ismail", action: "Published blog post", target: "BLG-200", date: "2026-06-10 09:40" },
  { id: "AUD-768", actor: "Jordan Diaz", action: "Updated plan pricing", target: "Growth", date: "2026-06-05 15:22" },
  { id: "AUD-767", actor: "Liban Ahmed", action: "Added credits", target: "USR-1040", date: "2026-06-20 16:02" },
]

export const revenueSeries = [
  { month: "Jan", revenue: 8200 },
  { month: "Feb", revenue: 9100 },
  { month: "Mar", revenue: 10400 },
  { month: "Apr", revenue: 11800 },
  { month: "May", revenue: 13250 },
  { month: "Jun", revenue: 15420 },
]

export const userGrowthSeries = [
  { month: "Jan", users: 620 },
  { month: "Feb", users: 715 },
  { month: "Mar", users: 802 },
  { month: "Apr", users: 884 },
  { month: "May", users: 921 },
  { month: "Jun", users: 951 },
]

export const overviewKpis = [
  { label: "Total Users", value: "951", trend: "+18 this week", direction: "up" as const },
  { label: "Active Subscribers", value: "642", trend: "+6.2%", direction: "up" as const },
  { label: "Monthly Revenue", value: "$15,420", trend: "+16.4%", direction: "up" as const },
  { label: "Credits Consumed", value: "284,910", trend: "+9.1%", direction: "up" as const },
  { label: "Pending Payments", value: "2", trend: "Needs review", direction: "down" as const },
  { label: "Open Support Tickets", value: "2", trend: "1 urgent", direction: "down" as const },
]

export const activityFeed = [
  { actor: "Jordan Diaz", action: "approved a Binance Pay payment from Hana Ismail", date: "2 minutes ago" },
  { actor: "System", action: "generated 14 new articles in the last hour", date: "12 minutes ago" },
  { actor: "Liban Ahmed", action: "suspended user Fatima Noor", date: "1 hour ago" },
  { actor: "Hana Ismail", action: "published \"How to Build Topical Authority in 2026\"", date: "3 hours ago" },
  { actor: "System", action: "flagged a failed export for Amina Yusuf", date: "5 hours ago" },
]
