import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SecurityForm() {
  return (
    <form className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="current-password">Current Password</Label>
        <Input id="current-password" type="password" placeholder="••••••••" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="new-password">New Password</Label>
          <Input id="new-password" type="password" placeholder="••••••••" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input id="confirm-password" type="password" placeholder="••••••••" />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Use at least 8 characters, with a mix of letters, numbers, and symbols.
      </p>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
        >
          Save Changes
        </Button>
      </div>
    </form>
  )
}
