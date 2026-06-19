import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { BlogHero } from "@/components/blog/blog-hero"
import { FeaturedArticle } from "@/components/blog/featured-article"
import { ArticlesGrid } from "@/components/blog/articles-grid"
import { BlogSidebar } from "@/components/blog/blog-sidebar"
import { Pagination } from "@/components/blog/pagination"
import { CTA } from "@/components/marketing/cta"
import { blogPosts } from "@/lib/blog-data"

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured) ?? blogPosts[0]
  const otherPosts = blogPosts.filter((post) => post.slug !== featuredPost.slug)
  const latestPosts = blogPosts.slice(0, 5)

  return (
    <div className="dark flex min-h-screen flex-1 flex-col overflow-x-hidden bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <BlogHero />
        <FeaturedArticle post={featuredPost} />

        <section className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[7fr_3fr] lg:gap-12">
            <ArticlesGrid posts={otherPosts} />
            <BlogSidebar latestPosts={latestPosts} />
          </div>

          <div className="mt-12">
            <Pagination />
          </div>
        </section>

        <CTA
          description="Discover opportunities, organize content plans, and create content more efficiently with HiigsiSEO."
          trustSignals={[
            "Discover Opportunities",
            "Build Content Plans",
            "Create Content Faster",
          ]}
        />
      </main>
      <Footer />
    </div>
  )
}
