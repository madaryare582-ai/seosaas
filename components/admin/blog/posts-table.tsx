"use client"

import { MoreHorizontal, Pencil, Send, Trash2 } from "lucide-react"

import { PaginationFooter } from "@/components/admin/shared/pagination-footer"
import { StatusBadge } from "@/components/admin/shared/status-badge"
import { PostEditorDialog } from "@/components/admin/blog/post-editor-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { adminBlogPosts } from "@/lib/admin-data"

export function PostsTable({ status }: { status?: "published" | "draft" }) {
  const rows = status ? adminBlogPosts.filter((post) => post.status === status) : adminBlogPosts

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="max-w-xs truncate font-medium text-foreground">{post.title}</TableCell>
              <TableCell className="text-muted-foreground">{post.author}</TableCell>
              <TableCell className="text-muted-foreground">{post.category}</TableCell>
              <TableCell>
                <StatusBadge status={post.status} />
              </TableCell>
              <TableCell className="text-muted-foreground">{post.date}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm" aria-label="Post actions">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <PostEditorDialog
                      post={post}
                      trigger={
                        <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
                          <Pencil />
                          Edit
                        </DropdownMenuItem>
                      }
                    />
                    {post.status === "draft" && (
                      <DropdownMenuItem>
                        <Send />
                        Publish
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem variant="destructive">
                      <Trash2 />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationFooter total={rows.length} />
    </div>
  )
}
