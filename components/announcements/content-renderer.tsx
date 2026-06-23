import { createElement } from "react"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, Info, XCircle } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { getIcon, type AnnouncementSection, type ContentBlock } from "@/lib/announcements-data"

const CALLOUT_STYLES: Record<string, { icon: typeof Info; classes: string }> = {
  info: { icon: Info, classes: "border-blue-400/30 bg-blue-500/10 text-blue-200" },
  success: { icon: CheckCircle2, classes: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200" },
  warning: { icon: AlertTriangle, classes: "border-amber-400/30 bg-amber-500/10 text-amber-200" },
  danger: { icon: XCircle, classes: "border-rose-400/30 bg-rose-500/10 text-rose-200" },
}

const HEADING_CLASSES: Record<number, string> = {
  1: "text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
  2: "text-2xl font-semibold tracking-tight text-foreground sm:text-3xl",
  3: "text-xl font-semibold tracking-tight text-foreground sm:text-2xl",
  4: "text-lg font-semibold text-foreground",
  5: "text-base font-semibold text-foreground",
  6: "text-sm font-semibold tracking-wide text-foreground uppercase",
}

export function BlockRenderer({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading": {
      const Tag = `h${block.level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
      return <Tag className={HEADING_CLASSES[block.level]}>{block.text}</Tag>
    }
    case "paragraph":
      return <p className="text-base leading-relaxed text-muted-foreground">{block.text}</p>
    case "bulletList":
      return (
        <ul className="flex flex-col gap-2.5">
          {block.items.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5 text-base leading-relaxed text-muted-foreground">
              <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400" />
              {item}
            </li>
          ))}
        </ul>
      )
    case "numberedList":
      return (
        <ol className="flex flex-col gap-2.5">
          {block.items.map((item, index) => (
            <li key={index} className="flex items-start gap-3 text-base leading-relaxed text-muted-foreground">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-foreground">
                {index + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      )
    case "quote":
      return (
        <blockquote className="border-l-2 border-violet-400/50 pl-5 italic text-foreground/90">
          <p className="text-lg leading-relaxed">&ldquo;{block.text}&rdquo;</p>
          {block.attribution && <footer className="mt-2 text-sm font-medium text-muted-foreground not-italic">— {block.attribution}</footer>}
        </blockquote>
      )
    case "callout": {
      const style = CALLOUT_STYLES[block.tone] ?? CALLOUT_STYLES.info
      const Icon = style.icon
      return (
        <div className={cn("flex gap-3 rounded-2xl border p-4", style.classes)}>
          <Icon className="mt-0.5 size-5 shrink-0" />
          <div>
            {block.title && <p className="font-semibold">{block.title}</p>}
            <p className="mt-1 text-sm leading-relaxed opacity-90">{block.text}</p>
          </div>
        </div>
      )
    }
    case "table":
      return (
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                {block.headers.map((header, index) => (
                  <TableHead key={index} className="text-foreground">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {block.rows.map((row, rowIndex) => (
                <TableRow key={rowIndex} className="border-white/10">
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex} className="text-muted-foreground">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )
    case "image":
      return (
        <figure>
          <img src={block.src} alt={block.alt} className="w-full rounded-2xl border border-white/10 object-cover" />
          {block.caption && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{block.caption}</figcaption>}
        </figure>
      )
    case "video":
      return (
        <figure>
          <div className="flex aspect-video items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Link
              href={block.url}
              target="_blank"
              className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
                ▶
              </span>
              Watch video
            </Link>
          </div>
          {block.caption && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{block.caption}</figcaption>}
        </figure>
      )
    case "button":
      return (
        <Button
          asChild
          size="lg"
          variant={block.style === "secondary" ? "outline" : "default"}
          className={cn(
            "h-11 w-fit px-6",
            block.style !== "secondary" &&
              "border-0 bg-gradient-to-r from-violet-500 via-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30 hover:opacity-90"
          )}
        >
          <Link href={block.href}>{block.label}</Link>
        </Button>
      )
    case "divider":
      return <hr className="border-white/10" />
    case "code":
      return (
        <pre className="overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-4 text-sm">
          <code className="font-mono text-foreground/90">{block.code}</code>
        </pre>
      )
    case "faq":
      return (
        <Accordion type="single" collapsible className="rounded-2xl border border-white/10 px-4">
          {block.items.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border-white/10">
              <AccordionTrigger className="text-foreground">{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )
    default:
      return null
  }
}

export function SectionRenderer({ section }: { section: AnnouncementSection }) {
  const Icon = getIcon(section.icon)

  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg", section.color)}>
          {createElement(Icon, { className: "size-5 text-white" })}
        </span>
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{section.title}</h2>
      </div>
      <div className="flex flex-col gap-5 pl-0 sm:pl-[3.25rem]">
        {section.blocks.map((block) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </section>
  )
}

export function ContentRenderer({ sections }: { sections: AnnouncementSection[] }) {
  return (
    <div className="flex flex-col gap-10">
      {sections.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}
    </div>
  )
}
