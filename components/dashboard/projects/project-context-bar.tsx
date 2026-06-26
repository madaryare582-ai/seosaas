"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, FolderKanban } from "lucide-react"

import { cn } from "@/lib/utils"
import { type Project, type ProjectStatus, getProjectById } from "@/lib/projects-data"

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Draft: "bg-amber-400/10 text-amber-400",
  Active: "bg-emerald-400/10 text-emerald-400",
  Completed: "bg-indigo-400/10 text-indigo-400",
}

export function ProjectContextBar({ projectId }: { projectId: string }) {
  const [project, setProject] = React.useState<Project | null>(null)

  React.useEffect(() => {
    const p = getProjectById(projectId)
    if (p) setProject(p)
  }, [projectId])

  if (!project) return null

  return (
    <div className="flex items-center gap-3 rounded-xl border border-indigo-400/20 bg-indigo-500/5 px-4 py-3">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
        <FolderKanban className="size-4 text-white" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-foreground">{project.name}</p>
        <p className="text-xs text-muted-foreground">
          {project.primaryNiche} · {project.targetCountry}
        </p>
      </div>
      <span
        className={cn(
          "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
          STATUS_STYLES[project.status]
        )}
      >
        {project.status}
      </span>
      <Link
        href="/dashboard/projects"
        className="ml-1 flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3" />
        Projects
      </Link>
    </div>
  )
}
