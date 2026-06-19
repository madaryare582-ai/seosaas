import { Search, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const filterCategories = [
  "All",
  "SEO",
  "Keyword Research",
  "Content Planning",
  "Topical Authority",
  "AI Content",
  "Case Studies",
]

export function BlogHero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 size-96 animate-pulse rounded-full bg-indigo-600/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -right-32 size-96 animate-pulse rounded-full bg-purple-600/30 blur-3xl [animation-delay:1s]"
      />

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:py-24 lg:px-8">
        <Badge className="border-0 bg-white/10 text-foreground">
          <Sparkles className="size-3" />
          HiigsiSEO Blog
        </Badge>

        <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          SEO Insights, Content Strategy{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            & Growth Guides
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Discover actionable SEO strategies, content planning tips, topical
          authority insights, and AI content workflows.
        </p>

        <div className="relative mx-auto mt-10 max-w-lg">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="h-12 rounded-full border-white/15 bg-white/5 pl-11 text-base backdrop-blur-xl placeholder:text-muted-foreground"
          />
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {filterCategories.map((category, index) => (
            <button
              key={category}
              type="button"
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                index === 0
                  ? "border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                  : "border-white/10 bg-white/5 text-muted-foreground hover:border-indigo-400/30 hover:bg-white/10 hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
