import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export function GeneralSettingsForm() {
  return (
    <form className="flex flex-col gap-6">
      <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
        <p className="text-sm font-medium text-foreground">Platform Details</p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="platform-name">Platform Name</Label>
            <Input id="platform-name" defaultValue="HiigsiSEO" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="support-email">Support Email</Label>
            <Input id="support-email" type="email" defaultValue="support@hiigsiseo.com" />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-1.5">
          <Label htmlFor="platform-desc">Platform Description</Label>
          <Textarea id="platform-desc" defaultValue="AI-powered SEO content platform for growing SaaS teams." className="min-h-20" />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
        <p className="text-sm font-medium text-foreground">Notifications</p>
        <div className="mt-4 flex flex-col gap-4">
          {[
            { label: "New payment submissions", desc: "Notify when a manual payment needs review" },
            { label: "Urgent support tickets", desc: "Notify immediately for high and urgent priority tickets" },
            { label: "Weekly revenue report", desc: "Send a summary every Monday morning" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-blue-400"
        >
          <Save />
          Save Settings
        </Button>
      </div>
    </form>
  )
}
