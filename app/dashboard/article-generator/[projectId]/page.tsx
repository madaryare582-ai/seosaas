import { ArticleGeneratorPanel } from "@/components/dashboard/article-generator/article-generator-panel"
import { ArticleHistory } from "@/components/dashboard/article-generator/article-history"
import { ProjectContextBar } from "@/components/dashboard/projects/project-context-bar"

export default async function ArticleGeneratorProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  return (
    <div className="flex flex-col gap-6">
      <ProjectContextBar projectId={projectId} />

      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Article Generator
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure, generate, and edit fully-optimized SEO articles in one live workspace.
        </p>
      </div>

      <ArticleGeneratorPanel />

      <ArticleHistory />
    </div>
  )
}
