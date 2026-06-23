import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { RolesMatrix } from "@/components/admin/roles/roles-matrix"
import { Button } from "@/components/ui/button"

export default function AdminRolesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Roles & Permissions
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Owner, Manager, and Editor roles each grant a different scope of access.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/users">
            Assign Roles to Users
            <ArrowUpRight />
          </Link>
        </Button>
      </div>

      <RolesMatrix />
    </div>
  )
}
