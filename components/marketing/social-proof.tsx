"use client"

import { useEffect, useRef, useState } from "react"
import { FileText, ListChecks, Search, type LucideIcon } from "lucide-react"

type Stat = {
  icon: LucideIcon
  value: number
  suffix: string
  label: string
}

const stats: Stat[] = [
  { icon: FileText, value: 10000, suffix: "+", label: "Articles Generated" },
  { icon: Search, value: 5000, suffix: "+", label: "Keywords Researched" },
  { icon: ListChecks, value: 1200, suffix: "+", label: "Content Plans Created" },
]

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    let frame: number
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target, duration])

  return value
}

function StatCard({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const count = useCountUp(stat.value, visible)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 hover:-translate-y-1 hover:border-indigo-400/30 hover:bg-white/8 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_20px_40px_-15px_rgba(49,46,129,0.4)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 left-1/2 size-32 -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
      />
      <span className="relative mx-auto flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-950/40 transition-transform duration-500 group-hover:scale-110">
        <stat.icon className="size-6 text-white" />
      </span>
      <p className="relative mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {count.toLocaleString()}
        {stat.suffix}
      </p>
      <p className="relative mt-2 text-sm font-medium text-muted-foreground">
        {stat.label}
      </p>
    </div>
  )
}

export function SocialProof() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
        {stats.map((stat) => (
          <StatCard key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  )
}
