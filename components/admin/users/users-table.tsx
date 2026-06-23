"use client"

import * as React from "react"
import {
  CreditCard,
  Filter,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserX,
} from "lucide-react"

import { PaginationFooter } from "@/components/admin/shared/pagination-footer"
import { StatusBadge } from "@/components/admin/shared/status-badge"
import { UserDetailSheet } from "@/components/admin/users/user-detail-sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { adminUsers, type AdminUser, type UserRole } from "@/lib/admin-data"

const roles: UserRole[] = ["owner", "manager", "editor", "member"]

export function UsersTable() {
  const [users, setUsers] = React.useState<AdminUser[]>(adminUsers)
  const [query, setQuery] = React.useState("")
  const [detailUser, setDetailUser] = React.useState<AdminUser | null>(null)
  const [sheetOpen, setSheetOpen] = React.useState(false)

  const filtered = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
  )

  function updateUser(id: string, patch: Partial<AdminUser>) {
    setUsers((prev) => prev.map((user) => (user.id === id ? { ...user, ...patch } : user)))
  }

  function removeUser(id: string) {
    setUsers((prev) => prev.filter((user) => user.id !== id))
  }

  function openDetail(user: AdminUser) {
    setDetailUser(user)
    setSheetOpen(true)
  }

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search users by name or email..."
            className="pl-8"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter />
          Filters
        </Button>
      </div>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead className="hidden sm:table-cell">Plan</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Credits</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Avatar size="sm">
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 text-white">
                        {user.name.split(" ").map((part) => part[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 max-w-[120px] flex-col sm:max-w-none">
                      <span className="truncate text-sm font-medium text-foreground">{user.name}</span>
                      <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden text-muted-foreground sm:table-cell">{user.plan}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="px-1.5 capitalize sm:px-2">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <StatusBadge status={user.status} />
                </TableCell>
                <TableCell className="hidden text-muted-foreground md:table-cell">
                  {user.credits.used.toLocaleString()} / {user.credits.total.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" aria-label="User actions">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      <DropdownMenuItem onSelect={() => openDetail(user)}>
                        <ShieldCheck />
                        View Subscription
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => openDetail(user)}>
                        <CreditCard />
                        View Credit Usage
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Assign Role</DropdownMenuLabel>
                      {roles.map((role) => (
                        <DropdownMenuItem
                          key={role}
                          onSelect={() => updateUser(user.id, { role })}
                          className="capitalize"
                        >
                          {role}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      {user.status === "suspended" ? (
                        <DropdownMenuItem onSelect={() => updateUser(user.id, { status: "active" })}>
                          <UserCheck />
                          Activate User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem onSelect={() => updateUser(user.id, { status: "suspended" })}>
                          <UserX />
                          Suspend User
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem variant="destructive" onSelect={() => removeUser(user.id)}>
                        <Trash2 />
                        Remove User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationFooter total={filtered.length} />

      <UserDetailSheet user={detailUser} open={sheetOpen} onOpenChange={setSheetOpen} />
    </div>
  )
}
