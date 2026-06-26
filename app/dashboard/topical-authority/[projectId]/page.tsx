import { EntityMap } from "@/components/dashboard/topical-authority/entity-map"
import { InternalLinking } from "@/components/dashboard/topical-authority/internal-linking"
import { TopicClusters } from "@/components/dashboard/topical-authority/topic-clusters"
import { ProjectContextBar } from "@/components/dashboard/projects/project-context-bar"
import { WorkflowNavigation } from "@/components/dashboard/projects/workflow-navigation"

export default async function TopicalAuthorityProjectPage({
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
          Topical Authority
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Map entities, close content gaps, and strengthen internal linking around your core topics.
        </p>
      </div>

      <TopicClusters />
      <EntityMap />
      <InternalLinking />

      <WorkflowNavigation projectId={projectId} currentStep="topical-authority" />
    </div>
  )
}
