import { AnnouncementBanners } from "@/components/banners/banner-stack"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"

export default function DashboardLayout(props: LayoutProps<"/dashboard">) {
  const { children } = props

  return (
    <div className="dark relative min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -left-32 z-0 size-96 rounded-full bg-indigo-600/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed top-1/3 -right-32 z-0 size-96 rounded-full bg-fuchsia-600/15 blur-3xl"
      />

      <Sidebar />

      <div className="relative z-10 flex min-h-screen flex-col lg:pl-64">
        <Topbar />
        <AnnouncementBanners scope="dashboard" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
