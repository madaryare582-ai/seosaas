import { ArticleGeneratorPanel } from "@/components/dashboard/article-generator/article-generator-panel"
import { ArticleHistory } from "@/components/dashboard/article-generator/article-history"
import { OutlinePanel } from "@/components/dashboard/article-generator/outline-panel"
import { SeoScore } from "@/components/dashboard/article-generator/seo-score"

export default function ArticleGeneratorPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Article Generator
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Generate fully-optimized SEO articles, complete with outline and on-page checklist.
        </p>
      </div>

      <ArticleGeneratorPanel />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <OutlinePanel />
        <SeoScore />
      </div>

      <ArticleHistory />
    </div>
  )
}
