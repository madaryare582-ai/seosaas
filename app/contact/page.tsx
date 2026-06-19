import { Clock, LifeBuoy, Lightbulb, Rocket } from "lucide-react"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactOptions } from "@/components/contact/contact-options"
import { ContactForm } from "@/components/contact/contact-form"
import { FAQ, type FAQItem } from "@/components/marketing/faq"
import { CTA } from "@/components/marketing/cta"

const faqs: FAQItem[] = [
  {
    icon: Clock,
    question: "How quickly do you respond?",
    answer:
      "We typically respond within 24 hours on business days. For urgent account issues, our support team prioritizes time-sensitive requests.",
  },
  {
    icon: LifeBuoy,
    question: "Do you offer customer support?",
    answer:
      "Yes. Our support team is available to help with account setup, billing questions, and platform usage whenever you need it.",
  },
  {
    icon: Lightbulb,
    question: "Can I suggest a feature?",
    answer:
      "Absolutely. We welcome feature requests and feedback — many improvements to HiigsiSEO started as suggestions from users like you.",
  },
  {
    icon: Rocket,
    question: "Do you help new users get started?",
    answer:
      "Yes. We're happy to help you get set up, understand the workflow, and make the most of HiigsiSEO from day one.",
  },
]

export default function ContactPage() {
  return (
    <div className="dark flex min-h-screen flex-1 flex-col overflow-x-hidden bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <ContactHero />
        <ContactOptions />
        <ContactForm />
        <FAQ
          description="Quick answers about getting in touch with HiigsiSEO."
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
