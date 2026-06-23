import { Download, FileSpreadsheet, FileText, Table2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ExportMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Download />
          Export Content Plan
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>Export as</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <FileSpreadsheet />
          CSV Spreadsheet
        </DropdownMenuItem>
        <DropdownMenuItem>
          <FileText />
          PDF Document
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Table2 />
          Google Sheets
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
