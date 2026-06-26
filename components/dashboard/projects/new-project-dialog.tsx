"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { FolderPlus, Loader2 } from "lucide-react"

import { createProject } from "@/lib/projects-data"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Brazil",
  "Mexico",
  "India",
  "Japan",
  "South Korea",
  "Singapore",
  "UAE",
  "South Africa",
]

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Dutch",
  "Swedish",
  "Norwegian",
  "Danish",
  "Japanese",
  "Korean",
  "Arabic",
  "Hindi",
  "Chinese (Simplified)",
  "Chinese (Traditional)",
]

type NewProjectDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: () => void
}

export function NewProjectDialog({ open, onOpenChange, onCreated }: NewProjectDialogProps) {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [form, setForm] = React.useState({
    name: "",
    primaryNiche: "",
    targetCountry: "United States",
    language: "English",
  })

  function reset() {
    setForm({ name: "", primaryNiche: "", targetCountry: "United States", language: "English" })
    setLoading(false)
  }

  function handleOpenChange(val: boolean) {
    if (!val) reset()
    onOpenChange(val)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.primaryNiche.trim()) return
    setLoading(true)
    const project = createProject(form)
    onCreated()
    router.push(`/dashboard/niche-finder/${project.id}`)
  }

  const canSubmit = form.name.trim().length > 0 && form.primaryNiche.trim().length > 0

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="border-white/10 bg-background/95 backdrop-blur-xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2.5 text-foreground">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
              <FolderPlus className="size-4 text-white" />
            </span>
            New Project
          </DialogTitle>
          <DialogDescription>
            Set up your SEO project to start the workflow.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-1 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="proj-name" className="text-sm text-foreground">
              Project Name
            </Label>
            <Input
              id="proj-name"
              placeholder="e.g. Fitness & Nutrition Blog"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-white/5 border-white/10"
              required
              disabled={loading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="proj-niche" className="text-sm text-foreground">
              Primary Niche
            </Label>
            <Input
              id="proj-niche"
              placeholder="e.g. Health & Fitness, B2B SaaS, Personal Finance"
              value={form.primaryNiche}
              onChange={(e) => setForm({ ...form, primaryNiche: e.target.value })}
              className="bg-white/5 border-white/10"
              required
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-foreground">Target Country</Label>
              <Select
                value={form.targetCountry}
                onValueChange={(v) => setForm({ ...form, targetCountry: v })}
                disabled={loading}
              >
                <SelectTrigger className="w-full bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-sm text-foreground">Language</Label>
              <Select
                value={form.language}
                onValueChange={(v) => setForm({ ...form, language: v })}
                disabled={loading}
              >
                <SelectTrigger className="w-full bg-white/5 border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !canSubmit}
            className="mt-1 border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <FolderPlus className="size-4" />
            )}
            Create Project
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
