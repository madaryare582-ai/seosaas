"use client"

import * as React from "react"
import { Plus, Search } from "lucide-react"

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import type { AdminBlogPost } from "@/lib/admin-data"

export function PostEditorDialog({
  post,
  trigger,
}: {
  post?: AdminBlogPost
  trigger?: React.ReactNode
}) {
  const [open, setOpen] = React.useState(false)
  const isEdit = Boolean(post)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-blue-400">
            <Plus />
            New Post
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Blog Post" : "Publish Blog Post"}</DialogTitle>
          <DialogDescription>
            Write your content and configure SEO metadata before publishing.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            setOpen(false)
          }}
        >
          <Tabs defaultValue="content">
            <TabsList>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="seo">
                <Search />
                SEO Metadata
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="post-title">Title</Label>
                <Input id="post-title" defaultValue={post?.title} placeholder="e.g. How to Build Topical Authority" required />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="post-category">Category</Label>
                <Input id="post-category" defaultValue={post?.category} placeholder="e.g. SEO Strategy" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="post-body">Body</Label>
                <Textarea id="post-body" placeholder="Write your article content..." className="min-h-32" />
              </div>
            </TabsContent>

            <TabsContent value="seo" className="mt-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="post-slug">URL Slug</Label>
                <Input id="post-slug" defaultValue={post?.slug} placeholder="build-topical-authority-2026" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="post-meta-title">Meta Title</Label>
                <Input id="post-meta-title" defaultValue={post?.metaTitle} placeholder="Page title for search engines" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="post-meta-description">Meta Description</Label>
                <Textarea
                  id="post-meta-description"
                  defaultValue={post?.metaDescription}
                  placeholder="A concise summary shown in search results"
                  className="min-h-20"
                />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button
              type="submit"
              className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 text-white hover:from-indigo-400 hover:via-violet-400 hover:to-blue-400"
            >
              {isEdit ? "Save Changes" : "Publish Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
