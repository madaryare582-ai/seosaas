import type { Transition } from "framer-motion"

import type { AnnouncementCategory } from "@/lib/announcements-data"

// ---------------------------------------------------------------------------
// Banner entrance / dismiss
// ---------------------------------------------------------------------------

export const BANNER_ENTRANCE_INITIAL = { y: "-100%", opacity: 0 }
export const BANNER_ENTRANCE_ANIMATE = { y: 0, opacity: 1 }
export const BANNER_ENTRANCE_TRANSITION: Transition = { duration: 0.5, ease: "easeOut" }

export const BANNER_ENTRANCE_INITIAL_REDUCED = { opacity: 0 }
export const BANNER_ENTRANCE_ANIMATE_REDUCED = { opacity: 1 }
export const BANNER_ENTRANCE_TRANSITION_REDUCED: Transition = { duration: 0.3, ease: "easeOut" }

export const BANNER_EXIT = { opacity: 0, y: -20, height: 0, marginTop: 0 }
export const BANNER_EXIT_TRANSITION: Transition = { duration: 0.3, ease: "easeInOut" }

export const BANNER_EXIT_REDUCED = { opacity: 0, height: 0, marginTop: 0 }
export const BANNER_EXIT_TRANSITION_REDUCED: Transition = { duration: 0.2, ease: "easeInOut" }

// ---------------------------------------------------------------------------
// Animated gradient background
// ---------------------------------------------------------------------------

export const GRADIENT_BACKGROUND_SIZE = { backgroundSize: "200% 100%" }
export const GRADIENT_ANIMATE = { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
export const GRADIENT_TRANSITION: Transition = { duration: 15, repeat: Infinity, ease: "linear" }

// ---------------------------------------------------------------------------
// Floating category icon motion
// ---------------------------------------------------------------------------

type IconMotion = {
  animate: Record<string, (string | number)[]>
  transition: Transition
}

export const ICON_MOTION: Record<AnnouncementCategory, IconMotion> = {
  "new-feature": {
    // Gentle floating effect
    animate: { y: [0, -4, 0] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  improvement: {
    // Soft pulse
    animate: { scale: [1, 1.08, 1] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
  "bug-fix": {
    // Subtle success glow pulse
    animate: {
      filter: [
        "drop-shadow(0 0 0px rgba(16,185,129,0))",
        "drop-shadow(0 0 6px rgba(16,185,129,0.7))",
        "drop-shadow(0 0 0px rgba(16,185,129,0))",
      ],
    },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
  "product-update": {
    // Gentle bounce
    animate: { y: [0, -5, 0] },
    transition: { duration: 4, repeat: Infinity, ease: [0.34, 1.56, 0.64, 1] },
  },
  maintenance: {
    // Soft warning pulse
    animate: { scale: [1, 1.06, 1], opacity: [1, 0.85, 1] },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
  "special-offer": {
    // Gentle shimmer is rendered as an overlay sweep, icon itself stays steady
    animate: { scale: [1, 1, 1] },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
}

export const ICON_SHIMMER_ANIMATE = { x: ["-100%", "400%"] }
export const ICON_SHIMMER_TRANSITION: Transition = { duration: 3, repeat: Infinity, ease: "linear" }

// ---------------------------------------------------------------------------
// CTA shimmer button
// ---------------------------------------------------------------------------

export const CTA_WHILE_HOVER = { scale: 1.03 }
export const CTA_WHILE_TAP = { scale: 0.97 }
export const CTA_SHIMMER_ANIMATE = { x: ["-100%", "400%"] }
export const CTA_SHIMMER_TRANSITION: Transition = { duration: 2, repeat: Infinity, ease: "linear" }
