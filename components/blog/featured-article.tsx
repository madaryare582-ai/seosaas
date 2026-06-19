import Link from "next/link"
import { ArrowRight, Calendar, Clock, Sparkles, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { BlogPost } from "@/lib/blog-data"

export function FeaturedArticle({ post }: { post: BlogPost }) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_40px_100px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 hover:border-indigo-400/30">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent lg:aspect-auto lg:min-h-[24rem]">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(99,102,241,0.25),_transparent_60%)]"
            />
            <post.icon className="relative size-20 text-white/20 transition-transform duration-500 group-hover:scale-110" />
            <Badge className="absolute top-5 left-5 flex items-center gap-1 border-0 bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 text-white shadow-lg shadow-indigo-950/50">
              <Sparkles className="size-3" />
              Featured
            </Badge>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
            <Badge
              variant="outline"
              className="w-fit border-indigo-400/30 text-indigo-300"
            >
              {post.category}
            </Badge>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
              {post.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="size-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="size-4" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" />
                {post.readingTime}
              </span>
            </div>

            <Button
              asChild
              size="lg"
              className="group/btn mt-8 h-12 w-fit border-0 bg-gradient-to-r from-indigo-500 to-purple-600 px-8 text-base text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-400 hover:to-purple-500 hover:shadow-indigo-500/40"
            >
              <Link href="#" className="flex items-center gap-2">
                Read More
                <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
