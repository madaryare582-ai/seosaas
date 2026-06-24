"use client"

import { Eye, Loader2, Network } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useNicheFinder } from "@/components/dashboard/niche-finder/use-niche-finder"

function toneClass(value: number, invert = false) {
  const good = invert ? value <= 35 : value >= 70
  const mid = invert ? value <= 60 : value >= 45
  if (good) return "bg-emerald-400/10 text-emerald-400"
  if (mid) return "bg-amber-400/10 text-amber-400"
  return "bg-rose-400/10 text-rose-400"
}

export function SerpValidationTable() {
  const { serpRows, buildMap, pendingAction, topicalMap } = useNicheFinder()
  if (serpRows.length === 0) return null
  const isBuilding = pendingAction === "map"
  const topRow = serpRows[0]

  return (
    <div
      id="nf-serp"
      className="animate-in fade-in slide-in-from-bottom-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl duration-500 sm:p-6"
    >
      <p className="text-sm font-medium text-foreground">SERP Validation</p>
      <p className="text-xs text-muted-foreground">Affiliate and AdSense potential for your top keywords</p>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-muted-foreground">Keyword</TableHead>
              <TableHead className="text-muted-foreground">KD</TableHead>
              <TableHead className="text-muted-foreground">Affiliate Score</TableHead>
              <TableHead className="text-muted-foreground">Adsense Score</TableHead>
              <TableHead className="text-muted-foreground">Opportunity Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serpRows.map((row) => (
              <TableRow key={row.keyword} className="border-white/10">
                <TableCell className="font-medium text-foreground capitalize">{row.keyword}</TableCell>
                <TableCell>
                  <Badge className={cn("border-0", toneClass(row.kd, true))}>{row.kd}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={cn("border-0", toneClass(row.affiliateScore))}>{row.affiliateScore}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={cn("border-0", toneClass(row.adsenseScore))}>{row.adsenseScore}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={cn("border-0", toneClass(row.opportunityScore))}>{row.opportunityScore}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {!topicalMap && (
        <div className="mt-5 flex flex-wrap gap-2.5">
          <Button
            onClick={buildMap}
            disabled={isBuilding}
            className="border-0 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:via-violet-400 hover:to-fuchsia-400"
          >
            {isBuilding ? <Loader2 className="animate-spin" /> : <Network />}
            {isBuilding ? "Building..." : "Build Topical Authority Map"}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Eye />
                View Keyword Details
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="capitalize">{topRow.keyword}</DialogTitle>
                <DialogDescription>Top opportunity keyword for this niche</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Keyword Difficulty</span>
                  <span className="font-medium text-foreground">{topRow.kd}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Affiliate Score</span>
                  <span className="font-medium text-foreground">{topRow.affiliateScore}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Adsense Score</span>
                  <span className="font-medium text-foreground">{topRow.adsenseScore}/100</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Opportunity Score</span>
                  <span className="font-medium text-foreground">{topRow.opportunityScore}/100</span>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}
