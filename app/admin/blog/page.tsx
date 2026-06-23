import { PostEditorDialog } from "@/components/admin/blog/post-editor-dialog"
import { PostsTable } from "@/components/admin/blog/posts-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminBlogPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Blog Posts
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Publish, edit, and manage SEO metadata for every article.
          </p>
        </div>
        <PostEditorDialog />
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-5">
          <PostsTable />
        </TabsContent>
        <TabsContent value="published" className="mt-5">
          <PostsTable status="published" />
        </TabsContent>
        <TabsContent value="draft" className="mt-5">
          <PostsTable status="draft" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
