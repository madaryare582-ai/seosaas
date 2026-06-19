import Link from "next/link"

import { NewsletterCard } from "@/components/blog/newsletter-card"
import { categories, type BlogPost } from "@/lib/blog-data"

export function BlogSidebar({ latestPosts }: { latestPosts: BlogPost[] }) {
  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150">
        <h3 className="text-base font-semibold text-foreground">
          Categories
        </h3>
        <ul className="mt-4 flex flex-col gap-1">
          {categories.map((category) => (
            <li key={category}>
              <Link
                href="#"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150">
        <h3 className="text-base font-semibold text-foreground">
          Latest Articles
        </h3>
        <ul className="mt-4 flex flex-col gap-4">
          {latestPosts.map((post) => (
            <li key={post.slug}>
              <Link href="#" className="group block">
                <p className="text-sm font-medium text-foreground transition-colors group-hover:text-indigo-300">
                  {post.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {post.date}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <NewsletterCard />

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150">
        <h3 className="text-base font-semibold text-foreground">
          About HiigsiSEO
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          HiigsiSEO helps bloggers, niche site owners, and SEO teams organize
          content workflows and build stronger content strategies.
        </p>
      </div>
    </aside>
  )
}
