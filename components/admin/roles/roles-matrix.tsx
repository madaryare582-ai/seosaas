import { Check, Crown, Pencil, ShieldCheck, X } from "lucide-react"

import { cn } from "@/lib/utils"

const permissions = [
  "Manage Settings",
  "Manage Users",
  "Manage Plans",
  "Manage Payments",
  "Manage Credits",
  "Manage Blog",
  "Manage Announcements",
  "Manage SEO Content",
  "Manage Support",
  "View Analytics",
]

const roles = [
  {
    name: "Owner",
    subtitle: "System Owner",
    icon: Crown,
    accent: "from-indigo-500 via-violet-500 to-blue-500",
    grants: new Set(permissions),
  },
  {
    name: "Manager",
    subtitle: "Operations & Growth",
    icon: ShieldCheck,
    accent: "from-violet-500 to-blue-500",
    grants: new Set([
      "Manage Users",
      "Manage Plans",
      "Manage Payments",
      "Manage Credits",
      "View Analytics",
    ]),
  },
  {
    name: "Editor",
    subtitle: "Content Team",
    icon: Pencil,
    accent: "from-blue-500 to-indigo-500",
    grants: new Set(["Manage Blog", "Manage Announcements", "Manage SEO Content"]),
  },
]

export function RolesMatrix() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card/60 backdrop-blur-xl">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="px-5 py-4 text-left font-medium text-muted-foreground">Permission</th>
            {roles.map((role) => (
              <th key={role.name} className="px-5 py-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <span className={cn("flex size-9 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg", role.accent)}>
                    <role.icon className="size-4.5 text-white" />
                  </span>
                  <span className="font-semibold text-foreground">{role.name}</span>
                  <span className="text-xs font-normal text-muted-foreground">{role.subtitle}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr key={permission} className="border-b border-border last:border-0">
              <td className="px-5 py-3 text-foreground">{permission}</td>
              {roles.map((role) => (
                <td key={role.name} className="px-5 py-3 text-center">
                  {role.grants.has(permission) ? (
                    <Check className="mx-auto size-4 text-emerald-500" />
                  ) : (
                    <X className="mx-auto size-4 text-muted-foreground/40" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
