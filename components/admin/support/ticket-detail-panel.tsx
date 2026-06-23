"use client"

import { ImageIcon, Send } from "lucide-react"

import { StatusBadge } from "@/components/admin/shared/status-badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { AdminTicket } from "@/lib/admin-data"

export function TicketDetailPanel({ ticket }: { ticket: AdminTicket }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card/60 backdrop-blur-xl">
      <div className="flex flex-col gap-3 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-semibold text-foreground">{ticket.subject}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {ticket.user} · {ticket.email}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={ticket.priority} />
          <Select defaultValue={ticket.status}>
            <SelectTrigger size="sm" className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        {ticket.messages.map((message, index) => (
          <div
            key={index}
            className={cn("flex gap-3", message.from === "admin" && "flex-row-reverse")}
          >
            <Avatar size="sm">
              <AvatarFallback
                className={cn(
                  message.from === "admin"
                    ? "bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 text-white"
                    : "bg-muted"
                )}
              >
                {message.from === "admin" ? "JD" : ticket.user.split(" ").map((p) => p[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div
              className={cn(
                "flex max-w-[80%] flex-col gap-1 rounded-xl px-3.5 py-2.5 text-sm",
                message.from === "admin"
                  ? "bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-blue-500/10 text-foreground"
                  : "bg-muted text-foreground"
              )}
            >
              <p>{message.text}</p>
              <span className="text-xs text-muted-foreground">{message.date}</span>
            </div>
          </div>
        ))}

        {ticket.hasAttachment && (
          <div className="flex items-center gap-2 self-start rounded-xl border border-dashed border-border bg-muted/40 px-3.5 py-2.5 text-xs text-muted-foreground">
            <ImageIcon className="size-4" />
            screenshot-attachment.png
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2.5 border-t border-border p-5">
        <Textarea placeholder="Type your reply..." className="min-h-20" />
        <div className="flex justify-end">
          <Button className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-blue-400">
            <Send />
            Send Reply
          </Button>
        </div>
      </div>
    </div>
  )
}
