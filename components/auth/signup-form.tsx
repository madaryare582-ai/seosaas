"use client"

import { type FormEvent, useState } from "react"
import Link from "next/link"
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Full Name</Label>
        <div className="relative">
          <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Jane Doe"
            className="h-12 border-white/15 bg-white/5 pl-10 text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

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
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            placeholder="Create a password"
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

      <div className="flex flex-col gap-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="confirm-password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            placeholder="Re-enter your password"
            className="h-12 border-white/15 bg-white/5 pr-10 pl-10 text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((value) => !value)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {showConfirmPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <Checkbox id="terms" name="terms" required className="mt-0.5" />
        <Label
          htmlFor="terms"
          className="text-sm font-normal text-muted-foreground"
        >
          I agree to the{" "}
          <Link
            href="#"
            className="font-medium text-indigo-300 hover:text-indigo-200"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="font-medium text-indigo-300 hover:text-indigo-200"
          >
            Privacy Policy
          </Link>
        </Label>
      </div>

      <Button
        type="submit"
        size="lg"
        className="group/btn mt-2 h-12 w-full border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-base text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-400 hover:to-purple-500 hover:shadow-indigo-500/40"
      >
        Create Account
        <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
      </Button>
    </form>
  )
}
