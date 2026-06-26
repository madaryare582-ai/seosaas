import { ProjectDetailWorkspace } from "@/components/dashboard/projects/project-detail-workspace"

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  return <ProjectDetailWorkspace projectId={projectId} />
}
