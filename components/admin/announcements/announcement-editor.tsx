"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Archive, Eye, Save, Send } from "lucide-react"

import { BannerDisplayFields } from "@/components/admin/announcements/banner-display-fields"
import { BasicInfoFields } from "@/components/admin/announcements/basic-info-fields"
import { PublishingFields } from "@/components/admin/announcements/publishing-fields"
import { SectionEditor } from "@/components/admin/announcements/section-editor"
import { AnnouncementBanner } from "@/components/banners/announcement-banner"
import { ContentRenderer } from "@/components/announcements/content-renderer"
import { CategoryIcon } from "@/components/announcements/category-badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  CATEGORY_META,
  createSectionsFromTemplate,
  type Announcement,
  type AnnouncementCategory,
} from "@/lib/announcements-data"

const TODAY = "2026-06-23"

function createBlankAnnouncement(): Announcement {
  return {
    id: `ANN-${Date.now()}`,
    title: "",
    category: "new-feature",
    badgeText: "New",
    icon: "Rocket",
    summary: "",
    coverImage: "",
    sections: [],
    status: "draft",
    featured: false,
    publishDate: TODAY,
    author: "Jordan Diaz",
    views: 0,
    createdAt: TODAY,
    updatedAt: TODAY,
    ctaLabel: "",
    ctaUrl: "",
    placement: "sitewide",
    specificRoutes: [],
    startDate: TODAY,
    endDate: "",
    priority: "medium",
    dismissible: true,
    sticky: false,
  }
}

export function AnnouncementEditor({ announcement }: { announcement?: Announcement }) {
  const router = useRouter()
  const isEdit = Boolean(announcement)
  const [form, setForm] = React.useState<Announcement>(() => announcement ?? createBlankAnnouncement())
  const [showPreview, setShowPreview] = React.useState(true)

  function update(patch: Partial<Announcement>) {
    setForm((prev) => ({ ...prev, ...patch, updatedAt: TODAY }))
  }

  function handleTitleChange(title: string) {
    update({ title })
  }

  function handleCategoryChange(category: AnnouncementCategory) {
    setForm((prev) => ({
      ...prev,
      category,
      icon: prev.sections.length === 0 ? CATEGORY_META[category].iconName : prev.icon,
      sections: prev.sections.length === 0 ? createSectionsFromTemplate(category) : prev.sections,
      updatedAt: TODAY,
    }))
  }

  function loadTemplate() {
    setForm((prev) => ({
      ...prev,
      sections: [...prev.sections, ...createSectionsFromTemplate(prev.category)],
      updatedAt: TODAY,
    }))
  }

  function handleSubmit(status: Announcement["status"]) {
    update({ status })
    router.push("/admin/announcements")
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <CategoryIcon category={form.category} icon={form.icon} size="md" />
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {isEdit ? "Edit Announcement" : "Create Announcement"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {isEdit ? `Editing ${announcement?.id}` : "Draft a new announcement banner for your platform."}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={() => setShowPreview((value) => !value)}>
            <Eye />
            {showPreview ? "Hide Preview" : "Preview"}
          </Button>
          <Button variant="outline" onClick={() => handleSubmit("draft")}>
            <Save />
            Save Draft
          </Button>
          {isEdit && form.status !== "archived" && (
            <Button variant="outline" onClick={() => handleSubmit("archived")}>
              <Archive />
              Archive
            </Button>
          )}
          <Button
            onClick={() => handleSubmit(form.status === "scheduled" ? "scheduled" : "published")}
            className="border-0 bg-gradient-to-r from-violet-500 via-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 hover:opacity-90"
          >
            <Send />
            {form.status === "scheduled" ? "Schedule" : "Publish"}
          </Button>
        </div>
      </div>

      {showPreview && (
        <div className="overflow-hidden rounded-2xl border border-border">
          <p className="bg-card/60 px-4 py-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase backdrop-blur-xl">
            Banner Preview
          </p>
          <AnnouncementBanner announcement={form} onDismiss={form.dismissible ? () => {} : undefined} />
        </div>
      )}

      <div className={cn("grid grid-cols-1 gap-6", showPreview && "lg:grid-cols-[3fr_2fr]")}>
        <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
          <Tabs defaultValue="basic">
            <TabsList>
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="display">Banner Display</TabsTrigger>
              <TabsTrigger value="publishing">Publishing</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-5">
              <BasicInfoFields
                form={form}
                onTitleChange={handleTitleChange}
                onCategoryChange={handleCategoryChange}
                onChange={update}
              />
            </TabsContent>

            <TabsContent value="content" className="mt-5 flex flex-col gap-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Sections preload from the {CATEGORY_META[form.category].label} template. Every field stays editable.
                </p>
                <Button type="button" variant="outline" size="sm" className="w-fit" onClick={loadTemplate}>
                  Insert Category Template
                </Button>
              </div>
              <SectionEditor sections={form.sections} onChange={(sections) => update({ sections })} />
            </TabsContent>

            <TabsContent value="display" className="mt-5">
              <BannerDisplayFields form={form} onChange={update} />
            </TabsContent>

            <TabsContent value="publishing" className="mt-5">
              <PublishingFields form={form} onChange={update} />
            </TabsContent>
          </Tabs>
        </div>

        {showPreview && (
          <div className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-xl sm:p-6">
            <p className="mb-4 text-xs font-semibold tracking-widest text-muted-foreground uppercase">Content Reference</p>
            {form.sections.length > 0 ? (
              <ContentRenderer sections={form.sections} />
            ) : (
              <p className="text-sm text-muted-foreground">No content sections yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
