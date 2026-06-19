"use client"

import { type FormEvent } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <section className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold tracking-wide text-indigo-400 uppercase">
          Get In Touch
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Send Us A Message
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          Fill out the form below and our team will get back to you as soon
          as possible.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 sm:p-10"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="h-12 border-white/15 bg-white/5 text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="h-12 border-white/15 bg-white/5 text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <label
            htmlFor="subject"
            className="text-sm font-medium text-foreground"
          >
            Subject
          </label>
          <Input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="What's this about?"
            className="h-12 border-white/15 bg-white/5 text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-sm font-medium text-foreground"
          >
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            required
            placeholder="Tell us how we can help..."
            className="min-h-40 border-white/15 bg-white/5 text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="group/btn mt-8 h-12 w-full border-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-base text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-400 hover:to-purple-500 hover:shadow-indigo-500/40 sm:w-auto sm:px-10"
        >
          Send Message
          <Send className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Button>
      </form>
    </section>
  )
}
