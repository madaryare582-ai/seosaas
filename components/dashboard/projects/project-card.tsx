"use client"

import * as React from "react"
import Link from "next/link"
import {
  BookOpen,
  Calendar,
  FileText,
  FolderOpen,
  Key,
  Network,
  Play,
  Trash2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { type Project, type ProjectStatus } from "@/lib/projects-data"
import { Button } from "@/components/ui/button"

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Draft: "bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/20",
  Active: "bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/20",
  Completed: "bg-indigo-400/10 text-indigo-400 ring-1 ring-indigo-400/20",
}

type ProjectCardProps = {
  project: Project
  onDelete: (id: string) => void
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const [confirmDelete, setConfirmDelete] = React.useState(false)

  const formatted = new Date(project.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const stats = [
    { icon: Key, label: "Keywords", value: project.stats.keywords },
    { icon: Network, label: "Topic Clusters", value: project.stats.topicClusters },
    { icon: FileText, label: "Planned Articles", value: project.stats.plannedArticles },
    { icon: BookOpen, label: "Published", value: project.stats.publishedArticles },
  ]

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/30 hover:bg-white/[0.08]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 opacity-10 blur-3xl transition-opacity group-hover:opacity-20"
      />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-foreground">{project.name}</p>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">{project.primaryNiche}</p>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-xs font-medium",
            STATUS_STYLES[project.status]
          )}
        >
          {project.status}
        </span>
      </div>

      {/* Date */}
      <div className="relative mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Calendar className="size-3.5" />
        Created {formatted}
      </div>

      {/* Stats grid */}
      <div className="relative mt-4 grid grid-cols-2 gap-2">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="flex flex-col gap-0.5 rounded-xl border border-white/8 bg-white/5 p-3"
          >
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Icon className="size-3" />
              <span className="text-xs">{label}</span>
            </div>
            <span className="text-lg font-semibold text-foreground">{value}</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="relative mt-4 flex flex-col gap-2">
        <div className="flex gap-2">
          <Button
            asChild
            size="sm"
            variant="outline"
            className="flex-1 border-white/10 bg-white/5 hover:bg-white/10"
          >
            <Link href={`/dashboard/projects/${project.id}`}>
              <FolderOpen className="size-3.5" />
              Open Project
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="flex-1 border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
          >
            <Link href={`/dashboard/niche-finder/${project.id}`}>
              <Play className="size-3.5" />
              Continue Workflow
            </Link>
          </Button>
        </div>

        {confirmDelete ? (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-white/10 bg-white/5 text-xs hover:bg-white/10"
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="flex-1 text-xs"
              onClick={() => onDelete(project.id)}
            >
              Confirm Delete
            </Button>
          </div>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            className="w-full text-xs text-muted-foreground hover:bg-rose-400/10 hover:text-rose-400"
            onClick={() => setConfirmDelete(true)}
          >
            <Trash2 className="size-3.5" />
            Delete Project
          </Button>
        )}
      </div>
    </div>
  )
}
