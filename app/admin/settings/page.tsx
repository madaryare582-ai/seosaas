import { AuditLogTable } from "@/components/admin/settings/audit-log-table"
import { GeneralSettingsForm } from "@/components/admin/settings/general-settings-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Settings
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure platform details, notifications, and review the audit trail.
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="audit">Audit Log</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-5">
          <GeneralSettingsForm />
        </TabsContent>
        <TabsContent value="audit" className="mt-5">
          <AuditLogTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
