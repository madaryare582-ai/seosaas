"use client"

import * as React from "react"
import { CheckCircle2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

const preferences = [
  { id: "product-updates", label: "Product Updates", description: "New features and improvements", defaultChecked: true },
  { id: "billing-alerts", label: "Billing Alerts", description: "Invoices, payments, and credit usage", defaultChecked: true },
  { id: "weekly-summary", label: "Weekly Summary", description: "A digest of your SEO performance", defaultChecked: true },
  { id: "marketing", label: "Marketing & Tips", description: "Best practices and promotions", defaultChecked: false },
]

export function EmailSettingsForm() {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="new-email">Change Email Address</Label>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <Input id="new-email" type="email" placeholder="new.email@example.com" className="sm:flex-1" />
          <Button type="button" variant="outline" className="shrink-0">
            Send Verification
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <CheckCircle2 className="size-4 text-emerald-400" />
          <div>
            <p className="text-sm font-medium text-foreground">jordan@hiigsiseo.com</p>
            <p className="text-xs text-muted-foreground">Verify New Email</p>
          </div>
        </div>
        <Badge className="border-0 bg-emerald-400/10 text-emerald-400">Verified</Badge>
      </div>

      <Separator className="bg-white/10" />

      <div>
        <p className="text-sm font-medium text-foreground">Notification Preferences</p>
        <div className="mt-3 flex flex-col gap-4">
          {preferences.map((pref) => (
            <div key={pref.id} className="flex items-center justify-between gap-4">
              <div>
                <Label htmlFor={pref.id} className="text-sm text-foreground">
                  {pref.label}
                </Label>
                <p className="text-xs text-muted-foreground">{pref.description}</p>
              </div>
              <Switch id={pref.id} defaultChecked={pref.defaultChecked} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
        >
          Save Changes
        </Button>
      </div>
    </form>
  )
}
