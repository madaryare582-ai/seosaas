"use client"

import { createElement } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { X } from "lucide-react"

import {
  CTA_SHIMMER_ANIMATE,
  CTA_SHIMMER_TRANSITION,
  CTA_WHILE_HOVER,
  CTA_WHILE_TAP,
  GRADIENT_ANIMATE,
  GRADIENT_BACKGROUND_SIZE,
  GRADIENT_TRANSITION,
  ICON_MOTION,
  ICON_SHIMMER_ANIMATE,
  ICON_SHIMMER_TRANSITION,
} from "@/components/banners/banner-motion"
import { cn } from "@/lib/utils"
import { getCategoryMeta, getIcon, type Announcement, type BannerVariant } from "@/lib/announcements-data"

type BannerStyle = {
  container: string
  iconWrap: string
  badge: string
  title: string
  summary: string
  cta: string
  dismiss: string
}

const BANNER_STYLES: Record<BannerVariant, BannerStyle> = {
  gradient: {
    container: "border-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 shadow-lg shadow-violet-950/30",
    iconWrap: "bg-white/15 text-white",
    badge: "border-white/30 bg-white/15 text-white",
    title: "text-white",
    summary: "text-white/85",
    cta: "bg-white text-violet-700 hover:bg-white/90",
    dismiss: "text-white/70 hover:bg-white/15 hover:text-white",
  },
  info: {
    container: "border-b border-blue-400/30 bg-gradient-to-r from-blue-500/10 via-blue-400/20 to-blue-500/10",
    iconWrap: "bg-blue-500/15 text-blue-300",
    badge: "border-blue-400/30 bg-blue-500/10 text-blue-300",
    title: "text-foreground",
    summary: "text-muted-foreground",
    cta: "border border-blue-400/40 text-blue-300 hover:bg-blue-500/10",
    dismiss: "text-muted-foreground hover:bg-muted hover:text-foreground",
  },
  success: {
    container: "border-b border-emerald-400/30 bg-gradient-to-r from-emerald-500/10 via-emerald-400/20 to-emerald-500/10",
    iconWrap: "bg-emerald-500/15 text-emerald-300",
    badge: "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
    title: "text-foreground",
    summary: "text-muted-foreground",
    cta: "border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/10",
    dismiss: "text-muted-foreground hover:bg-muted hover:text-foreground",
  },
  announcement: {
    container: "border-b border-cyan-400/30 bg-gradient-to-r from-cyan-500/10 via-cyan-400/20 to-cyan-500/10",
    iconWrap: "bg-cyan-500/15 text-cyan-300",
    badge: "border-cyan-400/30 bg-cyan-500/10 text-cyan-300",
    title: "text-foreground",
    summary: "text-muted-foreground",
    cta: "border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/10",
    dismiss: "text-muted-foreground hover:bg-muted hover:text-foreground",
  },
  warning: {
    container: "border-b border-amber-400/30 bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10",
    iconWrap: "bg-amber-500/15 text-amber-300",
    badge: "border-amber-400/30 bg-amber-500/10 text-amber-300",
    title: "text-foreground",
    summary: "text-muted-foreground",
    cta: "border border-amber-400/40 text-amber-300 hover:bg-amber-500/10",
    dismiss: "text-muted-foreground hover:bg-muted hover:text-foreground",
  },
  promotional: {
    container: "border-0 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-pink-600 shadow-lg shadow-fuchsia-950/30",
    iconWrap: "bg-white/15 text-white",
    badge: "border-white/30 bg-white/15 text-white",
    title: "text-white",
    summary: "text-white/85",
    cta: "bg-white text-fuchsia-700 hover:bg-white/90",
    dismiss: "text-white/70 hover:bg-white/15 hover:text-white",
  },
}

export function AnnouncementBanner({
  announcement,
  onDismiss,
  className,
}: {
  announcement: Announcement
  onDismiss?: () => void
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion()
  const meta = getCategoryMeta(announcement.category)
  const style = BANNER_STYLES[meta.bannerVariant]
  const Icon = getIcon(announcement.icon)
  const showDismiss = announcement.dismissible && Boolean(onDismiss)
  const iconMotion = ICON_MOTION[announcement.category]
  const isShimmerIcon = announcement.category === "special-offer"

  return (
    <motion.div
      className={cn("relative w-full px-4 py-3 sm:px-6", style.container, announcement.sticky && "sticky top-0 z-40", className)}
      style={prefersReducedMotion ? undefined : GRADIENT_BACKGROUND_SIZE}
      animate={prefersReducedMotion ? undefined : GRADIENT_ANIMATE}
      transition={prefersReducedMotion ? undefined : GRADIENT_TRANSITION}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex flex-1 items-center gap-3">
          <motion.span
            className={cn("relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl", style.iconWrap)}
            animate={prefersReducedMotion ? undefined : iconMotion.animate}
            transition={prefersReducedMotion ? undefined : iconMotion.transition}
          >
            {createElement(Icon, { className: "size-4.5" })}
            {isShimmerIcon && !prefersReducedMotion && (
              <motion.span
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
                animate={ICON_SHIMMER_ANIMATE}
                transition={ICON_SHIMMER_TRANSITION}
              />
            )}
          </motion.span>
          <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2.5">
            {announcement.badgeText && (
              <span className={cn("inline-flex w-fit items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase", style.badge)}>
                {announcement.badgeText}
              </span>
            )}
            <p className={cn("truncate text-sm font-semibold sm:text-base", style.title)}>{announcement.title}</p>
            <p className={cn("hidden truncate text-sm sm:block", style.summary)}>{announcement.summary}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
          {announcement.ctaLabel && announcement.ctaUrl && (
            <motion.div
              className="relative overflow-hidden rounded-lg"
              whileHover={prefersReducedMotion ? undefined : CTA_WHILE_HOVER}
              whileTap={prefersReducedMotion ? undefined : CTA_WHILE_TAP}
            >
              <Link
                href={announcement.ctaUrl}
                className={cn("relative z-10 inline-flex h-8 shrink-0 items-center justify-center rounded-lg px-3 text-sm font-semibold transition-colors", style.cta)}
              >
                {announcement.ctaLabel}
              </Link>
              {!prefersReducedMotion && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={CTA_SHIMMER_ANIMATE}
                  transition={CTA_SHIMMER_TRANSITION}
                />
              )}
            </motion.div>
          )}
          {showDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss banner"
              className={cn("flex size-7 shrink-0 items-center justify-center rounded-full transition-colors", style.dismiss)}
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
