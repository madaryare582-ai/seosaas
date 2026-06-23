"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

import { AnnouncementBanner } from "@/components/banners/announcement-banner"
import {
  BANNER_ENTRANCE_ANIMATE,
  BANNER_ENTRANCE_ANIMATE_REDUCED,
  BANNER_ENTRANCE_INITIAL,
  BANNER_ENTRANCE_INITIAL_REDUCED,
  BANNER_ENTRANCE_TRANSITION,
  BANNER_ENTRANCE_TRANSITION_REDUCED,
  BANNER_EXIT,
  BANNER_EXIT_REDUCED,
  BANNER_EXIT_TRANSITION,
  BANNER_EXIT_TRANSITION_REDUCED,
} from "@/components/banners/banner-motion"
import { bannerMatchesPath, getActiveBanners } from "@/lib/announcements-data"

const MAX_VISIBLE = 2

export function AnnouncementBanners({ scope }: { scope: "public" | "dashboard" }) {
  const pathname = usePathname()
  const prefersReducedMotion = useReducedMotion()
  const [dismissed, setDismissed] = React.useState<string[]>([])

  const banners = React.useMemo(() => {
    return getActiveBanners()
      .filter((item) => bannerMatchesPath(item, pathname, scope))
      .filter((item) => !dismissed.includes(item.id))
      .slice(0, MAX_VISIBLE)
  }, [pathname, scope, dismissed])

  function dismiss(id: string) {
    setDismissed((prev) => [...prev, id])
  }

  if (banners.length === 0) return null

  return (
    <div className="flex flex-col">
      <AnimatePresence>
        {banners.map((banner) => (
          <motion.div
            key={banner.id}
            style={{ overflow: "hidden" }}
            initial={
              prefersReducedMotion
                ? { ...BANNER_ENTRANCE_INITIAL_REDUCED, transition: BANNER_ENTRANCE_TRANSITION_REDUCED }
                : { ...BANNER_ENTRANCE_INITIAL, transition: BANNER_ENTRANCE_TRANSITION }
            }
            animate={
              prefersReducedMotion
                ? { ...BANNER_ENTRANCE_ANIMATE_REDUCED, transition: BANNER_ENTRANCE_TRANSITION_REDUCED }
                : { ...BANNER_ENTRANCE_ANIMATE, transition: BANNER_ENTRANCE_TRANSITION }
            }
            exit={
              prefersReducedMotion
                ? { ...BANNER_EXIT_REDUCED, transition: BANNER_EXIT_TRANSITION_REDUCED }
                : { ...BANNER_EXIT, transition: BANNER_EXIT_TRANSITION }
            }
          >
            <AnnouncementBanner
              announcement={banner}
              onDismiss={banner.dismissible ? () => dismiss(banner.id) : undefined}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
