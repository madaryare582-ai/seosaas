"use client"

import * as React from "react"
import { ImageUp, Send, X } from "lucide-react"

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

export function CreateTicketForm() {
  const [preview, setPreview] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  function handleFile(file: File | undefined) {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <p className="text-sm font-medium text-foreground">Create Support Ticket</p>
      <p className="text-xs text-muted-foreground">
        Our team typically responds within a few hours.
      </p>

      <form className="mt-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ticket-subject">Subject</Label>
          <Input id="ticket-subject" placeholder="e.g. Article generation failed" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ticket-category">Category</Label>
            <Select defaultValue="bug">
              <SelectTrigger id="ticket-category" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bug">Bug Report</SelectItem>
                <SelectItem value="billing">Billing</SelectItem>
                <SelectItem value="feature">Feature Request</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ticket-priority">Priority</Label>
            <Select defaultValue="normal">
              <SelectTrigger id="ticket-priority" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="ticket-description">Description</Label>
          <Textarea
            id="ticket-description"
            placeholder="Describe the issue in detail, including any steps to reproduce it..."
            className="min-h-28"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Upload Screenshot</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => handleFile(event.target.files?.[0])}
          />

          {preview ? (
            <div className="relative w-fit overflow-hidden rounded-xl border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Screenshot preview" className="max-h-40 object-cover" />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute top-1.5 right-1.5 bg-background/70"
                onClick={() => setPreview(null)}
              >
                <X />
              </Button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-white/5 px-6 py-8 text-center transition-colors hover:border-indigo-400/40 hover:bg-white/8"
            >
              <ImageUp className="size-6 text-indigo-400" />
              <span className="text-sm font-medium text-foreground">
                Click to upload a screenshot
              </span>
              <span className="text-xs text-muted-foreground">PNG, JPG up to 10MB</span>
            </button>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
          >
            <Send />
            Submit Ticket
          </Button>
        </div>
      </form>
    </div>
  )
}
