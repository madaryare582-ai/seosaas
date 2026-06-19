"use client"

import { type FormEvent } from "react"
import { ArrowRight, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ResetPasswordForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="h-12 border-white/15 bg-white/5 pl-10 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="group/btn mt-2 h-12 w-full border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-base text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-400 hover:to-purple-500 hover:shadow-indigo-500/40"
      >
        Send Reset Link
        <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </Button>
    </form>
  )
}
