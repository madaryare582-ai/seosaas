import { NicheFinderWorkspace } from "@/components/dashboard/niche-finder/niche-finder-workspace"
import { ProjectContextBar } from "@/components/dashboard/projects/project-context-bar"
import { WorkflowNavigation } from "@/components/dashboard/projects/workflow-navigation"

export default async function NicheFinderProjectPage({
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
          Niche Finder
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Discover profitable niches, validate keywords, and build a content strategy in minutes.
        </p>
      </div>

      <NicheFinderWorkspace />

      <WorkflowNavigation projectId={projectId} currentStep="niche-finder" />
    </div>
  )
}
