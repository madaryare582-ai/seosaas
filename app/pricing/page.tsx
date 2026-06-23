import { BadgeCheck, CreditCard, RefreshCw, ShieldCheck, Wallet } from "lucide-react"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { PricingHero } from "@/components/pricing/pricing-hero"
import { PricingPlans } from "@/components/pricing/pricing-plans"
import { FAQ, type FAQItem } from "@/components/marketing/faq"
import { CTA } from "@/components/marketing/cta"

const faqs: FAQItem[] = [
  {
    icon: CreditCard,
    question: "Can I change plans anytime?",
    answer:
      "Yes. You can upgrade, downgrade, or cancel your plan at any time directly from your account dashboard — no contracts, no cancellation fees.",
  },
  {
    icon: RefreshCw,
    question: "Do unused credits roll over?",
    answer:
      "Unused article credits roll over to the next month as long as your subscription remains active, so you never lose what you've already paid for.",
  },
  {
    icon: Wallet,
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, along with Binance Pay, Zaad, and E-Dahab for regional payment options.",
  },
  {
    icon: ShieldCheck,
    question: "Is there a free trial?",
    answer:
      "You can explore HiigsiSEO risk-free — every plan includes a short trial period so you can test the keyword research and article generation workflow before committing.",
  },
  {
    icon: BadgeCheck,
    question: "What happens if I exceed my plan's limits?",
    answer:
      "You'll be notified as you approach your plan's limits and can upgrade in a click. We never cut off in-progress work without warning.",
  },
]

export default function PricingPage() {
  return (
    <div className="dark flex min-h-screen flex-1 flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <PricingHero />
        <PricingPlans />
        <FAQ
          description="Everything you need to know about HiigsiSEO plans, billing, and credits."
          faqs={faqs}
          showSupport={false}
        />
        <CTA
          description="Discover profitable keywords, build topical authority, and generate SEO-optimized articles in minutes."
          trustSignals={[
            "Discover Keywords",
            "Build Content Clusters",
            "Generate SEO Articles",
          ]}
        />
      </main>
      <Footer />
    </div>
  )
}
