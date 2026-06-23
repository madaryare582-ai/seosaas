import { Cpu, Database, Gauge, Server } from "lucide-react"

import { Progress } from "@/components/ui/progress"

const services = [
  { label: "API", status: "Operational", icon: Server },
  { label: "Database", status: "Operational", icon: Database },
  { label: "Article Generation Queue", status: "Operational", icon: Cpu },
]

const apiUsage = [
  { label: "Article Generation API", percent: 68, calls: "42.1k calls" },
  { label: "SEO Analysis API", percent: 41, calls: "18.4k calls" },
  { label: "Payment Verification API", percent: 22, calls: "6.2k calls" },
]

export function SystemStatus() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
        <div className="flex items-center gap-2">
          <Gauge className="size-4 text-emerald-500" />
          <p className="text-sm font-medium text-foreground">System Health</p>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {services.map((service) => (
            <div key={service.label} className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-foreground">
                <service.icon className="size-4 text-muted-foreground" />
                {service.label}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                {service.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
        <p className="text-sm font-medium text-foreground">API Usage Statistics</p>
        <p className="text-xs text-muted-foreground">Calls this month by endpoint</p>
        <div className="mt-4 flex flex-col gap-3.5">
          {apiUsage.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.calls}</span>
              </div>
              <Progress value={item.percent} className="mt-1.5 h-1.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
