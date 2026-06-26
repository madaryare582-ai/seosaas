"use client"

import * as React from "react"
import { FolderOpen, Plus } from "lucide-react"

import { type Project, deleteProjectById, getProjects } from "@/lib/projects-data"
import { Button } from "@/components/ui/button"
import { NewProjectDialog } from "./new-project-dialog"
import { ProjectCard } from "./project-card"

export function ProjectsWorkspace() {
  const [projects, setProjects] = React.useState<Project[]>([])
  const [dialogOpen, setDialogOpen] = React.useState(false)

  React.useEffect(() => {
    setProjects(getProjects())
  }, [])

  function handleDelete(id: string) {
    deleteProjectById(id)
    setProjects(getProjects())
  }

  function handleCreated() {
    setProjects(getProjects())
    setDialogOpen(false)
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            My Projects
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your SEO projects, niches, topical authority, content plans, and articles.
          </p>
        </div>
        <Button
          onClick={() => setDialogOpen(true)}
          className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
        >
          <Plus className="size-4" />
          New Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-20 text-center backdrop-blur-xl">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <FolderOpen className="size-7 text-muted-foreground/50" />
          </div>
          <p className="mt-4 text-base font-semibold text-foreground">No projects yet</p>
          <p className="mt-1 max-w-xs text-sm text-muted-foreground">
            Create your first project to start building your SEO workflow.
          </p>
          <Button
            onClick={() => setDialogOpen(true)}
            className="mt-6 border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
          >
            <Plus className="size-4" />
            New Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <NewProjectDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreated={handleCreated}
      />
    </>
  )
}
