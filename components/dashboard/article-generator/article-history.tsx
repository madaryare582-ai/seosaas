import { Eye, MoreHorizontal, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const statusStyles = {
  Published: "bg-emerald-400/10 text-emerald-400",
  Draft: "bg-amber-400/10 text-amber-400",
  Review: "bg-indigo-400/10 text-indigo-300",
} as const

const articles = [
  { title: "How to Build Topical Authority in 2026", date: "Jun 19, 2026", words: "2,480", score: 94, status: "Published" },
  { title: "10 Keyword Clustering Techniques That Work", date: "Jun 17, 2026", words: "1,820", score: 88, status: "Published" },
  { title: "AI Content Generation vs Human Writers", date: "Jun 15, 2026", words: "1,540", score: 76, status: "Review" },
  { title: "Internal Linking Strategies for Higher Rankings", date: "Jun 12, 2026", words: "2,100", score: 91, status: "Published" },
  { title: "Entity SEO: What It Is and Why It Matters", date: "Jun 10, 2026", words: "1,290", score: 62, status: "Draft" },
] satisfies Array<{
  title: string
  date: string
  words: string
  score: number
  status: keyof typeof statusStyles
}>

export function ArticleHistory() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6">
      <p className="text-sm font-medium text-foreground">Article History</p>
      <p className="text-xs text-muted-foreground">Articles generated with HiigsiSEO</p>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Title</TableHead>
              <TableHead className="text-muted-foreground">Date</TableHead>
              <TableHead className="text-muted-foreground">Words</TableHead>
              <TableHead className="text-muted-foreground">SEO Score</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article.title} className="border-white/10">
                <TableCell className="max-w-64 truncate font-medium text-foreground">
                  {article.title}
                </TableCell>
                <TableCell className="text-muted-foreground">{article.date}</TableCell>
                <TableCell className="text-muted-foreground">{article.words}</TableCell>
                <TableCell className="text-muted-foreground">{article.score}/100</TableCell>
                <TableCell>
                  <Badge className={cn("border-0", statusStyles[article.status])}>
                    {article.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem variant="destructive">
                        <Trash2 />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
