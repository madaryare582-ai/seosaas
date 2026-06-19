"use client"

import { type FormEvent } from "react"
import { Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterCard() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/15 via-purple-600/10 to-transparent p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-2xl backdrop-saturate-150">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-indigo-500/20 blur-2xl"
      />
      <span className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-950/40 ring-1 ring-white/15">
        <Mail className="size-5 text-white" />
      </span>
      <h3 className="relative mt-4 text-base font-semibold text-foreground">
        Subscribe To The Newsletter
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
        Get SEO insights, content strategy tips, and HiigsiSEO updates
        delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="relative mt-5 flex flex-col gap-3">
        <Input
          type="email"
          required
          placeholder="Email Address"
          className="h-11 border-white/15 bg-white/5 text-foreground placeholder:text-muted-foreground"
        />
        <Button
          type="submit"
          className="h-11 border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-400 hover:to-purple-500 hover:shadow-indigo-500/40"
        >
          Subscribe
        </Button>
      </form>
    </div>
  )
}
