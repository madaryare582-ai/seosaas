import {
  Compass,
  CreditCard,
  FileText,
  FolderKanban,
  Gauge,
  LifeBuoy,
  ListChecks,
  Network,
  Settings,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  label: string
  href: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: Gauge },
  { label: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { label: "Niche Finder", href: "/dashboard/niche-finder", icon: Compass },
  { label: "Content Planner", href: "/dashboard/content-planner", icon: ListChecks },
  { label: "Topical Authority", href: "/dashboard/topical-authority", icon: Network },
  { label: "Article Generator", href: "/dashboard/article-generator", icon: FileText },
  { label: "Credits", href: "/dashboard/credits", icon: CreditCard },
  { label: "Support", href: "/dashboard/support", icon: LifeBuoy },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]
