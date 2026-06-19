import Link from "next/link"
import {
  BadgeCheck,
  CreditCard,
  Download,
  FileText,
  LifeBuoy,
  ListChecks,
  Network,
  PenLine,
  RefreshCw,
  Search,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export type FAQItem = { icon: LucideIcon; question: string; answer: string }

const defaultFaqs: FAQItem[] = [
  {
    icon: Search,
    question: "How does keyword research work?",
    answer:
      "HiigsiSEO analyzes search volume, competition, and intent for your niche, then surfaces high-value, low-competition keywords you can realistically rank for — no guesswork required.",
  },
  {
    icon: ListChecks,
    question: "How does the Content Planner build content clusters?",
    answer:
      "The Content Planner groups related keywords into topic clusters, then maps out a content calendar so every article supports a central pillar page and strengthens your site's overall structure.",
  },
  {
    icon: Network,
    question: "What is Topical Authority Builder?",
    answer:
      "Topical Authority Builder identifies content gaps within your niche and recommends supporting articles, so search engines see your site as a comprehensive, trustworthy source on the topic.",
  },
  {
    icon: FileText,
    question: "How does AI article generation work?",
    answer:
      "Our AI researches top-ranking content for your target keyword, then drafts a fully structured article — headings, meta data, and internal links included — optimized for both readers and search engines.",
  },
  {
    icon: BadgeCheck,
    question: "Are generated articles SEO optimized?",
    answer:
      "Yes. Every article is optimized for on-page SEO, semantic relevance, and search intent, with proper keyword placement, heading structure, and readability built in.",
  },
  {
    icon: ShieldCheck,
    question: "How does EEAT optimization work?",
    answer:
      "EEAT optimization strengthens Experience, Expertise, Authoritativeness, and Trustworthiness signals in your content — citing credible sources, adding depth, and avoiding thin or generic writing that search engines discount.",
  },
  {
    icon: PenLine,
    question: "Can I edit articles before publishing?",
    answer:
      "Absolutely. Every generated article is fully editable in your dashboard, so you can refine tone, add personal insights, or make changes before publishing anywhere.",
  },
  {
    icon: Download,
    question: "Can I export my content plans?",
    answer:
      "Yes. Content plans, keyword clusters, and articles can all be exported so you can use them in your own CMS or workflow.",
  },
  {
    icon: RefreshCw,
    question: "Do unused credits roll over?",
    answer:
      "Unused article credits roll over to the next month as long as your subscription remains active, so you never lose what you've already paid for.",
  },
  {
    icon: CreditCard,
    question: "Can I upgrade or cancel anytime?",
    answer:
      "Absolutely. You can upgrade, downgrade, or cancel your plan at any time directly from your account dashboard — no contracts, no cancellation fees.",
  },
]

type FAQProps = {
  eyebrow?: string
  description?: string
  faqs?: FAQItem[]
  showSupport?: boolean
}

export function FAQ({
  eyebrow = "Support",
  description = "Everything you need to know about HiigsiSEO, keyword research, content planning, topical authority, and AI article generation.",
  faqs = defaultFaqs,
  showSupport = true,
}: FAQProps = {}) {
  return (
    <section className="relative mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-sm font-semibold tracking-wide text-indigo-400 uppercase">
          {eyebrow}
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 sm:px-8">
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="border-white/10 py-1"
            >
              <AccordionTrigger className="group/trigger -mx-3 rounded-lg px-3 py-5 text-base font-medium text-foreground transition-colors hover:bg-white/5 hover:text-indigo-300 hover:no-underline sm:text-lg [&>svg]:mt-1">
                <span className="flex items-start gap-3.5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-950/40 ring-1 ring-white/15 transition-transform duration-300 group-hover/trigger:scale-110">
                    <faq.icon className="size-4.5 text-white" />
                  </span>
                  <span className="pt-1.5">{faq.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-[3.125rem] text-base leading-relaxed text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {showSupport && (
        <div className="relative mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-6 py-10 text-center shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-2xl backdrop-saturate-150 sm:px-10">
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl"
          />
          <span className="relative mx-auto flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-950/40 ring-1 ring-white/15">
            <LifeBuoy className="size-6 text-white" />
          </span>
          <h3 className="relative mt-5 text-xl font-semibold tracking-tight text-foreground">
            Still Have Questions?
          </h3>
          <p className="relative mt-2 text-base text-muted-foreground">
            Our team is here to help you get the most from HiigsiSEO.
          </p>
          <div className="relative mt-6 flex justify-center">
            <Button
              size="lg"
              asChild
              className="h-12 border-0 bg-gradient-to-r from-indigo-500 to-purple-600 px-8 text-base text-white shadow-lg shadow-indigo-500/30 transition-all hover:from-indigo-400 hover:to-purple-500 hover:shadow-indigo-500/40"
            >
              <Link href="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      )}
    </section>
  )
}
