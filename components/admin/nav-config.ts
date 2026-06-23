import {
  CreditCard,
  FileText,
  Gauge,
  KeyRound,
  LifeBuoy,
  Megaphone,
  Package,
  Settings,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"

export type AdminNavItem = {
  label: string
  href: string
  icon: LucideIcon
}

export const adminNavItems: AdminNavItem[] = [
  { label: "Overview", href: "/admin", icon: Gauge },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Plans", href: "/admin/plans", icon: Package },
  { label: "Payments", href: "/admin/payments", icon: Wallet },
  { label: "Credits", href: "/admin/credits", icon: CreditCard },
  { label: "Blog Posts", href: "/admin/blog", icon: FileText },
  { label: "Support Tickets", href: "/admin/support", icon: LifeBuoy },
  { label: "Roles & Permissions", href: "/admin/roles", icon: KeyRound },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]
