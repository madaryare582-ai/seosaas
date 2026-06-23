import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const intentStyles = {
  Informational: "bg-indigo-400/10 text-indigo-300",
  Commercial: "bg-fuchsia-400/10 text-fuchsia-300",
  Transactional: "bg-emerald-400/10 text-emerald-400",
  Navigational: "bg-amber-400/10 text-amber-400",
} as const

const rows = [
  { keyword: "best ai seo tool", intent: "Commercial", volume: "5,400", difficulty: 42 },
  { keyword: "what is topical authority", intent: "Informational", volume: "2,900", difficulty: 28 },
  { keyword: "buy seo content subscription", intent: "Transactional", volume: "880", difficulty: 35 },
  { keyword: "hiigsiseo login", intent: "Navigational", volume: "320", difficulty: 5 },
  { keyword: "how to build content clusters", intent: "Informational", volume: "3,700", difficulty: 31 },
  { keyword: "ai seo software pricing", intent: "Commercial", volume: "1,600", difficulty: 38 },
] satisfies Array<{
  keyword: string
  intent: keyof typeof intentStyles
  volume: string
  difficulty: number
}>

export function SearchIntentTable() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <p className="text-sm font-medium text-foreground">Search Intent Analysis</p>
      <p className="text-xs text-muted-foreground">Classified intent for your target keywords</p>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Keyword</TableHead>
              <TableHead className="text-muted-foreground">Intent</TableHead>
              <TableHead className="text-muted-foreground">Volume</TableHead>
              <TableHead className="text-muted-foreground">Difficulty</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.keyword} className="border-white/10">
                <TableCell className="font-medium text-foreground">{row.keyword}</TableCell>
                <TableCell>
                  <Badge className={cn("border-0", intentStyles[row.intent])}>
                    {row.intent}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{row.volume}</TableCell>
                <TableCell className="text-muted-foreground">{row.difficulty}/100</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
