"use client"

import { BestOpportunities } from "@/components/dashboard/niche-finder/best-opportunities"
import { ContentCalendarSection } from "@/components/dashboard/niche-finder/content-calendar-section"
import { ContentQueueSection } from "@/components/dashboard/niche-finder/content-queue-section"
import { DailyUsageWidget } from "@/components/dashboard/niche-finder/daily-usage-widget"
import { HeroSection } from "@/components/dashboard/niche-finder/hero-section"
import { KeywordDiscovery } from "@/components/dashboard/niche-finder/keyword-discovery"
import { NicheFinderProvider } from "@/components/dashboard/niche-finder/niche-finder-provider"
import { NicheOverview } from "@/components/dashboard/niche-finder/niche-overview"
import { SerpValidationTable } from "@/components/dashboard/niche-finder/serp-validation-table"
import { StickyBottomBar } from "@/components/dashboard/niche-finder/sticky-bottom-bar"
import { TopicalMap } from "@/components/dashboard/niche-finder/topical-map"
import { WorkflowStepper } from "@/components/dashboard/niche-finder/workflow-stepper"

export function NicheFinderWorkspace() {
  return (
    <NicheFinderProvider>
      <div className="flex flex-col gap-6 pb-20">
        <HeroSection />
        <WorkflowStepper />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-6">
            <NicheOverview />
            <KeywordDiscovery />
            <SerpValidationTable />
            <BestOpportunities />
            <TopicalMap />
            <ContentCalendarSection />
            <ContentQueueSection />
          </div>
          <DailyUsageWidget />
        </div>
      </div>
      <StickyBottomBar />
    </NicheFinderProvider>
  )
}
