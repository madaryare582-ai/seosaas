import Link from "next/link"
import { ArrowRight, CheckCircle2, FileText, LayoutDashboard, ListChecks, Network } from "lucide-react"

import { Button } from "@/components/ui/button"

type WorkflowStep = "niche-finder" | "topical-authority" | "content-planner" | "article-generator"

type WorkflowNavigationProps = {
  projectId: string
  currentStep: WorkflowStep
}

const STEP_LABELS: Record<WorkflowStep, string> = {
  "niche-finder": "Niche Finder",
  "topical-authority": "Topical Authority",
  "content-planner": "Content Planner",
  "article-generator": "Article Generator",
}

export function WorkflowNavigation({ projectId, currentStep }: WorkflowNavigationProps) {
  return (
    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-6">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-400/20">
          <CheckCircle2 className="size-4 text-emerald-400" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {STEP_LABELS[currentStep]} — Project Saved Successfully
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Continue your SEO workflow or return to the projects overview.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {currentStep === "niche-finder" && (
          <>
            <Button
              asChild
              className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
            >
              <Link href={`/dashboard/topical-authority/${projectId}`}>
                <Network className="size-4" />
                Continue to Topical Authority
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10"
            >
              <Link href={`/dashboard/content-planner/${projectId}`}>
                <ListChecks className="size-4" />
                Go to Content Planner
              </Link>
            </Button>
          </>
        )}

        {currentStep === "topical-authority" && (
          <>
            <Button
              asChild
              className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
            >
              <Link href={`/dashboard/content-planner/${projectId}`}>
                <ListChecks className="size-4" />
                Generate Content Plan
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10"
            >
              <Link href={`/dashboard/content-planner/${projectId}`}>
                Open Content Planner
              </Link>
            </Button>
          </>
        )}

        {currentStep === "content-planner" && (
          <>
            <Button
              asChild
              className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
            >
              <Link href={`/dashboard/article-generator/${projectId}`}>
                <FileText className="size-4" />
                Generate Article
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-white/10 bg-white/5 hover:bg-white/10"
            >
              <Link href={`/dashboard/article-generator/${projectId}`}>
                Open Article Generator
              </Link>
            </Button>
          </>
        )}

        <Button
          asChild
          variant="outline"
          className="border-white/10 bg-white/5 hover:bg-white/10"
        >
          <Link href="/dashboard/projects">
            <LayoutDashboard className="size-4" />
            Return to Projects
          </Link>
        </Button>
      </div>
    </div>
  )
}
