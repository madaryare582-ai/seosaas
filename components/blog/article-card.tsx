import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { BlogPost } from "@/lib/blog-data"

export function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <div className="group relative flex min-h-[26rem] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 hover:-translate-y-2 hover:border-indigo-400/30 hover:bg-white/8 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_25px_50px_-12px_rgba(49,46,129,0.5)]">
      <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-white/10 bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-transparent">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(99,102,241,0.2),_transparent_60%)]"
        />
        <post.icon className="relative size-12 text-white/20 transition-transform duration-500 group-hover:scale-110" />
        <Badge
          variant="outline"
          className="absolute top-4 left-4 border-indigo-400/30 bg-background/60 text-indigo-300 backdrop-blur-sm"
        >
          {post.category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-indigo-300">
          {post.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {post.readingTime}
          </span>
        </div>

        <Link
          href="#"
          className="group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-300 transition-all duration-200 hover:gap-2.5 hover:text-indigo-200"
        >
          Read More
          <ArrowRight className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}
