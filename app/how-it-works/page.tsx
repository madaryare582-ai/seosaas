import {
  CreditCard,
  Download,
  Globe,
  ListChecks,
  PenLine,
  Users,
} from "lucide-react"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { PageHero } from "@/components/how-it-works/page-hero"
import { WorkflowOverview } from "@/components/how-it-works/workflow-overview"
import { StepProcess } from "@/components/how-it-works/step-process"
import { Audience } from "@/components/how-it-works/audience"
import { DashboardPreview } from "@/components/marketing/dashboard-preview"
import { Benefits } from "@/components/how-it-works/benefits"
import { FAQ, type FAQItem } from "@/components/marketing/faq"
import { CTA } from "@/components/marketing/cta"

const faqs: FAQItem[] = [
  {
    icon: ListChecks,
    question: "How does HiigsiSEO help organize content?",
    answer:
      "HiigsiSEO brings topic discovery, content planning, and publishing into a single workflow, so you always know what to write next and how it fits into your overall content strategy.",
  },
  {
    icon: Globe,
    question: "Can I use HiigsiSEO for any niche?",
    answer:
      "Yes. HiigsiSEO works across any niche or industry — simply enter your topic or website focus and the workflow adapts to help you organize content around it.",
  },
  {
    icon: Users,
    question: "Is the platform suitable for teams?",
    answer:
      "Absolutely. Content plans and workflows are easy to share and follow, making HiigsiSEO a great fit for solo creators and growing content teams alike.",
  },
  {
    icon: PenLine,
    question: "Can I edit content before publishing?",
    answer:
      "Yes. Every draft is fully editable, so you can refine tone, add your own insights, or make changes before publishing anywhere.",
  },
  {
    icon: Download,
    question: "Can I export my content plans?",
    answer:
      "Yes. Content plans and outlines can be exported so you can use them in your own CMS or workflow.",
  },
  {
    icon: CreditCard,
    question: "Can I upgrade anytime?",
    answer:
      "Absolutely. You can upgrade, downgrade, or cancel your plan at any time directly from your account dashboard — no contracts required.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="dark flex min-h-screen flex-1 flex-col overflow-x-hidden bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <PageHero />
        <WorkflowOverview />
        <StepProcess />
        <Audience />
        <div id="product-showcase">
          <DashboardPreview
            eyebrow="In Action"
            description="Explore the tools that help organize your content workflow."
          />
        </div>
        <Benefits />
        <FAQ
          description="Everything you need to know about organizing your content workflow with HiigsiSEO."
          faqs={faqs}
          showSupport={false}
        />
        <CTA
          description="Discover opportunities, organize content plans, and create content more efficiently with HiigsiSEO."
          trustSignals={[
            "Discover Opportunities",
            "Build Content Plans",
            "Create Content Faster",
          ]}
        />
      </main>
      <Footer />
    </div>
  )
}
