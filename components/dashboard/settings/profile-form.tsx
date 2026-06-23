"use client"

import * as React from "react"
import { Camera } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ProfileForm() {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  return (
    <form className="flex flex-col gap-6">
      <div>
        <p className="text-sm font-medium text-foreground">Profile Picture</p>
        <div className="mt-3 flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-base text-white">
              JD
            </AvatarFallback>
          </Avatar>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
          <div className="flex gap-2.5">
            <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
              <Camera />
              Change Photo
            </Button>
            <Button type="button" variant="ghost">
              Remove
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="full-name">Full Name</Label>
          <Input id="full-name" defaultValue="Jordan Diaz" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="jordandiaz" />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email-address">Email Address</Label>
        <Input id="email-address" type="email" defaultValue="jordan@hiigsiseo.com" />
      </div>

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
