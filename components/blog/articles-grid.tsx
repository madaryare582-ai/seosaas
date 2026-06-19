import { ArticleCard } from "@/components/blog/article-card"
import type { BlogPost } from "@/lib/blog-data"

export function ArticlesGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Latest Articles
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <ArticleCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
