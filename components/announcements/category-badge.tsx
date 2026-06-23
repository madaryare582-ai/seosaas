import { createElement } from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { getCategoryMeta, getIcon, type AnnouncementCategory } from "@/lib/announcements-data"

export function CategoryBadge({
  category,
  className,
}: {
  category: AnnouncementCategory
  className?: string
}) {
  const meta = getCategoryMeta(category)
  return (
    <Badge variant="outline" className={cn("gap-1.5 border", meta.badgeClass, className)}>
      <span aria-hidden>{meta.emoji}</span>
      {meta.label}
    </Badge>
  )
}

const SIZE_MAP = {
  sm: { wrap: "size-9 rounded-xl", icon: "size-4" },
  md: { wrap: "size-12 rounded-2xl", icon: "size-5" },
  lg: { wrap: "size-16 rounded-3xl", icon: "size-7" },
  xl: { wrap: "size-20 rounded-3xl", icon: "size-9" },
}

export function CategoryIcon({
  category,
  icon,
  size = "md",
  className,
}: {
  category: AnnouncementCategory
  icon?: string
  size?: keyof typeof SIZE_MAP
  className?: string
}) {
  const meta = getCategoryMeta(category)
  const Icon = icon ? getIcon(icon) : meta.icon
  const sizing = SIZE_MAP[size]

  return (
    <span
      className={cn(
        "relative flex shrink-0 items-center justify-center bg-gradient-to-br shadow-lg",
        meta.gradient,
        sizing.wrap,
        className
      )}
    >
      {createElement(Icon, { className: cn("text-white", sizing.icon) })}
    </span>
  )
}
