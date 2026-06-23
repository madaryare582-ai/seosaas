import { notFound } from "next/navigation"

import { AnnouncementEditor } from "@/components/admin/announcements/announcement-editor"
import { getAnnouncementById } from "@/lib/announcements-data"

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const announcement = getAnnouncementById(id)

  if (!announcement) {
    notFound()
  }

  return <AnnouncementEditor announcement={announcement} />
}
