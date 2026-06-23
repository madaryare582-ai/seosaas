"use client"

import * as React from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { AdminPlan } from "@/lib/admin-data"

export function PlanDialog({
  plan,
  trigger,
}: {
  plan?: AdminPlan
  trigger?: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const isEdit = Boolean(plan)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-blue-400">
            <Plus />
            Create Plan
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? `Edit ${plan?.name} Plan` : "Create Plan"}</DialogTitle>
          <DialogDescription>
            Define pricing, credit allowance, and included features.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            setOpen(false)
          }}
        >
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="plan-name">Plan Name</Label>
            <Input id="plan-name" defaultValue={plan?.name} placeholder="e.g. Growth" required />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="plan-price">Price (USD)</Label>
              <Input id="plan-price" defaultValue={plan?.price.replace("$", "")} placeholder="24" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="plan-credits">Monthly Credits</Label>
              <Input id="plan-credits" defaultValue={plan?.credits} placeholder="4000" required />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="plan-features">Features (one per line)</Label>
            <Textarea
              id="plan-features"
              defaultValue={plan?.features.join("\n")}
              placeholder={"5 Articles Per Day\nTopical Authority Tools\nPriority Support"}
              className="min-h-24"
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 text-white hover:from-indigo-400 hover:via-violet-400 hover:to-blue-400"
            >
              {isEdit ? "Save Changes" : "Create Plan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
