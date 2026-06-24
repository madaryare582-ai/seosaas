import { NicheFinderWorkspace } from "@/components/dashboard/niche-finder/niche-finder-workspace"

export default function NicheFinderPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Niche Finder
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Discover profitable niches, validate keywords, and build a content strategy in minutes.
        </p>
      </div>
      <NicheFinderWorkspace />
    </div>
  )
}
