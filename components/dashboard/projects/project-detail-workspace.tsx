"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  Circle,
  Compass,
  FileText,
  FolderKanban,
  Key,
  ListChecks,
  Network,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { type Project, type ProjectStatus, getProjectById } from "@/lib/projects-data"
import { Button } from "@/components/ui/button"

const STATUS_STYLES: Record<ProjectStatus, string> = {
  Draft: "bg-amber-400/10 text-amber-400 ring-1 ring-amber-400/20",
  Active: "bg-emerald-400/10 text-emerald-400 ring-1 ring-emerald-400/20",
  Completed: "bg-indigo-400/10 text-indigo-400 ring-1 ring-indigo-400/20",
}

type WorkflowStep = {
  label: string
  description: string
  icon: React.ElementType
  href: (id: string) => string
  done: (p: Project) => boolean
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    label: "Niche Finder",
    description: "Discover profitable niches and validate keywords",
    icon: Compass,
    href: (id) => `/dashboard/niche-finder/${id}`,
    done: (p) => p.stats.keywords > 0,
  },
  {
    label: "Topical Authority",
    description: "Map entities and build topic clusters",
    icon: Network,
    href: (id) => `/dashboard/topical-authority/${id}`,
    done: (p) => p.stats.topicClusters > 0,
  },
  {
    label: "Content Planner",
    description: "Schedule and organise your content pipeline",
    icon: ListChecks,
    href: (id) => `/dashboard/content-planner/${id}`,
    done: (p) => p.stats.plannedArticles > 0,
  },
  {
    label: "Article Generator",
    description: "Generate and publish SEO-optimised articles",
    icon: FileText,
    href: (id) => `/dashboard/article-generator/${id}`,
    done: (p) => p.stats.publishedArticles > 0,
  },
]

export function ProjectDetailWorkspace({ projectId }: { projectId: string }) {
  const [project, setProject] = React.useState<Project | null | "not-found">(null)

  React.useEffect(() => {
    const p = getProjectById(projectId)
    setProject(p ?? "not-found")
  }, [projectId])

  if (project === null) return null

  if (project === "not-found") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 py-20 text-center backdrop-blur-xl">
        <FolderKanban className="size-12 text-muted-foreground/40" />
        <p className="mt-4 text-base font-semibold text-foreground">Project not found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          This project may have been deleted or doesn&apos;t exist.
        </p>
        <Button asChild variant="outline" className="mt-6 border-white/10 bg-white/5 hover:bg-white/10">
          <Link href="/dashboard/projects">
            <ArrowLeft className="size-4" />
            Back to Projects
          </Link>
        </Button>
      </div>
    )
  }

  const formatted = new Date(project.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const detailStats = [
    { icon: Key, label: "Keywords", value: project.stats.keywords, accent: "from-indigo-500 via-violet-500 to-fuchsia-500" },
    { icon: Network, label: "Topic Clusters", value: project.stats.topicClusters, accent: "from-violet-500 to-indigo-500" },
    { icon: FileText, label: "Planned Articles", value: project.stats.plannedArticles, accent: "from-fuchsia-500 to-violet-500" },
    { icon: BookOpen, label: "Published Articles", value: project.stats.publishedArticles, accent: "from-indigo-500 to-fuchsia-500" },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Back link */}
      <Link
        href="/dashboard/projects"
        className="flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Projects
      </Link>

      {/* Project header card */}
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 opacity-10 blur-3xl"
        />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg">
              <FolderKanban className="size-6 text-white" />
            </span>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {project.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{project.primaryNiche}</p>
            </div>
          </div>
          <span
            className={cn(
              "w-fit shrink-0 rounded-full px-3 py-1.5 text-sm font-medium",
              STATUS_STYLES[project.status]
            )}
          >
            {project.status}
          </span>
        </div>

        <div className="relative mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="size-3.5" />
            Created {formatted}
          </span>
          <span>{project.targetCountry}</span>
          <span>{project.language}</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {detailStats.map(({ icon: Icon, label, value, accent }) => (
          <div
            key={label}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/30 hover:bg-white/[0.08]"
          >
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute -top-8 -right-8 size-24 rounded-full bg-gradient-to-br opacity-20 blur-2xl transition-opacity group-hover:opacity-30",
                accent
              )}
            />
            <span
              className={cn(
                "flex size-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg",
                accent
              )}
            >
              <Icon className="size-5 text-white" />
            </span>
            <p className="relative mt-4 text-2xl font-semibold tracking-tight text-foreground">
              {value}
            </p>
            <p className="relative mt-1 text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Workflow steps */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <h3 className="text-sm font-semibold text-foreground">Workflow Progress</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Complete each step in sequence to build your full SEO strategy.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          {WORKFLOW_STEPS.map((step, i) => {
            const done = step.done(project)
            const Icon = step.icon
            return (
              <div
                key={step.label}
                className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/5 p-4 transition-colors hover:border-indigo-400/20 hover:bg-white/[0.08]"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <Icon className={cn("size-4", done ? "text-indigo-400" : "text-muted-foreground")} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{step.label}</p>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  {done ? (
                    <CheckCircle2 className="size-4 text-emerald-400" />
                  ) : (
                    <Circle className="size-4 text-muted-foreground/40" />
                  )}
                  <Button
                    asChild
                    size="sm"
                    variant={i === 0 || done ? "outline" : "outline"}
                    className="border-white/10 bg-white/5 hover:bg-white/10"
                  >
                    <Link href={step.href(projectId)}>
                      {done ? "Revisit" : "Start"}
                    </Link>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
