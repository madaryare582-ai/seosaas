import { EmailSettingsForm } from "@/components/dashboard/settings/email-settings-form"
import { ProfileForm } from "@/components/dashboard/settings/profile-form"
import { SecurityForm } from "@/components/dashboard/settings/security-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Settings
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your profile, security, and email preferences.
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">User Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="email">Email Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-5">
          <div className="max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
            <ProfileForm />
          </div>
        </TabsContent>
        <TabsContent value="security" className="mt-5">
          <div className="max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
            <SecurityForm />
          </div>
        </TabsContent>
        <TabsContent value="email" className="mt-5">
          <div className="max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
            <EmailSettingsForm />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
