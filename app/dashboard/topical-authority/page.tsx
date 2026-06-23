import { EntityMap } from "@/components/dashboard/topical-authority/entity-map"
import { InternalLinking } from "@/components/dashboard/topical-authority/internal-linking"
import { TopicClusters } from "@/components/dashboard/topical-authority/topic-clusters"

export default function TopicalAuthorityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Topical Authority
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Map entities, close content gaps, and strengthen internal linking around your core topics.
        </p>
      </div>

      <TopicClusters />
      <EntityMap />
      <InternalLinking />
    </div>
  )
}
