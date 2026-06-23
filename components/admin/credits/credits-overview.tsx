"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { adminUsers } from "@/lib/admin-data"

function AdjustCreditsDialog({ mode }: { mode: "add" | "remove" }) {
  const [open, setOpen] = React.useState(false)
  const isAdd = mode === "add"

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isAdd ? "default" : "outline"}
          className={isAdd ? "border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-blue-400" : "text-destructive hover:bg-destructive/10"}
        >
          {isAdd ? <Plus /> : <Minus />}
          {isAdd ? "Add Credits" : "Remove Credits"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isAdd ? "Add Credits" : "Remove Credits"}</DialogTitle>
          <DialogDescription>
            {isAdd
              ? "Manually top up a user's credit balance."
              : "Deduct credits from a user's balance."}
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
            <Label htmlFor={`${mode}-user`}>User</Label>
            <Select>
              <SelectTrigger id={`${mode}-user`} className="w-full">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                {adminUsers.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${mode}-amount`}>Credit Amount</Label>
            <Input id={`${mode}-amount`} placeholder="e.g. 500" inputMode="numeric" required />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${mode}-reason`}>Reason</Label>
            <Textarea id={`${mode}-reason`} placeholder="e.g. Manual top-up — support request" className="min-h-20" />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 text-white hover:from-indigo-400 hover:via-violet-400 hover:to-blue-400"
            >
              Confirm {isAdd ? "Addition" : "Removal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function CreditsOverview() {
  const totalCredits = adminUsers.reduce((sum, user) => sum + user.credits.total, 0)
  const usedCredits = adminUsers.reduce((sum, user) => sum + user.credits.used, 0)

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Credit Pool Overview</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
            {usedCredits.toLocaleString()}{" "}
            <span className="text-sm font-normal text-muted-foreground">
              / {totalCredits.toLocaleString()} consumed across all users
            </span>
          </p>
        </div>
        <div className="flex gap-2.5">
          <AdjustCreditsDialog mode="add" />
          <AdjustCreditsDialog mode="remove" />
        </div>
      </div>
    </div>
  )
}
