import { AnnouncementsManager } from "@/components/admin/announcements/announcements-manager"
import { announcements } from "@/lib/announcements-data"

export default function AdminAnnouncementsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            Announcements
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Create, schedule, and publish platform announcements for your users.
          </p>
        </div>
      </div>

      <AnnouncementsManager initialAnnouncements={announcements} />
    </div>
  )
}
