import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { StatusBadge } from "@/components/admin/shared/status-badge"
import { Button } from "@/components/ui/button"
import { adminBlogPosts } from "@/lib/admin-data"

export function LatestPosts() {
  const rows = adminBlogPosts.slice(0, 4)

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Latest Blog Posts</p>
          <p className="text-xs text-muted-foreground">Published and drafts</p>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/admin/blog">
            View all
            <ArrowUpRight />
          </Link>
        </Button>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {rows.map((post) => (
          <Link
            key={post.id}
            href="/admin/blog"
            className="flex items-center gap-3 rounded-xl border border-border bg-background/50 px-3 py-2.5 transition-colors hover:border-indigo-400/40 hover:bg-accent"
          >
            <div className="flex min-w-0 flex-1 flex-col">
              <span className="truncate text-sm font-medium text-foreground">{post.title}</span>
              <span className="truncate text-xs text-muted-foreground">{post.author} · {post.category}</span>
            </div>
            <StatusBadge status={post.status} />
          </Link>
        ))}
      </div>
    </div>
  )
}
