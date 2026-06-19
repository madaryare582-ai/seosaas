"use client"

import { type FormEvent, useState } from "react"
import Link from "next/link"
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

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

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/reset-password"
            className="text-sm font-medium text-indigo-300 hover:text-indigo-200"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="Enter your password"
            className="h-12 border-white/15 bg-white/5 pr-10 pl-10 text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <Checkbox id="remember-me" name="rememberMe" />
        <Label
          htmlFor="remember-me"
          className="text-sm font-normal text-muted-foreground"
        >
          Remember me
        </Label>
      </div>

      <Button
        type="submit"
        size="lg"
        className="group/btn mt-2 h-12 w-full border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-base text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-400 hover:to-purple-500 hover:shadow-indigo-500/40"
      >
        Sign In
        <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </Button>
    </form>
  )
}
