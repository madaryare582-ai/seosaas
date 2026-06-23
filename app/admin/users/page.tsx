import { AddUserDialog } from "@/components/admin/users/add-user-dialog"
import { UsersTable } from "@/components/admin/users/users-table"

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Users
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage accounts, roles, subscriptions, and credit usage.
          </p>
        </div>
        <AddUserDialog />
      </div>

      <UsersTable />
    </div>
  )
}
