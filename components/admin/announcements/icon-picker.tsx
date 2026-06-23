"use client"

import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ICON_OPTIONS, getIcon } from "@/lib/announcements-data"

export function IconPicker({
  value,
  onChange,
  gradient = "from-violet-500 to-indigo-500",
}: {
  value: string
  onChange: (name: string) => void
  gradient?: string
}) {
  const [open, setOpen] = React.useState(false)
  const SelectedIcon = getIcon(value)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex size-10 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg transition-transform hover:scale-105",
          gradient
        )}
        aria-label="Choose icon"
      >
        {React.createElement(SelectedIcon, { className: "size-5 text-white" })}
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Choose an Icon</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-64">
            <div className="grid grid-cols-6 gap-2 p-1">
              {Object.entries(ICON_OPTIONS).map(([name, Icon]) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    onChange(name)
                    setOpen(false)
                  }}
                  aria-label={name}
                  className={cn(
                    "flex size-10 items-center justify-center rounded-lg border transition-colors",
                    value === name
                      ? "border-violet-400/60 bg-violet-500/15 text-violet-300"
                      : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="size-4.5" />
                </button>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
