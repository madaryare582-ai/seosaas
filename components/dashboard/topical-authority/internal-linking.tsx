import { ArrowRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const suggestions = [
  {
    source: "Best AI SEO Software in 2026",
    target: "AI vs Traditional SEO Tools",
    anchor: "traditional SEO tools",
    relevance: 94,
  },
  {
    source: "What Is Topical Authority?",
    target: "Building Topic Clusters Step-by-Step",
    anchor: "topic clusters",
    relevance: 91,
  },
  {
    source: "30-Day Content Calendar Template",
    target: "Editorial Workflow for Content Teams",
    anchor: "editorial workflow",
    relevance: 87,
  },
  {
    source: "How AI Content Tools Score on E-E-A-T",
    target: "Measuring Topical Authority Growth",
    anchor: "topical authority growth",
    relevance: 78,
  },
]

export function InternalLinking() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <p className="text-sm font-medium text-foreground">Internal Linking Suggestions</p>
      <p className="text-xs text-muted-foreground">
        Opportunities to connect related articles and strengthen topical relevance
      </p>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Source Article</TableHead>
              <TableHead className="text-muted-foreground">Target Article</TableHead>
              <TableHead className="text-muted-foreground">Anchor Text</TableHead>
              <TableHead className="text-muted-foreground">Relevance</TableHead>
              <TableHead className="text-right text-muted-foreground">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suggestions.map((item) => (
              <TableRow key={item.source} className="border-white/10">
                <TableCell className="max-w-48 truncate font-medium text-foreground">
                  {item.source}
                </TableCell>
                <TableCell className="max-w-48 truncate text-muted-foreground">
                  {item.target}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  &quot;{item.anchor}&quot;
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                  >
                    {item.relevance}%
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Insert Link
                    <ArrowRight />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
