import { ContentCalendar } from "@/components/dashboard/content-planner/content-calendar"
import { CreatePlanDialog } from "@/components/dashboard/content-planner/create-plan-dialog"
import { ExportMenu } from "@/components/dashboard/content-planner/export-menu"
import { KeywordClusters } from "@/components/dashboard/content-planner/keyword-clusters"
import { SearchIntentTable } from "@/components/dashboard/content-planner/search-intent-table"
import { ProjectContextBar } from "@/components/dashboard/projects/project-context-bar"
import { WorkflowNavigation } from "@/components/dashboard/projects/workflow-navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function ContentPlannerProjectPage({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params

  return (
    <div className="flex flex-col gap-6">
      <ProjectContextBar projectId={projectId} />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Content Planner
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Plan, cluster, and schedule a month of SEO content in minutes.
          </p>
        </div>
        <div className="flex gap-2.5">
          <ExportMenu />
          <CreatePlanDialog />
        </div>
      </div>

      <Tabs defaultValue="calendar">
        <TabsList>
          <TabsTrigger value="calendar">Content Calendar</TabsTrigger>
          <TabsTrigger value="clusters">Keyword Clusters</TabsTrigger>
          <TabsTrigger value="intent">Search Intent</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="mt-5">
          <ContentCalendar />
        </TabsContent>
        <TabsContent value="clusters" className="mt-5">
          <KeywordClusters />
        </TabsContent>
        <TabsContent value="intent" className="mt-5">
          <SearchIntentTable />
        </TabsContent>
      </Tabs>

      <WorkflowNavigation projectId={projectId} currentStep="content-planner" />
    </div>
  )
}
