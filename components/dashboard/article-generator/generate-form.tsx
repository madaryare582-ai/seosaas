"use client"

import type { FormEvent } from "react"
import { Loader2, Sparkles } from "lucide-react"

import { GenerationProgress } from "@/components/dashboard/article-generator/generation-progress"
import type { GenerationPhase } from "@/components/dashboard/article-generator/use-article-generation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function GenerateForm({
  phase,
  stepIndex,
  progress,
  onGenerate,
}: {
  phase: GenerationPhase
  stepIndex: number
  progress: number
  onGenerate: () => void
}) {
  const isGenerating = phase === "generating"

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    onGenerate()
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <p className="text-sm font-medium text-foreground">Generate SEO Article</p>
      <p className="text-xs text-muted-foreground">
        Describe your topic and we&apos;ll draft an outline, full article, and on-page SEO checklist.
      </p>

      <form className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5 lg:col-span-2">
          <Label htmlFor="article-topic">Article Topic / Target Keyword</Label>
          <Input
            id="article-topic"
            placeholder="e.g. how to build topical authority"
            defaultValue="How to Build Topical Authority in 2026"
            disabled={isGenerating}
          />
        </div>

        <div className="flex flex-col gap-1.5 lg:col-span-2">
          <Label htmlFor="article-keywords">Secondary Keywords (optional)</Label>
          <Textarea
            id="article-keywords"
            placeholder="topic clusters, entity seo, content silos"
            defaultValue="topic clusters, entity seo, content silos"
            disabled={isGenerating}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="article-length">Article Length</Label>
          <Select defaultValue="medium" disabled={isGenerating}>
            <SelectTrigger id="article-length" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short">Short (~800 words)</SelectItem>
              <SelectItem value="medium">Medium (~1,500 words)</SelectItem>
              <SelectItem value="long">Long (~2,500 words)</SelectItem>
              <SelectItem value="pillar">Pillar (~4,000+ words)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="article-tone">Tone of Voice</Label>
          <Select defaultValue="authoritative" disabled={isGenerating}>
            <SelectTrigger id="article-tone" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="authoritative">Authoritative</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap items-end justify-end gap-2.5 lg:col-span-2">
          <Button variant="outline" type="button" disabled={isGenerating}>
            Generate Outline Only
          </Button>
          <Button
            type="submit"
            disabled={isGenerating}
            className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400 disabled:pointer-events-none disabled:opacity-80"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles />
                Generate Article
              </>
            )}
          </Button>
        </div>
      </form>

      {phase !== "idle" && (
        <GenerationProgress phase={phase} stepIndex={stepIndex} progress={progress} />
      )}
    </div>
  )
}
